import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { EditDelTooltipComponent } from '../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';

import { TableDetailComponent } from './table-detail/table-detail.component';

declare let $;

declare let layui;


@Component({
  selector: 'ngx-man-kpi-table',
  templateUrl: './man-kpi-table.component.html',
  styleUrls: ['./man-kpi-table.component.scss']
})
export class ManKpiTableComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid:any;
  @ViewChild("groups") groups_func:any;
  @ViewChild("eimdevicetpye") eimdevicetpye:any;
  @ViewChild("data_range") data_range:any;
  @ViewChild("myinput") myinput:any;

 
  



  TABLE = "device";
  METHOD = "dev_get_device_status_search";

  loading: boolean = false;
  groups_placeholder = "请选择科室/功能组";     // 科室/功能组 
  eimdevicetpye_placeholder = "请选择设备类型"; // eim 设备类型
  myinput_placeholder = "请输入设备名称"
  button; // 权限button
  refresh = false; // 刷新tabel

  init_value = "2019-12-01 - 2020-12-21" // 默认日期

  // 用户id
  employeeid = this.userinfo.getEmployeeID()


  constructor(private http: HttpserviceService, 
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private dialogService: NbDialogService,
    ) {
      // 会话过期
      localStorage.removeItem("alert401flag");
      // 选择框
      this.get_tree_selecetdata();
   }

  ngOnInit(): void {
    


    // 得到pathname --在得到button
    // console.log("得到pathname --在得到button\t\t")
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      // console.log("得到pathname --在得到button\t\t", result)
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })

    

  }

  ngAfterViewInit(){
    // 初始化aggrid
    this.inttable();
  }



  // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })

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

  // 得到下拉框的数据
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.employeeid,
    }
    this.http.callRPC("deveice","dev_get_device_groups",columns).subscribe(result=>{
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

  // input 传入的值
  inpuvalue(inpuvalue){
    if (inpuvalue != ""){
      // console.log("传入的值设备名称----->",inpuvalue);
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
    var groups_data = this.groups_func.getselect();
    // 设备类型
    var device_tpye_data = this.eimdevicetpye.getselect();
    // 日期范围
    var daterange_data = this.data_range.getselect()
    // 将科室/功能组，转为列表
    var groups_data_ = groups_data ===""?[] :groups_data.split(";");
    // 搜索的 时间范围 daterange 必选，修改为 start end
    
    if(devicename == "" && device_tpye_data.length < 1 && groups_data_.length < 1 && daterange_data.length < 1){
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `请选择要搜索的数据！`}} ).onClose.subscribe(
        name=>{
          // console.log("----name-----", name);
        }
      );
    }else{
      var columns = {
        offset: 0, 
        limit: this.agGrid.get_pagesize(),
        employeeid: this.employeeid,
        devicename: [devicename],
        group: groups_data_,
        start:daterange_data[0],
        end:daterange_data[1],
        eimdevicetype:device_tpye_data
      }
      // 执行搜索函数！  
      var table = this.TABLE;
      var methond = this.METHOD;
      this.http.callRPC(table, methond ,columns).subscribe(result=>{
        var tabledata = result["result"]["message"][0];
        this.loading = false;
        if (tabledata["code"] === 1){
          var message = tabledata["message"];
          this.gridData = [];
          this.add_detail_kpi(message);
          this.gridData.push(...message);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation('搜索', 1,  "设备报表");
          if (message.length < 1){
            this.searchdanger();
          }
        }else{this.RecordOperation('搜索', 0,  "设备报表")}
      })
    }

      
  }

 
  // 导出
  download(){
    this.agGrid.download('工时报表')
  }

  // 刷新tabel
  refresh_table(){
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择的数据 delselect
    this.myinput.del_input_value();
    this.groups_func.dropselect();
    this.eimdevicetpye.dropselect();
    this.data_range.reset_mydate();


    this.inttable();


    
  }


  // 点击行数据 子组件调用
  clickrow(data){
    localStorage.setItem("man_kpi_for_detail", JSON.stringify(data))
  }

  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定左侧
      { field: 'devicename', headerName: '设备名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, },
      { field: 'group', headerName: '试验室', resizable: true, minWidth: 10},
      { field: 'deviceid', headerName: '设备ID',  resizable: true, minWidth: 10},
      
      
      { field: 'starttime', headerName: '开始时间', resizable: true},
      { field: 'endtime', headerName: '结束时间', resizable: true},


      { field: 'running', headerName: '运行时长(h)', resizable: true, minWidth: 10},
      
      { field: 'stop', headerName: '空闲时长(h)', resizable: true, minWidth: 10},
      { field: 'placeon', headerName: '占位时长(h)', resizable: true, minWidth: 10}, // 自定义设备编号！
      { field: 'warning', headerName: '维保时长(h)', resizable: true, minWidth: 10},
      // { field: 'belonged', headerName: '负责人', resizable: true, minWidth: 10},
      { field: 'option', headerName: '报表详情', resizable: true, minWidth: 10,pinned: 'right',cellRendererFramework: TableDetailComponent,width:100},


    ],
    rowData: [ // data
    ]
  };

  private gridData = [];
  
  // 初始化前确保 搜索条件 
  inittable_before(){
    var devicename = this.myinput?.getinput()===undefined?"":this.myinput?.getinput();// 设备名称
    // 科室/功能组
    var groups_data = this.groups_func?.getselect();
    // 设备类型
    var device_tpye_data = this.eimdevicetpye?.getselect();
    // 日期范围
    var daterange_data = this.data_range?.getselect()
    // 将科室/功能组，转为列表
    var groups_data_ = groups_data ===""?[] :groups_data.split(";");
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      devicename: [devicename],
      group: groups_data_,
      eimdevicetype:device_tpye_data,
      start:daterange_data[0],
      end:daterange_data[1],
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
      start: inittable_before.start,
      end: inittable_before.end,
      offset: offset,
      limit: limit,
      employeeid: this.employeeid,
      devicename:inittable_before.devicename,
      group:inittable_before.group,
      eimdevicetype:inittable_before.eimdevicetype
    }
    var table = this.TABLE;
    var methond = this.METHOD;
    this.http.callRPC(table, methond, colmun).subscribe((res)=>{
      // console.log("-----------man-kpi-table---", res)
      var get_employee_limit = res['result']['message'][0]

      this.loading = false;
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
    })
  }

  update_agGrid(event?){
    var inittable_before = this.inittable_before();
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
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
      start: inittable_before.start,
      end: inittable_before.end,
      // start: this.init_value.split(" - ")[0],
      // end: this.init_value.split(" - ")[1],
      offset: offset,
      limit: limit,
      employeeid: this.employeeid,
      devicename:[],
      group:[],
      eimdevicetype:[]
    }
    // this.getsecurity('sys_security_log', 'get_security_log_limit', {offset:event.offset,limit:10});
    // 得到员工信息！{offset: offset, limit: limit}
    this.http.callRPC(this.TABLE, this.METHOD, colmun).subscribe((res)=>{
      var get_employee_limit = res['result']['message'][0]

      this.loading = false;


      var message = res["result"]["message"][0]["message"];
      this.add_detail_kpi(message);
      this.tableDatas.PageSize = PageSize;
      this.gridData.push(...message)
      this.tableDatas.rowData = this.gridData;
      var totalpagenumbers = get_employee_limit['numbers']? get_employee_limit['numbers'][0]['numbers']: '未得到总条数';
      this.tableDatas.totalPageNumbers = totalpagenumbers;
      this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
      // 刷新table后，改为原来的！
      this.tableDatas.isno_refresh_page_size = false;
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

  // 添加详情link
  add_detail_kpi(datas:any[]){
    var option = '/pages/tongji/manHourKpiReport/kpidetail';
    datas.forEach(data=>{
      data["option"] =  option
    })
    
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

  searchdanger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"没有搜索到数据！"});
  }


}
interface TREEV2 {
  id: number,    // 节点唯一索引，对应数据库中id
  parentid: number | null,    // 父节点id
  label: string, // 节点标题
  checked: boolean,// 节点是否初始为选中状态， 默认false
  disabled: boolean, // 节点是否为禁止状态，默认为false
  children: TREEV2[] | [], // 子节点，支持设定项同父节点
  deviceno: string | null, // 设备编号
  deviceid: string | null, // 设备id
  parent_label: string | null // 父节点 label

}