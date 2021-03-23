import { Component, OnInit, ViewChild } from "@angular/core";

import { ASSETS_MANAGE_SETTINGS } from "../gps_module_manage_table";

import { Device } from "../../../../pages-popups/gps/form_verification";

import * as XLSX from "xlsx";
import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { Observable } from "rxjs";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { GpsTableOptionComponent } from "../../components/gps-table-option/gps-table-option.component";
import { NbDialogService } from "@nebular/theme";
import { AddEditGpsComponent } from "../../../../pages-popups/gps/add-edit-gps/add-edit-gps.component";
import { EditDelTooltipComponent } from "../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { IsnotActiveComponent } from "./isnot-active/isnot-active.component";
import { IsnotFavorComponent } from "./isnot-favor/isnot-favor.component";
type AOA = any[][];

declare let $;

@Component({
  selector: "ngx-assets-manage",
  templateUrl: "./assets-manage.component.html",
  styleUrls: ["./assets-manage.component.scss"],
})
export class AssetsManageComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") myinput: any;

  importdata: AOA = [
    [1, 2],
    [3, 4],
  ];

  loading = false; // 加载
  refresh = false; // 刷新tabel
  button; // 权限button

  myinput_placeholder = "设备编号";

  option; // 操作

  TABLE = "positioning_monitoring";
  METHOD = "dev_get_positioning_monitoring";

  // 删除的
  DELMETHOD = "dev_delete_positioning_monitoring";

  // agGrid
  tableDatas = {
    // 新增，设置高度
    style: "width: 100%; height: 700px",

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
      { field: "imei", headerName: "IMEI号", resizable: true, sortable: true },
      { field: "sim", headerName: "SIM号", resizable: true, sortable: true },
      {
        field: "belonged",
        headerName: "负责人",
        resizable: true,
        sortable: true,
      },
      {
        field: "location",
        headerName: "存放地点",
        resizable: true,
        sortable: true,
      },
      {
        field: "createdon",
        headerName: "创建时间",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "lastupdateon",
        headerName: "更新时间",
        resizable: true,
        minWidth: 10,
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
        field: "lastupdatedby",
        headerName: "更新人",
        resizable: true,
        width: 100,
        sortable: true,
      },
      {
        field: "active",
        headerName: "是否启用",
        resizable: true,
        width: 100,
        sortable: true,
        cellRendererFramework: IsnotActiveComponent,
      },
      {
        field: "isfavor",
        headerName: "是否关注",
        resizable: true,
        width: 100,
        sortable: true,
        cellRendererFramework: IsnotFavorComponent,
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
  }

  ngOnInit(): void {
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });

    // 添加操作
    var that = this;
    this.option = {
      field: "option",
      headerName: "操作",
      resizable: true,
      fullWidth: true,
      pinned: "right",
      width: 100,
      cellRendererFramework: GpsTableOptionComponent,
      cellRendererParams: {
        clicked: function (data: any) {
          // console.log("--添加操作列---", data);
          if (data["active"] === "edit") {
            that.edit([data["data"]]);
          } else {
            that.del([data["data"]]);
          }
          // that.change_target_hour([data]);
        },
      },
    };
  }

  // 销毁组件时，删除 kpi_for_detail
  ngOnDestroy() {
    localStorage.removeItem("buttons_list");
  }

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.option);
    // 初始化table
    setTimeout(() => {
      this.inttable();
    }, 200);
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
      case "import":
        this.import();
        break;
      case "download":
        this.download("资产管理");
        break;
    }
  }

  // input 传入的值
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      // console.log("传入的值设备名称----->", inpuvalue);
      this.query(inpuvalue);
    } else if (inpuvalue == undefined) {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: { title: "提示", content: `缺少搜索条件！` },
        })
        .onClose.subscribe((name) => {
          // console.log("----name-----", name);
        });
    }
  }

  // 按钮新增
  add() {
    this.dialogService
      .open(AddEditGpsComponent, {
        closeOnBackdropClick: false,
        context: { title: "添加设备", content: "false" },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.gridData = [];
          this.loading = true;
          this.update_agGrid();
          this.loading = false;
        }
      });
  }

  // 按钮删除
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
      conent: "删除失败!" + data,
    });
  }

  del(active_data?) {
    var rowdata;
    if (active_data) {
      rowdata = active_data[0];
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    if (rowdata.length === 0) {
      this.dialogService
        .open(EditDelTooltipComponent, {
          context: {
            title: "删除设备提示",
            content: `请选择需要删除的行！`,
          },
        })
        .onClose.subscribe((result) => {});
    } else {
      var text = rowdata.length > 1 ? "这些" : "这条";
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: {
            title: "提示",
            content: `确定要删除${text}数据吗？`,
            rowData: JSON.stringify(rowdata),
          },
        })
        .onClose.subscribe((result) => {
          if (result) {
            try {
              var id_list = [];
              rowdata.forEach((element) => {
                var item = {};
                item["id"] = element["id"];
                id_list.push(item);
              });
              // console.error("删除>>", id_list);
              this.http
                .callRPC(this.TABLE, this.DELMETHOD, id_list)
                .subscribe((result) => {
                  const status = result["result"]["message"][0];
                  if (status["code"] === 1) {
                    this.delsuccess();
                    this.gridData = [];
                    this.loading = true;
                    this.update_agGrid();
                    this.loading = false;
                    this.RecordOperation(
                      "删除gps设备",
                      1,
                      JSON.stringify(id_list)
                    );
                  } else {
                    this.deldanger(JSON.stringify(status["message"]));
                    this.RecordOperation(
                      "删除gps设备",
                      0,
                      JSON.stringify(id_list)
                    );
                    throw "error, 删除失败！";
                  }
                });
            } catch (err) {
              this.RecordOperation("删除gps设备", 0, JSON.stringify(id_list));
              this.deldanger(JSON.stringify(status["message"]));
            }
          }
        });
    }
  }

  // 按钮修改
  edit(active_data?) {
    var rowdata;
    if (active_data) {
      rowdata = active_data[0];
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    // console.log("编辑：行数据>>", rowdata);
    if (rowdata.length === 0) {
      this.dialogService
        .open(EditDelTooltipComponent, {
          context: {
            title: "编辑设备提示",
            content: `请选择需要编辑的行！`,
          },
        })
        .onClose.subscribe((result) => {});
    } else if (rowdata.length === 1) {
      this.dialogService
        .open(AddEditGpsComponent, {
          closeOnBackdropClick: false,
          context: { title: "编辑设备", content: "true", rowData: rowdata },
        })
        .onClose.subscribe((result) => {
          if (result) {
            this.gridData = [];
            this.loading = true;
            this.update_agGrid();
            this.loading = false;
          }
        });
    } else {
      this.dialogService
        .open(EditDelTooltipComponent, {
          context: {
            title: "编辑设备提示",
            content: `请选择一条需要编辑的行！`,
          },
        })
        .onClose.subscribe((result) => {});
    }
  }

  // 搜索按钮
  query(inpuvalue?) {
    var inittable_before = this.inittable_before();
    this.tableDatas.isno_refresh_page_size = true;
    var deviceid = inittable_before.deviceid;
    if (deviceid != "") {
      var offset = 0;
      var limit = inittable_before.limit;
      var PageSize = inittable_before.limit;
      var columns = {
        offset: offset,
        limit: limit,
        deviceid: inittable_before.deviceid,
      };

      this.http
        .callRPC(this.TABLE, this.METHOD, columns)
        .subscribe((result) => {
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
            this.RecordOperation("搜索gps设备", 1, JSON.stringify(columns));
          } else {
            var data = tabledata["message"];
            this.querydanger(JSON.stringify(data));
            this.RecordOperation("搜索gps设备", 0, JSON.stringify(columns));
          }
        });
    } else {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          context: { title: "提示", content: `缺少搜索条件！` },
        })
        .onClose.subscribe((name) => {
          // console.log("----name-----", name);
        });
    }
  }

  refresh_table() {
    // 取消选择的数据 delselect
    this.myinput?.del_input_value();

    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    // this.inttable();
    this.update_agGrid();
    this.loading = false;
    this.refresh = false;

    // this.groups_func.dropselect();
    // this.eimdevicetpye.dropselect();
  }

  // 导出
  download(title) {
    this.agGrid.download(title);
  }

  // 导入数据
  import() {
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
  }

  // 初始化前确保 搜索条件
  inittable_before() {
    var deviceid =
      this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      deviceid: deviceid,
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
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset,
      limit: limit,
      deviceid: inittable_before.deviceid,
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

        this.RecordOperation("查看gps设备", 1, JSON.stringify(columns));
      } else {
        this.RecordOperation("查看gps设备", 0, JSON.stringify(columns));
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
      deviceid: inittable_before.deviceid,
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

        this.RecordOperation("更新gps设备", 1, JSON.stringify(columns));
      } else {
        this.RecordOperation("更新gps设备", 0, JSON.stringify(columns));
      }
    });
  }

  // agGrid
  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event) {
    // console.log("页码改变的回调", event);
    // this.loading = true;
    this.gridData = [];
    this.inttable(event);
    this.loading = false;
  }

  // ----------------------------导入---------------------------
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    // console.log("导入：---------------------------", target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.importdata = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      // console.log("importdata: ", this.importdata); // 这是读取的数据转为json

      this.analysis_sheet_to_json_to_ng2(this.importdata);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // 将sheet_json转换为smart-table 数据格式！
  analysis_sheet_to_json_to_ng2(importdata) {
    // console.log("这是导入的Excel的原始数据！", importdata, "\n")
    var rowData_list = importdata.slice(1, importdata.length);
    var excel_title = importdata.slice(0, 1)[0];
    console.log("rowData_list----excel 除了表头的数据>", rowData_list);
    console.log("excel_title---- excel的表头>", excel_title);
    var ag_Grid_columns = this.tableDatas.columnDefs.slice(
      0,
      excel_title.length
    );
    // console.log("ag_Grid_columns--------->ag_Grid_columns 的表头", ag_Grid_columns, "\n")

    var agGridTitle = [];
    var noexist_title = [];
    for (let index = 0; index < ag_Grid_columns.length; index++) {
      const agitem = ag_Grid_columns[index];
      const exitem = excel_title[index];

      if (agitem.headerName === exitem) {
        agGridTitle.push(agitem.field);
      } else {
        console.log(
          "字段不一致",
          "agTitle != exetitle",
          agitem.headerName,
          "!=",
          exitem
        );
        noexist_title.push(agitem.headerName);
      }
    }

    if (noexist_title.length > 0) {
      this.importdanger(noexist_title);
    } else {
      var rowData = []; // rowData 就是table需要的source
      rowData_list.forEach((element) => {
        // rowData_list excel 除了第一列字段，其它的数据！
        var item = {};
        if (element.length != 0) {
          for (let index = 0; index < element.length; index++) {
            item[agGridTitle[index]] = element[index];
          }
          rowData.push(item);
        }
      });

      var verify_err = [];
      var verify_after = this.verify_rowdatas(rowData, verify_err); // 验证后的数据 得到的是验证的 错误信息！
      if (verify_after.length > 0) {
        this.verify_import(verify_after);
        this.RecordOperation("导入gps设备", 0, JSON.stringify(verify_after));
      } else {
        // 插入数据库之前 处理数据
        console.log("插入数据库之前 处理数据", rowData);
        var datas = this.option_table_before(rowData);
        console.log("插入数据库之前 处理数据---->", datas);
        // 将导入的数据存入数据库
        this.dev_insert_device(datas).subscribe((result) => {
          if (result) {
            // 将导入的数据展示在table中
            // var after_datas = this.show_table_before(rowData)
            this.gridData = [];
            this.loading = true;
            this.update_agGrid(); // 告诉组件刷新！
            this.loading = false;
            this.RecordOperation("导入gps设备", 1, "导入excel表");
          } else {
            this.RecordOperation("导入gps设备", 0, "导入excel表");
          }
        });
      }
    }
  }

  // 插入之前，修改一下数据格式，主要是：是否启用，是否关注
  option_table_before(datas) {
    var after_datas: FormData[] = [];
    datas.forEach((data) => {
      var after_data: FormData = {
        deviceid: data.deviceid, //  设备ID
        devicename: data.devicename, // 设备名称
        imei: data.imei, // IMEI号
        sim: data.sim, // SIM号
        belonged: data.belonged, // 负责人
        location: data.location, // 存放地点
        createdby: data.createdby, // 创建人
        active: data["active"] === "是" ? 1 : 0, // 是否启用
        isfavor: data["isfavor"] === "是" ? 1 : 0, // 是否关注
      };
      after_datas.push(after_data);
    });
    return after_datas;
  }

  // 验证每一行数据！ 验证excel导入的数据！
  verify_rowdatas(rowDatas, verify_err) {
    rowDatas.forEach((rowdata) => {
      var deviceid = rowdata["deviceid"];
      var devicename = rowdata["devicename"];
      var imei = String(rowdata["imei"]);
      var sim = String(rowdata["sim"]);
      var belonged = rowdata["belonged"];
      var location = rowdata["location"];
      var createdby = rowdata["createdby"];
      // 验证！deviceid
      var verify_deviceid = this.verify_deviceid(deviceid);
      if (verify_deviceid != 1) {
        verify_err.push({ err: verify_deviceid });
      }
      // 验证！ devicename
      var verify_devicename = this.verify_devicename(devicename);
      if (verify_devicename != 1) {
        verify_err.push({ err: verify_devicename });
      }
      // 验证！ imei
      var verify_type = this.verify_imei(imei);
      if (verify_type != 1) {
        verify_err.push({ err: verify_type });
      }
      // 验证！ sim
      var verify_type = this.verify_sim(sim);
      if (verify_type != 1) {
        verify_err.push({ err: verify_type });
      }
      // 验证！ belonged
      var verify_belonged = this.verify_belonged(belonged);
      if (verify_belonged != 1) {
        verify_err.push({ err: verify_belonged });
      }
      // 验证！ location
      var verify_location = this.verify_location(location);
      if (verify_location != 1) {
        verify_err.push({ err: verify_location });
      }
      // 验证！ createdby
      var verify_location = this.verify_createdby(createdby);
      if (verify_location != 1) {
        verify_err.push({ err: verify_location });
      }
    });
    return verify_err;
  }

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title) {
    var special_sql = Device["special_sql"]["special_sql"];
    var special_str = Device["special_sql"]["special_str"];
    var sql = special_sql.test(data);
    var str = special_str.test(data);
    if (sql) {
      return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
    }
    if (!str) {
      return title + "不能有特殊字符！";
    }
    return 1;
  }

  // 设备ID：deviceid
  verify_deviceid(deviceid) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(deviceid, "设备编号");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (deviceid.length > 50) {
      return "设备ID最大长度不超过50！";
    }
    return 1; // 返回1，表示 通过验证！
  }
  verify_devicename(devicename) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(devicename, "设备编号");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }

    if (devicename.length > 50) {
      return "设备名称最大长度不超过50！";
    }
    return 1; // 返回1，表示 通过验证！
  }
  verify_imei(imei) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(imei, "IMEI号");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!new RegExp(Device["imei"]).test(imei)) {
      if (imei.length > 50) {
        return "IMEI号最大长度不超过50！";
      }
      return "IMEI号只能为数字！";
    }
    if (imei.length != 15) {
      return "IMEI号必须是15个数字！";
    }
    return 1; // 返回1，表示 通过验证！
  }
  verify_sim(sim) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(sim, "SIM号");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!new RegExp(Device["sim"]).test(sim)) {
      if (sim.length > 50) {
        return "SIM号最大长度不超过50！";
      }
      return "SIM号只能为数字！";
    }
    if (sim.length != 13) {
      return "SIM号必须是13个数字！";
    }
    return 1; // 返回1，表示 通过验证！
  }
  verify_belonged(belonged) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(belonged, "负责人");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (belonged.length > 50) {
      return "负责人最大长度不超过50！";
    }
    return 1; // 返回1，表示 通过验证！
  }
  verify_location(location) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(location, "存放地点");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (location.length > 50) {
      return "存放地点最大长度不超过50！";
    }
    return 1; // 返回1，表示 通过验证！
  }
  verify_createdby(createdby) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(createdby, "创建人");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }

    if (createdby.length > 50) {
      return "创建人最大长度不超过50！";
    }

    return 1; // 返回1，表示 通过验证！
  }

  // ----------------------------导入---------------------------

  // 将导入的数据插入到数据库中
  dev_insert_device(datas) {
    return new Observable((observale) => {
      const table = "positioning_monitoring";
      const method = "dev_insert_positioning_monitoring_list";
      try {
        this.http.callRPC(table, method, datas).subscribe((result) => {
          // console.log("插入设备数据：", result)
          const status = result["result"]["message"][0]["code"];
          if (status === 1) {
            this.success();
            observale.next(true);
          } else {
            var data_info = result["result"]["message"][0]["message"];
            // console.log("------------------->",data_info)
            observale.next(false);
            throw "error, 删除失败！";
          }
        });

        this.loading = false;
      } catch (err) {
        observale.next(false);
        this.danger();
      }
    });
  }

  verify_import(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "验证不通过：" + JSON.stringify(data),
    });
  }

  importdanger(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "缺少：" + data.join(","),
    });
  }
  success() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "导入成功!",
    });
  }
  danger() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "导入失败!",
    });
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

// 导入需要的数据
interface FormData {
  deviceid: string; // 设备id
  devicename: string; // 设备名称
  imei: string; // IMEI号
  sim: string; // SIM号
  belonged: string; // 负责人
  location: string; // 存放地点
  createdby: string; // 创建人
  active: Number; // 是否启用
  isfavor: Number; // 是否关注
  id?: number; // ID
}
