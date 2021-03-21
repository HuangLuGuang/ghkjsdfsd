import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";

declare let $;

@Component({
  selector: "ngx-operation-log",
  templateUrl: "./operation-log.component.html",
  styleUrls: ["./operation-log.component.scss"],
})
export class OperationLogComponent implements OnInit, OnDestroy {
  @ViewChild("agGrid") agGrid: any;

  constructor(
    private publicmethod: PublicmethodService,
    private http: HttpserviceService,
    private userinfo: UserInfoService
  ) {
    localStorage.removeItem("alert401flag");
  }
  button; // 权限button
  loading = false; // 加载
  refresh = false; // 刷新tabel

  ngOnInit(): void {
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicmethod.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  ngAfterViewInit() {
    // 初始化table
    setTimeout(() => {
      this.inttable();
    }, 200);
  }

  ngOnDestroy() {}

  action(actionmethod) {
    // console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    // ====================================================
    switch (method) {
      // case 'import':
      // this.import();
      // break;
      case "download":
        this.download("操作日志");
        break;
    }
  }

  //  button导出未excel
  download(title) {
    this.agGrid.download(title);
  }

  refresh_table() {
    $("#employeenumber").val("");
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    this.refresh = false;
    this.loading = false;
  }

  // =================================================agGrid

  tableDatas = {
    style: "width: 100%; height: 700px",
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
      // { field: 'application', headerName: '应用', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true},
      {
        field: "createdby",
        headerName: "域账号",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        resizable: true,
        flex: 1,
        sortable: true,
      },
      {
        field: "name",
        headerName: "姓名",
        resizable: true,
        flex: 1,
        sortable: true,
      },
      {
        field: "result",
        headerName: "状态",
        resizable: true,
        flex: 1,
        sortable: true,
      },
      {
        field: "transactiontype",
        headerName: "类型",
        resizable: true,
        flex: 1,
        sortable: true,
      },
      {
        field: "info",
        headerName: "信息",
        resizable: true,
        flex: 1,
        sortable: true,
      },
      {
        field: "createdon",
        headerName: "记录时间",
        resizable: true,
        flex: 1,
        sortable: true,
      },
    ],
    rowData: [
      // data
    ],
  };

  private gridData = [];

  // 初始化前确保 搜索条件
  inittable_before() {
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
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
      offset: offset,
      limit: limit,
    };

    this.http
      .callRPC("sys_security_log", "get_sys_transaction_log", columns)
      .subscribe((res) => {
        // 会话过期

        var get_sys_transaction_log = res["result"]["message"][0];
        if (get_sys_transaction_log["code"] === 1) {
          var message = get_sys_transaction_log["message"];
          var totalpagenumbers =
            get_sys_transaction_log["numbers"][0]["numbers"];
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.tableDatas.PageSize = PageSize;
          // formart result
          message.forEach((row) => {
            row["result"] = row["result"] === 1 ? "成功" : "失败";
          });
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          this.agGrid.init_agGrid(this.tableDatas);
          // 刷新table后，改为原来的！
          this.tableDatas.isno_refresh_page_size = false;
          this.RecordOperation(1, "查看", "操作日志");
          this.loading = false;
        } else {
          this.RecordOperation(0, "查看", "操作日志");
        }
      });
  }

  // 更新 表
  update_agGrid(event?) {
    var inittable_before = this.inittable_before();
    var offset;
    var limit;
    if (event != undefined) {
      offset = event.offset;
      limit = event.limit;
    } else {
      offset = inittable_before.limit;
      limit = inittable_before.limit;
    }
    this.http
      .callRPC("sys_security_log", "get_sys_transaction_log", {
        offset: offset,
        limit: limit,
      })
      .subscribe((res) => {
        // console.log("get_sys_transaction_log", res)
        var get_sys_transaction_log = res["result"]["message"][0];
        // console.log("get_sys_transaction_log", get_sys_transaction_log);
        if (get_sys_transaction_log["code"] === 1) {
          this.loading = false;
          // 发布组件，编辑用户的组件
          // this.publicmethod.getcomponent(EditUserEmployeeComponent);

          var message = get_sys_transaction_log["message"];
          var totalpagenumbers =
            get_sys_transaction_log["numbers"][0]["numbers"];
          // formart result
          message.forEach((row) => {
            row["result"] = row["result"] === 1 ? "成功" : "失败";
          });
          this.gridData = [];

          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
          // 刷新table后，改为原来的！
          this.tableDatas.isno_refresh_page_size = false;
        } else {
          console.error("未得到日志", get_sys_transaction_log);
        }
      });
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event) {
    // console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  // =================================================agGrid
  // option_record
  RecordOperation(result, option, infodata) {
    // option:操作类型, result:操作的结果, infodata:附加信息!
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
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
