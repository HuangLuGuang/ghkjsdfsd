import { Component, OnInit,ViewChild } from '@angular/core';

import { BORDER_GATEWAY_SETTINGS } from '../table_settings';

import {LocalDataSource} from "@mykeels/ng2-smart-table";
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'ngx-border-gateway',
  templateUrl: './border-gateway.component.html',
  styleUrls: ['./border-gateway.component.scss']
})
export class BorderGatewayComponent implements OnInit {
  @ViewChild("departmentselect") department:any;  // 部门信息
  @ViewChild("devicetpye") devicetpye:any;             // 设备类型
  @ViewChild("myinput") myinput:any;          // 边缘网关  
  @ViewChild("ag_Grid") agGrid: any;

  groups_placeholder = "请选择部门信息";
  eimdevicetpye_placeholder = "请选择设备类型";
  myinput_placeholder = "请输入资产编号";


  active; // aggrid 操作

  // 加载数据
  loading = false;
  refresh = false; // 刷新tabel
  button; // 权限button

  // 用户id
  employeeid = this.userinfo.getEmployeeID();

  TABLE = "device";
  METHOD = "dev_get_device_ratio";

  // agGrid
  tableDatas = {
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection
      { field: 'id', headerName: '序号',  headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 30,resizable: true, sortable: true},
      { field: 'deviceName', headerName: '设备名称', resizable: true, sortable: true},
      { field: 'edgeGatewayId', headerName: '边缘网关编号', resizable: true, sortable: true},
      { field: 'edgeGatewayStatus', headerName: '边缘网关开关状态', resizable: true, sortable: true},
      { field: 'dateGatherStatus', headerName: '数据采集状态', resizable: true, sortable: true},
      // { field: 'active', headerName: '是否启用', resizable: true, cellRendererFramework: TranActiveComponent,},
      { field: 'ipAddress', headerName: 'IP地址', resizable: true, sortable: true},
      { field: 'continueTime', headerName: '持续时间', resizable: true,minWidth:10, sortable: true},
      { field: 'heartTime', headerName: '心跳时间', resizable: true,minWidth:10, sortable: true},
    ],
    rowData: [ // data
    ]
  };

  message = [
    {id: '1', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '2', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "停止",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '3', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "维护",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '4', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "故障",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '5', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '6', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '7', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '8', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '9', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '10', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "运行",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '11', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "维护",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '12', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "故障",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
    {id: '13', deviceName: "AVL电机测试台架",edgeGatewayId: '110001768',departmentInfo:"新能源电机试验室",edgeGatewayStatus:"开机",dateGatherStatus: "故障",ipAddress: '192.168.8.108', continueTime: '44', heartTime:'2020-08-17'},
  ];

  private gridData = [];


  // 设备报表KPI报表 table数据
  border_gateway_table_data = {
    settings: BORDER_GATEWAY_SETTINGS,
    source: new LocalDataSource(),
  };

  constructor(private userinfo: UserInfoService, private http: HttpserviceService, private publicmethod:PublicmethodService) { 
    // 会话过期
    localStorage.removeItem("alert401flag");
    
    this.get_tree_selecetdata();
  }

  ngOnInit(): void {
    // agGrid
    var that = this;
    this.active = { field: 'action', headerName: '操作', cellRendererFramework: ActionComponent, pinned: 'right',resizable: true,flex: 1,width:100,
      cellRendererParams: {
        clicked: function(data: any) {
          if (data["active"]==='edit'){
            that.edit(data["data"]);
          }else if(data["active"]==='remove'){
            that.del(data["data"]);
          }else{
            var loginname = { loginname: data["data"][0]["loginname"] }
            console.log("*********************************\n")
            console.log("data>>",loginname)
            console.log("*********************************\n")
          }
        }
      },
    }

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicmethod.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })
  }

  ngAfterViewInit(){
    this.tableDatas.columnDefs.push(
      this.active
    )
    // 初始化aggrid
    this.inttable();
  }

  // 得到下拉框的数据
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.employeeid,
    }
    this.http.callRPC("deveice","dev_get_device_type",columns).subscribe(result=>{
      var res = result["result"]["message"][0]
      if (res["code"] === 1){
        // 部门信息
        var department_list = [
          { id:1,label: "动力中心", },
          { id:6,label: "资产",},
          { id:7,label: "新能源",},

        ];
        this.department.init_select_tree(department_list);
        // 设备类别  devicetpye
        var devicetpye = [
          { id: 1, label: "GT-2030-123"},
          { id: 2, label: "GT-2030-149"},
          { id: 3, label: "GT-2030-230"},
          { id: 4, label: "GT-2030-359"},
          { id: 5, label: "GT-2030-666"},
        ];
        this.devicetpye.init_select_trees(devicetpye);
        
      }
    })
   
    
  }

  action(actionmethod){
    var method = actionmethod.split(":")[1];
    // ====================================================
    switch (method) {
      case 'add':
        this.add();
        break;
      case 'del':
        this.del();
        break;
      case 'edit':
        this.edit();
        break;
      case 'query':
        this.query();
        break;
      // case 'import':
      //   this.import();
      //   break;
      case 'download':
        this.download('边缘网关管理')
        break;
    }
  }
  // 新增、添加
  add(){}

  // 删除
  del(active_data?){
    console.log("边缘网关：删除>>>",active_data)
  }
  
  // 修改、编辑
  edit(active_data?){
    console.log("边缘网关：修改、编辑>>>",active_data)
  }


  // 刷新table----
  refresh_table(){
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择的数据 delselect
    // this.myYear.reset_year();
    // this.myMonth.reset_month();
    this.myinput.del_input_value();
    this.department.dropselect();
    this.devicetpye.dropselect();
    this.inttable();
  }


  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    // console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  // 初始化前确保 搜索条件 
  inittable_before(){

    var department = this.department.getselect(); // 部门信息
    var devicetpye = this.devicetpye?.getselect()===undefined?"":this.devicetpye?.getselect();// 设备类型
    var asset_number = this.myinput.getinput(); // 边缘网关
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      department: department,
      devicetpye: devicetpye,
      asset_number:asset_number,
    }

  }

  inttable(event?){
    var inittable_before = this.inittable_before();
    var offset;
    var limit;
    var PageSize;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize? Number(event.PageSize):10;
    }else{
      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var colmun = {
      offset: offset,
      limit: limit,
      department: inittable_before.department,
      devicetpye: inittable_before.devicetpye,
      asset_number:inittable_before.asset_number,
    }
    var table = this.TABLE;
    var methond = this.METHOD;
    this.http.callRPC(table, methond, colmun).subscribe((res)=>{
      console.log("-----------man-kpi-table---", res)
      var get_employee_limit = res['result']['message'][0]
      this.loading = false;
      if(get_employee_limit["code"] === 1){
        // 发布组件，编辑用户的组件
        var message = res["result"]["message"][0]["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        // this.RecordOperation('查看', 1,  "设备/工时报表");
      }else{
        // this.RecordOperation('查看', 0,  "设备/工时报表");
        this.gridData.push(...this.message)
        this.tableDatas.rowData = this.gridData;
        this.tableDatas.totalPageNumbers = this.message.length;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
      }
    })
  }

  // input 传入的值
  inpuvalue(inpuvalue){
    if (inpuvalue != ""){
      console.log("传入的值设备名称----->",inpuvalue);
      // this.query(inpuvalue);
    }
  }

  // 搜索按钮
  query(){
    var department = this.department.getselect();
    var devicetpye_data = this.devicetpye.getselect();
    var myinput = this.myinput.getinput();
    // var daterange_data = this.daterange.getselect()
    console.log("<------------搜索----------->", department, devicetpye_data,myinput);
  }

  // 导出
  download(title){
    this.agGrid.download(title);
  }

  // 点击行数据 子组件调用
  clickrow(data){
    // localStorage.setItem("man_kpi_for_detail", JSON.stringify(data))
  }


}
