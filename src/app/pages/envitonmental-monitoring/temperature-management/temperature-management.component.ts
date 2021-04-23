import { Component, OnInit, ViewChild } from "@angular/core";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";

import * as XLSX from "xlsx";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { NbDialogService } from "@nebular/theme";
import { AddEditTemperatureComponent } from "../../../pages-popups/envitonmental-monitoring/device-temperature/add-edit-temperature/add-edit-temperature.component";
import { TemperatureManagementOptionComponent } from "./temperature-management-option/temperature-management-option.component";
import { EditDelTooltipComponent } from "../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { TemperatureManagementActiveComponent } from "./temperature-management-active/temperature-management-active.component";

import { Temperature } from "../../../pages-popups/envitonmental-monitoring/device-temperature/add-edit-temperature/form_verification";
import { Observable } from "rxjs";
import { TableGroupComponent } from "../../tongji/components/table-group/table-group.component";

type AOA = any[][];

@Component({
  selector: "ngx-temperature-management",
  templateUrl: "./temperature-management.component.html",
  styleUrls: ["./temperature-management.component.scss"],
})
export class TemperatureManagementComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") myinput: any;

  importdata: AOA = [
    [1, 2],
    [3, 4],
  ];

  loading = false; // 加载
  refresh = false; // 刷新tabel
  button; // 权限button
  myinput_placeholder = "房间号";

  option; // 操作

  TABLE = "device_temperature_manage";
  METHOD = " dev_get_temperature_manage";

  // 删除的
  DELMETHOD = "dev_delete_temperature_manage";
  ADDMETHOD = "dev_insert_temperature_manage";

  employeeid = this.userinfo.getEmployeeID();

  // agGrid
  tableDatas = {
    // 新增，设置高度
    style: "width: 100%; height: 700px",

    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection
      {
        field: "groups",
        headerName: "科室/功能组",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        resizable: true,
        sortable: true,
        width: 400,
        cellRendererFramework: TableGroupComponent,
      },

      {
        field: "room",
        headerName: "房间号",
        resizable: true,
        sortable: true,
      },

      {
        field: "deviceno",
        headerName: "传感器序列号",
        resizable: true,
        minWidth: 30,
        sortable: true,
      },
      {
        field: "busid",
        headerName: "主站编号",
        resizable: true,
        minWidth: 30,
        sortable: true,
      },
      {
        field: "deviceid",
        headerName: "从站id",
        resizable: true,
        minWidth: 30,
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
      // {
      //   field: "createdby",
      //   headerName: "创建人",
      //   resizable: true,
      //   width: 100,
      //   sortable: true,
      // },
      // {
      //   field: "lastupdatedby",
      //   headerName: "更新人",
      //   resizable: true,
      //   width: 100,
      //   sortable: true,
      // },
      {
        field: "active",
        headerName: "是否启用",
        resizable: true,
        flex: 1,
        minWidth: 100,
        sortable: true,
        cellRendererFramework: TemperatureManagementActiveComponent, // 这是是否启用的组件
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

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  ngOnInit(): void {
    // 添加操作
    var that = this;
    this.option = {
      field: "option",
      headerName: "操作",
      resizable: true,
      fullWidth: true,
      pinned: "right",
      width: 100,
      cellRendererFramework: TemperatureManagementOptionComponent,
      cellRendererParams: {
        clicked: function (data: any) {
          // console.log("--添加操作列---", data);
          if (data["active"] === "edit") {
            that.edit([data["data"]]);
          } else {
            that.del([data["data"]]);
          }
        },
      },
    };
  }

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.option);
    // 初始化table
    setTimeout(() => {
      this.inttable();
    }, 200);
  }

  // 销毁组件时，删除 kpi_for_detail
  ngOnDestroy() {
    localStorage.removeItem("buttons_list");
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
        this.download("环境监测模块管理");
        break;
    }
  }

  // 添加按钮
  add() {
    this.dialogService
      .open(AddEditTemperatureComponent, {
        closeOnBackdropClick: false,
        context: { title: "添加环境监测模块", content: "false" },
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

  // 编辑按钮
  edit(active_data?) {
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
            title: "编辑设备提示",
            content: `请选择需要编辑的行！`,
          },
        })
        .onClose.subscribe((result) => {});
    } else if (rowdata.length === 1) {
      this.dialogService
        .open(AddEditTemperatureComponent, {
          closeOnBackdropClick: false,
          context: {
            title: "编辑环境监测模块",
            content: "true",
            rowData: rowdata,
          },
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
            title: "编辑环境监测模块",
            content: `请选择需要编辑的行！`,
          },
        })
        .onClose.subscribe((result) => {});
    }
  }

  // 删除按钮
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
                      "删除环境监测模块",
                      1,
                      JSON.stringify(id_list)
                    );
                  } else {
                    this.deldanger(JSON.stringify(status["message"]));
                    this.RecordOperation(
                      "删除环境监测模块",
                      0,
                      JSON.stringify(id_list)
                    );
                    throw "error, 删除失败！";
                  }
                });
            } catch (err) {
              this.RecordOperation(
                "删除环境监测模块",
                0,
                JSON.stringify(id_list)
              );
              this.deldanger(JSON.stringify(status["message"]));
            }
          }
        });
    }
  }

  // input 传入的值
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      // console.log("传入房间号----->", inpuvalue);
      this.query();
    }
  }

  // 搜索按钮
  query() {
    var inittable_before = this.inittable_before();
    var offset = 0;
    var limit = inittable_before.limit;
    var PageSize = inittable_before.limit;
    var columns = {
      offset: offset,
      limit: limit,
      room: inittable_before.room,
      employeeid: this.employeeid,
    };

    this.http.callRPC(this.TABLE, this.METHOD, columns).subscribe((result) => {
      var tabledata = result["result"]["message"][0];
      this.loading = false;
      if (tabledata["code"] === 1) {
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

        this.RecordOperation(
          "搜索环境监测模块管理",
          1,
          JSON.stringify(columns)
        );
      } else {
        this.RecordOperation(
          "搜索环境监测模块管理",
          0,
          JSON.stringify(columns)
        );
      }
    });
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

  // 导入数据
  import() {
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
  }

  // 导出
  download(title) {
    this.agGrid.download(title);
  }

  // 初始化前确保 搜索条件
  inittable_before() {
    var room =
      this.myinput?.getinput() === undefined ? "" : this.myinput?.getinput(); // 设备名称
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      room: room,
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
      room: inittable_before.room,
      employeeid: this.employeeid,
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

        this.RecordOperation(
          "查看环境监测模块管理",
          1,
          JSON.stringify(columns)
        );
      } else {
        this.RecordOperation(
          "查看环境监测模块管理",
          0,
          JSON.stringify(columns)
        );
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
      PageSize = event.PageSize ? Number(event.PageSize) : 15;
    } else {
      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset,
      limit: limit,
      room: inittable_before.room,
      employeeid: this.employeeid,
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

        this.RecordOperation(
          "更新环境监测模块管理",
          1,
          JSON.stringify(columns)
        );
      } else {
        this.querydanger(JSON.stringify(tabledata["message"]));
        this.RecordOperation(
          "更新环境监测模块管理",
          0,
          JSON.stringify(columns)
        );
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
    // console.log("rowData_list----excel 除了表头的数据>", rowData_list);
    // console.log("excel_title---- excel的表头>", excel_title);
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

      // console.error("++++++++++++++++++++++rowData", rowData);

      var verify_err = [];
      var verify_after = this.verify_rowdatas(rowData, verify_err); // 验证后的数据 得到的是验证的 错误信息！
      // console.error("++++++++++++++++++++++verify_after", verify_after);

      if (verify_after.length > 0) {
        this.verify_import(verify_after);
        this.RecordOperation(
          "导入环境监测模块管理",
          0,
          JSON.stringify(verify_after)
        );
      } else {
        // 插入数据库之前 处理数据
        console.log("插入数据库之前 处理数据", rowData);
        var datas = this.option_table_before(rowData);
        // console.log("插入数据库之前 处理数据---->", datas);
        // 将导入的数据存入数据库
        this.dev_insert_device(datas).subscribe((result) => {
          if (result) {
            // 将导入的数据展示在table中
            // var after_datas = this.show_table_before(rowData)
            this.gridData = [];
            this.loading = true;
            this.update_agGrid(); // 告诉组件刷新！
            this.loading = false;
            this.RecordOperation("导入环境监测模块管理", 1, "导入excel表");
          } else {
            this.RecordOperation("导入环境监测模块管理", 0, "导入excel表");
          }
        });
      }
    }
  }

  // 插入之前，修改一下数据格式，主要是：是否启用，是否关注
  option_table_before(datas) {
    var name = this.userinfo.getName(); // zh name
    var after_datas: FormData[] = [];
    datas.forEach((data) => {
      var after_data: FormData = {
        deviceno: data.deviceno, //  传感器序列号
        room: data.room, // 存放地点
        createdby: name, // 创建人
        lastupdatedby: name, // 更新人
        active: data["active"] === "是" ? 1 : 0, // 是否启用
        groups: data.groups, // 科室

        busid: data.busid, // 主站编号
        deviceid: data.deviceid, // 从站id
      };
      after_datas.push(after_data);
    });
    return after_datas;
  }

  // 验证每一行数据！ 验证excel导入的数据！
  verify_rowdatas(rowDatas, verify_err) {
    rowDatas.forEach((rowdata) => {
      var deviceno = rowdata["deviceno"];
      var room = rowdata["room"];
      var groups = rowdata["groups"];
      var busid = rowdata["busid"];
      var deviceid = rowdata["deviceid"];

      // 验证！deviceno
      var verify_deviceno = this.verify_deviceno(deviceno);
      if (verify_deviceno != 1) {
        verify_err.push({ err: verify_deviceno });
      }
      // 验证！ room
      var verify_room = this.verify_room(room);
      if (verify_room != 1) {
        verify_err.push({ err: verify_room });
      }

      // 验证！ groups
      var verify_groups = this.verify_groups(groups);
      if (verify_groups != 1) {
        verify_err.push({ err: verify_groups });
      }

      // 验证！ busid
      var verify_busid = this.verify_busid(busid);
      if (verify_busid != 1) {
        verify_err.push({ err: verify_busid });
      }
      // 验证！ deviceid
      var verify_deviceid = this.verify_deviceid(deviceid);
      if (verify_deviceid != 1) {
        verify_err.push({ err: verify_deviceid });
      }
    });
    return verify_err;
  }

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title) {
    var special_sql = Temperature["special_sql"]["special_sql"];
    var special_str = Temperature["special_sql"]["special_str"];
    var sql = special_sql.test(data);
    var str = special_str.test(data);
    if (sql) {
      return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
    }
    if (!str) {
      // console.log("==============>",data, data.length)
      return title + "不能有特殊字符！";
    }
    return 1;
  }

  // 验证 deviceno 传感器序列号
  verify_deviceno(deviceno) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(deviceno, "传感器序列号");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!new RegExp(Temperature["deviceno"]).test(deviceno)) {
      if (!deviceno) {
        return "传感器序列号不能为空！";
      } else {
        if (deviceno.length > 50) {
          return "传感器序列号最大长度不超过50！";
        }
      }
      return "传感器序列号不能有中文！";
    }
    return 1; // 返回1，表示 通过验证！
  }
  // 验证 room 房间号
  verify_room(room) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(room, "房间号");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!new RegExp(Temperature["room"]).test(room)) {
      if (!room) {
        return "房间号不能为空！";
      } else {
        if (room.length > 50) {
          return "房间号最大长度不超过50！";
        }
      }
      return "房间号不能有中文！";
    }
    return 1; // 返回1，表示 通过验证！
  }

  // 验证 groups 科室
  verify_groups(groups) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(groups, "科室");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!groups) {
      return "科室不能为空！";
    } else {
      if (groups.length > 225) {
        return "科室最大长度不超过225！";
      }
    }

    return 1; // 返回1，表示 通过验证！
  }
  // 验证 busid 网关主站编号
  verify_busid(busid) {
    // console.error("----------busid-----------", busid);

    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(busid, "网关主站编号");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!busid) {
      return "网关主站编号不能为空！";
    } else {
      if (!new RegExp("^[a-zA-Z0-9]{1,255}$").test(busid)) {
        if (busid.length > 255) {
          return "网关主站编号最大长度不超过255！";
        }
        return "网关主站编号不能有中文！";
      }
    }

    return 1; // 返回1，表示 通过验证！
  }
  // 验证 busid 传感器从站id
  verify_deviceid(deviceid) {
    // console.error("----------deviceid-----------", deviceid);
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(deviceid, "传感器从站id");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!deviceid) {
      return "传感器从站id不能为空！";
    } else {
      if (!new RegExp("^[a-zA-Z0-9]{1,255}$").test(deviceid)) {
        if (deviceid.length > 255) {
          return "传感器从站id最大长度不超过255！";
        }
        return "传感器从站id不能有中文！";
      }
    }

    return 1; // 返回1，表示 通过验证！
  }

  // ----------------------------导入---------------------------

  // 将导入的数据插入到数据库中
  dev_insert_device(datas) {
    return new Observable((observale) => {
      const table = this.TABLE;
      const method = this.ADDMETHOD;
      try {
        this.http.callRPC(table, method, datas).subscribe((result) => {
          // console.log("插入环境监测模块管理：", result);
          const status = result["result"]["message"][0]["code"];
          if (status === 1) {
            this.RecordOperation("导入", 1, "环境监测模块管理");
            this.success();
            observale.next(true);
          } else {
            var data_info = result["result"]["message"][0]["message"];
            // console.log("------------------->",data_info)
            this.RecordOperation("导入", 0, String(data_info));
            this.importSuccess(result["result"]["message"][0]["message"]);
            observale.next(false);
            throw "error, 导入失败！";
          }
        });

        this.loading = false;
      } catch (err) {
        this.RecordOperation("导入环境监测模块管理", 0, String(err));
        observale.next(false);
        // var data = JSON.stringify(err);
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

  importSuccess(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "warning",
      conent: data,
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
  deviceno: string; // 传感器序列号
  room: string; // 存放地点
  createdby: string; // 创建人
  lastupdatedby: string; // 更新人
  active: Number; // 是否启用
  id?: number; // ID
  groups: string; // 科室

  busid: string; // 主站编号
  deviceid: string; // 从站id
}
