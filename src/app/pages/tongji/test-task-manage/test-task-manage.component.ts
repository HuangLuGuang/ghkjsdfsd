import { Component, OnInit, ViewChild } from '@angular/core';


import * as XLSX from 'xlsx';

import {LocalDataSource} from "@mykeels/ng2-smart-table";

import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';

declare let layui;

declare let $;

// 要渲染的组件
import { TaskProgressForAggridComponent } from './task-progress-for-aggrid/task-progress-for-aggrid.component';
import { UserInfoService } from '../../../services/user-info/user-info.service';

@Component({
  selector: 'ngx-test-task-manage',
  templateUrl: './test-task-manage.component.html',
  styleUrls: ['./test-task-manage.component.scss']
})
export class TestTaskManageComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid:any;
  @ViewChild("taskno") taskno:any;
  @ViewChild("eimdevicetpye") eimdevicetpye:any;
  @ViewChild("data_range") data_range:any;
  @ViewChild("myinput") myinput:any;

  // 导出文件名
  filename;

  // 发送给日期
  test_task_manage = {
    divice_kpi_report: false,
    test_task_manage: true,
    man_hourkpi: false,
  };





  // 日期范围
  date_ranges = "device_kpi_date_range"

  // 得到table method
  GETTABLE = "dev_get_device_taskinfo_search";

  constructor(private publicservice: PublicmethodService, private http: HttpserviceService,
    private userinfo: UserInfoService) { 
    // 会话过期
    localStorage.removeItem("alert401flag");
    // 选择框
    this.get_tree_selecetdata();
  }

  groups_placeholder = "请选择任务单号";     // 任务单号
  eimdevicetpye_placeholder = "请选择设备类型"; // eim 设备类型
  myinput_placeholder = "请输入设备名称";
  button; // 权限button
  refresh = false; // 刷新tabel
  loading: boolean = false;
  init_value = "2010-10-01 - 2020-11-21" // 默认日期

  ngOnInit(): void {
    // 初始化日期
    this.initdate();
    
  }
  
  ngAfterViewInit(){
    // 初始化agGrid
    this.inttable();

    // 得到pathname --在得到button
    console.log("得到pathname --在得到button\t\t")
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      console.log("得到pathname --在得到button\t\t", result)
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })

  }

  // 初始化日期范围
  initdate(){
    var date_ranges = this.date_ranges
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      //日期范围
      laydate.render({
        elem: '#test_task_manage'
        ,range: true
        // ,trigger: 'click'//呼出事件改成click
        ,done: function(value, date, endDate){
          localStorage.setItem(date_ranges, JSON.stringify(value))
          console.log(value); //得到日期生成的值，如：2017-08-18
          console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
          console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
      });


    })
  }

  // 得到日期
  getselect(){
    var date_range = localStorage.getItem(this.date_ranges)? localStorage.getItem(this.date_ranges): false;
    if (date_range){
      var date = JSON.parse(date_range).split(' - ');
      console.log("date--->", date)
      var date_list = date;
      localStorage.removeItem(this.date_ranges)
      return date_list
    }
    // var date_list = [this.datepipe.transform(this.selectedMoments[0],'yyyy-MM-dd'), this.datepipe.transform(this.selectedMoments[1],'yyyy-MM-dd')];
    // return date_list;
  }

  // button按钮
  action(actionmethod){
    console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    console.log("--------------->method", method)
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
        this.download('试验任务管理')
        break;
    }

  }

  // 得到下拉框的数据
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.userinfo.getEmployeeID(),
    }
    this.http.callRPC("deveice","dev_get_device_groups",columns).subscribe(result=>{
      var res = result["result"]["message"][0]
      console.log("得到下拉框的数据---------------->", res)
      if (res["code"] === 1){
        var groups = res["message"][0]["groups"];
       
        this.taskno.init_select_tree(groups);
        var eimdevicetpyedata = res["message"][0]["type"];
        this.eimdevicetpye.init_select_trees(eimdevicetpyedata);
      }
    })
  }

  // input 传入的值
  inpuvalue(inpuvalue){
    if (inpuvalue != ""){
      console.log("传入的值设备名称----->",inpuvalue);
      this.query(inpuvalue);
    }
  }


  // 搜索按钮
  query(inpuvalue?){
    var devicename;
    if (inpuvalue){
      devicename = inpuvalue;
    }else{
      devicename = this.myinput?.getinput();// 设备名称
    }
    // 设备名称 devicename
    // var devicename = $("#devicename").val();
    // 科室/功能组
    var groups_data = this.taskno.getselect();
    // 设备类型
    var device_tpye_data = this.eimdevicetpye.getselect();
    // 日期范围
    var daterange_data = this.data_range.getselect()
    // 将科室/功能组，转为列表
    var groups_data_ = groups_data ===""?[] :groups_data.split(";");
    // 搜索的 时间范围 daterange 必选，修改为 start end
    console.log("**************\n")
    var columns = {
      offset: 0, 
      limit: 10,
      employeeid: this.userinfo.getEmployeeID(),
      devicename: [devicename],
      group: groups_data_,
      start:daterange_data[0],
      end:daterange_data[1],
      eimdevicetype:device_tpye_data
    }
    console.log("**************\n", columns);
      // 执行搜索函数！
      this.http.callRPC('device', "dev_get_kpi_device_search",columns).subscribe(result=>{
        console.log("执行搜索函数！\n\n\n",result)
        var tabledata = result["result"]["message"][0];
        this.loading = false;
        if (tabledata["code"] === 1){
          var message = tabledata["message"];
          this.gridData = [];
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation('搜索', 1,  "设备报表")
        }else{this.RecordOperation('搜索', 0,  "设备报表")}
      })
      
  }

  // 导出文件
  download(title){
    this.agGrid.download(title);
  };

  // 刷新tabel
  refresh_table(){
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
  }

  // 得到buttons----------------------------------------------------------

  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    CellRender: {
      task_progress: "TaskProgressForAggridComponent",
    }, // 这是单元格要渲染的 组件！
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度, pinned: 'left'
      { field: 'id', headerName: '序号', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true,  minWidth: 5,maxwidth: 15,resizable: true},
      { field: 'rate', headerName: '任务进度', resizable: true, minWidth: 10, cellRendererFramework: TaskProgressForAggridComponent,},
      { field: 'devicename', headerName: '设备名称',  resizable: true, minWidth: 10},
      // { field: 'department', headerName: '部门信息', resizable: true, minWidth: 10},
      { field: 'deviceid', headerName: '设备id',  resizable: true, minWidth: 10},
      { field: 'belonged', headerName: '负责人',  resizable: true, minWidth: 10},
      { field: 'tasknum', headerName: '任务单号', resizable: true, minWidth: 10},
      { field: 'taskchildnum', headerName: '任务子单号', resizable: true, minWidth: 10},
      
      // { field: 'departmentInfo', headerName: '自定义统计时间(默认最近一周)', 
      //   children:[
      //     { field: 'starttime', headerName: '开始时间', resizable: true},
      //     { field: 'endtime', headerName: '结束时间', resizable: true},
      //   ]
      // },

      { field: 'taskstart', headerName: '试验开始时间', resizable: true, minWidth: 10}, // 自定义设备编号！
      { field: 'taskend', headerName: '试验结束时间', resizable: true, minWidth: 10},
      { field: 'numberstime', headerName: '试验持续时长(h)', resizable: true, minWidth: 10},


      { field: 'lastupdateon', headerName: '数据更新时间', resizable: true, minWidth: 10},
    ],
    rowData: [ // data
    ]
  };

  private gridData = [];

  inttable(event?){
    var offset;
    var limit;
    var PageSize;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize? Number(event.PageSize):10;
    }else{
      offset = 0;
      limit = 10;
      PageSize = 10;
    }
    var colmun = {
      start: this.init_value.split(" - ")[0],
      end: this.init_value.split(" - ")[1],
      offset: offset,
      limit: limit,
      employeeid:this.userinfo.getEmployeeID(),
      devicename: "",
      group:[],
      eimdevicetype:[]
    }
    // 得到设备信息！
    this.http.callRPC('device', this.GETTABLE, colmun).subscribe((res)=>{
      console.log("得到设备信息=================>", res)
      var result  = res['result']['message'][0];
      if (result["code"]===1){
        this.loading = false;
        var message = result["message"];
        this.gridData = [];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = result['numbers']? result['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation('查看', 1,  "试验任务管理")
      }else{
        this.RecordOperation('查看', 0,  "试验任务管理")
      }
    })
  }

  update_agGrid(event?){
    var offset;
    var limit;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
    }else{
      offset = 0;
      limit = 50;
    }
    var colmun = {
      start: '2020-10-1',
      end: '2020-11-21',
      offset: offset,
      limit: limit,
      employeeid:this.userinfo.getEmployeeID(),
      devicename: "",
      group:[],
      eimdevicetype:[]
    }
    // 得到员工信息！
    this.http.callRPC('deveice', this.GETTABLE, colmun).subscribe((res)=>{
      var result = res['result']['message'][0]
      this.loading = false;
      // 发布组件，编辑用户的组件
      // this.publicservice.getcomponent(Add_Edit_DeviceManageComponent);
      // this.publicservice.getmethod("dev_delete_device");
      var message = result["message"];
      this.gridData.push(...message)
      this.tableDatas.rowData = this.gridData;
      var totalpagenumbers = result['numbers']? result['numbers'][0]['numbers']: '未得到总条数';
      this.tableDatas.totalPageNumbers = totalpagenumbers;
      this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
      // 刷新table后，改为原来的！
      this.tableDatas.isno_refresh_page_size = false;
    })

  }
      

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }
  // =================================================agGrid
  // option_record
  RecordOperation(option, result,infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }
  }
  

}
