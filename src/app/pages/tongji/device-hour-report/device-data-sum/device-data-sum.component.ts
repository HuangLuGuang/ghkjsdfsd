import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { TableGroupComponent } from '../../components/table-group/table-group.component';
import { ActionComponent } from '../action/action.component';



declare let $;

declare let layui;
@Component({
  selector: 'ngx-device-data-sum',
  templateUrl: './device-data-sum.component.html',
  styleUrls: ['./device-data-sum.component.scss']
})
export class DeviceDataSumComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid:any;
  @ViewChild("myinput") myinput:any;
  @ViewChild("groups") groups_func:any;
  @ViewChild("eimdevicetpye") eimdevicetpye:any;
  @ViewChild("myYear") myYear:any; // 年
  @ViewChild("myMonth") myMonth:any; // 月

  TABLE = "device";
  METHOD = "dev_get_device_ratio";

  loading: boolean = false;
  groups_placeholder = "请选择科室/功能组";     // 科室/功能组 
  eimdevicetpye_placeholder = "请选择设备统计归类"; // 设备统计归类
  myinput_placeholder = "请输入设备名称";       // 设备名称
  button; // 权限button
  refresh = false; // 刷新tabel

  // 用户id
  employeeid = this.userinfo.getEmployeeID();


  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定左侧
      { field: 'deviceno', headerName: '设备编号', resizable: true, width: 150, headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true,},
      { field: 'devicename', headerName: '设备名称',fullWidth: true,resizable: true, width: 160,},
      { field: 'deviceid', headerName: '设备ID',  resizable: true,fullWidth: true, width: 200,},
      // { field: 'groups', headerName: '科室/功能组', resizable: true, fullWidth: true,width: 330,},
      { field: 'groups', headerName: '科室/功能组', resizable: true, fullWidth: true,width: 330,cellRendererFramework:TableGroupComponent},
      { field: 'linklevel', headerName: '设备关重度', resizable: true,fullWidth: true,width: 130,},
      { field: 'devicetype', headerName: '设备统计归类', resizable: true, fullWidth: true,width: 130,}, //设备类型
      { field: 'month', headerName: '月份', resizable: true, fullWidth: true,width: 100,},
      { field: 'totaltime', headerName: '总目标时长(h)', resizable: true, fullWidth: true,width: 130,},
      { field: 'running', headerName: '运行时长(h)', resizable: true, fullWidth: true,width: 130,},
      { field: 'stop', headerName: '空闲时长(h)', resizable: true, fullWidth: true,width: 130,},
      { field: 'warning', headerName: '维修时长(h)', resizable: true, fullWidth: true,width: 130,},
      { field: 'placeon', headerName: '占位时长(h)', resizable: true,fullWidth: true, width: 130,}, 
      { field: 'ratio', headerName: '利用率(%)', resizable: true, fullWidth: true,width: 130,},
      { field: 'rate', headerName: '开动率(%)', resizable: true, fullWidth: true,width: 130,},
      {field: 'option', headerName: '详情', resizable: true, fullWidth: true,width: 100,cellRendererFramework: ActionComponent, pinned: 'right',}

    ],
    rowData: [ // data
    ]
  };

  private gridData = [];


  constructor(private http: HttpserviceService, 
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private dialogService: NbDialogService,
    private datepip: DatePipe) { 

      // 会话过期
      localStorage.removeItem("alert401flag");
      // 选择框
      this.get_tree_selecetdata();

  }

  ngOnInit(): void {
    


    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      console.log("得到pathname --在得到button\t\t", result)
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })

  }

  ngAfterViewInit(){
    // 初始化aggrid
    this.inttable();
  }

  // 得到下拉框的数据
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.employeeid,
    }
    // dev_get_device_type dev_get_device_groups
    this.http.callRPC("deveice","dev_get_device_type",columns).subscribe(result=>{
      var res = result["result"]["message"][0]
      // console.log("得到下拉框的数据---------------->", res)
      if (res["code"] === 1){
        var groups = res["message"][0]["groups"];
        
        this.groups_func.init_select_tree(groups);
        var eimdevicetpyedata = res["message"][0]["type"];
        this.eimdevicetpye.init_select_trees(eimdevicetpyedata);
      }
    })
  }

  // button按钮
  action(actionmethod){
    var method = actionmethod.split(":")[1];
    // console.log("--------------->method", method)
    switch (method) {
      // case 'add':
      //   this.add();
      //   break;
      // case 'del':
      //   this.del();
      //   break;
      // case 'edit':
      //   this.edit();
      //   break;
      case 'query':
        this.query();
        break;
      // case 'import':
      //   this.importfile();
      //   break;
      case 'download':
        // this.download('工时KPI报表')
        this.download()
        break;
    }

  }


  // input 传入的值
  inpuvalue(inpuvalue){
    if (inpuvalue != ""){
      console.log("传入的值资产编号----->",inpuvalue);
      this.query(inpuvalue);
    }
  }

  // 搜索
  query(inpuvalue?){
    this.gridData = [];
    this.inttable();
  }

  // 导出
  download(){
    this.agGrid.download('设备工时报表')
  }

  // aggrid==================================
  // 得到 start end 根据month(一月\二月)
  get_start_end(){
    var month = this.myMonth.getselect();
    var year = this.myYear.getselect();
    var month_value = {
      "一月": 1,
      "二月": 2,
      "三月": 3,
      "四月": 4,
      "五月": 5,
      "六月": 6,
      "七月": 7,
      "八月": 8,
      "九月": 9,
      "十月": 10,
      "十一月": 11,
      "十二月": 12,
    };
    month = month_value[month];
    year = Number(year.split("年")[0]);
    var start = this.datepip.transform(new Date(year, month-1, 1), 'yyyy-MM-dd'); // start
    var end = this.datepip.transform(new Date(year, month, 0), 'yyyy-MM-dd');   // end
    // var current = new Date()
    // var start = this.datepip.transform(new Date(current.getFullYear(), current.getMonth(), 1),  'yyyy-MM-dd'); // 当前start
    // var end = this.datepip.transform(new Date(current.getFullYear(), current.getMonth() + 1, 0), 'yyyy-MM-dd');   // end
    return {
      start: start,
      end: end
    }
  }

  // 初始化前确保 搜索条件 
  inittable_before(){

    var get_start_end = this.get_start_end();

    var devicename = this.myinput?.getinput()===undefined?"":this.myinput?.getinput();// 资产编号
    // 科室/功能组
    var groups_data = this.groups_func?.getselect();
    // 设备类型
    var device_tpye_data = this.eimdevicetpye?.getselect();
    // 将科室/功能组，转为列表
    var groups_data_ = groups_data ===""?[] :groups_data.split(";");
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      devicename: devicename === ""?[]:[devicename],
      group: groups_data_,
      type:device_tpye_data,
      month: this.myMonth.getselect(),
      year: this.myYear.getselect(),
      start: get_start_end.start,
      end: get_start_end.end,
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
      employeeid: this.employeeid,
      devicename:inittable_before.devicename,
      group:inittable_before.group,
      type:inittable_before.type,
      month: this.myMonth.getselect(),
      year: this.myYear.getselect(),
      start: inittable_before.start,
      end: inittable_before.end,
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
        this.add_detail_kpi(message);
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation('查看', 1,  "设备/工时报表");
      }else{
        this.RecordOperation('查看', 0,  "设备/工时报表");
      }
    })
  }

  // 添加详情link
  add_detail_kpi(datas:any[]){
    // var option = '/pages/tongji/deviceKpiReport/kpidetail';
    var option = '/pages/tongji/device_hour_report/kpidetail';
    datas.forEach(data=>{
      data["option"] =  option
    })
    // 需要将 startime、endtime
  }


  // 刷新table----
  refresh_table(){
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择的数据 delselect
    this.myYear.reset_year();
    this.myMonth.reset_month();
    this.myinput.del_input_value();
    this.groups_func.dropselect();
    this.eimdevicetpye.dropselect();
    this.inttable();
  }

  // 点击行数据 子组件调用
  clickrow(data){
    // localStorage.setItem("man_kpi_for_detail", JSON.stringify(data))
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    // console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }


  // option_record
  RecordOperation(option, result,infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.employeeid;
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }
  }

  

}