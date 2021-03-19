import { Component, OnInit, ViewChild } from "@angular/core";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";

@Component({
  selector: "ngx-device-run",
  templateUrl: "./device-run.component.html",
  styleUrls: ["./device-run.component.scss"],
})
export class DeviceRunComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  loading = false; // 加载
  refresh = false; // 刷新tabel
  button; // 权限button

  // agGrid
  tableDatas = {
    style: "width: 100%; height: 700px",
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
        // flex: 1,
      },
    ],
    rowData: [
      // data
    ],
  };
  private gridData = [];

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
  constructor(
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // 初始化table
    setTimeout(() => {
      this.inttable();
      this.loading = false;
    }, 200);
  }

  // button按钮
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
      case "import":
        this.import();
        break;
      case "download":
        this.download("设备运行");
        break;
    }
  }

  add() {}
  del() {}
  edit() {}
  query() {}
  import() {}
  download(title) {}

  refresh_table() {}

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
  nzpageindexchange(event) {
    // console.log("页码改变的回调", event);
    // this.loading = true;
    this.gridData = [];
    this.inttable(event);
    this.loading = false;
  }

  // 选择设备名称时触发
  my_date_select(deviceInfo) {
    console.error("----选择设备名称时触发---", deviceInfo);
  }
}
