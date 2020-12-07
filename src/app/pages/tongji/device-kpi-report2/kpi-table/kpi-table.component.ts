import { Component, OnInit, ViewChild } from '@angular/core';


import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceKpiReport2Service } from '../device-kpi-report2-service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { TableDetailComponent } from './table-detail/table-detail.component';


declare let $;

declare let layui;


@Component({
  selector: 'ngx-kpi-table',
  templateUrl: './kpi-table.component.html',
  styleUrls: ['./kpi-table.component.scss']
})
export class KpiTableComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid:any;
  @ViewChild("groups") groups_func:any;
  @ViewChild("eimdevicetpye") eimdevicetpye:any;
  @ViewChild("data_range") data_range:any;
  @ViewChild("myinput") myinput:any;


  table = 'device';
  method = "dev_get_kpi_device_search";

  // =============================agGrid
  loading: boolean = false;
  // =============================agGrid
  constructor(private publicservice: PublicmethodService, private http: HttpserviceService, 
    private deviceservice: DeviceKpiReport2Service, private router: Router,
    private userinfo: UserInfoService) { 

    // 会话过期
    localStorage.removeItem("alert401flag");
    // 选择框
    this.get_tree_selecetdata();
  }

  
  groups_placeholder = "请选择科室/功能组";     // 科室/功能组 
  eimdevicetpye_placeholder = "请选择设备类型"; // eim 设备类型
  myinput_placeholder = "请输入设备名称"
  button; // 权限button
  refresh = false; // 刷新tabel

  init_value = "2010-10-01 - 2020-11-21" // 默认日期

  ngOnInit(): void {
    
    // 初始化agGrid==============
    this.inttable();
    // 初始化agGrid==============

    // 得到pathname --在得到button
    console.log("得到pathname --在得到button\t\t")
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      console.log("得到pathname --在得到button\t\t", result)
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })
  }

  ngAfterViewInit(){
    
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
    console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    console.log("--------------->method", method)
    switch (method) {
      // case 'add':// 没有新增功能！
      //   this.add("新增");
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
      // case 'import': // 没有导入功能！
      //   this.import("导入");
      //   break;
      case 'download':
        // this.download('设备KPI报表')
        this.download()
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
       
        this.groups_func.init_select_tree(groups);
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
    var groups_data = this.groups_func.getselect();
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
      var table = this.table;
      var method = this.method;
      this.http.callRPC(table, method,columns).subscribe(result=>{
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

 

  download(){
    console.log("这是----download，kpi 报表");
    this.agGrid.download('设备报表');

  }

  // 刷新tabel
  refresh_table(){
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();

    // 取消选择的数据 delselect
    this.myinput.del_input_value();
    this.groups_func.dropselect();
    this.eimdevicetpye.dropselect();
  }
  
  // =================================================agGrid

  tableDatas = {
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度 pinned: 'left' 固定到左侧！
      { field: 'devicename', headerName: '设备名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, },
      { field: 'deviceid', headerName: '设备ID',  resizable: true, minWidth: 10},
      { field: 'groups', headerName: '试验室', resizable: true, minWidth: 10},
      // { field: 'CustomTime', headerName: '自定义统计时间(默认最近一周)', 
      //   children:[
      //   ]
      // },
      { field: 'starttime', headerName: '开始时间', resizable: true},
      { field: 'endtime', headerName: '结束时间', resizable: true},


      { field: 'sumruntime', headerName: '累计运行时长(h)', resizable: true, minWidth: 10},
      
      { field: 'avgtime', headerName: '平均运行时长(h)', resizable: true, minWidth: 10},
      { field: 'ratetime', headerName: '开动率(%)', resizable: true, minWidth: 10}, // 自定义设备编号！
      { field: 'andenstatus', headerName: '实时安灯状态', resizable: true, minWidth: 10},
      // 这个是跳转到详情kpi的 https://www.ag-grid.com/javascript-grid-cell-rendering-components/
      { field: 'option', headerName: '详情', resizable: true, minWidth: 10, cellRendererFramework: TableDetailComponent, pinned: 'right',width:100,},
      // {
      //   field: 'option', 
      //   headerName: '详情', 
      //   resizable: true, 
      //   minWidth: 10,
      //   pinned: 'right',
      //   cellRenderer: function(params){
      //     var div = document.createElement('div');
      //     div.innerHTML = `<a href=${params.value} style="text-decoration: blink;" id="btn-simple">设备详情</a>`
      //     return div
      //   }
      // }

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
      employeeid: this.userinfo.getEmployeeID(),
      group: [],
      devicename: [],
      eimdevicetype: [],
    }
    // 得到设备信息！
    var table = this.table;
    var method = this.method;
    this.http.callRPC(table, method, colmun).subscribe((res)=>{
      console.log("得到设备信息=================>", res)
      var get_employee_limit = res['result']['message'][0];
      if(get_employee_limit["code"]===1){
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
        this.RecordOperation('查看', 1,  "设备报表")
      }else{
        this.RecordOperation('查看', 0,  "设备报表")
      }
    })
  }

  update_agGrid(event?){
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
      employeeid: this.userinfo.getEmployeeID(),
      group: [],
      devicename: [],
      eimdevicetype: [],
    }
    // this.getsecurity('sys_security_log', 'get_security_log_limit', {offset:event.offset,limit:10});
    // 得到员工信息！{offset: offset, limit: limit}
    var table = this.table;
    var method = this.method;
    this.http.callRPC(table, method, colmun).subscribe((result)=>{
      // console.log("get_menu_role", result)
      var res = result['result']['message'][0];
      this.loading = false;
      if (res["code"] === 1){
        var message = result["result"]["message"][0]["message"];
        this.add_detail_kpi(message);
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...message)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = res['numbers']? res['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation('更新', 1, "设备报表");
      }else{
        this.RecordOperation('更新', 0, "设备报表");
      }
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
  // { field: 'option', headerName: '详情', resizable: true, minWidth: 10, cellRenderer: 'optionCellRenderer'},
  // 添加详情link
  add_detail_kpi(datas:any[]){
    var option = '/pages/tongji/deviceKpiReport/kpidetail';
    datas.forEach(data=>{
      data["option"] =  option
    })
    
  }

  // 点击行数据 子组件调用
  clickrow(data){
    localStorage.setItem("kpi_for_detail", JSON.stringify(data))
  }






  // 设备详情---跳转的设备详情界面
  goto_kpi_detail(url){
    alert(url)
    // this.router.navigate([''])
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
 
  // 展示状态
  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"导入成功!"});
  }
  warning(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'warning', conent:"搜索的结果为空!"});
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

// 树状结构 实例！
var data =  [
  {
      "id": 1,
      "label": "安徽省",
      "children": [
          {
              "id": 2,
              "label": "马鞍山市",
              "disabled": true,
              "children": [
                  {
                      "id": 3,
                      "label": "和县"
                  },
                  {
                      "id": 4,
                      "label": "花山区",
                      "checked": true
                  }
              ]
          },
          {
              "id": 22,
              "label": "淮北市",
              "children": [
                  {
                      "id": 23,
                      "label": "濉溪县"
                  },
                  {
                      "id": 24,
                      "label": "相山区",
                      "checked": true
                  }
              ]
          }
      ]
  },
  {
      "id": 5,
      "label": "河南省",
      "children": [
          {
              "id": 6,
              "label": "郑州市"
          }
      ]
  },
  {
      "id": 10,
      "label": "江苏省",
      "children": [
          {
              "id": 11,
              "label": "苏州市"
          },
          {
              "id": 12,
              "label": "南京市",
              "children": [
                  {
                      "id": 13,
                      "label": "姑苏区"
                  },
                  {
                      "id": 14,
                      "label": "相城区"
                  }
              ]
          }
      ]
  }
]