import { Component, OnInit, ViewChild } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";

@Component({
  selector: "ngx-device-temperature",
  templateUrl: "./device-temperature.component.html",
  styleUrls: ["./device-temperature.component.scss"],
})
export class DeviceTemperatureComponent implements OnInit {
  @ViewChild("myinput") myinput: any;
  @ViewChild("mydateselect") mydateselect: any;
  @ViewChild("ag_Grid") agGrid: any;
  loading = false; // 加载
  refresh = false; // 刷新tabel
  button; // 权限button

  TABLE = "device_temperature";
  METHOD = "device_monitor.get_device_temperature";

  myinput_placeholder = "请选择设备安装位置";

  // agGrid
  tableDatas = {
    // 新增，设置高度
    style: "width: 100%; height: 655px",
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection
      {
        field: "deviceid",
        headerName: "温湿度传感器ID",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        width: 300,
        resizable: true,
        sortable: true,
      },
      {
        field: "recordtime",
        headerName: "记录时间",
        resizable: true,
        sortable: true,
      },
      {
        field: "temperature",
        headerName: "温度",
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        field: "humidity",
        headerName: "湿度",
        resizable: true,
        sortable: true,
        width: 100,
      },
      {
        field: "location",
        headerName: "安装位置",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "deviceno",
        headerName: "传感器序列号",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "status",
        headerName: "设备状态",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "message",
        headerName: "日志信息",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "level",
        headerName: "日志等级",
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

  constructor(
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private http: HttpserviceService,
    private dialogService: NbDialogService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      // console.log("result>>>>>>", result);
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // 初始化table
    this.inttable();
  }

  // 销毁组件时，删除 kpi_for_detail
  ngOnDestroy() {
    // localStorage.removeItem("buttons_list");
  }

  // button按钮
  action(actionmethod) {
    var method = actionmethod.split(":")[1];
    switch (method) {
      // case "add":
      //   this.add();
      //   break;
      // case "del":
      //   this.del();
      //   break;
      // case "edit":
      //   this.edit();
      //   break;
      case "query":
        this.query();
        break;
      // case "import":
      //   this.import();
      //   break;
      case "download":
        this.download("温湿度数据");
        break;
    }
  }

  // 设备安装位置，输入框
  inpuvalue(value) {
    if (value != "") {
      this.query();
    }
  }
  // 时间日期
  my_date_select(value) {
    if (value != "") {
      this.query();
    }
  }

  // 搜索按钮
  query() {
    var inittable_before = this.inittable_before();
    var offset = 0;
    var limit = inittable_before.limit;
    var PageSize = inittable_before.limit;
    var columns = {
      offset: offset,
      limit: limit,
      recordtime: inittable_before.recordtime,
      location: inittable_before.location,
    };
    this.http.callRPC(this.TABLE, this.METHOD, columns).subscribe((result) => {
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
        this.RecordOperation("搜索温湿度数据统计", 1, JSON.stringify(columns));
      } else {
        var data = tabledata["message"];
        this.querydanger(JSON.stringify(data));
        this.RecordOperation("搜索温湿度数据统计", 0, JSON.stringify(columns));
      }
    });
  }

  // 导出按钮
  download(title) {
    this.agGrid.download(title);
  }

  refresh_table() {
    // 取消选择的数据 delselect
    this.myinput.del_input_value();
    this.mydateselect.reset_month(); // 时间段

    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.update_agGrid();
    this.loading = false;
    this.refresh = false;

    // this.department.dropselect();
    // this.device_tpye.dropselect();
  }
  // 初始化前确保 搜索条件
  inittable_before() {
    var deviceid =
      this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称

    // 日期范围下拉
    var daterange_data =
      this.mydateselect?.getselect() === undefined
        ? 3
        : this.mydateselect?.getselect();

    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      location: deviceid,
      recordtime: daterange_data,
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
      recordtime: inittable_before.recordtime,
      location: inittable_before.location,
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

        this.RecordOperation("查看温湿度数据统计", 1, JSON.stringify(columns));
      } else {
        this.RecordOperation("查看温湿度数据统计", 0, JSON.stringify(columns));
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
      PageSize = event.PageSize ? Number(event.PageSize) : 10;
    } else {
      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset,
      limit: limit,
      recordtime: inittable_before.recordtime,
      location: inittable_before.location,
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

        this.RecordOperation("更新温湿度数据统计", 1, JSON.stringify(columns));
      } else {
        this.RecordOperation("更新温湿度数据统计", 0, JSON.stringify(columns));
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
