import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { TableDevicenameComponent } from "../../components/table-devicename/table-devicename.component";

import { TableGroupComponent } from "../../components/table-group/table-group.component";
import { AndonstatusComponent } from "./andonstatus/andonstatus.component";

@Component({
  selector: "ngx-device-hour-detail",
  templateUrl: "./device-hour-detail.component.html",
  styleUrls: ["./device-hour-detail.component.scss"],
})
export class DeviceHourDetailComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("groups") groups_func: any; // 科室、功能组
  @ViewChild("eimdevicetpye") eimdevicetpye: any; // 设备类型
  @ViewChild("status") status: any; // 状态指标
  @ViewChild("datarange") datarange: any; // 日期
  @ViewChild("myinput") myinput: any; // 设备

  loading: boolean = false;
  button; // 权限button
  refresh = false; // 刷新tabel
  // 用户id
  employeeid = this.userinfo.getEmployeeID();

  groups_placeholder = "请选择科室/功能组"; // 科室/功能组
  eimdevicetpye_placeholder = "请选择设备统计归类"; // 设备统计归类
  status_placeholder = "状态指标"; // 设备统计归类
  myinput_placeholder = "请输入设备"; // 设备名称

  statusdata = [
    { id: "running", label: "运行" },
    { id: "stop", label: "空闲" },
    { id: "warning", label: "维修" },
    { id: "placeon", label: "占位" },
  ];

  default_groups = []; // 这是默认的goups

  tableDatas = {
    style: "width: 100%; height: 645px",
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定左侧
      // {
      //   field: "deviceno",
      //   headerName: "设备编号",
      //   resizable: true,
      //   sortable: true,
      //   minWidth: 10,
      //   width: 150,
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
      //   autoHeight: true,
      //   fullWidth: true,
      // },
      // {
      //   field: "devicename",
      //   headerName: "设备名称",
      //   fullWidth: true,
      //   resizable: true,
      //   width: 200,
      //   cellRendererFramework: TableGroupComponent,
      //   sortable: true,
      // },
      // {
      //   field: "deviceid",
      //   headerName: "设备ID",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 200,
      //   sortable: true,
      // },
      // {
      //   field: "groups",
      //   headerName: "科室/功能组",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 330,
      //   cellRendererFramework: TableGroupComponent,
      //   sortable: true,
      // },
      // {
      //   field: "devicetype",
      //   headerName: "设备统计归类",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 130,
      //   sortable: true,
      // }, //设备类型
      // {
      //   field: "linklevel",
      //   headerName: "设备关重度",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 130,
      //   sortable: true,
      // },
      // {
      //   field: "totaltime",
      //   headerName: "统计总时长(h)",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 130,
      //   sortable: true,
      // },
      // {
      //   field: "runtime",
      //   headerName: "0625(h)",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 140,
      //   sortable: true,
      // },
      // {
      //   field: "running",
      //   headerName: "0626h)",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 130,
      //   sortable: true,
      // },
      // {
      //   field: "stop",
      //   headerName: "0627(h)",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 130,
      //   sortable: true,
      // },
      // {
      //   field: "warning",
      //   headerName: "0628(h)",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 130,
      //   sortable: true,
      // },
      // {
      //   field: "placeon",
      //   headerName: "0629(h)",
      //   resizable: true,
      //   fullWidth: true,
      //   width: 130,
      //   sortable: true,
      // },
    ],
    rowData: [
      // data
    ],
  };

  private gridData = [];

  columns = [
    {
      field: "deviceno",
      headerName: "设备编号",
      resizable: true,
      sortable: true,
      minWidth: 10,
      width: 150,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      autoHeight: true,
      fullWidth: true,
    },
    {
      field: "devicename",
      headerName: "设备名称",
      fullWidth: true,
      resizable: true,
      width: 200,
      cellRendererFramework: TableDevicenameComponent,
      sortable: true,
    },
    {
      field: "deviceid",
      headerName: "设备ID",
      resizable: true,
      fullWidth: true,
      width: 200,
      sortable: true,
    },
    {
      field: "groups",
      headerName: "科室/功能组",
      resizable: true,
      fullWidth: true,
      width: 330,
      cellRendererFramework: TableGroupComponent,
      sortable: true,
    },
    {
      field: "devicetype",
      headerName: "设备统计归类",
      resizable: true,
      fullWidth: true,
      width: 130,
      sortable: true,
    }, //设备类型
    {
      field: "linklevel",
      headerName: "设备关重度",
      resizable: true,
      fullWidth: true,
      width: 130,
      sortable: true,
    },
    // 状态指标
    {
      field: "andonstatus",
      headerName: "状态指标",
      resizable: true,
      fullWidth: true,
      width: 130,
      sortable: true,
      cellRendererFramework: AndonstatusComponent,
    },
    {
      field: "totaltime",
      headerName: "统计总时长(h)",
      resizable: true,
      fullWidth: true,
      width: 130,
      sortable: true,
    },
  ];

  constructor(
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private http: HttpserviceService,
    private datapipe: DatePipe
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");

    this.tableDatas.columnDefs.push(...this.columns);
  }

  ngOnInit(): void {
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
    });
    // // 选择框
    this.get_tree_selecetdata().subscribe((res) => {
      if (res) {
        this.querytitle = "";
        this.inttable();
      }
    });
  }

  ngAfterViewInit() {}

  // 得到下拉框的数据
  get_tree_selecetdata() {
    return new Observable((Observable) => {
      var columns = {
        employeeid: this.employeeid,
      };
      this.http
        .callRPC("deveice", "dev_get_device_type", columns)
        .subscribe((result) => {
          var res = result["result"]["message"][0];
          if (res["code"] === 1) {
            var groups = res["message"][0]["groups"];
            // 默认的科室功能组
            groups.forEach((group) => {
              this.default_groups.push(group["label"]);
            });
            this.groups_func.init_select_tree(groups);
            var eimdevicetpyedata = res["message"][0]["type"];
            this.eimdevicetpye.init_select_trees(eimdevicetpyedata);

            // 状态指标
            this.status.init_select_tree(this.statusdata);
            Observable.next(true);
          } else {
            Observable.next(false);
          }
        });
    });
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
      //   this.importfile();
      //   break;
      case "download":
        // this.download('工时KPI报表')
        this.download();
        break;
    }
  }

  // input设备 时间范围 状态指标
  inpuvalue(data) {
    if (data != "") {
      this.query();
    }
  }

  querytitle = "";
  query() {
    var inittable_before = this.inittable_before();
    this.creat_col_with_daterange(inittable_before);

    this.querytitle = "搜索";
    this.gridData = [];
    this.loading = true;
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
  }

  // 根据日期范围动态生成的列
  creat_col_with_daterange(inittable_before) {
    // 最初的列
    this.tableDatas.columnDefs = [];
    this.tableDatas.columnDefs.push(...this.columns);

    // 更新 表中的列！
    var date = inittable_before.date;
    var start = date[0];
    var end = date[1];
    var differ = (Date.parse(end) - Date.parse(start)) / (24 * 3600 * 1000);
    for (let index = 0; index < differ; index++) {
      var field = this.datapipe.transform(
        new Date(start).getTime() + 86400000 * index,
        "MM-dd"
      );
      var date_differ = this.datapipe.transform(
        new Date(start).getTime() + 86400000 * index,
        "MM-dd"
      );
      // console.error("间隔的日期 field, date_differ>>>", field, date_differ);
      var column: columnDefsType = {
        field: field,
        headerName: date_differ + "(h)",
        resizable: true,
        sortable: true,
        minWidth: 10,
      };
      this.tableDatas.columnDefs.push(column);
    }
    this.agGrid.updatecolumn(this.tableDatas.columnDefs);
  }

  // 导出
  download() {
    this.agGrid.download("设备工时明细");
  }

  // 刷新table----
  refresh_table() {
    this.querytitle = "";
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.groups_func.dropselect();
    this.eimdevicetpye.dropselect();
    this.myinput.del_input_value();
    this.status.delselect2();
    this.datarange.reset_mydate();
    this.inttable();
  }

  // 初始化前确保 搜索条件
  inittable_before() {
    // 科室/功能组
    var groups_data = this.groups_func?.getselect();
    // 将科室/功能组，转为列表
    var groups_data_ =
      groups_data === "" ? this.default_groups : groups_data.split(";");
    // 设备类型
    var device_tpye_data = this.eimdevicetpye?.getselect();
    // 状态指标
    var status_data = this.status?.getselect();
    var status_id = "";
    this.statusdata.forEach((item) => {
      if (item["label"] === status_data) {
        status_id = item["id"];
      }
    });
    // 日期
    var datarangedata = this.datarange?.getselect();
    // 设备
    var device =
      this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput();

    var result = {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      group: groups_data_,
      type: device_tpye_data,
      andonstatus: status_id,
      date: datarangedata,
      starttime: datarangedata[0],
      endtime: datarangedata[1],
      searchstr: device,
    };

    return result;
  }

  messages = [
    {
      deviceno: "110000260",
      devicename: "新能源汽车电机测试系统",
      deviceid: "device_andmotor_01",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "A",
      calvalue:
        "2021-05-15 00:15:00;0,2021-05-16 00:15:00;0,2021-05-17 00:15:00;0,2021-05-18 00:15:00;0,2021-05-19 00:15:00;0,2021-05-20 00:15:00;0",
      "05-15": "0",
      "05-16": "0",
      "05-17": "0",
      "05-18": "0",
      "05-19": "0",
      "05-20": "0",
    },
    {
      deviceno: "110001478",
      devicename: "整车电路电源系统数采系统1",
      deviceid: "CRFX-401-ET-1",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "B",
      calvalue: null,
    },
    {
      deviceno: "110001479",
      devicename: "整车电路电源系统数采系统2",
      deviceid: "CRFX-401-ET-2",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "B",
      calvalue: null,
    },
    {
      deviceno: "110001480",
      devicename: "整车电路电源系统数采系统4",
      deviceid: "CRFX-401-ET-4",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "B",
      calvalue: null,
    },
    {
      deviceno: "110001481",
      devicename: "整车电路电源系统数采系统3",
      deviceid: "CRFX-401-ET-3",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "B",
      calvalue: null,
    },
    {
      deviceno: "110001484",
      devicename: "电机系统测试台架#3",
      deviceid: "device_avlmotor_04",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "A",
      calvalue:
        "2021-05-15 00:15:00;0,2021-05-16 00:15:00;0,2021-05-17 00:15:00;0,2021-05-18 00:15:00;0,2021-05-19 00:15:00;0,2021-05-20 00:15:00;0",
      "05-15": "0",
      "05-16": "0",
      "05-17": "0",
      "05-18": "0",
      "05-19": "0",
      "05-20": "0",
    },
    {
      deviceno: "110003019",
      devicename: "电机可靠耐久试验台#4",
      deviceid: "device_boyang_02",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "A",
      calvalue:
        "2021-05-15 00:15:00;0,2021-05-16 00:15:00;0,2021-05-17 00:15:00;0,2021-05-18 00:15:00;0,2021-05-20 00:15:00;0,2021-05-19 00:15:00;24",
      "05-15": "0",
      "05-16": "0",
      "05-17": "0",
      "05-18": "0",
      "05-20": "0",
      "05-19": "24",
    },
    {
      deviceno: "110003020",
      devicename: "电机可靠耐久试验台#5",
      deviceid: "device_boyang_01",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "A",
      calvalue:
        "2021-05-15 00:15:00;24,2021-05-16 00:15:00;24,2021-05-17 00:15:00;24,2021-05-18 00:15:00;24,2021-05-19 00:15:00;24,2021-05-20 00:15:00;24",
      "05-15": "24",
      "05-16": "24",
      "05-17": "24",
      "05-18": "24",
      "05-19": "24",
      "05-20": "24",
    },
    {
      deviceno: "110003112",
      devicename: "电机高速性能台架#8",
      deviceid: "device_avlmotor_03",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "A",
      calvalue:
        "2021-05-15 00:15:00;0,2021-05-16 00:15:00;0,2021-05-17 00:15:00;0,2021-05-18 00:15:00;0,2021-05-19 00:15:00;0,2021-05-20 00:15:00;0",
      "05-15": "0",
      "05-16": "0",
      "05-17": "0",
      "05-18": "0",
      "05-19": "0",
      "05-20": "0",
    },
    {
      deviceno: "110003113",
      devicename: "电机高速性能台架#7",
      deviceid: "device_avlmotor_02",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "A",
      calvalue:
        "2021-05-15 00:15:00;0,2021-05-16 00:15:00;0,2021-05-17 00:15:00;0,2021-05-18 00:15:00;0,2021-05-19 00:15:00;0,2021-05-20 00:15:00;0",
      "05-15": "0",
      "05-16": "0",
      "05-17": "0",
      "05-18": "0",
      "05-19": "0",
      "05-20": "0",
    },
    {
      deviceno: "110003114",
      devicename: "电机高速性能台架#6",
      deviceid: "device_avlmotor_01",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      devicetype: 1,
      linklevel: "A",
      calvalue:
        "2021-05-15 00:15:00;0,2021-05-16 00:15:00;0,2021-05-17 00:15:00;0,2021-05-18 00:15:00;0,2021-05-19 00:15:00;0,2021-05-20 00:15:00;0",
      "05-15": "0",
      "05-16": "0",
      "05-17": "0",
      "05-18": "0",
      "05-19": "0",
      "05-20": "0",
    },

    {
      deviceid: "device_avlmotor_02",
      devicename: "电机高速性能台架#7",
      deviceno: "110003113",
      devicetype: "性能",
      endtime: "2021-07-31",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      linklevel: "A",
      month: "07",
      placeon: 0,
      rate: 100,
      ratio: 81.82,
      running: 144,
      runtime: 14.87,
      starttime: "2021-07-01",
      stop: 0,
      totaltime: 176,
      warning: 0,
    },
    {
      deviceid: "device_avlmotor_03",
      devicename: "电机高速性能台架#8",
      deviceno: "110003112",
      devicetype: "性能",
      endtime: "2021-07-31",
      groups: "验证中心-系统试验部-新能源与电子电气试验室",
      linklevel: "A",
      month: "07",
      placeon: 0,
      rate: 100,
      ratio: 81.82,
      running: 144,
      runtime: 0,
      starttime: "2021-07-01",
      stop: 0,
      totaltime: 176,
      warning: 0,
    },
  ];

  inttable(event?) {
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
    var colmun = {
      offset: offset,
      limit: limit,
      employeeid: this.employeeid,
      searchstr: inittable_before.searchstr,
      group: inittable_before.group,
      type: inittable_before.type,
      starttime: inittable_before.starttime,
      endtime: inittable_before.endtime,
      andonstatus: inittable_before.andonstatus,
    };

    this.http
      // .callRPC("device", "dev_get_device_ratio", colmun)
      .callRPC("device", "andon_status_detail", colmun)
      .subscribe((res) => {
        // console.error("设备工时明细------------table---", res);
        // 更新列
        this.creat_col_with_daterange(inittable_before);
        var get_employee_limit = res["result"]["message"][0];
        this.loading = false;
        if (get_employee_limit["code"] === 1) {
          // 发布组件，编辑用户的组件
          // var message = this.messages;
          var message = get_employee_limit["message"];
          this.tableDatas.PageSize = PageSize;
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = get_employee_limit["numbers"]
            ? get_employee_limit["numbers"][0]["numbers"]
            : "未得到总条数";
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
          // 刷新table后，改为原来的！
          this.tableDatas.isno_refresh_page_size = false;
          if (this.querytitle !== "") {
            this.RecordOperation(
              "搜索 ",
              1,
              "设备工时明细:" + JSON.stringify(colmun)
            );
          } else {
            this.RecordOperation("查看 ", 1, "设备工时明细");
          }
        } else {
          this.warning();
          if (this.querytitle !== "") {
            this.RecordOperation("搜索 ", 0, JSON.stringify(colmun));
          } else {
            this.RecordOperation("查看 ", 0, "设备工时明细");
          }
        }
      });
    // this.RecordOperation("查看", 0, "设备工时明细");
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event) {
    // console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  // 点击行数据 子组件调用
  clickrow(data) {
    // localStorage.setItem("man_kpi_for_detail", JSON.stringify(data))
  }

  warning() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "warning",
      conent: "没有得到数据！",
    });
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
