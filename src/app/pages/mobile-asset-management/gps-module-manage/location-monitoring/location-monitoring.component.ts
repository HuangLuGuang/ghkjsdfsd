import { Component, OnInit, ViewChild } from "@angular/core";
declare let $;

import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { TableOptionComponent } from "../../components/table-option/table-option.component";
import { IsnotFavorComponent } from "../assets-manage/isnot-favor/isnot-favor.component";

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
  @ViewChild("gpshistory") gpshistory: any;
  @ViewChild("mydateselect") mydateselect: any;
  @ViewChild("myselect") myselect: any;

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
  myinput_placeholder = "设备编号";
  loading = true; // 加载
  refresh = false; // 刷新tabel

  active; // aggrid 操作

  // agGrid
  tableDatas = {
    // 新增，设置高度
    // style: "width: 100%; height: 443px",
    style: "width: 100%; height: 325px",

    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection
      {
        field: "deviceid",
        headerName: "设备编号",
        resizable: true,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        width: 160,
        sortable: true,
      },
      {
        field: "devicename",
        headerName: "设备名称",
        resizable: true,
        width: 160,
        sortable: true,
      },
      {
        field: "imei",
        headerName: "IMEI号",
        resizable: true,
        sortable: true,
        width: 160,
      },
      {
        field: "belonged",
        headerName: "负责人",
        resizable: true,
        sortable: true,
        width: 120,
      },
      {
        field: "sim",
        headerName: "SIM号",
        resizable: true,
        sortable: true,
        width: 130,
      },
      {
        field: "gpstype",
        headerName: "定位类型",
        resizable: true,
        sortable: true,
      },
      {
        field: "latlon",
        headerName: "经纬度",
        resizable: true,
        sortable: true,
      },

      {
        field: "electricity",
        headerName: "电量",
        resizable: true,
        sortable: true,
      },
      {
        field: "address",
        headerName: "详细地址",
        resizable: true,
        sortable: true,
      },
      {
        field: "isfavor",
        headerName: "是否关注",
        cellRendererFramework: IsnotFavorComponent,
        resizable: true,
        sortable: true,
      },
      {
        field: "recordtime",
        headerName: "更新时间",
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
        field: "createdby",
        headerName: "创建人",
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

  TABLE = "gps_monitoring";
  METHDO = "dev_get_gps_monitoring";

  // 历史位置，折线
  METHDOHISTROY = "dev_get_gps_monitoring_device";

  message = [
    {
      devicename: "AVL电机测试台架01",
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
      devicename: "AVL电机测试台架02",
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
      devicename: "AVL电机测试台架03",
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
      devicename: "AVL电机测试台架04",
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
      devicename: "AVL电机测试台架05",
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
      devicename: "AVL电机测试台架06",
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

  // 抽屉
  visible = false;

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
          that.history_location(data);
        },
      },
    };
  }

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.active);

    // 初始化全部的小车！
    // this.map.init_show_all(this.message);

    // 初始化table
    setTimeout(() => {
      this.inttable();
    }, 200);
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
        this.download("GPS报表");
        break;
    }
  }

  // input 传入的值
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      console.log("传入的值设备名称----->", inpuvalue);
      this.query();
    }
  }
  // select 选择的关注的时间段
  my_date_select(my_date_select) {
    if (my_date_select != "") {
      console.log("选择的关注的时间段----->", my_date_select);
      this.query();
    }
  }

  // select 选择的关注的类别
  selectvalue(selectvalue) {
    if (selectvalue != "" || selectvalue === 0) {
      console.log("选择的关注的类别----->", selectvalue);
      this.query();
    }
  }

  // 搜索按钮
  query() {
    var inittable_before = this.inittable_before();
    // console.log("<------------搜索----------->", inittable_before);
    var offset = 0;
    var limit = inittable_before.limit;
    var PageSize = inittable_before.limit;
    var columns = {
      offset: offset,
      limit: limit,
      daterange_data: inittable_before.daterange_data,
      isfavor: inittable_before.isfavor,
      deviceid: inittable_before.deviceid,
    };
    this.http.callRPC(this.TABLE, this.METHDO, columns).subscribe((result) => {
      var tabledata = result["result"]["message"][0];
      if (tabledata["code"] === 1) {
        this.loading = false;
        var message = result["result"]["message"][0]["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData = [];
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata["numbers"]
          ? tabledata["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation("搜索定位监控", 1, JSON.stringify(columns));

        // *******************************
        // 初始化得到的gps，在map地图上展示！
        this.init_show_all(message);

        // *******************************
      } else {
        var data = tabledata["message"];
        this.querydanger(JSON.stringify(data));
        this.RecordOperation("搜索定位监控", 0, JSON.stringify(columns));
      }
    });
  }
  // 导出
  download(title) {
    this.agGrid.download(title);
  }

  // 初始化前确保 搜索条件
  inittable_before() {
    var deviceid =
      this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称
    // 日期范围下拉
    var daterange_data = this.mydateselect?.getselect();
    // 关注下拉
    var myselect = this.myselect?.getselect();
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      deviceid: deviceid,
      daterange_data: daterange_data,
      isfavor: myselect,

      // start: daterange_data[0],
      // end: daterange_data[1],
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
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset,
      limit: limit,
      daterange_data: inittable_before.daterange_data,
      isfavor: inittable_before.isfavor,
      deviceid: inittable_before.deviceid,
      // start: inittable_before.start,
      // end: inittable_before.end,
    };
    this.http.callRPC(this.TABLE, this.METHDO, columns).subscribe((result) => {
      var tabledata = result["result"]["message"][0];
      if (tabledata["code"] === 1) {
        this.loading = false;
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
        this.RecordOperation("查看定位监控", 1, JSON.stringify(columns));

        // *******************************
        // 初始化得到的gps，在map地图上展示！
        this.init_show_all(message);

        // *******************************
      } else {
        this.RecordOperation("查看定位监控", 0, JSON.stringify(columns));
      }
    });
  }

  // 调用子组件map，上的 init_show_all，初始化小车！
  init_show_all(message: any[]) {
    // 清除map地图上的所有的覆盖物
    this.map.clearOverlay();

    var message_list = Object.assign([], message);
    message_list.forEach((item) => {
      item["lng_lat"] = item["latlon"].split(",");
    });
    this.map.init_show_all(message_list);
    // console.error("初始化小车的数据格式：", message_list);
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
      PageSize = event.PageSize ? Number(event.PageSize) : 10;
    } else {
      offset = 0;
      limit = 10;
      PageSize = 10;
    }
    var columns = {
      offset: offset,
      limit: limit,
      daterange_data: inittable_before.daterange_data,
      isfavor: inittable_before.isfavor,
      deviceid: inittable_before.deviceid,
      // start: inittable_before.start,
      // end: inittable_before.end,
    };
    this.http.callRPC(this.TABLE, this.METHDO, columns).subscribe((result) => {
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
        this.RecordOperation("更新定位监控", 1, JSON.stringify(columns));
      } else {
        this.RecordOperation("更新定位监控", 0, JSON.stringify(columns));
      }
    });
  }

  // 刷新table
  refresh_table() {
    // 清除map地图上的所有的覆盖物
    this.map.clearOverlay();

    // 取消选择的数据 delselect
    this.myinput.del_input_value(); // input
    this.mydateselect.reset_month(); // 时间段
    this.myselect.reset_month(); // 下拉 关注

    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    this.loading = false;
    this.refresh = false;
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
    // console.log("--点击设备在map上展示设备信息---", event);
    var imei = event[0]["imei"];
    this.map.show_info_in_map(event);

    // 测试，点击行时，展示折线
    var latlon = {
      "110003115": [
        "121.32290099,30.33020277,2021-03-01 09:10:48",
        "121.32250099,30.32020277,2021-03-02 09:10:48",
        "121.38210099,30.30020277,2021-03-03 09:10:48",
      ],
      "110003116": [
        "121.32260099, 30.33020334,2021-03-04 09:10:48",
        "121.31210099,30.30980277,2021-03-05 09:10:48",
        "121.36170099,30.28080277,2021-03-06 09:10:48",
      ],
      "110003117": [
        "121.32290099,30.32980277,2021-03-07 09:10:48",
        "121.32250099,30.32010877,2021-03-08 09:10:48",
        "121.38210099,30.30019877,2021-03-09 09:10:48",
      ],
    };

    var columns = {
      imei: imei,
      offset: 0, // 开始位置
      limit: 10, // 总条数
    };
    this.http
      .callRPC(this.TABLE, this.METHDOHISTROY, columns)
      .subscribe((result) => {
        var resdata = result["result"]["message"][0];
        if (resdata["code"] === 1) {
          var message = result["result"]["message"][0]["message"];
          var handle_history_for_line = this.handle_history_for_line(message);
          // console.error(
          //   "handle_history_for_line**************************",
          //   handle_history_for_line
          // );
          this.map.hit_to_show_line(handle_history_for_line);
        } else {
        }
      });

    // this.map.hit_to_show_line(latlon[event[0]["deviceid"]]);
  }

  // 解析历史数据
  handle_history_for_line(message: any[]) {
    var latlon_list = [];
    message.forEach((item) => {
      var latlon = item["latlon"] + "," + item["recordtime"];
      latlon_list.push(latlon);
    });
    return latlon_list;
  }

  // 历史位置
  history_location(data) {
    this.visible = true;
    this.gpshistory.init_history(data["imei"]);
  }

  close(): void {
    this.visible = false;
  }

  querydanger(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "搜索失败：" + data,
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
