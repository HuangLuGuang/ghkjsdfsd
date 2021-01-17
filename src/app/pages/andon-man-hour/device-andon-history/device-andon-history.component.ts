import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { TableDevicenameComponent } from '../../tongji/components/table-devicename/table-devicename.component';
import { TableGroupComponent } from '../../tongji/components/table-group/table-group.component';

declare let layui;
declare let $;

@Component({
  selector: 'ngx-device-andon-history',
  templateUrl: './device-andon-history.component.html',
  styleUrls: ['./device-andon-history.component.scss']
})
export class DeviceAndonHistoryComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid:any;

  loading: boolean = false;
  button; // 权限button
  refresh = false; // 刷新tabel

  // 用户id
  employeeid = this.userinfo.getEmployeeID()

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定左侧
      // { field: 'devicename', headerName: '设备名称', width: 160,resizable: true, cellRendererFramework:TableDevicenameComponent, sortable: true},
      { field: 'group', headerName: '科室功能组', cellRendererFramework:TableGroupComponent,fullWidth: true,headerCheckboxSelection: true,checkboxSelection: true,width: 400, resizable: true, sortable: true},
      { field: 'devicename', headerName: '设备名称',cellRendererFramework: TableDevicenameComponent, width: 200, resizable: true, sortable: true},
      { field: 'deviceno', headerName: '设备编号', width: 130, resizable: true, sortable: true},
      { field: 'deviceid', headerName: '设备ID', width: 150, resizable: true, sortable: true},
      { field: 'recordtime', headerName: '状态变更时间', width: 200, resizable: true, sortable: true},
      { field: 'status', headerName: '设备状态', width: 150, resizable: true, sortable: true},
      { field: 'createdby', headerName: '执行人', width: 150, resizable: true, sortable: true},
      { field: 'errmsg', headerName: '故障描述', width: 170, resizable: true, sortable: true, flex:1},
      // { field: 'group', headerName: '科室/功能组',  resizable: true, width: 330,cellRendererFramework: TableGroupComponent, sortable: true},
      
      


    ],
    rowData: [ // data
    ]
  };

  private gridData = [];

  active; // aggrid 操作

  date_reange; // 选择的日期范围


  constructor(private userinfo: UserInfoService,private http: HttpserviceService,private dialogService: NbDialogService, 
    private   publicservice: PublicmethodService,private datepip: DatePipe,private router: Router,
  ) { 
    // 会话过期
    localStorage.removeItem("alert401flag");

    var start_end = this.get_start_end();
    this.date_reange = start_end.start + ' - ' + start_end.end
  }

  device_andon_history_status; // 设备安灯历史状态传递的数据
  ngOnInit(): void {
    // 日期
    this.init_date_range();

    this.device_andon_history_status = JSON.parse(localStorage.getItem("device_andon_history_status"));
    console.error("设备安灯历史状态传递的数据", this.device_andon_history_status);

    
    this.button = JSON.parse(localStorage.getItem('buttons_list'))

  }

  ngAfterViewInit(){
    // 初始化table
    this.inttable();
  }
  // 返回 设备安灯状态信息
  goback(){
    var link = this.device_andon_history_status["link"];
    this.router.navigate([link])
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
      //   this.change_target_hour();
      //   break;
      // case 'query':
      //   this.query();
      //   break;
      // case 'import':
      //   this.importfile();
      //   break;
      case 'download':
        // this.download('工时KPI报表')
        this.download()
        break;
    }

  }
  // 导出
  download(){
    this.agGrid.download('设备安灯历史状态');
  }
  // 搜索
  query(){
    var inttable_before = this.inttable_before();
    var offset;
    var limit;
    var PageSize;
    var table = 'andon';
    var method = 'pc_device_status_historylog';
    var colums = {
      deviceid: inttable_before.deviceid,
      starttime: inttable_before.starttime,
      endtime: inttable_before.endtime,
      offset: offset, 
      limit: limit,
    }
    console.error("搜索：", colums);

    this.http.callRPC(table, method, colums).subscribe(result=>{
      var res = result["result"]["message"][0];
        if (res["code"]===1){
          this.loading = false
          var message = res["message"];
          this.gridData = [];
          this.tableDatas.PageSize = PageSize;
          this.gridData.push(...message)
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = res['numbers']? res['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
          // 刷新table后，改为原来的！
          this.tableDatas.isno_refresh_page_size = false;
          this.RecordOperation('搜索', 1,  "设备安灯历史状态:"+JSON.stringify(colums));
        }else{
          this.RecordOperation('搜索', 0,  "设备安灯历史状态:"+JSON.stringify(res["message"]));
          var data = res["message"];
          this.danger(data);
        }
      
    })
  }

  // 重置table
  refresh_table(){
    this.reset_mydate(); // 重置日期
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    this.loading = false;
    this.refresh = false;
  }

  // table
  inttable_before(){
    var date_reange = this.date_reange;
    return {
      limit: this.agGrid.get_pagesize(),
      deviceid:this.device_andon_history_status["deviceid"],
      starttime: date_reange.split(" - ")[0],
      endtime: date_reange.split(" - ")[1],
    }
  }

  // 初始化table
  inttable(event?){
    var inttable_before = this.inttable_before();
    var offset;
    var limit;
    var PageSize;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize? Number(event.PageSize):10;
    }else{
      offset = 0;
      limit = inttable_before.limit;
      PageSize = inttable_before.limit;
    }
    var colums = {
      offset: offset, 
      limit: limit,
      employeeid:this.userinfo.getEmployeeID(),
      starttime: inttable_before.starttime,
      endtime: inttable_before.endtime,
      deviceid: inttable_before.deviceid,
    }
    var table = 'andon';
    var method = "pc_device_status_historylog";
    this.http.callRPC(table,method,colums).subscribe(result=>{
      var res = result["result"]["message"][0];
      if (res["code"]===1){
        this.loading = false;
        var message = res["message"];
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = res['numbers']? res['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation('查看', 1,  "设备安灯历史状态:"+JSON.stringify(colums));
      }else{this.RecordOperation('查看', 0,  "设备安灯历史状态:"+ JSON.stringify(res["message"]));}
    })
  }
  
  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event){
    // console.log("页码改变的回调", event);
    // this.loading = true;
    this.gridData = [];
    this.inttable(event);
    this.loading = false;
  }

  // 日期时间范围 date_reange
  init_date_range(){
    var that = this;
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      //日期时间范围
      laydate.render({
        elem: '#test10'
        ,type: 'datetime'
        ,format: "yyyy-MM-dd HH:mm:ss"
        ,range: true
        ,btns: ['confirm']
        ,value: that.date_reange
        ,done: function(value, date, endDate){
          that.date_reange = value;
          if (value === ""){
            // console.log("得到初始的日期时间对象  已经清空了:",that.init_value , "value", this.value  ); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            this.value = that.date_reange
          }
        }
      });
    });
  }
  // 得到日期
  getselect(){
    var date_range = this.date_reange;
    var date = date_range.split(' - ');
    // console.log("date--->", date)
    var date_list = date[0]===""?[]:date;
    return date_list
  }

  // 得到 日期范围： 本月1号-到现在
  get_start_end(){
    var curr_date = new Date();
    var curr_year = curr_date.getFullYear();
    var curr_month = curr_date.getMonth() + 1;

    var start = this.datepip.transform(new Date(curr_year, curr_month-1, 1), 'yyyy-MM-dd'); // start
    var end = this.datepip.transform(new Date(curr_year, curr_month, 0), 'yyyy-MM-dd');   // end
    return {
      start: start + " 00:00:00",
      end: end + " 00:00:00",
    }
  }


  // 重置日期范围 到默认的日期！
  reset_mydate(){
    var start_end = this.get_start_end();
    this.date_reange = start_end.start + ' - ' + start_end.end;
    this.init_date_range()
  }


  success(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:data});
  }
  danger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent: data});
  }

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
