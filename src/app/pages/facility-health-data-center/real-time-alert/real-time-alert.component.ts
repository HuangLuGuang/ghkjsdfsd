import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { EditDelTooltipComponent } from "../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";
import { AlertLevelComponent } from "../components/alert-level/alert-level.component";
import { TableDevicenameComponent } from "../components/table-devicename/table-devicename.component";
import { TableGroupComponent } from "../components/table-group/table-group.component";
import { AlertMessageComponent } from "./alert-message/alert-message.component";

@Component({
  selector: "ngx-real-time-alert",
  templateUrl: "./real-time-alert.component.html",
  styleUrls: ["./real-time-alert.component.scss"],
})
export class RealTimeAlertComponent implements OnInit {
  @ViewChild("healthdataechart") healthdataechart: any; // 数据echart！

  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") myinput: any; // 资产编号输入框
  @ViewChild("eimdevicetpye") eimdevicetpye: any; // 设备类型下拉框
  @ViewChild("groups") groups_func: any; // 设备类型下拉框
  @ViewChild("data_range") data_range: any; // 日期选择器

  eimdevicetpye_placeholder = "请选择设备类型"; // 下拉框---设备类型

  myinput_placeholder = "请输入设备名称"; // input---设备名称

  groups_placeholder = "请选中科室/功能组"; // 下拉框---科室功能组

  default_groups = []; // 这是默认的goups

  constructor(
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private http: HttpserviceService,
    private dialogService: NbDialogService,
    private datepip: DatePipe
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    // 下拉框
    this.get_tree_selecetdata();
  }

  loading = false; // 加载
  refresh = false; // 刷新tabel
  button; // 权限button
  // =================================================agGrid

  TABLE = "device_log";
  METHOD = "public.get_log_pc_search";
  employeeid = this.userinfo.getEmployeeID();
  init_value = "2019-12-01 - 2020-12-21"; // 默认日期

  tableDatas = {
    style: "width: 100%; height: 695px",
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
        minWidth: 50,
        resizable: true,
        cellRendererFramework: TableDevicenameComponent,
        sortable: true,
      },

      {
        field: "group",
        headerName: "科室/用户组",
        resizable: true,
        minWidth: 10,
        cellRendererFramework: TableGroupComponent,
        sortable: true,
      },
      {
        field: "location",
        headerName: "设备位置",
        resizable: true,
        minWidth: 10,
        sortable: true,
      }, // 自定义设备编号！
      // { field: 'message', headerName: '报警内容', resizable: true, minWidth: 10},
      {
        field: "message",
        headerName: "报警内容",
        resizable: true,
        width: 800,
        cellRendererFramework: AlertMessageComponent,
        sortable: true,
      },
      {
        field: "recordtime",
        headerName: "报警时间",
        resizable: true,
        sortable: true,
      },
      {
        field: "pushhandle",
        headerName: "是否推送处理",
        resizable: true,
        sortable: true,
      },
      {
        field: "pushtime",
        headerName: "推送时间",
        resizable: true,
        sortable: true,
      },
      {
        field: "deviceid",
        headerName: "设备ID",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "level",
        headerName: "报警等级",
        resizable: true,
        minWidth: 10,
        sortable: true,
        cellRendererFramework: AlertLevelComponent,
        cellStyle: function (params) {
          var level = params.value;
          switch (level) {
            case 3:
              return {
                border: "rgb(255,0,0) 1px solid",
                background: "rgb(255,0,0)",
              };
            case 2:
              return {
                border: "rgb(255,166,0) 1px solid",
                background: "rgb(255,166,0)",
              };

            case 1:
              return {
                border: "rgb(60,179,113) 1px solid",
                background: "rgb(60,179,113)",
              };
            default:
              return {
                // border: 'rgb(203, 238, 164) 1px solid',
                // background: 'rgb(203, 238, 164)',
              };
          }
        },
      },
      // { field: 'devicestatus', headerName: '状态', resizable: true, minWidth: 10},
      {
        field: "belonged",
        headerName: "负责人",
        resizable: true,
        width: 100,
        sortable: true,
      },
    ],
    rowData: [
      // data
    ],
  };

  private gridData = [];
  ngOnInit(): void {
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  ngAfterViewInit() {
    // 初始化table
    setTimeout(() => {
      this.loading = true;
    }, 200);
    setTimeout(() => {
      // 初始化aggrid
      this.inttable();
    }, 1000);
    this.loading = false;
  }

  // 重置、刷新
  refresh_table() {
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择的数据 delselect
    this.myinput?.del_input_value();
    this.groups_func?.dropselect();
    this.eimdevicetpye?.dropselect();

    this.inttable();
    this.loading = false;
    this.refresh = false;
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
        this.download("设备报警");
        break;
    }
  }

  // 得到下拉框的数据
  get_tree_selecetdata() {
    var columns = {
      employeeid: this.userinfo.getEmployeeID(),
    };
    this.http
      .callRPC("deveice", "dev_get_device_groups", columns)
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        // console.log("得到下拉框的数据---------------->", res)
        if (res["code"] === 1) {
          var groups = res["message"][0]["groups"];
          // 默认的科室功能组
          groups.forEach((group) => {
            this.default_groups.push(group["label"]);
          });

          this.groups_func.init_select_tree(groups);

          var eimdevicetpyedata = res["message"][0]["type"];
          this.eimdevicetpye.init_select_trees(eimdevicetpyedata);
        }
      });
  }

  // input 传入的值
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      // console.log("传入的值设备名称----->",inpuvalue);
      this.query(inpuvalue);
    }
  }

  // 搜索按钮
  query(inpuvalue?) {
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    var devicename;
    if (inpuvalue) {
      devicename = inpuvalue;
    } else {
      devicename = this.myinput?.getinput(); // 设备名称
    }
    // 科室/功能组
    var groups_data = this.groups_func.getselect();
    // 设备类型
    var device_tpye_data = this.eimdevicetpye.getselect();

    // 日期范围
    var daterange_data = this.data_range.getselect();
    // 将科室/功能组，转为列表
    var groups_data_ =
      groups_data === "" ? this.default_groups : groups_data.split(";");

    if (
      devicename == "" &&
      device_tpye_data.length < 1 &&
      groups_data_.length < 1 &&
      daterange_data.length < 1
    ) {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: { title: "提示", content: `请选择要搜索的数据！` },
        })
        .onClose.subscribe((name) => {
          // console.log("----name-----", name);
        });
    } else {
      var columns = {
        offset: 0,
        limit: this.agGrid.get_pagesize(),
        employeeid: this.userinfo.getEmployeeID(),
        devicename: [devicename],
        group: groups_data_,
        start: daterange_data[0],
        end: daterange_data[1],
        eimdevicetype: device_tpye_data,
      };
      var table = this.TABLE;
      var method = this.METHOD;
      this.http.callRPC(table, method, columns).subscribe((result) => {
        // console.log("-----------实时报表table---", result);
        var tabledata = result["result"]["message"][0];
        if (tabledata["code"] === 1) {
          this.loading = false;
          var message = tabledata["message"];
          this.gridData = [];
          this.tableDatas.PageSize = columns.limit;
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = tabledata["numbers"]
            ? tabledata["numbers"][0]["numbers"]
            : "未得到总条数";
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation("搜索", 1, "设备实时报警");
          // 更新Echart
          this.healthdataechart.init_health(this.gridData);

          // 刷新table后，改为原来的！
          this.tableDatas.isno_refresh_page_size = false;
        } else {
          this.RecordOperation("搜索", 0, "设备实时报警");
        }
      });
    }
  }

  // 导出文件
  download(title) {
    this.agGrid.download(title);
  }

  // =================================================agGrid
  // 初始化前确保 搜索条件
  inittable_before() {
    var devicename = this.myinput?.getinput(); // 设备名称
    // 科室/功能组
    var groups_data = this.groups_func.getselect();
    // 设备类型
    var device_tpye_data = this.eimdevicetpye.getselect();
    // 日期范围
    var daterange_data = this.data_range.getselect();
    // 将科室/功能组，转为列表
    var groups_data_ =
      groups_data === "" ? this.default_groups : groups_data.split(";");

    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      devicename: [devicename],
      group: groups_data_,
      start: daterange_data[0],
      end: daterange_data[1],
      eimdevicetype: device_tpye_data,
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
      PageSize = event.PageSize ? Number(event.PageSize) : 15;
    } else {
      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      start: inittable_before.start,
      end: inittable_before.end,
      offset: offset,
      limit: limit,
      devicename: inittable_before.devicename,
      group: inittable_before.group,
      eimdevicetype: [],
      employeeid: inittable_before.employeeid,
    };
    var table = this.TABLE;
    var method = this.METHOD;
    this.http.callRPC(table, method, columns).subscribe((result) => {
      // console.log("-----------实时报表table---", result);
      var tabledata = result["result"]["message"][0];
      if (tabledata["code"] === 1) {
        this.loading = false;
        var message = tabledata["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata["numbers"]
          ? tabledata["numbers"][0]["numbers"]
          : "未得到总条数";
        // console.log("totalpagenumbers>>>>>>>>>>>>>>>>",totalpagenumbers)
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation("查看", 1, "设备实时报警");

        // 更新Echart
        this.healthdataechart.init_health(this.gridData);
      } else {
        this.RecordOperation("查看", 0, "设备实时报警");
      }
    });
  }

  // 更新table
  update_agGrid(event?) {
    var start_end = this.get_start_end();
    // console.error("++++++++++++++++++start_end+++++++++++++++", start_end);
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    var offset;
    var limit;
    var PageSize;
    if (event != undefined) {
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize ? Number(event.PageSize) : 15;
    } else {
      offset = 0;
      limit = 15;
      PageSize = 15;
    }
    var columns = {
      start: this.init_value.split(" - ")[0],
      end: this.init_value.split(" - ")[1],
      offset: offset,
      limit: limit,
      devicename: [],
      group: this.default_groups,
      eimdevicetype: [],
      employeeid: this.employeeid,
    };
    var table = this.TABLE;
    var method = this.METHOD;

    this.http.callRPC(table, method, columns).subscribe((result) => {
      // console.log("-----------实时报表table---", result);
      var tabledata = result["result"]["message"][0];
      this.loading = false;
      if (tabledata["code"] === 1) {
        var message = tabledata["message"];
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
        this.RecordOperation("更新", 1, "设备实时报警");
        // 更新Echart
        this.healthdataechart.init_health(this.gridData);
      } else {
        this.RecordOperation("更新", 0, "设备实时报警");
      }
    });
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event) {
    // console.log("-------event",event)
    this.gridData = [];
    this.loading = true;
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

  // 得到 日期范围： 本月1号-到现在
  get_start_end() {
    var curr_date = new Date();
    var curr_year = curr_date.getFullYear();
    var curr_month = curr_date.getMonth() + 1;

    var start = this.datepip.transform(
      new Date(curr_year, curr_month - 1, 1),
      "yyyy-MM-dd"
    ); // start
    var end = this.datepip.transform(
      new Date(curr_year, curr_month, 0),
      "yyyy-MM-dd"
    ); // end
    return {
      start: start,
      end: end,
    };
  }
}
