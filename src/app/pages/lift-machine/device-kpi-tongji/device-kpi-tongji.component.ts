import { Component, OnInit, ViewChild } from "@angular/core";

import { ALERT_REPORT_SETTINGS } from "../lift_machine_table";

import { LocalDataSource } from "@mykeels/ng2-smart-table";
import { UserInfoService } from "../../../services/user-info/user-info.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { DeviceKpiTongjiOptionComponent } from "./device-kpi-tongji-option/device-kpi-tongji-option.component";
import { NbDialogService } from "@nebular/theme";

import { LiftMachineComponent } from "../../../pages-popups/lift-machine/lift-machine.component";
import { EditDelTooltipComponent } from "../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";

import { Device } from "../../../pages-popups/lift-machine/form_verification";

import * as XLSX from "xlsx";
import { DetailComponent } from "./detail/detail.component";
import { Observable } from "rxjs";
import { TableGroupComponent } from "../../tongji/components/table-group/table-group.component";
type AOA = any[][];

@Component({
  selector: "ngx-device-kpi-tongji",
  templateUrl: "./device-kpi-tongji.component.html",
  styleUrls: ["./device-kpi-tongji.component.scss"],
})
export class DeviceKpiTongjiComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") myinput: any;

  importdata: AOA = [
    [1, 2],
    [3, 4],
  ];

  loading = false; // 加载
  refresh = false; // 刷新tabel
  button; // 权限button

  // 用户id
  employeeid = this.userinfo.getEmployeeID();
  myinput_placeholder = "请输入设备编号";

  // agGrid
  tableDatas = {
    // 新增，设置高度
    style: "width: 100%; height: 700px",

    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection
      // { field: 'id', headerName: '序号',  headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 30,resizable: true, sortable: true},
      {
        field: "deviceid",
        headerName: "设备编号",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        minWidth: 10,
        resizable: true,
        sortable: true,
      },
      {
        field: "devicename",
        headerName: "设备名称",
        resizable: true,
        sortable: true,
      },
      {
        field: "detectorid",
        headerName: "探测器ID",
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
        field: "groups",
        headerName: "科室",
        resizable: true,
        sortable: true,
        cellRendererFramework: TableGroupComponent,
        width: 300,
      },
      {
        field: "belonged",
        headerName: "负责人",
        resizable: true,
        sortable: true,
        width: 150,
      },
      {
        field: "createdon",
        headerName: "创建时间",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "createdby",
        headerName: "创建人",
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
        field: "lastupdatedby",
        headerName: "更新人",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "active",
        headerName: "是否启用",
        resizable: true,
        minWidth: 10,
        sortable: true,
        cellRendererFramework: DetailComponent, // 这是是否启用的组件
      },
    ],
    rowData: [
      // data
    ],
  };
  private gridData = [];

  option; // 操作

  TABLE = "lift_machine";
  METHOD = "dev_get_lift_machine";

  DELMETHOD = "dev_delete_lift_machine";
  ADDMETHOD = "dev_insert_lift_machine";

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
      // console.log("result>>>>>>", result);
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
      cellRendererFramework: DeviceKpiTongjiOptionComponent,
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

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.option);
    // 初始化table
    this.inttable();
  }

  // 销毁组件时，删除 kpi_for_detail
  ngOnDestroy() {
    // localStorage.removeItem("buttons_list");
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
        this.download("设备kpi统计");
        break;
    }
  }

  refresh_table() {
    // 取消选择的数据 delselect
    this.myinput.del_input_value();

    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.update_agGrid();
    this.loading = false;
    this.refresh = false;

    // this.department.dropselect();
    // this.device_tpye.dropselect();
  }

  // input 传入的值
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      // console.log("传入的值设备名称----->", inpuvalue);
      // this.query(inpuvalue);
      this.query();
    }
  }

  // 新增按钮
  add() {
    this.dialogService
      .open(LiftMachineComponent, {
        closeOnBackdropClick: false,
        context: { title: "添加举升机设备", content: "false" },
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
                      "删除举升机设备",
                      1,
                      JSON.stringify(id_list)
                    );
                  } else {
                    this.deldanger(JSON.stringify(status["message"]));
                    this.RecordOperation(
                      "删除举升机设备",
                      0,
                      JSON.stringify(id_list)
                    );
                    throw "error, 删除失败！";
                  }
                });
            } catch (err) {
              this.RecordOperation(
                "删除举升机设备",
                0,
                JSON.stringify(id_list)
              );
              this.deldanger(JSON.stringify(status["message"]));
            }
          }
        });
    }
  }

  // 修改按钮
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
        .open(LiftMachineComponent, {
          closeOnBackdropClick: false,
          context: {
            title: "编辑举升机设备",
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
            title: "编辑举升机设备提示",
            content: `请选择需要编辑的行！`,
          },
        })
        .onClose.subscribe((result) => {});
    }
  }

  // 搜索按钮
  query() {
    // var asset_number_data = this.myinput.getinput();
    var inittable_before = this.inittable_before();
    // console.log("<------------搜索----------->", inittable_before);
    var offset = 0;
    var limit = inittable_before.limit;
    var PageSize = inittable_before.limit;
    var columns = {
      offset: offset,
      limit: limit,
      deviceid: inittable_before.deviceid,
    };
    this.http.callRPC(this.TABLE, this.METHOD, columns).subscribe((result) => {
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
        this.RecordOperation("搜索举升机设备", 1, JSON.stringify(columns));
      } else {
        var data = tabledata["message"];
        this.querydanger(JSON.stringify(data));
        this.RecordOperation("搜索举升机设备", 0, JSON.stringify(columns));
      }
    });
  }

  // 导出
  download(title) {
    this.agGrid.download(title);
  }

  // 导入
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
      limit = 10;
      PageSize = 10;
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

        this.RecordOperation(
          "查看举升机设备KPI统计",
          1,
          JSON.stringify(columns)
        );
      } else {
        this.RecordOperation(
          "查看举升机设备KPI统计",
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

        this.RecordOperation(
          "更新举升机设备KPI统计",
          1,
          JSON.stringify(columns)
        );
      } else {
        this.RecordOperation(
          "更新举升机设备KPI统计",
          0,
          JSON.stringify(columns)
        );
      }
    });
  }

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

      // console.error("++++++++++++++++++++++rowData", rowData);

      var verify_err = [];
      var verify_after = this.verify_rowdatas(rowData, verify_err); // 验证后的数据 得到的是验证的 错误信息！
      // console.error("++++++++++++++++++++++verify_after", verify_after);
      if (verify_after.length > 0) {
        this.verify_import(verify_after);
        this.RecordOperation("导入举升机设备", 0, JSON.stringify(verify_after));
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
            this.RecordOperation("导入举升机设备", 1, "导入excel表");
          } else {
            this.RecordOperation("导入举升机设备", 0, "导入excel表");
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
        detectorid: data.detectorid, // 探测器ID

        location: data.location, // 存放地点
        groups: data.groups, // 科室
        belonged: data.belonged, // 负责人
        lastupdatedby: data.lastupdatedby, // 更新人
        active: data["active"] === "是" ? 1 : 0, // 是否启用
        createdby: data.createdby, // 创建人
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
      var detectorid = rowdata["detectorid"];
      var location = rowdata["location"];
      var groups = rowdata["groups"];
      var belonged = rowdata["belonged"];

      var createdby = rowdata["createdby"];
      var active = rowdata["active"];
      // 验证！deviceid
      var verify_deviceid = this.verify_deviceno(deviceid);
      if (verify_deviceid != 1) {
        verify_err.push({ err: verify_deviceid });
      }
      // 验证！ devicename
      var verify_devicename = this.verify_devicename(devicename);
      if (verify_devicename != 1) {
        verify_err.push({ err: verify_devicename });
      }

      // 验证！ detectorid
      var verify_detectorid = this.verify_detectorid(detectorid);
      if (verify_detectorid != 1) {
        verify_err.push({ err: verify_detectorid });
      }
      // 验证！ location
      var verify_location = this.verify_location(location);
      if (verify_location != 1) {
        verify_err.push({ err: verify_location });
      }
      // 验证！ groups
      var verify_groups = this.verify_groups(groups);
      if (verify_groups != 1) {
        verify_err.push({ err: verify_groups });
      }

      // 验证！ belonged
      var verify_belonged = this.verify_belonged(belonged);
      if (verify_belonged != 1) {
        verify_err.push({ err: verify_belonged });
      }

      // 验证！ active
      var verify_location = this.verify_active(active);
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
      // console.log("==============>",data, data.length)
      return title + "不能有特殊字符！";
    }
    return 1;
  }

  // 验证 deviceno 设备编号
  verify_deviceno(deviceid) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(deviceid, "设备编号");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (new RegExp(Device["deviceid"]).test(deviceid)) {
      if (!deviceid) {
        return "设备编号不能为空！";
      } else {
        if (deviceid.length > 50) {
          return "设备编号最大长度不超过50！";
        }
      }
      return "设备编号不能有中文！";
    }
    return 1; // 返回1，表示 通过验证！
  }
  // 验证 devicename 设备名称
  verify_devicename(devicename) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(devicename, "设备名称");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!devicename) {
      return "设备名称不能为空！";
    } else {
      if (devicename.length > 50) {
        return "设备名称最大长度不超过50！";
      }
    }
    return 1; // 返回1，表示 通过验证！
  }
  // 验证 detectorid 探测器ID
  verify_detectorid(detectorid) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(detectorid, "探测器ID");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!new RegExp(Device["detectorid"]).test(detectorid)) {
      if (!detectorid) {
        return "探测器ID不能为空！";
      } else {
        if (detectorid.length > 50) {
          return "探测器ID最大长度不超过50！";
        }
      }
      return "探测器ID只能为数字！";
    }

    return 1; // 返回1，表示 通过验证！
  }
  // 验证 location 存放地点
  verify_location(location) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(location, "存放地点");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!location) {
      return "存放地点不能为空！";
    } else {
      if (location.length > 50) {
        return "存放地点最大长度不超过50！";
      }
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
  // 验证 belonged 负责人
  verify_belonged(belonged) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(belonged, "负责人");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }
    if (!belonged) {
      return "负责人不能为空！";
    } else {
      if (belonged.length > 50) {
        return "负责人最大长度不超过50！";
      }
    }

    return 1; // 返回1，表示 通过验证！
  }
  // 验证 active 是否启用
  verify_active(active) {
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(active, "是否启用");
    if (verify_sql_str != 1) {
      return verify_sql_str;
    }

    if (!active) {
      return "是否启用不能为空！";
    } else {
      if (active.length > 50) {
        return "是否启用最大长度不超过50！";
      }
    }
    return 1; // 返回1，表示 通过验证！
  }

  verify_import(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "验证不通过：" + JSON.stringify(data),
    });
  }

  // ----------------------------导入---------------------------

  // 将导入的数据插入到数据库中
  dev_insert_device(datas) {
    return new Observable((observale) => {
      const table = this.TABLE;
      const method = this.ADDMETHOD;
      try {
        this.http.callRPC(table, method, datas).subscribe((result) => {
          console.log("插入举升机设备：", result);
          const status = result["result"]["message"][0]["code"];
          if (status === 1) {
            this.RecordOperation("导入", 1, "举升机设备");
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
        this.RecordOperation("导入举升机设备", 0, String(err));
        observale.next(false);
        this.danger();
      }
    });
  }

  importdanger(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "缺少：" + data.join(","),
    });
  }

  // 展示状态
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
  detectorid: string; // 探测器ID
  location: string; // 存放地点
  groups: string; // 科室
  belonged: string; // 负责人

  createdby: string; // 创建人
  lastupdatedby: string; // 更新人
  active: Number; // 是否启用
  id?: number; // ID
}
