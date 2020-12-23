import { Component, OnInit,ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';

import { TargetHourConfigComponent as ChangeTargetHourConfigComponent} from '../../../pages-popups/tongji/target-hour-config/target-hour-config.component';

@Component({
  selector: 'ngx-target-hour-config',
  templateUrl: './target-hour-config.component.html',
  styleUrls: ['./target-hour-config.component.scss']
})
export class TargetHourConfigComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid:any;
  @ViewChild("eimdevicetpye") eimdevicetpye:any; // 设备类型
  @ViewChild("myYear") myYear:any; // 年
  @ViewChild("myMonth") myMonth:any; // 年

  TABLE = "device";
  METHOD = "dev_get_target_time_search";

  loading: boolean = false;
  button; // 权限button
  refresh = false; // 刷新tabel

  eimdevicetpye_placeholder = "请选择设备类型"
  // 用户id
  employeeid = this.userinfo.getEmployeeID()

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定左侧
      { field: 'month', headerName: '月份', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true,resizable: true, minWidth: 10},
      { field: 'devicename', headerName: '设备名称', minWidth: 50,resizable: true, },
      { field: 'deviceno', headerName: '设备编号', minWidth: 50,resizable: true, },
      { field: 'group', headerName: '科室/功能组',  resizable: true, minWidth: 10},
      { field: 'targettime', headerName: '每日目标时长(h)', resizable: true, minWidth: 10},
      { field: 'numberdaily', headerName: '计数天数(d)', resizable: true, minWidth: 10},
      { field: 'totaltime', headerName: '总目标时长(h)', resizable: true, minWidth: 10}, 
      { field: 'lastupdateon', headerName: '更新时间', resizable: true, minWidth: 10},
      { field: 'lastupdatedby', headerName: '更新人', resizable: true, minWidth: 10},


    ],
    rowData: [ // data
    ]
  };

  private gridData = [];

  constructor(private userinfo:UserInfoService, private http:HttpserviceService,
    private dialogService: NbDialogService  
  ) { 
    // 会话过期
    localStorage.removeItem("alert401flag");

    // 选择框
    this.get_tree_selecetdata();
  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(){
    // 初始化aggrid
    this.inttable();
  }

  query(){
    var year = this.myYear.getselect();
    var month = this.myMonth.getselect()
    var devicetype = this.eimdevicetpye.getselect()

    console.log("year, month, devicetype:",year, month, devicetype)
  }

  inittable_before(){


    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      month: this.myMonth.getselect(),
      year: this.myYear.getselect()
      
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
      month:inittable_before.month,
      year:inittable_before.year,
      
    }
    var table = this.TABLE;
    var methond = this.METHOD;
    this.http.callRPC(table, methond, colmun).subscribe((res)=>{
      console.log("-----------man-kpi-table---", res)
      var get_employee_limit = res['result']['message'][0]
      
      this.loading = false;
      if (get_employee_limit["code"]===1){
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
      }else{ //  模拟
        
        
      }
    })
  }


   // nzpageindexchange 页码改变的回调
   nzpageindexchange_ag(event){
    // console.log("页码改变的回调", event);
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  // 点击行数据 子组件调用
  clickrow(data){
    console.log("---------------->",data)
  }

  // 得到设备类型
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.employeeid,
    }
    this.http.callRPC("deveice","dev_get_device_groups",columns).subscribe(result=>{
      var res = result["result"]["message"][0]
      // console.log("得到下拉框的数据---------------->", res)
      if (res["code"] === 1){
        var eimdevicetpyedata = res["message"][0]["type"];
        this.eimdevicetpye.init_select_trees(eimdevicetpyedata);
      }
    })

  }

  // 修改目标工时
  change_target_hour(){
    // 得到选择的数据！
    var getselectedrows = this.agGrid.getselectedrows();
    console.log("得到选择的数据>>>", getselectedrows);
    // 得到月份！
    var get_month = this.myMonth.getselect();
    // 得到年份
    var get_year = this.myYear.getselect().slice(0, this.myYear.getselect().length -1);
    console.log("得到月份：", get_month, "得到年份:", get_year);

    // 传递的数据，1、month，2、设备唯一标识符！
    this.dialogService.open(ChangeTargetHourConfigComponent, {closeOnBackdropClick: false,context:{data: {month: Number(get_month), year: get_year}, deveiceids:[]}}).onClose.subscribe(result=>{

    })
  }

  // 刷新table
  refresh_table(){
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择
    this.myYear.reset_year();
    this.myMonth.reset_month()

    this.inttable();
  }

}
