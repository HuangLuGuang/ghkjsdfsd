import { Component, OnInit, ViewChild } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

import { TargetHourConfigComponent as ChangeTargetHourConfigComponent } from "../../../../pages-popups/tongji/target-hour-config/target-hour-config.component";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { EditDelTooltipComponent } from "../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { ActionComponent } from "./action/action.component";
// import { TableGroupComponent } from '../../components/table-group/table-group.component';
// import { TableDevicenameComponent } from '../../components/table-devicename/table-devicename.component';
import { TableGroupComponent } from "../../../tongji/components/table-group/table-group.component";
import { TableDevicenameComponent } from "../../../tongji/components/table-devicename/table-devicename.component";

@Component({
  selector: "ngx-hour-config",
  templateUrl: "./hour-config.component.html",
  styleUrls: ["./hour-config.component.scss"],
})
export class HourConfigComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") myinput: any; // 设备名称
  @ViewChild("eimdevicetpye") eimdevicetpye: any; // 设备类型
  @ViewChild("groups") groups_func: any; // 功能组
  @ViewChild("myYear") myYear: any; // 年
  @ViewChild("myMonth") myMonth: any; // 月
  // @ViewChild("myMonth") myMonth:any; // 月

  TABLE = "device";
  METHOD = "dev_get_target_time_search";

  loading: boolean = false;
  button; // 权限button
  refresh = false; // 刷新tabel

  eimdevicetpye_placeholder = "请选择设备统计归类"; // 设备统计归类
  groups_placeholder = "请选择功能组";
  myinput_placeholder = "请输入设备名称";

  month_placeholder = "选择月份";

  // 用户id
  employeeid = this.userinfo.getEmployeeID();

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定左侧
      {
        field: "month",
        headerName: "月份",
        fullWidth: true,
        resizable: true,
        width: 150,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        sortable: true,
      },
      {
        field: "devicename",
        headerName: "设备名称",
        width: 200,
        resizable: true,
        cellRendererFramework: TableDevicenameComponent,
        sortable: true,
      },
      {
        field: "deviceno",
        headerName: "设备编号",
        width: 150,
        resizable: true,
        sortable: true,
      },
      {
        field: "group",
        headerName: "科室/功能组",
        resizable: true,
        width: 330,
        cellRendererFramework: TableGroupComponent,
        sortable: true,
      },
      {
        field: "targettime",
        headerName: "每日目标时长(h)",
        resizable: true,
        width: 140,
        sortable: true,
      },
      {
        field: "numberdaily",
        headerName: "计数天数(d)",
        resizable: true,
        width: 130,
        sortable: true,
      },
      {
        field: "totaltime",
        headerName: "总目标时长(h)",
        resizable: true,
        width: 130,
        sortable: true,
      },
      {
        field: "lastupdateon",
        headerName: "更新时间",
        resizable: true,
        width: 180,
        sortable: true,
      },
      {
        field: "lastupdatedby",
        headerName: "更新人",
        resizable: true,
        minWidth: 10,
        fullWidth: true,
        sortable: true,
      },
    ],
    rowData: [
      // data
    ],
  };

  private gridData = [];

  active; // aggrid 操作

  constructor(
    private userinfo: UserInfoService,
    private http: HttpserviceService,
    private dialogService: NbDialogService,
    private publicservice: PublicmethodService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");

    // 选择框
    this.get_tree_selecetdata();
  }

  ngOnInit(): void {
    // 添加操作列
    var that = this;
    this.active = {
      field: "option",
      headerName: "操作",
      resizable: true,
      fullWidth: true,
      width: 100,
      pinned: "right",
      cellRendererFramework: ActionComponent,
      cellRendererParams: {
        clicked: function (data: any) {
          // console.log("--添加操作列---",data)
          that.change_target_hour([data]);
        },
      },
    };

    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      // console.log("得到pathname --在得到button\t\t", result)
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });

    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    if (document.getElementsByClassName("cdk-overlay-container").length < 1) {
      var dom = document.createElement("div");
      dom.className = "cdk-overlay-container";
      document.getElementsByTagName("nb-layout")[0].appendChild(dom);
    }
  }

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.active);

    // 初始化aggrid
    this.inttable();
  }

  ngOnDestroy() {}

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
      case "edit":
        this.change_target_hour();
        break;
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

  // input 传入的值
  inpuvalue(inpuvalue) {
    // if (inpuvalue != "") {
    //   console.log("传入的值设备名称----->", inpuvalue);
    //   this.query(inpuvalue);
    // }
    console.log("传入的值设备名称----->", inpuvalue);
    this.query(inpuvalue);
  }

  // 搜索
  query(inpuvalue?) {
    var month_value = {
      一月: "01",
      二月: "02",
      三月: "03",
      四月: "04",
      五月: "05",
      六月: "06",
      七月: "07",
      八月: "08",
      九月: "09",
      十月: "10",
      十一月: "11",
      十二月: "12",
    };

    var devicename =
      this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称
    var year = this.myYear.getselect().split("年")[0]; // 选择的年
    var month = month_value[this.myMonth.getselect()]; // 选择的月
    var groups_data = this.groups_func.getselect(); // 科室功能组
    var group = groups_data === "" ? [] : groups_data.split(";"); // 科室功能组转为列表
    var type = this.eimdevicetpye.getselect(); // 设备类型

    var columns = {
      offset: 0,
      limit: this.agGrid.get_pagesize(),
      employeeid: this.employeeid,
      devicename: [devicename],
      month: month,
      year: year,
      group: group,
      type: type,
    };
    var table = this.TABLE;
    var method = this.METHOD;
    this.http.callRPC(table, method, columns).subscribe((result) => {
      var tabledata = result["result"]["message"][0];
      this.loading = false;
      var info = JSON.stringify(columns);
      if (tabledata["code"] === 1) {
        var message = tabledata["message"];
        this.gridData = [];
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata["numbers"]
          ? tabledata["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        this.RecordOperation("搜索", 1, "目标工时:" + info);
      } else {
        this.RecordOperation("搜索", 0, "目标工时: " + info);
      }
    });

    console.log("year, month, group, type:", year, month, group, type);
  }

  // 导出
  download() {
    this.agGrid.download("目标工时报表");
  }

  inittable_before() {
    var groups_data = this.groups_func.getselect(); // 科室功能组
    var group = groups_data === "" ? [] : groups_data.split(";"); // 科室功能组转为列表

    var devicename =
      this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称
    var month_value = {
      一月: "01",
      二月: "02",
      三月: "03",
      四月: "04",
      五月: "05",
      六月: "06",
      七月: "07",
      八月: "08",
      九月: "09",
      十月: "10",
      十一月: "11",
      十二月: "12",
    };

    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      month: month_value[this.myMonth.getselect()],
      year: this.myYear.getselect().split("年")[0],
      devicename: [devicename], // 设备名称
      group: group, // 科室功能组
      type: this.eimdevicetpye.getselect(), // 设备类型
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
      month: inittable_before.month,
      year: inittable_before.year,
      group: inittable_before.group,
      type: inittable_before.type,
      devicename: inittable_before.devicename,
    };
    var table = this.TABLE;
    var methond = this.METHOD;
    this.http.callRPC(table, methond, colmun).subscribe((res) => {
      var get_employee_limit = res["result"]["message"][0];
      this.loading = false;
      if (get_employee_limit["code"] === 1) {
        // 发布组件，编辑用户的组件
        var message = res["result"]["message"][0]["message"];
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
        this.RecordOperation("查看", 1, "目标工时");
      } else {
        //  模拟
        this.RecordOperation("查看", 0, "目标工时");
      }
    });
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
    // console.log("---------------->",data)
  }

  // 得到设备类型
  get_tree_selecetdata() {
    var columns = {
      employeeid: this.employeeid,
    };
    this.http
      .callRPC("deveice", "dev_get_device_type", columns)
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        // console.log("得到下拉框的数据---------------->", res)
        if (res["code"] === 1) {
          var eimdevicetpyedata = res["message"][0]["type"];
          this.eimdevicetpye.init_select_trees(eimdevicetpyedata);

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

  // 修改目标工时
  change_target_hour(datalist?) {
    // 得到选择的数据！
    var getselectedrows = this.agGrid.getselectedrows();
    // console.log("得到选择的数据>>>", getselectedrows);
    // console.log("datalist>>>", datalist);
    if (datalist !== undefined) {
      getselectedrows = datalist;
    }
    if (getselectedrows.length < 1) {
      // 必须要有数据！
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: { title: "提示", content: `请选择要修改的数据！` },
        })
        .onClose.subscribe((result) => {});
    } else {
      // 得到月份！
      var get_month = this.myMonth.getselect();
      // 得到年份
      var get_year = this.myYear
        .getselect()
        .slice(0, this.myYear.getselect().length - 1);
      // console.log("得到月份：", get_month, "得到年份:", get_year);

      // 传递的数据，1、month，2、设备唯一标识符！
      this.dialogService
        .open(ChangeTargetHourConfigComponent, {
          closeOnBackdropClick: false,
          context: {
            data: { month: get_month, year: get_year },
            deveiceids: getselectedrows,
          },
        })
        .onClose.subscribe((result) => {
          if (result) {
            // 修改成功--刷新table
            this.loading = true;
            this.gridData = [];
            // 是否 每页多少也，设置为默认值
            this.tableDatas.isno_refresh_page_size = true;
            this.inttable();
          }
        });
    }
  }

  // 刷新table
  refresh_table() {
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择
    this.myinput.del_input_value();
    this.myYear.reset_year();
    this.myMonth.reset_month();
    this.groups_func.dropselect();
    this.eimdevicetpye.dropselect();

    this.inttable();
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
