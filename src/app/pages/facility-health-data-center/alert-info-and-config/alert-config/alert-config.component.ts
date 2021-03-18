import { Component, OnInit, ViewChild } from "@angular/core";

import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { NbDialogService } from "@nebular/theme";
import { SetPullConfigComponent } from "../../../../pages-popups/facility-health-data-center/alert-info-and-config/set-pull-config/set-pull-config.component";
import { ActionComponent } from "./action/action.component";
import { EditDelTooltipComponent } from "../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";

@Component({
  selector: "ngx-alert-config",
  templateUrl: "./alert-config.component.html",
  styleUrls: ["./alert-config.component.scss"],
})
export class AlertConfigComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") devicename: any; // 设备名称
  @ViewChild("alertlevel") alertlevel: any; // 报警等级

  active; // aggrid 操作

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
  TABLE = "device";
  METHOD = "dev_get_target_time_search";

  tableDatas = {
    style: "width: 100%; height: 645px",
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
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
      },
      {
        field: "location",
        headerName: "设备位置",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "group",
        headerName: "功能组",
        resizable: true,
        width: 250,
        sortable: true,
      },
      {
        field: "push",
        headerName: "推送方式",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "pushtime",
        headerName: "推送时间段",
        resizable: true,
        width: 200,
        sortable: true,
      },
      {
        field: "pushusername",
        headerName: "推送用户名称",
        resizable: true,
        sortable: true,
        minWidth: 10,
      },
      {
        field: "username",
        headerName: "用户账号",
        resizable: true,
        sortable: true,
        minWidth: 10,
        flex: 1,
      },
    ],
    rowData: [
      // data
    ],
  };

  // 模拟数据
  message = [
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      push: "短信",
      pushtime: "2021-03-11 - 2021-03-13",
      pushusername: "zxx",
      username: "zhangsan@geely.com",
    },
  ];

  private gridData = [];

  constructor(
    private userinfo: UserInfoService,
    private http: HttpserviceService,
    private publicservice: PublicmethodService,
    private dialogService: NbDialogService
  ) {}

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
            // that.open(data.data);
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
      this.inttable();
      this.loading = false;
    }, 200);
  }

  action(actionmethod) {
    var method = actionmethod.split(":")[1];
    switch (method) {
      // case "add":
      //   this.add();
      //   break;
      // case "del":
      //   this.del();
      //   break;
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
        this.download("报警管理");
        break;
    }
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
        .open(SetPullConfigComponent, {
          closeOnBackdropClick: false,
          context: { rowdata: rowdata[0] },
        })
        .onClose.subscribe((res) => {
          if (res) {
            // 标识 插入数据
            // this.refresh_table();
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
  query() {}
  // 导出文件
  download(title) {
    this.agGrid.download(title);
  }

  inittable_before() {
    // var devicename =
    //   this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称
    console.error("this.agGrid>>>>>>>>>>>>.", this.agGrid?.get_pagesize());
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
    };
  }

  // 重置、刷新
  refresh_table() {
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    this.loading = false;
    this.refresh = false;
  }

  // 设备名称的输入框
  inpuvalue(inputdata) {}

  // 初始化table
  inttable(event?) {
    var offset;
    var limit;
    var PageSize;
    if (event != undefined) {
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize ? Number(event.PageSize) : 10;
    } else {
      offset = 0;
      limit = 10;
      PageSize = 10;
    }
    var columns = {
      offset: offset,
      limit: limit,
    };
    this.loading = true;
    var message = this.message;
    this.tableDatas.PageSize = PageSize;
    this.gridData.push(...message);
    this.tableDatas.rowData = this.gridData;
    var totalpagenumbers = this.message.length;
    this.tableDatas.totalPageNumbers = totalpagenumbers;
    setTimeout(() => {
      this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
    }, 1000);
    // 刷新table后，改为原来的！
    this.tableDatas.isno_refresh_page_size = false;
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
