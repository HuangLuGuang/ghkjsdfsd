import { Component, OnInit, ViewChild } from "@angular/core";
import { DatePipe } from "@angular/common";
import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { ActionComponent } from "../action/action.component";
import { TableGroupComponent } from "../../components/table-group/table-group.component";
@Component({
  selector: "ngx-group-data-sum",
  templateUrl: "./group-data-sum.component.html",
  styleUrls: ["./group-data-sum.component.scss"],
})
export class GroupDataSumComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any; // table
  @ViewChild("myYear") myYear: any; // 年
  @ViewChild("myMonth") myMonth: any; // 月
  @ViewChild("groups") groups_func: any; // 科室/功能组

  loading: boolean = false;
  button; // 权限button
  refresh = false; // 刷新tabel

  // 用户id
  employeeid = this.userinfo.getEmployeeID();
  groups_placeholder = "请选择科室/功能组"; // 科室/功能组

  TABLE = "device";
  METHOD = "dev_get_device_ratio_group";

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定左侧
      {
        field: "groups",
        headerName: "科室/功能组",
        resizable: true,
        fullWidth: true,
        width: 330,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        cellRendererFramework: TableGroupComponent,
        sortable: true,
      },
      {
        field: "totaltime",
        headerName: "总目标时长(h)",
        resizable: true,
        fullWidth: true,
        width: 130,
        sortable: true,
      },
      // { field: 'devicetype', headerName: '设备统计归类', resizable: true, fullWidth: true,width: 100, sortable: true},

      {
        field: "month",
        headerName: "月份",
        resizable: true,
        fullWidth: true,
        width: 100,
        sortable: true,
      },
      {
        field: "placeon",
        headerName: "占位时长(h)",
        resizable: true,
        fullWidth: true,
        width: 130,
        sortable: true,
      },
      {
        field: "stop",
        headerName: "空闲时长(h)",
        resizable: true,
        fullWidth: true,
        width: 130,
        sortable: true,
      },
      {
        field: "warning",
        headerName: "维修时长(h)",
        resizable: true,
        fullWidth: true,
        width: 130,
        sortable: true,
      },
      {
        field: "running",
        headerName: "运行时长(h)",
        resizable: true,
        fullWidth: true,
        width: 130,
        sortable: true,
      },
      {
        field: "performancerate",
        headerName: "性能类设备开动率(%)",
        resizable: true,
        fullWidth: true,
        width: 170,
        sortable: true,
      },
      {
        field: "performanceratio",
        headerName: "性能类设备利用率(%)",
        resizable: true,
        fullWidth: true,
        width: 170,
        sortable: true,
      },
      {
        field: "durablerate",
        headerName: "耐久类设备开动率(%)",
        resizable: true,
        fullWidth: true,
        width: 170,
        sortable: true,
      },
      {
        field: "durableratio",
        headerName: "耐久类设备利用率(%)",
        resizable: true,
        fullWidth: true,
        width: 170,
        sortable: true,
      },
      {
        field: "starttime",
        headerName: "开始时间",
        resizable: true,
        fullWidth: true,
        width: 130,
        sortable: true,
      },
      {
        field: "endtime",
        headerName: "结束时间",
        resizable: true,
        fullWidth: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "option",
        headerName: "详情",
        resizable: true,
        fullWidth: true,
        width: 100,
        pinned: "right",
        cellRendererFramework: ActionComponent,
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
    private datepip: DatePipe,
    private publicservice: PublicmethodService,
    private http: HttpserviceService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    // 选择框
    this.get_tree_selecetdata();
  }

  ngOnInit(): void {
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
    });

    // 得到pathname --在得到button
    // this.button = JSON.parse(localStorage.getItem('buttons_list'));
  }

  ngAfterViewInit() {
    // 初始化aggrid
    this.inttable();
  }

  // 得到下拉框的数据，科室/功能组
  get_tree_selecetdata() {
    var columns = {
      employeeid: this.employeeid,
    };
    // dev_get_device_type dev_get_device_groups
    this.http
      .callRPC("deveice", "dev_get_device_type", columns)
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        if (res["code"] === 1) {
          var groups = res["message"][0]["groups"];
          this.groups_func.init_select_tree(groups);

          // 月份
          var month = [
            { id: 1, label: "一月" },
            { id: 2, label: "二月" },
            { id: 3, label: "三月" },
            { id: 4, label: "四月" },
            { id: 5, label: "五月" },
            { id: 6, label: "六月" },
            { id: 7, label: "七月" },
            { id: 8, label: "八月" },
            { id: 9, label: "九月" },
            { id: 10, label: "十月" },
            { id: 11, label: "十一月" },
            { id: 12, label: "十二月" },
          ];
          this.myMonth.init_select_tree(month);
        }
      });
  }

  // button按钮
  action(actionmethod) {
    var method = actionmethod.split(":")[1];
    // console.log("--------------->method", method)
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

  // year、month
  inpuvalue(inpuvalue) {
    this.query(inpuvalue);
  }

  // 搜索
  query(inpuvalue?) {
    this.gridData = [];
    this.inttable();
  }

  // 导出
  download() {
    this.agGrid.download("功能组数据汇总");
  }

  // 重置
  refresh_table() {
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    // 取消选择的数据 delselect
    this.myYear.reset_year();
    this.myMonth.reset_month();
    this.groups_func.dropselect();
    this.inttable();
  }

  // aggrid==================================
  // 得到 start end 根据month(一月\二月)
  get_start_end() {
    var month = this.myMonth.getselect();
    var year = this.myYear.getselect();
    var month_value = {
      "01": 1,
      "02": 2,
      "03": 3,
      "04": 4,
      "05": 5,
      "06": 6,
      "07": 7,
      "08": 8,
      "09": 9,
      "10": 10,
      "11": 11,
      "12": 12,
    };
    month = month_value[month];
    year = Number(year.split("年")[0]);
    var start = this.datepip.transform(
      new Date(year, month - 1, 1),
      "yyyy-MM-dd"
    ); // start
    var end = this.datepip.transform(new Date(year, month, 0), "yyyy-MM-dd"); // end
    // var current = new Date()
    // var start = this.datepip.transform(new Date(current.getFullYear(), current.getMonth(), 1),  'yyyy-MM-dd'); // 当前start
    // var end = this.datepip.transform(new Date(current.getFullYear(), current.getMonth() + 1, 0), 'yyyy-MM-dd');   // end
    return {
      start: start,
      end: end,
    };
  }

  inittable_before() {
    var get_start_end = this.get_start_end();
    // 科室/功能组
    var groups_data = this.groups_func?.getselect();
    var groups_data_ = groups_data === "" ? [] : groups_data.split(";");
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      month: this.myMonth.getselect(),
      year: this.myYear.getselect(),
      start: get_start_end.start,
      end: get_start_end.end,
      group: groups_data_ ? groups_data_ : [],
    };
  }

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
    var colmun = {
      offset: offset,
      limit: limit,
      employeeid: this.employeeid,
      month: this.myMonth.getselect(),
      year: this.myYear.getselect(),
      start: inittable_before.start,
      end: inittable_before.end,
      group: inittable_before.group,
    };
    var table = this.TABLE;
    var methond = this.METHOD;
    // console.log("-----------colmun---", colmun)
    this.http.callRPC(table, methond, colmun).subscribe((res) => {
      // console.log("-----------man-kpi-table---", res)
      var get_employee_limit = res["result"]["message"][0];
      this.loading = false;
      if (get_employee_limit["code"] === 1) {
        // 发布组件，编辑用户的组件
        var message = res["result"]["message"][0]["message"];
        this.tableDatas.PageSize = PageSize;
        this.add_detail_kpi(message);
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = get_employee_limit["numbers"]
          ? get_employee_limit["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation("查看", 1, "功能组数据汇总");
      } else {
        this.RecordOperation("查看", 0, "功能组数据汇总");
      }
    });
  }

  // 添加详情link
  add_detail_kpi(datas: any[]) {
    var option = "/pages/tongji/group_data_sum/kpidetail?name=group";
    datas.forEach((data) => {
      data["option"] = option;
    });
    // 需要将 startime、endtime
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event) {
    // console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  clickrow(event) {}

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
