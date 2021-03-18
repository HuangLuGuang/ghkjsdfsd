import { Component, OnInit, ViewChild } from "@angular/core";
import { TableDevicenameComponent } from "../../../tongji/components/table-devicename/table-devicename.component";

import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";

@Component({
  selector: "ngx-alert-info",
  templateUrl: "./alert-info.component.html",
  styleUrls: ["./alert-info.component.scss"],
})
export class AlertInfoComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
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
        field: "level",
        headerName: "当前定义报警等级",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "message",
        headerName: "报警内容",
        resizable: true,
        width: 500,
        sortable: true,
      },
      {
        field: "automessage",
        headerName: "报警内容自定义注释",
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
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
    {
      devicename: "四立柱",
      location: "结构试验室",
      group: "结构试验室",
      level: 1,
      message: "Serious alarm",
      automessage: "严重报警",
    },
  ];

  private gridData = [];

  constructor(
    private userinfo: UserInfoService,
    private http: HttpserviceService,
    private publicservice: PublicmethodService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
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

  action(actionmethod) {}

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
