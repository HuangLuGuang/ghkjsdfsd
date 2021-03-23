import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { EditDelTooltipComponent } from "../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";
import { TableDevicenameComponent } from "../../tongji/components/table-devicename/table-devicename.component";
import { TableGroupComponent } from "../../tongji/components/table-group/table-group.component";
import { DetailComponent } from "./detail/detail.component";
import { StatusComponent } from "./status/status.component";

@Component({
  selector: "ngx-device-andon-status-info",
  templateUrl: "./device-andon-status-info.component.html",
  styleUrls: ["./device-andon-status-info.component.scss"],
})
export class DeviceAndonStatusInfoComponent implements OnInit {
  @ViewChild("groups_devieces") groups_devieces: any;
  @ViewChild("ag_Grid") agGrid: any;
  constructor(
    private publicservice: PublicmethodService,
    private userinfo: UserInfoService,
    private http: HttpserviceService,
    private dialogService: NbDialogService,
    private router: Router
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  ngOnInit(): void {
    // 添加操作列
    var that = this;
    this.detail = {
      field: "detail",
      headerName: "历史记录",
      resizable: true,
      fullWidth: true,
      width: 100,
      pinned: "right",
      cellRendererFramework: DetailComponent,
      cellRendererParams: {
        clicked: function (data: any) {
          that.history_log(data);
        },
      },
    };

    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      // console.log("得到pathname --在得到button\t\t", result)
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }
  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.detail);

    // 初始化table
    this.inttable();
  }

  ngOnDestroy() {
    this.groups_devieces.delselect();
  }

  loading = false; // 加载
  refresh = false; // 刷新tabel
  button; // 权限button
  detail; // aggrid 详情

  // agGrid
  tableDatas = {
    style: "width: 100%; height: 695px",
    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection
      // { field: 'id', headerName: '序号',  headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 30,resizable: true, sortable: true},
      {
        field: "group",
        headerName: "科室功能组",
        cellRendererFramework: TableGroupComponent,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        width: 400,
        resizable: true,
        sortable: true,
      },
      {
        field: "devicename",
        headerName: "设备名称",
        cellRendererFramework: TableDevicenameComponent,
        resizable: true,
        sortable: true,
        width: 250,
      },
      {
        field: "deviceno",
        headerName: "设备编号",
        resizable: true,
        sortable: true,
        width: 130,
      },
      {
        field: "deviceid",
        headerName: "设备ID",
        resizable: true,
        sortable: true,
        width: 200,
      },

      {
        field: "recordtime",
        headerName: "状态变更时间",
        resizable: true,
        sortable: true,
        width: 200,
        // flex: 1,
      },

      {
        field: "status",
        headerName: "当前设备状态",
        cellRendererFramework: StatusComponent,
        resizable: true,
        sortable: true,
        width: 150,
        cellStyle: function (params) {
          var value = params.value;
          switch (value) {
            case "running":
              return {
                background: "#5D920D",
              };
            case "stop":
              return {
                background: "#3333FF",
                color: "#f0f8ff",
              };
            case "warning":
              return {
                background: "#FF4E0D",
              };
            case "placeon":
              return {
                background: "#DBB70D",
              };
          }
        },
      },
      {
        field: "createdby",
        headerName: "执行人",
        resizable: true,
        sortable: true,
        width: 100,
        flex: 1,
      },

      // { field: 'taskstatus', headerName: '当前试验状态', resizable: true,minWidth:10, sortable: true,flex:1,},
      // { field: 'detail', headerName: '详情', resizable: true,width:100, sortable: true,pinned: 'right'},
    ],
    rowData: [
      // data
    ],
  };
  private gridData = [];

  // 科室、设备
  parent_query(parent_query) {
    if (parent_query["group"] !== undefined) {
      // console.error("更改功能，科室 parent_query_group", parent_query);
      this.query(parent_query["group"]);
    } else {
      // console.error("更改设备----parent_query", parent_query);
      this.query();
    }
    // this.query(parent_query["group"]);
  }

  // 搜索
  query(group?) {
    var groups_devieces = this.groups_devieces.get_form_val();
    // console.error("groups_devieces====>", groups_devieces);
    var devicename = [];
    var offset;
    var limit;
    var PageSize;
    var colums;
    offset = 0;
    limit = 15;
    PageSize = 15;
    if (group) {
      colums = {
        offset: offset,
        limit: limit,
        employeeid: this.userinfo.getEmployeeID(),
        group: [group],
        devicename: [],
      };
      var table = "andon";
      var method = "pc_device_status_id";
      this.loading = true;
      this.http.callRPC(table, method, colums).subscribe((result) => {
        var res = result["result"]["message"][0];
        if (res["code"] === 1) {
          this.loading = false;
          var message = res["message"];
          this.gridData = [];
          this.tableDatas.PageSize = PageSize;
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = res["numbers"]
            ? res["numbers"][0]["numbers"]
            : "未得到总条数";
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
          // 刷新table后，改为原来的！
          this.tableDatas.isno_refresh_page_size = false;
          this.RecordOperation(
            "搜索",
            1,
            "设备安灯状态信息:" + JSON.stringify(colums)
          );
        } else {
          this.RecordOperation(
            "搜索",
            0,
            "设备安灯状态信息:" + JSON.stringify(res["message"])
          );
        }
      });
    } else {
      if (groups_devieces["devicename"]) {
        devicename.push(groups_devieces["devicename"]);
        colums = {
          offset: offset,
          limit: limit,
          employeeid: this.userinfo.getEmployeeID(),
          devicename: devicename,
          group: [],
        };
        var table = "andon";
        var method = "pc_device_status_id";
        this.loading = true;
        this.http.callRPC(table, method, colums).subscribe((result) => {
          var res = result["result"]["message"][0];
          if (res["code"] === 1) {
            this.loading = false;
            var message = res["message"];
            this.gridData = [];
            this.tableDatas.PageSize = PageSize;
            this.gridData.push(...message);
            this.tableDatas.rowData = this.gridData;
            var totalpagenumbers = res["numbers"]
              ? res["numbers"][0]["numbers"]
              : "未得到总条数";
            this.tableDatas.totalPageNumbers = totalpagenumbers;
            this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
            // 刷新table后，改为原来的！
            this.tableDatas.isno_refresh_page_size = false;
            this.RecordOperation(
              "搜索",
              1,
              "设备安灯状态信息:" + JSON.stringify(colums)
            );
          } else {
            this.RecordOperation(
              "搜索",
              0,
              "设备安灯状态信息:" + JSON.stringify(res["message"])
            );
          }
        });
      } else {
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: { title: "提示", content: `请选择设备!` },
          })
          .onClose.subscribe((name) => {});
      }
    }
  }

  // 导出
  download() {
    this.agGrid.download("设备安灯状态信息");
  }
  // 历史记录-- 详情 detail
  history_log(data) {
    data["link"] = "/pages/andon-man-hour/DeviceAndonStatusInfo";
    localStorage.setItem("device_andon_history_status", JSON.stringify(data));
    // 跳转到设备安灯历史状态界面
    this.router.navigate(["/pages/andon-man-hour/DeviceAndonHistroyStatus"]);
  }

  // button按钮
  action(actionmethod) {
    var method = actionmethod.split(":")[1];
    // console.log("--------------->method", method)
    switch (method) {
      // case 'add':
      //   this.add();
      //   break;
      // case 'del':
      //   this.del();
      //   break;
      // case 'edit':
      //   this.change_target_hour();
      //   break;
      // case 'query':
      //   this.query();
      //   break;
      // case 'import':
      //   this.importfile();
      //   break;
      case "download":
        // this.download('工时KPI报表')
        this.download();
        break;
    }
  }

  // 重置table
  refresh_table() {
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    this.groups_devieces?.delselect();
    setTimeout(() => {
      // this.inttable();
      this.update_agGrid();
    }, 100);
    this.loading = false;
    this.refresh = false;

    // 取消选择的数据 delselect
    // this.myinput.del_input_value();
    // this.department.dropselect();
    // this.device_tpye.dropselect();
  }

  // 初始化table
  inttable(event?) {
    var devicename = [];
    var group = [];
    var groups_devieces = this.groups_devieces.get_form_val();
    if (groups_devieces["devicename"]) {
      devicename.push(groups_devieces["devicename"]);
    }
    if (
      groups_devieces["group"] &&
      groups_devieces["group"] !== "请选择功能组"
    ) {
      group.push(groups_devieces["group"]);
    }
    var offset;
    var limit;
    var PageSize;
    if (event != undefined) {
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize ? Number(event.PageSize) : 15;
    } else {
      offset = 0;
      limit = 15;
      PageSize = 15;
    }
    var colums = {
      offset: offset,
      limit: limit,
      employeeid: this.userinfo.getEmployeeID(),
      devicename: devicename,
      group: group,
    };
    var table = "andon";
    var method = "pc_device_status_id";
    this.http.callRPC(table, method, colums).subscribe((result) => {
      // console.error("++++++++++++++++++++++++++++++", result);
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.loading = false;
        var message = res["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = res["numbers"]
          ? res["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation(
          "查看",
          1,
          "设备安灯状态信息:" + JSON.stringify(colums)
        );
      } else {
        this.RecordOperation(
          "查看",
          0,
          "设备安灯状态信息:" + JSON.stringify(res["message"])
        );
      }
    });
  }

  // 更新table
  update_agGrid(event?) {
    var devicename = [];
    var group = [];
    var groups_devieces = this.groups_devieces.get_form_val();
    if (groups_devieces["devicename"]) {
      devicename.push(groups_devieces["devicename"]);
    }
    if (
      groups_devieces["group"] &&
      groups_devieces["group"] !== "请选择功能组"
    ) {
      group.push(groups_devieces["group"]);
    }
    var offset;
    var limit;
    var PageSize;
    if (event != undefined) {
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize ? Number(event.PageSize) : 15;
    } else {
      offset = 0;
      limit = 15;
      PageSize = 15;
    }
    var colums = {
      offset: offset,
      limit: limit,
      employeeid: this.userinfo.getEmployeeID(),
      devicename: devicename,
      group: group,
    };
    var table = "andon";
    var method = "pc_device_status_id";
    this.http.callRPC(table, method, colums).subscribe((result) => {
      // console.error("++++++++++++++++++++++++++++++", result);
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.loading = false;
        var message = res["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = res["numbers"]
          ? res["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation(
          "更新",
          1,
          "设备安灯状态信息:" + JSON.stringify(colums)
        );
      } else {
        this.RecordOperation(
          "更新",
          0,
          "设备安灯状态信息:" + JSON.stringify(res["message"])
        );
      }
    });
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event) {
    // console.log("页码改变的回调", event);
    // this.loading = true;
    this.gridData = [];
    this.inttable(event);
    this.loading = false;
  }

  success(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: data,
    });
  }
  danger(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: data,
    });
  }

  // option_record
  RecordOperation(option, result, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
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
