import { Component, OnInit, ViewChild } from "@angular/core";

import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { AlertInfoOptionComponent } from "../alert-info-option/alert-info-option.component";
import { NbDialogService } from "@nebular/theme";

import { SetRuleConfigComponent } from "../../../../pages-popups/facility-health-data-center/alert-info-and-config/set-rule-config/set-rule-config.component";
import { AlertMessageComponent } from "../../real-time-alert/alert-message/alert-message.component";
import { DeviceLevelComponent } from "./device-level/device-level.component";
import { TableGroupComponent } from "../../../tongji/components/table-group/table-group.component";
import { TableDevicenameComponent } from "../../../tongji/components/table-devicename/table-devicename.component";

import { Event, NavigationEnd, Router } from "@angular/router";

declare let $;

@Component({
  selector: "ngx-alert-info",
  templateUrl: "./alert-info.component.html",
  styleUrls: ["./alert-info.component.scss"],
})
export class AlertInfoComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("data_range") data_range: any; // 日期范围
  @ViewChild("myinput") devicename: any; // 设备名称
  @ViewChild("alertlevel") alertlevel: any; // 报警等级

  loading: boolean = false;
  button; // 权限button
  refresh = false; // 刷新tabel

  myinput_placeholder = "请输入设备名称";
  eimdevicetpye_placeholder = "报警等级";
  // 报警等级
  level = [
    { id: 1, label: "一级报警" },
    { id: 2, label: "二级报警" },
    { id: 3, label: "三级报警" },
  ];

  // 用户id
  employeeid = this.userinfo.getEmployeeID();
  TABLE = "device_monitor.device_log";
  METHOD = "get_alarm";

  tableDatas = {
    style: "width: 100%; height: 640px",
    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度  pinned: 'left' 固定在左侧！
      {
        field: "devicename",
        headerName: "设备名称",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        resizable: true,
        minWidth: 10,
        sortable: true,
        cellRendererFramework: TableDevicenameComponent,
      },
      {
        field: "deviceid",
        headerName: "设备ID",
        resizable: true,
        width: 250,
        sortable: true,
      },
      {
        field: "groups",
        headerName: "功能组",
        resizable: true,
        width: 250,
        cellRendererFramework: TableGroupComponent,
        sortable: true,
      },
      {
        field: "level",
        headerName: "当前定义报警等级",
        resizable: true,
        minWidth: 10,
        cellRendererFramework: DeviceLevelComponent,
        sortable: true,
      },
      {
        field: "message",
        headerName: "报警内容",
        resizable: true,
        width: 500,
        cellRendererFramework: AlertMessageComponent,
        sortable: true,
      },
      {
        field: "location",
        headerName: "设备位置",
        resizable: true,
        width: 300,
        sortable: true,
      },
      // {
      //   field: "ispush",
      //   headerName: "是否推送",
      //   resizable: true,
      //   width: 100,
      //   sortable: true,
      // },
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
    private dialogService: NbDialogService,
    private router: Router
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

  // 操作列
  option;

  ngOnInit(): void {
    var that = this;
    this.option = {
      field: "option",
      headerName: "操作",
      resizable: true,
      fullWidth: true,
      pinned: "right",
      width: 200,
      cellRendererFramework: AlertInfoOptionComponent,
      cellRendererParams: {
        clicked: function (data: any) {
          console.log("--添加操作列---", data);
          if (data["active"] === "config") {
            that.config([data["data"]]);
          } else {
            that.push([data["data"]]);
          }
        },
      },
    };
  }

  ngAfterViewInit() {
    // this.tableDatas.columnDefs.push(this.option);

    setTimeout(() => {
      var button = localStorage.getItem("buttons_list");
      this.button = JSON.parse(button);
    }, 100);

    setTimeout(() => {
      this.alertlevel.init_select_trees(this.level);
      $("#eletype_i").css("top", "8px");
    }, 400);

    // 初始化table
    setTimeout(() => {
      this.loading = true;
      this.inttable();
      // this.loading = false;
    }, 200);
  }

  action(actionmethod) {
    var method = actionmethod.split(":")[1];
    switch (method) {
      case "query":
        this.query();
        break;
      case "download":
        this.download("数采报警");
        break;
    }
  }

  // 规则配置
  config(active_data) {
    var rowdata;
    if (active_data) {
      rowdata = active_data[0];
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    this.dialogService
      .open(SetRuleConfigComponent, {
        closeOnBackdropClick: false,
        context: { rowdata: rowdata[0] },
      })
      .onClose.subscribe((res) => {
        if (res) {
          this.gridData = [];
          this.loading = true;
          this.update_agGrid();
          this.loading = false;
        }
      });
  }

  // 报警推送
  push(active_data) {
    var rowdata;
    if (active_data) {
      rowdata = active_data[0];
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
  }

  querytitle = "";
  query() {
    this.querytitle = "搜索";
    // var inittable_before = this.inittable_before();
    // console.error("搜索>>>>", inittable_before);
    this.gridData = [];
    this.loading = true;
    this.update_agGrid();
  }

  download(title) {
    this.agGrid.download(title);
  }

  inittable_before() {
    // var devicename =
    //   this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称
    // console.error("this.agGrid>>>>>>>>>>>>.", this.agGrid?.get_pagesize());

    var data_range = this.data_range.getselect();
    // console.error("getselect--------------->", data_range);

    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      start: data_range[0],
      end: data_range[1],
      level: this.alertlevel.getselect() ? this.alertlevel.getselect() : [],
      devicename: this.devicename.getinput() ? this.devicename.getinput() : "",
    };
  }

  // 重置、刷新
  refresh_table() {
    this.querytitle = "";
    this.data_range.reset_mydate();
    this.alertlevel.dropselect();
    this.devicename.reset_myinput();
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    // this.loading = false;
    this.refresh = false;
  }

  // 设备名称的输入框
  inpuvalue(inputdata) {
    // console.error("inputdata>>>>>>>>", inputdata);
  }

  // 初始化table
  inttable(event?) {
    var inittable_before = this.inittable_before();
    // console.error("inittable_before>>>>>>>>", inittable_before);

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
      start: inittable_before.start,
      end: inittable_before.end,
      devicename: inittable_before.devicename,
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

        this.RecordOperation("查看", 1, "数采报警:" + JSON.stringify(columns));
      } else {
        this.RecordOperation("查看", 0, "数采报警:" + JSON.stringify(columns));
      }
    });
  }

  // 更新table
  update_agGrid(event?) {
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
      start: inittable_before.start,
      end: inittable_before.end,
      devicename: inittable_before.devicename,
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
            "更新数采报警:" + JSON.stringify(columns)
          );
        }
        this.RecordOperation(
          "更新",
          1,
          "更新数采报警:" + JSON.stringify(columns)
        );
      } else {
        if (this.querytitle !== "") {
          this.RecordOperation(
            "搜索",
            0,
            "更新数采报警:" + JSON.stringify(columns)
          );
        }
        this.RecordOperation(
          "更新",
          0,
          "更新数采报警:" + JSON.stringify(columns)
        );
      }
    });
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event) {
    // console.log("页码改变的回调", event);
    this.querytitle = "";
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  // 点击行数据 子组件调用
  clickrow(data) {
    // console.log("---------------->",data)
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
