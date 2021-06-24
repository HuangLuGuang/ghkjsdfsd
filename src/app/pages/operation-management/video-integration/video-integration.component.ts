import { Component, OnInit, ViewChild } from "@angular/core";

import { VIDEO_INTEGRATION_SETTINGS } from "../table_settings";

import { LocalDataSource } from "@mykeels/ng2-smart-table";
import { UserInfoService } from "../../../services/user-info/user-info.service";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { ActionComponent } from "./action/action.component";

// add edit
import { AddEditVideoIntegrationComponent } from "../../../pages-popups/operation-management/add-edit-video-integration/add-edit-video-integration.component";
import { NbDialogService } from "@nebular/theme";
import { EditDelTooltipComponent } from "../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";

@Component({
  selector: "ngx-video-integration",
  templateUrl: "./video-integration.component.html",
  styleUrls: ["./video-integration.component.scss"],
})
export class VideoIntegrationComponent implements OnInit {
  @ViewChild("departmentselect") department: any; // 部门信息
  @ViewChild("devicetpye") devicetpye: any; // 设备类型
  @ViewChild("myinput") myinput: any; // 摄像头
  @ViewChild("ag_Grid") agGrid: any;

  active; // aggrid 操作

  groups_placeholder = "请选择部门信息";
  eimdevicetpye_placeholder = "请选择设备类型";
  myinput_placeholder = "请输入摄像头名称";

  // 加载数据
  loading = false;
  refresh = false; // 刷新tabel
  button; // 权限button
  // 用户id
  employeeid = this.userinfo.getEmployeeID();
  TABLE = "video_integration";
  METHOD = "get_video_integration";
  DMETHOD = "delete_video_integration";

  // agGrid
  tableDatas = {
    style: "width: 100%; height: 700px",
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection
      {
        field: "id",
        headerName: "序号",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        minWidth: 30,
        resizable: true,
        sortable: true,
      },
      {
        field: "cameraip",
        headerName: "摄像头IP",
        resizable: true,
        sortable: true,
      },
      {
        field: "cameraindexcode",
        headerName: "摄像头唯一标识符",
        resizable: true,
        sortable: true,
      },
      {
        field: "cameraname",
        headerName: "摄像头名称",
        resizable: true,
        sortable: true,
      },
      {
        field: "territory",
        headerName: "负责区域",
        resizable: true,
        sortable: true,
      },
      {
        field: "deviceid",
        headerName: "设备ID",
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
        field: "departmentinfo",
        headerName: "部门信息",
        resizable: true,
        sortable: true,
      },
      {
        field: "description",
        headerName: "描述",
        resizable: true,
        sortable: true,
      },
      {
        field: "videoservicestatus",
        headerName: "视频服务器状态",
        resizable: true,
        sortable: true,
      },
      {
        field: "ipaddress",
        headerName: "IP地址",
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
        field: "principal",
        headerName: "负责人",
        resizable: true,
        minWidth: 10,
        sortable: true,
      }, // 编辑、删除
    ],
    rowData: [
      // data
    ],
  };

  message = [
    {
      id: "1",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "2",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "停止",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "3",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "维护",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "4",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "故障",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "5",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "6",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "7",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "8",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "9",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "10",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "11",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "12",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "13",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "14",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "15",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "16",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "17",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "18",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "19",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "20",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "21",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "22",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "23",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
    {
      id: "24",
      cameraip: "192.168.3.3",
      territory: "电机测试系统台架",
      departmentInfo: "新能源电机测试试验室",
      description: "海康",
      videoservicestatus: "运行",
      ipaddress: "192.168.34.32",
      createtime: "76d",
      principal: "王霸天",
    },
  ];

  private gridData = [];

  constructor(
    private userinfo: UserInfoService,
    private http: HttpserviceService,
    private publicmethod: PublicmethodService,
    private dialogService: NbDialogService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");

    this.get_tree_selecetdata();
  }

  ngOnInit(): void {
    // agGrid
    var that = this;
    this.active = {
      field: "action",
      headerName: "操作",
      cellRendererFramework: ActionComponent,
      pinned: "right",
      resizable: true,
      flex: 1,
      width: 100,
      cellRendererParams: {
        clicked: function (data: any) {
          if (data["active"] === "edit") {
            that.edit(data["data"]);
          } else if (data["active"] === "remove") {
            that.del(data["data"]);
          } else {
            var loginname = { loginname: data["data"][0]["loginname"] };
            console.log("*********************************\n");
            console.log("data>>", loginname);
            console.log("*********************************\n");
          }
        },
      },
    };

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicmethod.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  ngAfterViewInit() {
    this.tableDatas.columnDefs.push(this.active);
    // 初始化aggrid
    this.inttable();
  }
  // 得到下拉框的数据
  get_tree_selecetdata() {
    var columns = {
      employeeid: this.employeeid,
    };
    this.http
      .callRPC("deveice", "dev_get_device_type", columns)
      .subscribe((result) => {
        var res = result["result"]["message"][0];

        if (res["code"] === 1) {
          // 部门信息
          var department_list = [
            { id: 1, label: "动力中心" },
            { id: 6, label: "资产" },
            { id: 7, label: "新能源" },
          ];
          this.department.init_select_tree(res["message"][0]["groups"]);
          // 设备类别  devicetpye
          var devicetpye = [
            { id: 1, label: "GT-2030-123" },
            { id: 2, label: "GT-2030-149" },
            { id: 3, label: "GT-2030-230" },
            { id: 4, label: "GT-2030-359" },
            { id: 5, label: "GT-2030-666" },
          ];
          this.devicetpye.init_select_trees(res["message"][0]["type"]);
        }
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
      // case 'import':
      //   this.import();
      //   break;
      case "download":
        this.download("视频集成服务器管理");
        break;
    }
  }
  // 新增、添加
  add() {
    this.dialogService
      .open(AddEditVideoIntegrationComponent, {
        closeOnBackdropClick: false,
        context: {
          title: "新增视频服务器",
          content: false,
          rowData: [],
        },
      })
      .onClose.subscribe((res) => {
        if (res) {
          // 更新数据
          this.gridData = [];
          this.loading = true;
          this.update_agGrid();
          this.loading = false;
        }
      });
  }

  // 删除
  del(active_data?) {
    console.log("视频集成服务器管理：删除>>>", active_data);
    var rowdata;
    if (active_data) {
      rowdata = active_data;
    } else {
      rowdata = this.agGrid.getselectedrows();
    }

    // 删除，至少一行数据
    if (rowdata.length < 1) {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          autoFocus: true,
          context: {
            title: "提示",
            content: "请选择一行数据！",
          },
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
          this.http
            .callRPC(this.TABLE, this.DMETHOD, rowdata)
            .subscribe((result) => {
              var res = result["result"]["message"][0];
              if (res["code"] === 1) {
                this.delsuccess();
                this.RecordOperation("删除", 1, "视频集成服务器管理");
                // 更新数据
                this.gridData = [];
                this.loading = true;
                this.update_agGrid();
                this.loading = false;
              } else {
                this.deldanger();
                this.RecordOperation("删除", 1, "视频集成服务器管理");
              }
            });
        });
    }
  }

  // 修改、编辑
  edit(active_data?) {
    console.log("视频集成服务器管理：修改、编辑>>>", active_data);
    var rowdata;
    if (active_data) {
      rowdata = active_data;
    } else {
      rowdata = this.agGrid.getselectedrows();
    }
    // 每次编辑一条
    if (rowdata.length == 1) {
      this.dialogService
        .open(AddEditVideoIntegrationComponent, {
          closeOnBackdropClick: false,
          context: {
            title: "编辑视频服务器",
            content: true,
            rowData: rowdata,
          },
        })
        .onClose.subscribe((res) => {
          if (res) {
            // 更新数据
            this.gridData = [];
            this.loading = true;
            this.update_agGrid();
            this.loading = false;
          }
        });
    } else {
      this.dialogService
        .open(EditDelTooltipComponent, {
          closeOnBackdropClick: false,
          autoFocus: true,
          context: {
            title: "提示",
            content: "请选择一行数据！",
          },
        })
        .onClose.subscribe((istrue) => {});
    }
  }

  // input 传入的值
  inpuvalue(inpuvalue) {
    if (inpuvalue != "") {
      console.log("传入的值设备名称----->", inpuvalue);
      // this.query(inpuvalue);
    }
  }

  // 搜索按钮
  query() {
    var inittable_before = this.inittable_before();
    // console.error("inittable_before>>>>>>>>>>>>>>", inittable_before);

    if (
      inittable_before.cameraname == "" &&
      inittable_before.group.length == 0 &&
      inittable_before.devicetpye.length == 0
    ) {
      this.dialogService.open(EditDelTooltipComponent, {
        closeOnBackdropClick: false,
        context: { title: "提示", content: `缺少搜索条件！` },
      });
    } else {
      var offset;
      var limit;
      var PageSize;

      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
      var colmun = {
        offset: offset,
        limit: limit,
        employeeid: inittable_before.employeeid,
        group: inittable_before.group,
        devicetype: inittable_before.devicetpye,
        cameraname: inittable_before.cameraname,
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
          this.gridData = [];
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = get_employee_limit["numbers"]
            ? get_employee_limit["numbers"][0]["numbers"]
            : "未得到总条数";
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
          // 刷新table后，改为原来的！
          this.tableDatas.isno_refresh_page_size = false;
          this.RecordOperation("搜索", 1, "视频集成服务器管理");
        } else {
          this.RecordOperation("搜索", 0, "视频集成服务器管理");
        }
      });
    }
  }

  // 导出
  download(title) {
    this.agGrid.download(title);
  }

  // 刷新table----
  refresh_table() {
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    this.myinput.del_input_value();
    this.department.dropselect();
    this.devicetpye.dropselect();
    this.inttable();
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event) {
    // console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  // 初始化前确保 搜索条件
  inittable_before() {
    var department = this.department.getselect(); // 部门信息
    var devicetpye =
      this.devicetpye?.getselect() === undefined
        ? ""
        : this.devicetpye?.getselect(); // 设备类型
    var asset_number = this.myinput.getinput(); // 边缘网关
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      group: department.split(";")[0] == [""] ? [] : department.split(";"),
      devicetpye: devicetpye,
      cameraname: asset_number,
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
      employeeid: inittable_before.employeeid,
      group: inittable_before.group,
      devicetype: inittable_before.devicetpye,
      cameraname: inittable_before.cameraname,
    };
    var table = this.TABLE;
    var methond = this.METHOD;
    this.http.callRPC(table, methond, colmun).subscribe((res) => {
      console.log("-----------man-kpi-table---", res);
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
        this.RecordOperation("查看", 1, "视频集成服务器管理");
      } else {
        this.RecordOperation("查看", 0, "视频集成服务器管理");
      }
    });
  }

  update_agGrid(event?) {
    var inittable_before = this.inittable_before();
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
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
      employeeid: inittable_before.employeeid,
      group: inittable_before.group,
      devicetype: inittable_before.devicetpye,
      cameraname: inittable_before.cameraname,
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
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation("查看", 1, "视频集成服务器管理");
      } else {
        this.RecordOperation("查看", 0, "视频集成服务器管理");
      }
    });
  }

  // 点击行数据 子组件调用
  clickrow(data) {
    // localStorage.setItem("man_kpi_for_detail", JSON.stringify(data))
  }

  delsuccess() {
    this.publicmethod.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "删除成功!",
    });
  }
  deldanger() {
    this.publicmethod.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "删除失败!",
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
