import { Component, OnInit, ViewChild } from "@angular/core";
declare let $;

import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";
import { TableOptionComponent } from "../components/table-option/table-option.component";

export interface Group {
  name: string;
  device_info: any[];
  children: string[];
}

@Component({
  selector: "ngx-location-monitoring",
  templateUrl: "./location-monitoring.component.html",
  styleUrls: ["./location-monitoring.component.scss"],
})
export class LocationMonitoringComponent implements OnInit {
  @ViewChild("myinput") myinput: any;
  @ViewChild("data_range") data_range: any;
  @ViewChild("ag_Grid") agGrid: any;

  @ViewChild("map") map: any;
  // 初始化数据
  groups: Group[] = [
    {
      name: "在线",
      device_info: [
        {
          title: "在线11",
          lng_lat: [121.32290066, 30.33330255],
          info: "在线11",
          updatatime: "2020-07-11 17:56:46(online)",
          positiontiome: "2020-07-06 09:56:46",
          positiontype: "卫星定位",
          deviceno: "9527",
        },
        {
          title: "在线12",
          lng_lat: [121.32260066, 30.33330255],
          info: "在线12",
          updatatime: "2020-08-11 17:56:46(online)",
          positiontiome: "2020-08-06 09:02:46",
          positiontype: "卫星定位",
          deviceno: "9537",
        },
        {
          title: "在线13",
          lng_lat: [121.32230066, 30.33330255],
          info: "在线13",
          updatatime: "2020-07-13 19:56:46(online)",
          positiontiome: "2020-07-08 15:44:46",
          positiontype: "卫星定位",
          deviceno: "9547",
        },
      ],
      children: ["在线11", "在线12", "在线13"],
    },
    {
      name: "离线",
      device_info: [
        {
          title: "离线21",
          lng_lat: [121.32290077, 30.33220264],
          info: "离线21",
          updatatime: "2020-07-11 17:56:46(outline)",
          positiontiome: "2020-07-06 09:56:46",
          positiontype: "卫星定位",
          deviceno: "9527",
        },
        {
          title: "离线22",
          lng_lat: [121.32260077, 30.33220264],
          info: "离线22",
          updatatime: "2020-08-11 17:56:46(outline)",
          positiontiome: "2020-08-06 09:02:46",
          positiontype: "卫星定位",
          deviceno: "9537",
        },
        {
          title: "离线23",
          lng_lat: [121.32200077, 30.33220264],
          info: "离线23",
          updatatime: "2020-07-01 22:35:46(outline)",
          positiontiome: "2020-06-26 19:32:46",
          positiontype: "卫星定位",
          deviceno: "9557",
        },
      ],
      children: ["离线21", "离线22", "离线23"],
    },
    {
      name: "其它",
      device_info: [
        {
          title: "其它31",
          lng_lat: [121.32290099, 30.33020277],
          info: "其它31",
          updatatime: "2020-07-11 17:56:46",
          positiontiome: "2020-07-06 09:56:46",
          positiontype: "卫星定位",
          deviceno: "9527",
        },
        {
          title: "其它32",
          lng_lat: [121.32260099, 30.33020334],
          info: "其它32",
          updatatime: "2020-08-11 17:56:46",
          positiontiome: "2020-08-06 09:02:46",
          positiontype: "卫星定位",
          deviceno: "9537",
        },
        {
          title: "其它33",
          lng_lat: [121.32200099, 30.33020664],
          info: "其它33",
          updatatime: "2020-07-01 22:35:46",
          positiontiome: "2020-06-26 19:32:46",
          positiontype: "卫星定位",
          deviceno: "9557",
        },
      ],
      children: ["其它31", "其它32", "其它33"],
    },
  ];

  button; // 权限button
  myinput_placeholder = "设备类别";
  loading = false; // 加载
  refresh = false; // 刷新tabel

  active; // aggrid 操作

  // agGrid
  tableDatas = {
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection
      {
        field: "deviceName",
        headerName: "设备名称",
        resizable: true,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        sortable: true,
        minWidth: 30,
      },
      {
        field: "startAlertTime",
        headerName: "开始报警时间",
        resizable: true,
        sortable: true,
      },
      {
        field: "endAlertTime",
        headerName: "最后报警时间",
        resizable: true,
        sortable: true,
      },
      {
        field: "alertInfo",
        headerName: "报警信息",
        resizable: true,
        sortable: true,
      },
      {
        field: "alertNum",
        headerName: "报警次数",
        resizable: true,
        sortable: true,
      },
      {
        field: "handle",
        headerName: "是否处理",
        resizable: true,
        sortable: true,
      },
      {
        field: "handlePeople",
        headerName: "处理人",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },

      {
        field: "info",
        headerName: "在线状态",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
    ],
    rowData: [
      // data
    ],
  };
  private gridData = [];

  message = [
    {
      deviceName: "AVL电机测试台架01",
      startAlertTime: "2020-08-19 08:47:31",
      endAlertTime: "2020-09-19 08:46:31",
      alertInfo: "命令报警",
      alertNum: "20",
      handle: "true",
      handlePeople: "王大锤",

      info: "离线",
      lng_lat: [121.32290077, 30.33220264],
      updatatime: "2020-07-11 17:56:46",
      positiontiome: "2020-07-06 09:56:46",
      positiontype: "卫星定位",
      deviceno: "9527",
    },
    {
      deviceName: "AVL电机测试台架02",
      startAlertTime: "2020-08-19 08:47:31",
      endAlertTime: "2020-09-19 08:46:31",
      alertInfo: "命令报警",
      alertNum: "20",
      handle: "true",
      handlePeople: "王大锤",

      info: "离线",
      lng_lat: [121.32260077, 30.33220264],
      updatatime: "2020-07-11 17:56:46",
      positiontiome: "2020-07-06 09:56:46",
      positiontype: "卫星定位",
      deviceno: "9537",
    },
    {
      deviceName: "AVL电机测试台架03",
      startAlertTime: "2020-08-19 08:47:31",
      endAlertTime: "2020-09-19 08:46:31",
      alertInfo: "命令报警",
      alertNum: "20",
      handle: "true",
      handlePeople: "王大锤",

      info: "离线",
      lng_lat: [121.32200077, 30.33220264],
      updatatime: "2020-07-11 17:56:46",
      positiontiome: "2020-07-06 09:56:46",
      positiontype: "卫星定位",
      deviceno: "9557",
    },

    {
      deviceName: "AVL电机测试台架04",
      startAlertTime: "2020-08-19 08:47:31",
      endAlertTime: "2020-09-19 08:46:31",
      alertInfo: "命令报警",
      alertNum: "20",
      handle: "true",
      handlePeople: "王大锤",

      info: "在线",
      lng_lat: [121.32290066, 30.33330255],
      updatatime: "2020-07-11 17:56:46",
      positiontiome: "2020-07-06 09:56:46",
      positiontype: "卫星定位",
      deviceno: "9567",
    },
    {
      deviceName: "AVL电机测试台架05",
      startAlertTime: "2020-08-19 08:47:31",
      endAlertTime: "2020-09-19 08:46:31",
      alertInfo: "命令报警",
      alertNum: "20",
      handle: "true",
      handlePeople: "王大锤",

      info: "在线",
      lng_lat: [121.32260066, 30.33330255],
      updatatime: "2020-07-11 17:56:46",
      positiontiome: "2020-07-06 09:56:46",
      positiontype: "卫星定位",
      deviceno: "9577",
    },
    {
      deviceName: "AVL电机测试台架06",
      startAlertTime: "2020-08-19 08:47:31",
      endAlertTime: "2020-09-19 08:46:31",
      alertInfo: "命令报警",
      alertNum: "20",
      handle: "true",
      handlePeople: "王大锤",

      info: "在线",
      lng_lat: [121.32230066, 30.33330255],
      updatatime: "2020-07-11 17:56:46",
      positiontiome: "2020-07-06 09:56:46",
      positiontype: "卫星定位",
      deviceno: "9587",
    },
  ];

  constructor(
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private http: HttpserviceService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  ngOnInit(): void {
    // button 按钮
    this.button = localStorage.getItem("buttons_list")
      ? JSON.parse(localStorage.getItem("buttons_list"))
      : {};
    // 添加操作
    var that = this;
    this.active = {
      field: "option",
      headerName: "操作",
      resizable: true,
      fullWidth: true,
      pinned: "right",
      miWidth: 10,
      cellRendererFramework: TableOptionComponent,
      cellRendererParams: {
        clicked: function (data: any) {
          console.log("--添加操作列---", data);
          // that.change_target_hour([data]);
        },
      },
    };
  }

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.active);

    // 初始化全部的小车！
    // this.map.init_show_all(this.groups);
    this.map.init_show_all(this.message);

    // 初始化table
    this.inttable();
    this.loading = false;
  }

  // button按钮
  action(actionmethod) {
    var method = actionmethod.split(":")[1];
    switch (method) {
      // case 'add':
      //   this.add();
      //   break;
      // case 'del':
      //   this.del();
      //   break;
      // case 'edit':
      //   this.edit();
      //   break;
      case "query":
        this.query();
        break;
      // case 'import':
      //   this.import();
      //   break;
      case "download":
        this.download("行驶报表");
        break;
    }
  }

  // input 传入的值
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      console.log("传入的值设备名称----->", inpuvalue);
      this.query(inpuvalue);
    }
  }

  // 搜索按钮
  query(inpuvalue?) {
    var devicetype;
    if (inpuvalue) {
      devicetype = inpuvalue;
    } else {
      devicetype = this.myinput?.getinput();
    }
    // 日期范围
    var daterange_data = this.data_range.getselect();
    console.log(
      "<------------搜索----------->",
      devicetype,
      "日期范围",
      daterange_data
    );
  }
  // 导出
  download(title) {
    // this.mytable.download(title);
  }
  // 初始化前确保 搜索条件
  inittable_before() {
    var devicetype =
      this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称
    // 日期范围
    var daterange_data = this.data_range?.getselect();
    // 将科室/功能组，转为列表
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      devicetype: [devicetype],
      start: daterange_data[0],
      end: daterange_data[1],
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
      start: inittable_before.start,
      end: inittable_before.end,
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
  // 刷新table
  refresh_table() {
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    this.loading = false;
    this.refresh = false;

    // 取消选择的数据 delselect
    this.myinput.del_input_value();
    // this.groups_func.dropselect();
    // this.eimdevicetpye.dropselect();
  }
  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event) {
    // console.log("页码改变的回调", event);
    // this.loading = true;
    this.gridData = [];
    this.inttable(event);
    this.loading = false;
  }

  // 子组件，map组件调用，通知，刷新小车数据！
  isno_refresh(event) {
    var groups_back = Object.assign([], this.groups);
    groups_back.forEach((item) => {
      item.device_info.forEach((element) => {
        element.lng_lat[0] += 0.001;
        element.lng_lat[1] += 0.1;
      });
    });
    console.error("子组件，map组件调用，通知，刷新小车数据！", groups_back);
    this.map.init_show_all(groups_back, true);
  }

  // 点击设备在map上展示设备信息,子组件调用

  // 得到的，选中的行，数据 array
  selectedrow(event) {
    console.log("--点击设备在map上展示设备信息---", event);
    this.map.show_info_in_map(event);
  }
}
