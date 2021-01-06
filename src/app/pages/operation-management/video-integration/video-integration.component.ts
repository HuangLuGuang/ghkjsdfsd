import { Component, OnInit,ViewChild } from '@angular/core';

import { VIDEO_INTEGRATION_SETTINGS } from '../table_settings';

import {LocalDataSource} from "@mykeels/ng2-smart-table";
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'ngx-video-integration',
  templateUrl: './video-integration.component.html',
  styleUrls: ['./video-integration.component.scss']
})
export class VideoIntegrationComponent implements OnInit {

  @ViewChild("departmentselect") departmentselect:any; // 部门信息
  @ViewChild("device_tpye") device_tpye:any;           // 设备类型
  @ViewChild("asset_number") asset_number:any;         // 摄像头

  @ViewChild("ag_Grid") agGrid: any;

  
  // 下拉框---部门
  departments = {
    name: "部门信息",
    placeholder: '请选择部门',
    groups:[
      { title: '动力', datas: [{ name: '动力-1' },{ name: '动力-2' },{ name: '动力-3' },{ name: '动力-4' }] },
      { title: '资产', datas: [{ name: '资产-1' },{ name: '资产-2' },{ name: '资产-3' },{ name: '资产-4' }] },
      { title: '新能源', datas: [{ name: '新能源-1' },{ name: '新能源-2' },{ name: '新能源-3' },{ name: '新能源-4' }] },
    ]
  };

  // 下拉框---设备类型
  devicetpye = {
    placeholder: "请选择设备类型",
    name: '设备类型',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }

  // 下拉框---摄像头
  camera = {
    placeholder: "请选择摄像头",
    name: '摄像头',
    datas: [
      { name: 'GT1918-1720TM' },
      { name: 'GT1917-1819TM' },
      { name: 'GT1916-1919TM' },
      { name: 'GT1915-2018TM' },
      { name: 'GT1914-2117TM' },
      { name: 'GT1913-2216TM' },
    ]
  }

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
      { field: 'id', headerName: '序号',  headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 30,resizable: true,},
      { field: 'cameraIP', headerName: '摄像头IP', resizable: true,},
      { field: 'territory', headerName: '负责区域', resizable: true,},
      { field: 'departmentInfo', headerName: '部门信息', resizable: true,},
      { field: 'description', headerName: '描述', resizable: true,},
      { field: 'videoServiceStatus', headerName: '视频服务器状态', resizable: true,},
      { field: 'ipAddress', headerName: 'IP地址', resizable: true,minWidth:10,},
      { field: 'continueTime', headerName: '持续时间', resizable: true,minWidth:10,},
      { field: 'principal', headerName: '负责人', resizable: true,minWidth:10,}, // 编辑、删除
    ],
    rowData: [ // data
    ]
  };

  message = [
    { id: '1', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '2', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"停止", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '3', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"维护", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '4', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"故障", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '5', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '6', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '7', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '8', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '9', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '10', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '11', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '12', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '13', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '14', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '15', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '16', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '17', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '18', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '19', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '20', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '21', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '22', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '23', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
    { id: '24', cameraIP: '192.168.3.3', territory:'电机测试系统台架', departmentInfo: '新能源电机测试试验室', description:'海康', videoServiceStatus:"运行", ipAddress: '192.168.34.32', continueTime: '76d', principal: '王霸天'},
  ];

  private gridData = [];

 
  constructor(private userinfo:UserInfoService,private http: HttpserviceService,private publicmethod: PublicmethodService) { 
     // 会话过期
     localStorage.removeItem("alert401flag");
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
        this.download('视频集成服务器管理')
        break;
    }
  }
  // 新增、添加
  add(){}

  // 删除
  del(active_data?){
    console.log("视频集成服务器管理：删除>>>",active_data)
  }
  
  // 修改、编辑
  edit(active_data?){
    console.log("视频集成服务器管理：修改、编辑>>>",active_data)
  }

  // 搜索按钮
  query(){
    var departmentselect_data = this.departmentselect.getselect();
    var device_tpye_data = this.device_tpye.getselect();
    var asset_number_data = this.asset_number.getselect();
    // var daterange_data = this.daterange.getselect()
    console.log("<------------搜索----------->", departmentselect_data, device_tpye_data,asset_number_data,);
    // this.test_task_table_data.source = null;
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }

  // 导出
  download(title){
    this.agGrid.download(title);
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
    // this.myinput.del_input_value();
    // this.groups_func.dropselect();
    // this.eimdevicetpye.dropselect();
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

    var departmentselect = this.departmentselect.getselect(); // 部门信息
    var device_tpye = this.device_tpye?.getselect()===undefined?"":this.device_tpye?.getselect();// 设备类型
    var asset_number = this.asset_number?.getselect(); // 视频集成服务器管理
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      departmentselect: departmentselect,
      device_tpye: device_tpye,
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
      departmentselect: inittable_before.departmentselect,
      device_tpye: inittable_before.device_tpye,
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

  // 点击行数据 子组件调用
  clickrow(data){
    // localStorage.setItem("man_kpi_for_detail", JSON.stringify(data))
  }

}
