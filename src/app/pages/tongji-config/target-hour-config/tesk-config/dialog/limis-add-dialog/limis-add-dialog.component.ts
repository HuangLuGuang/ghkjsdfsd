import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { LocalDataSource } from "@mykeels/ng2-smart-table";
import { NbDialogRef, NbDialogService } from "@nebular/theme";
import { Observable } from "rxjs";
import { HttpserviceService } from "../../../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../../../services/user-info/user-info.service";
import { dateformat } from "../../../../../equipment-board/equipment-board";
import { DelComponent } from "../table-temp/del/del.component";
import { AComponent } from "./a/a.component";
import { hisSetting } from "./limis-add";

@Component({
  selector: "ngx-limis-add-dialog",
  templateUrl: "./limis-add-dialog.component.html",
  styleUrls: ["./limis-add-dialog.component.scss"],
})
export class LimisAddDialogComponent implements OnInit, AfterViewInit {
  @ViewChild("gridtable") gridtable: any;
  @ViewChild("dialog") dialogTemp: any;
  visible = false;
  // table配置及数据
  tableDatas: any = {
    style: "width: 100%; height: 75vh",
    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      {
        field: "wtorderno",
        headerName: "试验委托单号",
        resizable: true,
        sortable: true,
        lockPinned: true,
        // filter: 'agTextColumnFilter',
        // suppressMenu: true,
        // floatingFilterComponent: 'customNumberFloatingFilter',
        // floatingFilterComponentParams: {
        //   suppressFilterButton: true,
        //   color: 'red',
        // },
        width: 230,
        cellRendererFramework: AComponent,
        cellRendererParams: {
          clicked: (data: any) => {
            this.clickrow(data);
          },
        },
      },
      {
        field: "applicant",
        headerName: "申请人",
        resizable: true,
        width: 150,
        sortable: true,
        lockPinned: true,
      },
      {
        field: "groups",
        headerName: "所属部门",
        resizable: true,
        width: 330,
        sortable: true,
        lockPinned: true,
      },
      {
        field: "executor",
        headerName: "执行人",
        resizable: true,
        width: 150,
        sortable: true,
        lockPinned: true,
      },
      {
        field: "application_time_format",
        headerName: "申请日期",
        resizable: true,
        width: 230,
        sortable: true,
        lockPinned: true,
      },
      {
        field: "cartype",
        headerName: "车型",
        resizable: true,
        width: 140,
        sortable: true,
        lockPinned: true,
      },
      {
        field: "startTimeFormat",
        headerName: "需求开始日期",
        resizable: true,
        width: 200,
        sortable: true,
        lockPinned: true,
      },
      {
        field: "endTimeFormat",
        headerName: "需求结束日期",
        resizable: true,
        width: 200,
        sortable: true,
        lockPinned: true,
      },
    ],
    rowData: [],
  };
  rowData = [];

  setting = {
    mode: "inline",
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: false,
      perPage: 0,
    },
    columns: {
      no: {
        title: "试验编号",
        filter: false,
      },
      entry: {
        title: "试验名称",
        filter: false,
      },
      executor: {
        title: "执行人",
        filter: false,
      },
      l_no: {
        title: "样件编号",
        filter: false,
        valuePrepareFunction: (value) => {
          return value ? value.map((m) => m.key).join(",") : "";
        },
      },
      l_name: {
        title: "样件名称",
        filter: false,
        valuePrepareFunction: (value) => {
          return value ? value.map((m) => m.value).join(",") : "";
        },
      },
      e_context: {
        title: "设备信息",
        filter: false,
        valuePrepareFunction: (value) => {
          return value ? value.devicename : "";
        },
      },
      createTime: {
        title: "创建时间",
        filter: false,
        valuePrepareFunction: (value) => {
          return dateformat(new Date(Date.parse(value)), "yyyy年MM月dd日hh时");
        },
        sort: true,
        sortDirection: "desc",
      },
      ol: {
        title: "操作",
        filter: false,
        type: "custom",
        renderComponent: DelComponent,
        onComponentInitFunction: (instance) => {
          instance.del.subscribe((f) => {
            // SELECT lims_delete_sy_task('{"taskchildnum":"SY0893-202105-003"}');
            this.dialogService
              .open(this.dialogTemp, { context: `是否删除${f.row.no}?` })
              .onClose.subscribe((g) => {
                if (g == 1) {
                  this.http
                    .callRPC("lims_delete_sy_task", "lims_delete_sy_task", {
                      taskchildnum: f.row.no,
                    })
                    .subscribe((f: any) => {
                      this.get_drawer_table_data().subscribe(() => {});
                    });
                }
              });
          });
        },
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  hisSetting = hisSetting;
  hisSource: LocalDataSource = new LocalDataSource();

  current: any = {
    wtorderno: "",
    entry: "",
    executor: "",
    groups: "", //实验室,
    l_name: "",
    l_no: "",
    e_context: "",
  };

  searchstr = ""; //
  dialog_button = "notstart";

  entry_listOfOption = [
    // '试验001','试验002','试验003'
  ];
  l_listOfOption = [
    // {
    //   key:'VP-0000-0001',
    //   value:'样件01',
    // },
    // {
    //   key:'VP-0000-0002',
    //   value:'样件02',
    // },
    // {
    //   key:'VP-0000-0003',
    //   value:'样件03',
    // }
  ];

  groups_listOfOption = [];
  e_context_listOfOption = [];

  m = 0;
  loading_dialog = false;
  loading_drawer = false;

  employeeid = this.user.getEmployeeID();
  pageIndexJson = {
    limit: 15,
    offset: 0,
    wtorderno: "",
  };
  task_route = "now"; //抽屉内表格的显示
  constructor(
    private dialogRef: NbDialogRef<LimisAddDialogComponent>,
    private http: HttpserviceService,
    private user: UserInfoService,
    private publicmethod: PublicmethodService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.get_dialog_data("init");
  }

  ngAfterViewInit(): void {}

  /**
   * 弹窗数据查询
   * @param s init 初始化
   * @param pagejson
   */
  get_dialog_data(
    s?: string,
    pagejson: any = {
      limit: 15,
      offset: 0,
      searchstr: "",
    }
  ) {
    let params: any = {
      employeeid: this.employeeid,
      taskstatus: this.dialog_button,
      ...pagejson,
    };
    if(s !='init'){
      params.limit =  (this.gridtable.current ) * this.gridtable.setPageCount;
      params.offset =   (this.gridtable.current - 1) * this.gridtable.setPageCount;
    }
    this.loading_dialog = true;
    this.http
      .callRPC("lims_get_wt_order", "lims_get_wt_order", params)
      .subscribe((f: any) => {
        console.log(f);
        if (!f || f.result.message[0].code == 0) return;
        this.tableDatas.rowData = f.result.message[0].message.map((m) => ({
          wtorderno: m.wtorderno,
          applicant: m.applicant,
          application_time_format: dateformat(
            new Date(m.applicanton),
            "yyyy年MM月dd日"
          ),
          applicanton: m.applicanton,
          groups: m.groups,
          cartype: m.cartype,
          executor: m.executor, //执行人

          taskstarton: m.taskstarton,
          startTimeFormat: dateformat(
            new Date(m.taskstarton),
            "yyyy年MM月dd日"
          ),

          endTimeFormat: dateformat(new Date(m.taskendon), "yyyy年MM月dd日"),
          taskendon: m.taskendon,
          count: m.count,
        }));
        // this.tableDatas.rowData = this.rowData;
        this.tableDatas.totalPageNumbers =
          f.result.message[0].numbers[0].numbers;
          this.gridtable.init_agGrid(this.tableDatas); // 刷新组件

        // if (s == "init") {
          // this.gridtable.init_agGrid(this.tableDatas); // 刷新组件
        // } else {
          // this.gridtable.update_agGrid(this.tableDatas); // 刷新组件
        // }
        this.loading_dialog = false;
      });
  }

  /**
   * 获取抽屉内数据
   * @param wtorderno
   */
  get_drawer_data(wtorderno: string) {
    this.loading_dialog = true;

    this.http
      .callRPC("lims_get_wt_order_info", "lims_get_wt_order_info", {
        wtorderno: wtorderno,
      })
      .subscribe((f: any) => {
        console.log("抽屉内数据---->", f);
        if (!f || f.result.message[0].code == 0) return;
        let res = f.result.message[0].message;
        this.current.executor = res.executors; // 执行人
        this.entry_listOfOption = res.syordernames; //试验条目编辑号
        this.l_listOfOption = res.yps;
        this.loading_dialog = false;

        // executors
        // syordernames
        // wtorderno
        // yps
      });
  }

  /**
   * 抽屉 查询表格数据
   * @returns 返回 试验编号
   */
  get_drawer_table_data() {
    return new Observable((s) => {
      let id: any = 0;
      this.http
        .callRPC("lims_get_sy_task", "lims_get_sy_task", {
          tasknum: this.current.wtorderno,
        })
        .subscribe((f: any) => {
          console.log(f);
          let res = f.result.message[0].message;
          let items = [];
          if (res) {
            res.forEach((el) => {
              //             createdon: "2021-04-09 13:02:58"
              // deviceid: "device_weiss_01"
              // devicename: "device_weiss_01"
              // devicetaskname: "整车VOC测试(高温)"
              // executor: "zxx"
              // taskchildnum: "SY0004-202104-444"
              // tasknum: "WT0004-202104"
              // ypid: "YP0004-202104"
              // ypname: "yj555"
              let item = {
                no: el.taskchildnum,
                entry: el.devicetaskname,
                executor: el.executor,
                l_no: el.ypid
                  ? el.ypid.split(",").map((m) => ({ key: m, value: "" }))
                  : [], // [{key:'',value:''}]
                l_name: el.ypname
                  ? el.ypname.split(",").map((m) => ({ key: "", value: m }))
                  : [],
                e_context: {
                  devicename: el.devicename || "",
                  deviceid: el.deviceid || "",
                },
                createTime: el.createdon,
              };
              items.push(item);
              const arr = item.no.split("-");
              if (arr.length == 3) {
                let n_id = parseInt(arr[2]);
                if (n_id > id) {
                  id = n_id;
                }
              }
            });
            this.source.load(items);
          }
          id++;
          id = id.toString();
          if (id.length == 2) {
            id = "0" + id;
          } else if (id.length == 1) {
            id = "00" + id;
          }
          s.next(id);
        });
    });
  }

  /**
   * 抽屉 新增插入
   */
  insert_drawer_table_data() {
    // SELECT lims_get_sy_task('{"tasknum":"WT0893-202105"}');
    let res = this.current;
    let item = {
      tasknum: res.wtorderno,
      taskchildnum: this.current.no,
      devicetaskname: res.entry ? res.entry.join(",") : "",
      deviceid: res?.e_context?.deviceno,
      devicename: res?.e_context?.devicename,
      executor: Array.isArray(res.executor)
        ? res.executor.join(",")
        : res.executor,
      ypid: res.l_no ? res.l_no.map((m) => m.key).join(",") : "",
      ypname: res.l_name ? res.l_name.map((m) => m.value).join(",") : "",
      group: res.groups,
    };
    //     "tasknum":"WT0893-202105",//任务编号
    // "taskchildnum":"SY0893-202105-002",//实验编号
    // "devicetaskname":"悬架舒适性试验11",//试验名称
    // "deviceid":"device_tc220_01",//设备id
    // "executor":"张彦荣"//执行人
    // ,"ypid":"YP0025-202104-001",//样品id 多个逗号隔开
    // "yaname":"老款的开发建设A"//样品名称
    // group :''//
    this.http
      .callRPC("lims_insert_sy_task", "lims_insert_sy_task", item)
      .subscribe((f: any) => {
        console.log(f);
        this.RecordOperation("新增试验任务", 1, JSON.stringify(item));
        this.get_drawer_table_data().subscribe(() => {
          this.loading_dialog = false;
        });
      });
  }

  /**
   * 获取设备下拉
   */
  get_equipment_data() {
    // groups: "验证中心-系统试验部-整车环保与理化试验室"
    this.http
      .callRPC("get_lims_groups", "get_lims_groups", {
        groups: this.current.groups,
      })
      .subscribe((f: any) => {
        // console.log(f)
        let res = f.result.message[0].message;
        this.e_context_listOfOption = res;
      });
  }
  /**
   * 弹窗表页签改变
   * @param e
   */
  nzpageindexchange_ag(e) {
    this.pageIndexJson = e;
    e.searchstr = this.searchstr;
    // e.wtorderno = '004';
    console.log(e)
    this.get_dialog_data("update", e);
  }

  /**
   *
   * @param e
   */
  click_dialog(e) {
    let json: any = this.pageIndexJson;
    this.dialog_button = e;
    json.searchstr = this.searchstr;
    this.get_dialog_data("update", json);
  }

  //刷新
  refresh() {
    let e: any = this.pageIndexJson;
    e.searchstr = this.searchstr;
    this.get_dialog_data("update", e);
  }

  /**
   * 关闭弹窗
   * @param code 默认为0
   */
  close_dialog(code = 0) {
    this.dialogRef.close({ code: code });
  }

  /**
   * from表单添加到下方表格
   */
  add() {
    if (!this.current.entry) {
      // 试验条目名称
      this.dialogService
        .open(this.dialogTemp, { context: `试验条目名称为必录项!` })
        .onClose.subscribe((g) => {});
      return;
    }
    this.loading_dialog = true;  
    this.get_drawer_table_data().subscribe((id) => {
      console.log(id);
      let wtorderno:string[]  = this.current.wtorderno.split('WT');
      this.current.no = (wtorderno && wtorderno.length>1 ?'SY'+wtorderno[1]:this.current.wtorderno)  + '-' + id;
      this.insert_drawer_table_data();
      // this.source.prepend(JSON.parse(JSON.stringify(this.current)));
      this.current = {
        wtorderno: this.current.wtorderno,
        executor: this.current.executor,
        l_name: [],
        l_no: [],
      };
      this.get_dialog_data();
      // this.get_drawer_table_data().subscribe(id=>{
      //   this.loading_dialog = false;
      // });
    });
  }

  /**
   * 打开抽屉
   */
  open(): void {
    this.visible = true;
  }

  /**
   * 关闭抽屉
   */
  close(): void {
    this.visible = false;
    this.source.load([]);
    // TODO
    this.get_dialog_data();
  }

  /**
   * 提交 抽屉
   */
  save_drawer() {
    this.loading_drawer = true;
    setTimeout(() => {
      this.loading_drawer = false;
      this.close();
    }, 1000);
  }

  /**
   * ngx-ag-table 点击表格事件
   * @param data
   */
  clickrow(data) {
    if (data.active == "edit") {
      if (this.visible == false) {
        this.open();
      }
      this.current = {
        groups: data.data[0].groups,
        wtorderno: data.data[0].wtorderno,
      };
      this.current.no = this.getNo();
      this.groups_listOfOption = [this.current.groups];
      this.m = 0;
      this.get_drawer_data(this.current.wtorderno);
      this.get_equipment_data();
      this.get_drawer_table_data().subscribe((f) => {});
    }
    console.log(data);
  }

  /**
   * ngx-ag-table 根据实验委托单号 表格过滤
   */
  no_change() {
    let e = this.searchstr;
    console.log(e);
    this.refresh();
    // this.tableDatas.rowData = this.rowData.filter(f => e? new RegExp(e, "gi").test(f.wtorderno):true);
    // this.tableDatas.totalPageNumbers = this.rowData.length;
    // this.gridtable.update_agGrid(this.tableDatas); // 刷新组件
  }

  /**
   * 抽屉 当前状态改变
   * @param s
   */
  task_click(s) {
    this.task_route = s;
  }

  /**
   * 样品下拉改变
   * @param e
   * @param k 区分选择的输入框
   */
  l_change(e, k) {
    console.log(e);
    this.current.l_name = e;
    this.current.l_no = e;
  }

  /**
   * 生成抽屉内试验编号
   * @returns
   */
  getNo() {
    let m = this.m.toString();
    let j = m.length;
    for (let i = 0; i < 3 - j; i++) {
      m = 0 + m;
    }
    return m;
  }

  /*
   * 记录操作
   */
  RecordOperation(option, result, infodata) {
    if (this.user.getLoginName()) {
      var employeeid = this.user.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.user.getLoginName();
      this.publicmethod.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}
