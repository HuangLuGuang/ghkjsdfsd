import { Component, OnInit, ViewChild } from "@angular/core";

import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { NbDialogService } from "@nebular/theme";
import { SetPullConfigComponent } from "../../../../pages-popups/facility-health-data-center/alert-info-and-config/set-pull-config/set-pull-config.component";
import { ActionComponent } from "./action/action.component";
import { EditDelTooltipComponent } from "../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { SetRuleConfigComponent } from "../../../../pages-popups/facility-health-data-center/alert-info-and-config/set-rule-config/set-rule-config.component";
import { DeviceLevelComponent } from "../alert-info/device-level/device-level.component";

@Component({
  selector: "ngx-alert-config",
  templateUrl: "./alert-config.component.html",
  styleUrls: ["./alert-config.component.scss"],
})
export class AlertConfigComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") devicename: any; // 设备名称
  @ViewChild("alertlevel") alertlevel: any; // 报警等级
  // @ViewChild("data_range") data_range: any; // 日期范围

  active; // aggrid 操作

  loading: boolean = false;
  button; // 权限button
  refresh = false; // 刷新tabel

  myinput_placeholder = "请输入设备ID";
  eimdevicetpye_placeholder = "报警等级";
  // 报警等级
  level = [
    { id: 1, label: "一级报警" },
    { id: 2, label: "二级报警" },
    { id: 3, label: "三级报警" },
  ];

  // 用户id
  employeeid = this.userinfo.getEmployeeID();
  TABLE = "get_alarm_rank";
  METHOD = "get_alarm_rank"; // 获取规则
  DMETHOD = "delete_alarm"; // 删除规则

  tableDatas = {
    style: "width: 100%; height: 700px",
    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度  pinned: 'left' 固定在左侧！
      {
        field: "deviceid",
        headerName: "设备ID",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "createdon",
        headerName: "创建时间",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "level",
        headerName: "报警等级",
        resizable: true,
        width: 250,
        cellRendererFramework: DeviceLevelComponent,
        sortable: true,
      },
      {
        field: "message",
        headerName: "关键字",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "newmessage",
        headerName: "自定义报警描述",
        resizable: true,
        minWidth: 10,
        sortable: true,
        flex: 1,
      },
    ],
    rowData: [
      // data
    ],
  };

  private gridData = [];

  constructor(
    private userinfo: UserInfoService,
    private http: HttpserviceService,
    private publicservice: PublicmethodService,
    private dialogService: NbDialogService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");

    // 权限 button 列表
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      // console.log("得到pathname --在得到button\t\t", result);
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  ngOnInit(): void {
    // 添加操作列
    var that = this;
    this.active = {
      field: "option",
      headerName: "操作",
      resizable: true,
      fullWidth: true,
      width: 100,
      pinned: "right",
      cellRendererFramework: ActionComponent,
      cellRendererParams: {
        clicked: function (data: any) {
          if (data.action === "edit") {
            that.edit(data.data);
          } else {
            that.del([data.data]);
          }
          // that.change_target_hour([data]);
        },
      },
    };
  }

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.active);

    setTimeout(() => {
      var button = localStorage.getItem("buttons_list");
      this.button = JSON.parse(button);
    }, 100);

    setTimeout(() => {
      this.alertlevel.init_select_trees(this.level);
    }, 400);

    // 初始化table
    setTimeout(() => {
      this.loading = true;
      this.inttable();
    }, 200);
  }

  action(actionmethod) {
    var method = actionmethod.split(":")[1];
    switch (method) {
      case "add":
        this.add();
        break;
      case "del":
        this.del();
        break;
      case "edit":
        this.edit();
        break;
      case "query":
        this.query();
        break;
      // case 'import':
      //   this.importfile();
      //   break;
      case "download":
        this.download("报警规则配置");
        break;
    }
  }

  add() {
    this.dialogService
      .open(SetRuleConfigComponent, {
        closeOnBackdropClick: false,
        context: { rowdata: [] },
      })
      .onClose.subscribe((res) => {
        if (res) {
          // 标识 插入数据
          setTimeout(() => {
            this.gridData = [];
            this.update_agGrid();
          }, 100);
        }
      });
  }

  edit(data?) {
    var rowdata;
    if (data) {
      rowdata = [data];
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    if (rowdata.length === 1) {
      this.dialogService
        // .open(SetPullConfigComponent, {
        .open(SetRuleConfigComponent, {
          closeOnBackdropClick: false,
          context: { rowdata: rowdata[0] },
        })
        .onClose.subscribe((res) => {
          if (res) {
            // this.loading = true;
            // 标识 插入数据

            this.refresh_table();
          }
        });
    } else {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          autoFocus: true,
          context: { title: "提示", content: `请选择一行数据！` },
        })
        .onClose.subscribe((istrue) => {});
    }
  }

  del(active_data?) {
    var rowdata;
    if (active_data) {
      rowdata = active_data;
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    // console.log("删除-报警规则  rowdata", rowdata);
    var rowdata_ = this.handle_rowdata(rowdata);

    if (rowdata_.length === 0) {
      // 未选中
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: {
            title: "删除设备提示",
            content: `请选择需要删除的行！`,
          },
        })
        .onClose.subscribe((name) => {});
    } else {
      // 选中多条 dev_delete_device_list
      var rowData = rowdata_;
      var text = rowdata.length > 1 ? "这些" : "这条";
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: {
            title: "提示",
            content: `确定要删除${text}数据吗？`,
            rowData: JSON.stringify(rowdata),
          },
        })
        .onClose.subscribe((istrue) => {
          if (istrue) {
            try {
              var data_info;
              var id_list = [];
              rowData.forEach((item) => {
                id_list.push(item);
              });
              var id_str = id_list.join(",");
              data_info = "设备ID(deviceid):" + id_str;
              // console.log("要删除的数据:", rowdata)

              var table = "device";
              var method = this.DMETHOD;
              this.http
                .callRPC(table, method, { id: rowData })
                .subscribe((result) => {
                  const status = result["result"]["message"][0];
                  switch (status["code"]) {
                    case 1:
                      this.RecordOperation(
                        "删除",
                        1,
                        "报警规则配置:" + data_info
                      );
                      this.delsuccess();
                      this.gridData = [];
                      this.loading = true;
                      this.update_agGrid();
                      this.loading = false;
                      break;

                    default:
                      var err_date = "error:" + status["message"];
                      this.RecordOperation(
                        "删除",
                        0,
                        "报警规则配置:" + String(err_date)
                      );
                      this.deldanger(String(err_date));
                      break;
                  }
                  throw "error, 删除失败！";
                });
            } catch (err) {
              this.deldanger(String(err));
            }
          } else {
          }
        });
    }
  }

  // 处理删除的数据
  handle_rowdata(rowdata) {
    var result = [];
    rowdata.forEach((element) => {
      result.push(element["id"]);
    });
    return result;
  }

  querytitle = "";
  query() {
    this.querytitle = "搜索";

    this.gridData = [];
    this.loading = true;
    this.update_agGrid();
  }

  // 导出文件
  download(title) {
    this.agGrid.download(title);
  }

  inittable_before() {
    // var data_range = this.data_range.getselect();
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      // start: data_range[0],
      // end: data_range[1],
      level: this.alertlevel.getselect() ? this.alertlevel.getselect() : [],
      deviceid: this.devicename.getinput() ? this.devicename.getinput() : "",
    };
  }

  // 重置、刷新
  refresh_table() {
    this.querytitle = "";
    // this.data_range.reset_mydate();
    this.alertlevel.dropselect();
    this.devicename.reset_myinput();

    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.update_agGrid();
    // this.loading = false;
    this.refresh = false;
  }

  // 设备名称的输入框
  inpuvalue(inputdata) {}

  // 初始化table
  inttable(event?) {
    var inittable_before = this.inittable_before();
    var offset;
    var limit;
    var PageSize;
    if (event != undefined) {
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize ? Number(event.PageSize) : 15;
    } else {
      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset,
      limit: limit,
      // start: inittable_before.start,
      // end: inittable_before.end,
      deviceid: inittable_before.deviceid,
      level: inittable_before.level,
    };
    this.http.callRPC(this.TABLE, this.METHOD, columns).subscribe((result) => {
      var tabledata = result["result"]["message"][0];
      this.loading = false;
      if (tabledata["code"] === 1) {
        var message = result["result"]["message"][0]["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata["numbers"]
          ? tabledata["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;

        this.RecordOperation(
          "查看",
          1,
          "报警规则配置:" + JSON.stringify(columns)
        );
      } else {
        this.RecordOperation(
          "查看",
          0,
          "报警规则配置:" + JSON.stringify(columns)
        );
      }
    });
  }
  // 更新table
  update_agGrid(event?) {
    this.loading = true;
    var inittable_before = this.inittable_before();
    var offset;
    var limit;
    var PageSize;
    if (event != undefined) {
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize ? Number(event.PageSize) : 15;
    } else {
      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset,
      limit: limit,
      // start: inittable_before.start,
      // end: inittable_before.end,
      deviceid: inittable_before.deviceid,
      level: inittable_before.level,
    };
    this.http.callRPC(this.TABLE, this.METHOD, columns).subscribe((result) => {
      var tabledata = result["result"]["message"][0];
      this.loading = false;
      if (tabledata["code"] === 1) {
        var message = result["result"]["message"][0]["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata["numbers"]
          ? tabledata["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        if (this.querytitle !== "") {
          this.RecordOperation(
            "搜索",
            1,
            "报警规则配置:" + JSON.stringify(columns)
          );
        }
        this.RecordOperation(
          "更新",
          1,
          "报警规则配置:" + JSON.stringify(columns)
        );
      } else {
        if (this.querytitle !== "") {
          this.RecordOperation(
            "搜索",
            0,
            "报警规则配置:" + JSON.stringify(columns)
          );
        }
        this.RecordOperation(
          "更新",
          0,
          "报警规则配置:" + JSON.stringify(columns)
        );
      }
    });
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event) {
    // console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    // this.inttable(event);
    this.loading = false;
  }

  // 点击行数据 子组件调用
  clickrow(data) {
    // console.log("---------------->",data)
  }

  delsuccess() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "删除成功!",
    });
  }
  deldanger(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "删除失败!" + data,
    });
  }

  // option_record
  RecordOperation(option, result, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.employeeid;
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}
