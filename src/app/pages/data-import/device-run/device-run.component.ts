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
  @ViewChild("timeinterval") timeinterval: any; // 时间间隔
  @ViewChild("timeoneday") timeoneday: any; // 时间-特定某一天
  @ViewChild("linkageselect") linkageselect: any; // 联动-科室--设备

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
      // {
      //   field: "devicename",
      //   headerName: "设备名称",
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
      //   autoHeight: true,
      //   fullWidth: true,
      //   resizable: true,
      //   minWidth: 10,
      //   sortable: true,
      // },
      // {
      //   field: "location",
      //   headerName: "设备位置",
      //   resizable: true,
      //   minWidth: 10,
      //   sortable: true,
      // },
      // {
      //   field: "group",
      //   headerName: "功能组",
      //   resizable: true,
      //   width: 250,
      //   sortable: true,
      // },
      // {
      //   field: "level",
      //   headerName: "当前定义报警等级",
      //   resizable: true,
      //   minWidth: 10,
      //   sortable: true,
      // },
      // {
      //   field: "message",
      //   headerName: "报警内容",
      //   resizable: true,
      //   width: 500,
      //   sortable: true,
      // },
      // {
      //   field: "automessage",
      //   headerName: "报警内容自定义注释",
      //   resizable: true,
      //   sortable: true,
      //   minWidth: 10,
      //   // flex: 1,
      // },
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
      // this.inttable();
      this.inttable_nocol();
      this.agGrid.updatecolumn([], {
        style: this.tableDatas.style,
        PageSize: this.tableDatas.PageSize,
      });
      this.loading = false;
    }, 200);
  }

  // 勾选的列字段，确定 触发
  multablecol_confirm(multablecol) {
    this.tableDatas.columnDefs = [];
    this.tableDatas.isno_refresh_page_size = true;
    // console.error("勾选的列字段，确定>>>", multablecol);
    if (multablecol.length > 0) {
      // 表示 有选择的列字段！ 修改列字段！
      multablecol.forEach((element, id) => {
        var column: columnDefsType = {
          field: "",
          headerName: "",
          resizable: true,
          sortable: true,
          minWidth: 10,
        };
        column.field = element["value"];
        column.headerName = element["label"].split(" ")[1];
        if (id === 0) {
          // id 为0 表示最后一个勾选的！
          column.headerCheckboxSelection = true;
          column.checkboxSelection = true;
          column.autoHeight = true;
          column.fullWidth = true;
        }
        if (id === multablecol.length - 1) {
          column.flex = 1;
        }
        this.tableDatas.columnDefs.push(column);
      });
      // console.error("------------column-------------", this.tableDatas);
      this.agGrid.updatecolumn(this.tableDatas.columnDefs);
      this.update_agGrid();
      this.loading = false;
    } else {
      this.agGrid.updatecolumn(this.tableDatas.columnDefs);
      // this.update_agGrid();
      this.loading = false;
    }
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
  query() {
    var inittable_before = this.inittable_before();
  }
  import() {}
  download(title) {
    console.error("--------columnDefs-------", this.tableDatas.columnDefs);
    this.agGrid.download_for_device_run(title, this.tableDatas.columnDefs);
  }

  refresh_table() {
    this.timeinterval?.reset();
    this.timeoneday?.reset_mydate();
    // this.linkageselect.reset_select();
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.update_agGrid();
    this.loading = false;
    this.refresh = false;
  }

  // 初始化前确保 搜索条件
  inittable_before() {
    // 得到默认的日期
    var get_curr_mounth_one = this.publicservice.get_curr_mounth_one();

    var timeinterval =
      this.timeinterval?.getselect() === undefined
        ? 1
        : this.timeinterval?.getselect();
    var timeoneday =
      this.timeoneday?.getselect() === undefined
        ? get_curr_mounth_one[1]
        : this.timeoneday?.getselect();
    console.error(
      "初始化前确保 搜索条件,timeinterval,timeoneday",
      timeinterval,
      timeoneday
    );
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
    };
  }

  // 初始化table
  inttable(event?) {
    var inittable_before = this.inittable_before();
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

  update_agGrid(event?) {
    var inittable_before = this.inittable_before();
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
    this.gridData = [];
    this.gridData.push(...message);
    this.tableDatas.rowData = this.gridData;
    var totalpagenumbers = this.message.length;
    this.tableDatas.totalPageNumbers = totalpagenumbers;
    setTimeout(() => {
      this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
    }, 1000);
    // 刷新table后，改为原来的！
    this.tableDatas.isno_refresh_page_size = false;
  }

  // 设备运行-初始化时,没有列字段
  inttable_nocol(event?) {
    var inittable_before = this.inittable_before();
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
    var message = [];
    this.tableDatas.PageSize = PageSize;
    this.gridData.push(...message);
    this.tableDatas.rowData = this.gridData;
    var totalpagenumbers = message.length;
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

interface columnDefsType {
  field: string;
  headerName: string;
  resizable: Boolean;
  sortable: Boolean;
  minWidth: Number;
  width?: Number;
  headerCheckboxSelection?: Boolean;
  checkboxSelection?: Boolean;
  autoHeight?: Boolean;
  fullWidth?: Boolean;
  flex?: Number;
}
