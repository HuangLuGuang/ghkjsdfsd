import { Component, OnInit, ViewChild } from '@angular/core';

import { ALERT_REPORT_SETTINGS } from '../tong_ji_report_table';

import {LocalDataSource} from "@mykeels/ng2-smart-table";
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../../../../services/http/httpservice.service';

@Component({
  selector: 'ngx-alert-report',
  templateUrl: './alert-report.component.html',
  styleUrls: ['./alert-report.component.scss']
})
export class AlertReportComponent implements OnInit {
  @ViewChild("myinput") myinput:any;
  @ViewChild("data_range") data_range:any;
  @ViewChild("ag_Grid") agGrid: any;

  // 下拉框---设备类型
  deviceDatas = {
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

  loading = false;  // 加载
  refresh = false; // 刷新tabel
  button; // 权限button

  myinput_placeholder = "设备类别";


  // agGrid
  tableDatas = {
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection
      { field: 'id', headerName: '序号',  headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 30,resizable: true,},
      { field: 'deviceName', headerName: '设备名称', resizable: true,},
      { field: 'startAlertTime', headerName: '开始报警时间', resizable: true,},
      { field: 'endAlertTime', headerName: '最后报警时间', resizable: true,},
      { field: 'alertInfo', headerName: '报警信息', resizable: true,},
      { field: 'alertNum', headerName: '报警次数', resizable: true,},
      { field: 'handle', headerName: '是否处理', resizable: true,},
      { field: 'handlePeople', headerName: '处理人', resizable: true,minWidth:10,},
    ],
    rowData: [ // data
    ]
  };
  private gridData = [];

  message = [
    {id: '1', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '2', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '3', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '4', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '5', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '6', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '7', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '8', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '9', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '10', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '11', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '12', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '13', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '14', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '15', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '16', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '17', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '18', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '19', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '20', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
    {id: '21', deviceName: "AVL电机测试台架", startAlertTime: '2020-08-19 08:47:31',endAlertTime:"2020-09-19 08:46:31",alertInfo:"命令报警",alertNum: "20",handle: 'true', handlePeople: '王大锤'},
 
  ]


  constructor(private userinfo: UserInfoService, private publicservice: PublicmethodService,
    private http: HttpserviceService  
  ) { 
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  ngOnInit(): void {
    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      console.log("result>>>>>>", result)
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })
    
  }

  ngAfterViewInit(){
    // 初始化table
    this.inttable();
    this.loading = false;
  }

  // button按钮
  action(actionmethod){
    var method = actionmethod.split(":")[1];
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
      //   this.import();
      //   break;
      case 'download':
        this.download('报警报表')
        break;
    }

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
    var devicetype;
    if(inpuvalue){
      devicetype = inpuvalue;
    }else{
      devicetype = this.myinput?.getinput();
    }
    // 日期范围
    var daterange_data = this.data_range.getselect()
    console.log("<------------搜索----------->", devicetype,"日期范围",daterange_data);
 
  }

  refresh_table(){
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    this.inttable();
    this.loading = false;
    this.refresh = false;



    // 取消选择的数据 delselect
    this.myinput.del_input_value();
    this.data_range.reset_mydate();
    
    // this.groups_func.dropselect();
    // this.eimdevicetpye.dropselect();
  }


  // 导出
  download(title){
    this.agGrid.download(title);
  }

  // 初始化table
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
    var columns = {
      offset: offset, 
      limit: limit,
    }
    this.loading = true
    var message = this.message;
    this.tableDatas.PageSize = PageSize;
    this.gridData.push(...message)
    this.tableDatas.rowData = this.gridData;
    var totalpagenumbers = this.message.length;
    this.tableDatas.totalPageNumbers = totalpagenumbers;
    setTimeout(() => {
      this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
    }, 1000);
    // 刷新table后，改为原来的！
    this.tableDatas.isno_refresh_page_size = false;
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event){
    // console.log("页码改变的回调", event);
    // this.loading = true;
    this.gridData = [];
    this.inttable(event);
    this.loading = false;
  }

}
