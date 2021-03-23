import { Component, OnInit, ViewChild } from "@angular/core";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { Observable } from "rxjs";
import { NbDialogService } from "@nebular/theme";

import { UserEmployeeGroupComponent as AddUserEmployeeGroupComponent } from "../../../pages-popups/system-set/user-employee-group/user-employee-group.component";
import { EditDelTooltipComponent } from "../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { UserInfoService } from "../../../services/user-info/user-info.service";
import { ActionComponent } from "./action/action.component";
import { TranActiveComponent } from "../new-user-employee/tran-active/tran-active.component";
import { TableGroupComponent } from "../../tongji/components/table-group/table-group.component";

declare let $;
declare let layui;

@Component({
  selector: "ngx-user-employee-group",
  templateUrl: "./user-employee-group.component.html",
  styleUrls: ["./user-employee-group.component.scss"],
})
export class UserEmployeeGroupComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") myinput: any;
  rowdata; // 要删除、修改的行数据
  loading = false; // 加载table
  refresh = false; // 刷新
  employee_group_agGrid;
  active; // 操作
  button; // 权限button

  METHOD = "sys_search_groups";
  TABLE = "groups_";

  // 输入框
  myinput_placeholder = "科室/功能组名称";

  DelSuccess: any = {
    position: "bottom-right",
    status: "success",
    conent: "删除成功!",
  };
  DellDanger: any = {
    position: "bottom-right",
    status: "danger",
    conent: "删除失败！",
  };
  GetDanger: any = {
    position: "top-right",
    status: "waring",
    conent: "获取用户组！",
  };

  // agGrid
  tableDatas = {
    style: "width: 100%; height: 700px",
    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度
      {
        field: "group",
        headerName: "科室/功能组",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        width: 360,
        resizable: true,
        cellRendererFramework: TableGroupComponent,
        sortable: true,
      },
      {
        field: "group_name",
        headerName: "科室/功能组(en)",
        resizable: true,
        width: 250,
        sortable: true,
      },
      {
        field: "active",
        headerName: "是否启用",
        resizable: true,
        cellRendererFramework: TranActiveComponent,
        width: 100,
        sortable: true,
      },
      {
        field: "createdon",
        headerName: "创建时间",
        resizable: true,
        width: 180,
        sortable: true,
      },
      {
        field: "createdby",
        headerName: "创建人",
        resizable: true,
        width: 100,
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
        flex: 1,
        sortable: true,
      },
    ],
    rowData: [
      // data
    ],
  };

  constructor(
    private publicmethod: PublicmethodService,
    private http: HttpserviceService,
    private dialogService: NbDialogService,
    private userinfo: UserInfoService
  ) {
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicmethod.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });

    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  ngOnInit(): void {
    // ====================================agGrid
    var that = this;
    this.active = {
      field: "action",
      headerName: "操作",
      cellRendererFramework: ActionComponent,
      pinned: "right",
      width: 100,
      cellRendererParams: {
        clicked: function (data: any) {
          if (data["active"] === "edit") {
            that.edit([data["data"]]);
          } else {
            that.del(data["data"]);
          }
        },
      },
    };
    // ====================================agGrid
  }
  ngAfterViewInit() {
    // 初始化table
    this.tableDatas.columnDefs.push(this.active);
    // 初始化table
    setTimeout(() => {
      this.inttable();
    }, 200);
  }

  ngOnDestroy() {}

  // 调用plv8函数！
  getsecurity_edit(table: string, method: string, colums: object) {
    return new Observable((res) => {
      this.http.callRPC(table, method, colums).subscribe((result) => {
        res.next(result);
      });
    });
  }

  action(actionmethod) {
    var method = actionmethod.split(":")[1];
    // ====================================================
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
      case "import":
        this.import();
        break;
      case "download":
        this.download("科室/功能组");
        break;
    }
  }

  // button 新增用户组
  add() {
    this.dialogService
      .open(AddUserEmployeeGroupComponent, {
        closeOnBackdropClick: false,
        context: { rowdata: JSON.stringify("add") },
      })
      .onClose.subscribe((name) => {
        if (name) {
          // 成功之后，重新请求
          this.gridData = [];
          this.loading = true;

          this.update_agGrid();
          this.loading = false;
        }
      });
  }

  // button 编辑用户组
  edit(active_data?) {
    var rowdata;
    if (active_data) {
      rowdata = active_data;
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    // var rowdata = this.agGrid.getselectedrows();

    if (rowdata.length === 0) {
      // 提示选择行数据
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: { title: "提示", content: `请选择一行数据！` },
        })
        .onClose.subscribe
        // name=>{console.log("----name-----", name)}
        ();
    } else if (rowdata.length > 1) {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: { title: "提示", content: `请选择一行数据！` },
        })
        .onClose.subscribe
        // name=>{console.log("----name-----", name)}
        ();
    } else {
      var rowdata_ = rowdata[0];
      this.dialogService
        .open(AddUserEmployeeGroupComponent, {
          closeOnBackdropClick: false,
          context: { rowdata: JSON.stringify(rowdata_) },
        })
        .onClose.subscribe((name) => {
          if (name) {
            // 成功之后，重新请求
            this.gridData = [];
            this.loading = true;
            this.update_agGrid();
            this.loading = false;
          }
        });
    }
  }

  // button删除用户组
  del(active_data?) {
    var rowdata;
    if (active_data) {
      rowdata = [active_data];
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    if (rowdata.length === 0) {
      // 提示选择行数据
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: { title: "提示", content: `请选择一行数据！` },
        })
        .onClose.subscribe
        // name=>{console.log("----name-----", name)}
        ();
      // this.dialogService.open(EditUserEmployeeGroupComponent, { context: { rowdata: JSON.stringify(this.rowdata), res: JSON.stringify(res)} })
    } else {
      var rowData = rowdata;
      var rownum = rowData.length > 1 ? "这些" : "这条";
      var that = this;
      var publicservice = this.publicmethod;
      var success = this.success;
      var danger = this.danger;
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: {
            title: "提示",
            content: `确定要删除${rownum}数据吗？`,
            rowData: JSON.stringify(rowData),
          },
        })
        .onClose.subscribe((name) => {
          // console.log("----name-----", name);
          if (name) {
            try {
              var data_info;
              var id_list = [];
              rowData.forEach((item) => {
                id_list.push(item["groupid"]);
              });
              var id_str = id_list.join(",");
              data_info = "科室id:" + id_str;

              that
                .getsecurity_edit("groups", "sys_delete_groups", rowData)
                .subscribe((result) => {
                  var res = result["result"]["message"][0];
                  if (res["code"] === 1) {
                    success(publicservice);
                    this.RecordOperation(
                      1,
                      "删除科室/功能组(groups)",
                      data_info
                    );
                    // 成功之后，重新请求
                    this.gridData = [];
                    this.loading = true;
                    this.update_agGrid();
                    this.loading = false;
                  } else {
                    var err_date = res["message"];
                    this.RecordOperation(
                      0,
                      "删除科室/功能组(groups)",
                      String(err_date)
                    );
                    danger(publicservice);
                  }
                });
            } catch (err) {
              throw "error, 删除失败！";
            }
          }
        });
    }
  }

  // input 传入的值
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      this.query(inpuvalue);
    }
  }

  // button 搜索按钮
  query(inpuvalue?) {
    // var groups = $("#employeenumber").val();
    var groups;
    groups = inpuvalue ? inpuvalue : this.myinput.getinput();
    if (groups != "") {
      var columns = {
        offset: 0,
        limit: this.agGrid.get_pagesize(),
        group: [groups],
      };
      this.gridData = [];
      this.loading = true;
      var table = this.TABLE;
      var method = this.METHOD;
      this.http.callRPC(table, method, columns).subscribe((result) => {
        var res = result["result"]["message"][0];
        this.loading = false;
        if (res["code"] === 1) {
          var message = res["message"];
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = res["numbers"]
            ? res["numbers"][0]["numbers"]
            : "未得到总条数";
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation(1, "搜索", "搜索科室/功能组(groups):" + groups);
          if (message.length < 1) {
            this.searchdanger(groups);
          }
        } else {
          var data_info = res["message"];
          this.RecordOperation(
            0,
            "搜索",
            "搜索科室/功能组(groups):" + String(data_info)
          );
        }
      });
    } else {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: { title: "提示", content: `请选择要搜索的数据！` },
        })
        .onClose.subscribe((name) => {
          // console.log("----name-----", name);
        });
    }
  }

  // button 导入excel
  import() {}

  //  button导出未excel
  download(title) {
    this.agGrid.download(title);
  }

  refresh_table() {
    // 重置 myinput
    this.myinput?.reset_myinput();
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    this.loading = false;
    this.refresh = false;
  }

  // 点击行执行
  runParent(rowdata) {
    if (rowdata["isSelected"]) {
      this.getsecurity_edit("group_", "get_group", {}).subscribe((res) => {
        var result = res["result"]["message"][0];
        if (result) {
          result.forEach((r) => {
            r["active"] = r["active"] === 1 ? "是" : "否";
          });
          result.forEach((element) => {
            if (element["groupid"] === rowdata["selected"][0]["groupid"]) {
              this.rowdata = rowdata;
            }
          });
        } else {
          // 获取用户组失败！
          this.publicmethod.toastr(this.GetDanger);
        }
      });
    }
  }

  // 展示状态
  searchdanger(data) {
    this.publicmethod.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "没有科室/功能组(groups):" + data,
    });
  }

  success(publicservice) {
    publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "删除成功!",
    });
  }
  danger(publicservice) {
    publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "删除失败!",
    });
  }
  // =================================================agGrid
  private gridData = [];

  // update_agGrid 更新数据表
  update_agGrid(event?) {
    var inittable_before = this.inittable_before();

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
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset,
      limit: limit,
      group: [inittable_before.groups],
    };
    var table = this.TABLE;
    var method = this.METHOD;
    this.http.callRPC(table, method, columns).subscribe((res) => {
      var tabledata = res["result"]["message"][0];
      this.loading = false;
      if (tabledata["code"] === 1) {
        var message = res["result"]["message"][0]["message"];
        this.tableDatas.PageSize = PageSize;
        // this.gridData = [];
        this.gridData.push(...message);
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata["numbers"]
          ? tabledata["numbers"][0]["numbers"]
          : "未得到总条数";
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！

        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation(1, "更新", "科室/功能组(groups)");
      } else {
        this.RecordOperation(0, "更新", "科室/功能组(groups)");
      }
    });
  }
  // 初始化前确保 搜索条件
  inittable_before() {
    var groups = this.myinput?.getinput() ? this.myinput.getinput() : "";
    return {
      limit: this.agGrid.get_pagesize(),
      groups: groups,
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
      group: [inittable_before.groups],
    };
    var table = this.TABLE;
    var method = this.METHOD;
    this.http.callRPC(table, method, columns).subscribe((result) => {
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
        this.RecordOperation(1, "查看", "科室/功能组(groups)");
      } else {
        this.RecordOperation(0, "查看", "科室/功能组(groups)");
      }
    });
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event) {
    // console.log("页码改变的回调", event);
    // this.getetabledata(event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  // =================================================agGrid

  // option_record
  RecordOperation(result, transactiontype, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = transactiontype; // '新增用户';
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
