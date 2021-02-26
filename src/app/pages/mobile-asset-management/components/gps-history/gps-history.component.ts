import { Component, OnInit, ViewChild } from "@angular/core";

import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

@Component({
  selector: "ngx-gps-history",
  templateUrl: "./gps-history.component.html",
  styleUrls: ["./gps-history.component.scss"],
})
export class GpsHistoryComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  constructor(
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private http: HttpserviceService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  loading = true; // 加载
  refresh = false; // 刷新tabel
  // agGrid
  tableDatas = {
    // 新增，设置高度
    // style: "width: 100%; height: 443px",
    style: "width: 100%; height: 890px",

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
        minWidth: 30,
        sortable: true,
      },
      {
        field: "devicename",
        headerName: "设备名称",
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
        field: "address",
        headerName: "详细地址",
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
    ],
    rowData: [
      // data
    ],
  };
  private gridData = [];

  TABLE = "gps_monitoring";
  METHDO = "dev_get_gps_monitoring_device";

  deviceid = "";

  ngOnInit(): void {}

  ngAfterViewInit() {
    // 初始化table
    // setTimeout(() => {
    // }, 200);
    // this.inttable();
  }
  // 初始化前确保 搜索条件
  inittable_before() {
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      deviceid: this.deviceid,
    };
  }

  // 初始化历史
  init_history(deviceid) {
    this.deviceid = deviceid;
    setTimeout(() => {
      this.inttable();
    }, 100);
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
      deviceid: inittable_before.deviceid,
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
      } else {
        this.RecordOperation("查看定位监控", 0, JSON.stringify(columns));
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
      limit = 10;
      PageSize = 10;
    }
    var columns = {
      offset: offset,
      limit: limit,
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
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    this.loading = false;
    this.refresh = false;
    // 取消选择的数据 delselect
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event) {
    // console.log("页码改变的回调", event);
    // this.loading = true;
    this.gridData = [];
    this.inttable(event);
    this.loading = false;
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
