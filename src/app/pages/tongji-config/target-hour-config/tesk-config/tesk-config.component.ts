import { Component, OnInit, ViewChild } from "@angular/core";
import { AddComponent } from "../../../../pages-popups/tongji/test_task_conf/add/add.component";

import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { HttpserviceService } from "../../../../services/http/httpservice.service";

declare let layui;

declare let $;

// 要渲染的组件
// import { TaskProgressForAggridComponent } from './task-progress-for-aggrid/task-progress-for-aggrid.component';
import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { NbDialogService } from "@nebular/theme";
import { EditDelTooltipComponent } from "../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { ActionComponent } from "./action/action.component";
import { DatePipe } from "@angular/common";
import { EditComponent } from "../../../../pages-popups/tongji/test_task_conf/edit/edit.component";
import { TableDevicenameComponent } from "../../../tongji/components/table-devicename/table-devicename.component";
import { TimeScheduleComponent } from "./time-schedule/time-schedule.component";

@Component({
  selector: "ngx-tesk-config",
  templateUrl: "./tesk-config.component.html",
  styleUrls: ["./tesk-config.component.scss"],
})
export class TeskConfigComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("group") group: any; // 功能/科室
  @ViewChild("myYear") myYear: any; // 年
  @ViewChild("myMonth") myMonth: any; // 月
  @ViewChild("myinput2") myinput2: any; // 试验任务子单号

  @ViewChild("timeline") timeline: any; //  时间轴

  // 导出文件名
  filename;

  // 发送给日期
  test_task_manage = {
    divice_kpi_report: false,
    test_task_manage: true,
    man_hourkpi: false,
  };

  // 日期范围
  date_ranges = "device_kpi_date_range";

  // 得到table method
  GETTABLE = "dev_get_device_taskinfo_search_new";

  eimdevicetpye_placeholder = "请选择设备类型"; // eim 设备类型
  groups_placeholder = "请选择科室/功能组"; // 科室/功能组
  myinput_placeholder2 = "请输入任务编号"; // input 任务编号
  button; // 权限button
  refresh = false; // 刷新tabel
  loading: boolean = false;
  init_value = "2019-12-01 - 2020-12-21"; // 默认日期

  active; // aggrid 操作

  taskstatus; // aggrid 试验装填排序

  constructor(
    private publicservice: PublicmethodService,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private dialogService: NbDialogService,
    private datepip: DatePipe
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    // 选择框
    this.get_tree_selecetdata();
  }

  // 抽屉
  visible = false;

  open(data): void {
    this.visible = true;
    var table = "device";
    var method = "get_task_historylog";
    var colums = {
      taskchildnum: data["taskchildnum"],
    };
    this.http.callRPC(table, method, colums).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.timeline.inint_timeline(res["message"]);
        this.RecordOperation(
          "查看",
          1,
          "试验任务配置历史详情:" + JSON.stringify(colums)
        );
      } else {
        this.RecordOperation(
          "查看",
          0,
          "试验任务配置历史详情:" + JSON.stringify(colums)
        );
      }
    });
  }

  close(): void {
    this.visible = false;
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
          if (data.action === "edit") {
            that.edit(data.data);
          } else {
            that.open(data.data);
          }
          // that.change_target_hour([data]);
        },
      },
    };

    // 添加试验状态 自定义排序
    this.taskstatus = {
      field: "taskstatus",
      headerName: "试验状态",
      resizable: true,
      width: 120,
      sortable: true,
      comparator: that.taskstatusComparator,
      sort: "asc",
      sortIndex: 0, // 0 表示正序，1表示倒序
    };

    // 初始化日期
    this.initdate();

    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    var dom = document.createElement("div");
    dom.className = "cdk-overlay-container";
    document.getElementsByTagName("nb-layout")[0].appendChild(dom);
  }

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.active);
    this.tableDatas.columnDefs[6] = this.taskstatus;

    // 初始化agGrid
    this.inttable();

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  // 初始化日期范围
  initdate() {
    var date_ranges = this.date_ranges;
    layui.use("laydate", function () {
      var laydate = layui.laydate;
      //日期范围
      laydate.render({
        elem: "#test_task_manage",
        range: true,
        // ,trigger: 'click'//呼出事件改成click
        done: function (value, date, endDate) {
          localStorage.setItem(date_ranges, JSON.stringify(value));
          // console.log(value); //得到日期生成的值，如：2017-08-18
          // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
          // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        },
      });
    });
  }

  // 得到日期
  getselect() {
    var date_range = localStorage.getItem(this.date_ranges)
      ? localStorage.getItem(this.date_ranges)
      : false;
    if (date_range) {
      var date = JSON.parse(date_range).split(" - ");
      // console.log("date--->", date)
      var date_list = date;
      localStorage.removeItem(this.date_ranges);
      return date_list;
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
      // case 'import':
      //   this.importfile();
      //   break;
      case "download":
        this.download("试验任务管理");
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
        // console.log("得到下拉框的数据", res)
        if (res["code"] === 1) {
          var groups = res["message"][0]["groups"];
          this.group.init_select_tree(groups);
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

  // input 传入的值 设备名称
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      var data = { devicename: inpuvalue };
      this.query(data);
    }
  }
  // input 传入的值 试验任务子单号
  inpuvalue2(inpuvalue2) {
    if (inpuvalue2 != "") {
      var data = { taskchildnum: inpuvalue2 };
      this.query(data);
    }
  }
  // 年、月
  inpuvalue3(inpuvalue2) {
    this.query();
  }

  // 新增试验任务
  add() {
    this.dialogService
      .open(AddComponent, { closeOnBackdropClick: false, context: {} })
      .onClose.subscribe((res) => {
        if (res) {
          // 标识 插入数据
          // 刷新tabel
          this.refresh_table();
        }
      });
  }

  // 编辑试验任务
  edit(data?) {
    var rowdata;
    if (data) {
      rowdata = [data];
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    if (rowdata.length === 1) {
      this.dialogService
        .open(EditComponent, {
          closeOnBackdropClick: false,
          context: { rowdata: rowdata[0] },
        })
        .onClose.subscribe((res) => {
          if (res) {
            // 标识 插入数据
            // 刷新tabel
            this.refresh_table();
          }
        });
    } else {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          autoFocus: true,
          context: { title: "提示", content: `请选择一行数据！` },
        })
        .onClose.subscribe((istrue) => {});
    }
  }

  // 删除试验任务
  del() {
    var rowdata = this.agGrid.getselectedrows();
    if (rowdata.length < 1) {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          autoFocus: true,
          context: { title: "提示", content: `请选择一行数据！` },
        })
        .onClose.subscribe((istrue) => {});
    } else {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          autoFocus: true,
          context: {
            title: "提示",
            content: `是否确认删除？`,
            rowData: JSON.stringify(rowdata),
          },
        })
        .onClose.subscribe((istrue) => {
          if (istrue) {
            var monthed = "dev_delete_task";
            var columns = rowdata;
            var taskchildnum = [];
            columns.forEach((element) => {
              taskchildnum.push(element["taskchildnum"]);
            });
            this.http
              .callRPC("device", monthed, columns)
              .subscribe((result) => {
                var res = result["result"]["message"][0];
                if (res["code"] === 1) {
                  // 刷新tabel
                  this.refresh_table();
                  this.delsuccess();
                  this.RecordOperation(
                    "删除",
                    1,
                    "taskchildnum:" + JSON.stringify(taskchildnum)
                  );
                } else {
                  var data = JSON.stringify(res["message"]);
                  this.deldanger(data);
                  this.RecordOperation(
                    "删除",
                    0,
                    "taskchildnum:" + JSON.stringify(taskchildnum)
                  );
                }
              });
          }
        });
    }
  }

  // 搜索按钮
  query(inpuvalue?) {
    var inittable_before = this.inittable_before();
    // 任务子单号
    var taskchildnum;
    if (inpuvalue && inpuvalue["taskchildnum"]) {
      taskchildnum = [inpuvalue["taskchildnum"]];
    } else {
      taskchildnum = [this.myinput2?.getinput()]; // 任务子单号
    }
    // 科室/功能组
    var groups_data = this.group.getselect();
    // 将科室/功能组，转为列表
    var groups_data_ = groups_data === "" ? [] : groups_data.split(";");
    // 搜索的 时间范围 daterange 必选，修改为 start end
    // console.log("**************\n") EditDelTooltipComponent

    // if(groups_data_.length < 1 ){
    //   this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `请选择要搜索的数据！`}} ).onClose.subscribe(
    //     name=>{
    //       // console.log("----name-----", name);
    //     }
    //   );
    // }else {

    // }
    var columns = {
      offset: 0,
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      group: groups_data_,
      taskchildnum: taskchildnum,
      start: inittable_before.start,
      end: inittable_before.end,
      month: inittable_before.month,
      year: inittable_before.year,
    };
    // console.log("**************\n", columns);
    // 执行搜索函数！GETTABLE  dev_get_kpi_device_search
    this.loading = true;
    this.http.callRPC("device", this.GETTABLE, columns).subscribe((result) => {
      var tabledata = result["result"]["message"][0];
      this.loading = false;
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
        this.RecordOperation("搜索", 1, "设备报表");
        if (message.length < 1) {
          this.searchdanger();
        }
      } else {
        this.RecordOperation("搜索", 0, "设备报表");
      }
    });
  }

  // 导出文件
  download(title) {
    this.agGrid.download(title);
  }

  // 刷新tabel
  refresh_table() {
    // 是否 每页多少也，设置为默认值
    // 取消选择的数据 delselect
    this.myinput2.del_input_value(); // 任务子单号
    this.group.dropselect();

    this.myYear.reset_year();
    this.myMonth.reset_month();

    // this.inttable();
    this.tableDatas.isno_refresh_page_size = true;
    this.gridData = [];
    this.loading = true;
    this.update_agGrid();
    this.loading = false;
  }

  // 得到buttons----------------------------------------------------------
  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    CellRender: {
      task_progress: "TaskProgressForAggridComponent",
    }, // 这是单元格要渲染的 组件！
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度, pinned: 'left'
      {
        field: "taskchildnum",
        headerName: "试验编号",
        resizable: true,
        width: 210,
        sortable: true,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
      },
      {
        field: "tasknum",
        headerName: "试验任务编号",
        width: 160,
        resizable: true,
        sortable: true,
      },
      {
        field: "devicetaskname",
        headerName: "试验名称",
        resizable: true,
        width: 170,
        sortable: true,
      }, // 试验名称
      {
        field: "exemplarname",
        headerName: "样件名称",
        resizable: true,
        width: 100,
        sortable: true,
      },
      {
        field: "devicename",
        headerName: "设备名称",
        resizable: true,
        width: 200,
        cellRendererFramework: TableDevicenameComponent,
        sortable: true,
      },

      {
        field: "deviceno",
        headerName: "设备编号",
        resizable: true,
        width: 130,
        sortable: true,
      },
      {
        field: "taskstatus",
        headerName: "试验状态",
        resizable: true,
        width: 100,
        sortable: true,
      },
      {
        field: "rate",
        headerName: "试验进度",
        resizable: true,
        cellRendererFramework: TimeScheduleComponent,
        minWidth: 10,
        sortable: true,
      }, //
      {
        field: "createdon",
        headerName: "试验创建时间",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "taskstart",
        headerName: "实际开始时间",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "expectedtime",
        headerName: "试验预计时长(天)",
        resizable: true,
        width: 150,
        sortable: true,
      },
      {
        field: "devicetasknownumbers",
        headerName: "当前轮次/总轮次",
        resizable: true,
        minWidth: 10,
        sortable: true,
      }, // ==============计算得来 当前轮次/总轮次   devicetasknownumbers/devicetasknumbers
      {
        field: "lastupdateon",
        headerName: "状态变更时间",
        resizable: true,
        minWidth: 10,
        sortable: true,
      }, // 更新时间
    ],
    rowData: [
      // data
    ],
  };

  private gridData = [];

  // 试验状态 自定义排序
  taskstatusComparator(taskstatus1, taskstatus2) {
    // 正序： 未启动、进行中、暂停中、已完成、已经取消
    var taskstatusDic = {
      未启动: 0,
      进行中: 1,
      暂停中: 2,
      已完成: 3,
      已取消: 4,
    };
    var taskstatus1Number = taskstatusDic[taskstatus1];
    var taskstatus2Number = taskstatusDic[taskstatus2];
    // console.error("+++++taskstatus1Number,taskstatus2Number++++++",taskstatus1Number,taskstatus2Number)
    if (taskstatus1Number === null && taskstatus2Number === null) {
      return 0;
    } else if (taskstatus1Number === null) {
      return -1;
    } else if (taskstatus2Number === null) {
      return 1;
    }
    if (taskstatus2Number === null) {
      return 1;
    }
    return taskstatus1Number - taskstatus2Number;
  }

  // 得到 start end 根据month(一月\二月)
  get_start_end() {
    var month = this.myMonth.getselect();
    var year = this.myYear.getselect();
    var month_value = {
      一月: 1,
      二月: 2,
      三月: 3,
      四月: 4,
      五月: 5,
      六月: 6,
      七月: 7,
      八月: 8,
      九月: 9,
      十月: 10,
      十一月: 11,
      十二月: 12,
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

  // 初始化前确保 搜索条件
  inittable_before() {
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

    var get_start_end = this.get_start_end();
    var taskchildnum =
      this.myinput2?.getinput() === undefined ? "" : this.myinput2?.getinput(); // 任务子单号
    // 科室/功能组
    var groups_data = this.group?.getselect();
    // 设备类型
    // 日期范围
    // 将科室/功能组，转为列表
    var groups_data_ = groups_data === "" ? [] : groups_data.split(";");
    var month = month_value[this.myMonth.getselect()]; // 选择的月

    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      taskchildnum: [taskchildnum],
      group: groups_data_,
      month: month,
      // month: this.myMonth.getselect(),
      // year: this.myYear.getselect(),
      year: this.myYear.getselect().split("年")[0],
      start: get_start_end.start,
      end: get_start_end.end,
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
      month: inittable_before.month,
      year: inittable_before.year,
      offset: offset,
      limit: limit,
      employeeid: inittable_before.employeeid,
      group: inittable_before.group,
      taskchildnum: inittable_before.taskchildnum,
      start: inittable_before.start,
      end: inittable_before.end,
    };
    // 得到设备信息！
    this.http.callRPC("device", this.GETTABLE, colmun).subscribe((res) => {
      var result = res["result"]["message"][0];
      if (result["code"] === 1) {
        this.loading = false;
        var message = result["message"];
        this.gridData = [];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = result["numbers"]
          ? result["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation("查看", 1, "试验任务管理");
      } else {
        this.RecordOperation("查看", 0, "试验任务管理");
      }
    });
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
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var colmun = {
      month: inittable_before.month,
      year: inittable_before.year,
      offset: offset,
      limit: limit,
      employeeid: inittable_before.employeeid,
      group: inittable_before.group,
      taskchildnum: inittable_before.taskchildnum,
      start: inittable_before.start,
      end: inittable_before.end,
    };
    // 得到员工信息！

    this.http.callRPC("deveice", this.GETTABLE, colmun).subscribe((res) => {
      var result = res["result"]["message"][0];
      if (result["code"] === 1) {
        // 发布组件，编辑用户的组件
        var message = result["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = result["numbers"]
          ? result["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation("更新", 1, "试验任务管理");
      } else {
        this.RecordOperation("更新", 0, "试验任务管理");
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
  // =================================================agGrid
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

  searchdanger() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "没有搜索到数据！",
    });
  }
  // 删除
  danger() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "请选择一行数据！",
    });
  }

  // 删除
  delsuccess() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "删除成功!",
    });
  }
  deldanger(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "删除失败" + data,
    });
  }
}
