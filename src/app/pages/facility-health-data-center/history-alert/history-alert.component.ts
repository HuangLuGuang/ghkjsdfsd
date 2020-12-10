import { Component, OnInit,ViewChild } from '@angular/core';
import { LayoutService } from '../../../@core/utils';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';

let datacenter = require("../../../../assets/pages/system-set/js/datacenter_echaer")

@Component({
  selector: 'ngx-history-alert',
  templateUrl: './history-alert.component.html',
  styleUrls: ['./history-alert.component.scss']
})
export class HistoryAlertComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("eimdevicetpye") eimdevicetpye: any; // 设备类型下拉框
  @ViewChild("groups") groups_func: any; // 设备类型下拉框
  @ViewChild("myinput") myinput: any; // 资产编号输入框
  @ViewChild("data_range") data_range: any; // 日期选择器
  // 下拉框---设备类型
  eimdevicetpye_placeholder = "请选择设备类型";
  // 下拉框---资产编号
  myinput_placeholder = "请输入资产编号";

  // 科室/功能组
  groups_placeholder = "请选中科室/功能组"; // 下拉框---科室功能组

  constructor(private userinfo:UserInfoService,private publicservice: PublicmethodService,
    private http: HttpserviceService, private layoutService: LayoutService
  ) {
    // 下拉框
    this.get_tree_selecetdata()
  }

  loading = false;  // 加载
  refresh = false; // 刷新tabel
  button; // 权限button
  // =================================================agGrid
  tableDatas = {
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度  pinned: 'left' 固定在左侧！
      { field: 'id', headerName: '序号', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true,},
      { field: 'deviceName', headerName: '设备名称',  resizable: true, minWidth: 10},
      { field: 'devicePosition', headerName: '设备位置', resizable: true, minWidth: 10}, // 自定义设备编号！
      { field: 'alertContent', headerName: '报警内容', resizable: true, minWidth: 10},
      { field: 'alertTime', headerName: '报警时间', resizable: true},
      { field: 'status', headerName: '状态', resizable: true, minWidth: 10},
      { field: 'handleTime', headerName: '处理时间', resizable: true, minWidth: 10},
    ],
    rowData: [ // data
    ]
  };
  // 模拟数据
  message = [
    { id: 1, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
    { id: 2, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 3, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 4, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "报警",  operation: "确认" },
    { id: 5, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 6, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "报警",  operation: "确认" },
    { id: 7, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 8, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
    { id: 9, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 10, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 11, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 12, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 13, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 14, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 15, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
    { id: 16, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 17, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 18, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 19, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 20, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 21, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 22, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
    { id: 23, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
  ];
  private gridData = [];

  // echart   datacenter 报警趋势
  alert_trend(){
    var resdatas = [
        {
          "dates": "06-03", 
          "placeon": 0, 
          "running": 24, 
          "stop": 0, 
          "warning": 0
        }, 
        {
          "dates": "06-04", 
          "placeon": 0, 
          "running": 23, 
          "stop": 1, 
          "warning": 0
        }, 
        {
          "dates": "06-05", 
          "placeon": 0, 
          "running": 19, 
          "stop": 4, 
          "warning": 1
        }, 
        {
          "dates": "06-06", 
          "placeon": 2, 
          "running": 18, 
          "stop": 2, 
          "warning": 2
        }, 
        {
          "dates": "06-07", 
          "placeon": 0, 
          "running": 14, 
          "stop": 3, 
          "warning": 7
        }, 
        {
          "dates": "07-03", 
          "placeon": 0, 
          "running": 24, 
          "stop": 0, 
          "warning": 0
        }, 
        {
          "dates": "07-04", 
          "placeon": 0, 
          "running": 23, 
          "stop": 1, 
          "warning": 0
        }, 
        {
          "dates": "07-05", 
          "placeon": 0, 
          "running": 19, 
          "stop": 4, 
          "warning": 1
        }, 
        {
          "dates": "07-06", 
          "placeon": 2, 
          "running": 18, 
          "stop": 2, 
          "warning": 2
        }, 
        {
          "dates": "07-07", 
          "placeon": 0, 
          "running": 14, 
          "stop": 3, 
          "warning": 7
        }, 
        {
          "dates": "08-03", 
          "placeon": 0, 
          "running": 24, 
          "stop": 0, 
          "warning": 0
        }, 
        {
          "dates": "08-04", 
          "placeon": 0, 
          "running": 23, 
          "stop": 1, 
          "warning": 0
        }, 
        {
          "dates": "08-05", 
          "placeon": 0, 
          "running": 19, 
          "stop": 4, 
          "warning": 1
        }, 
        {
          "dates": "08-06", 
          "placeon": 2, 
          "running": 18, 
          "stop": 2, 
          "warning": 2
        }, 
        {
          "dates": "08-07", 
          "placeon": 0, 
          "running": 14, 
          "stop": 3, 
          "warning": 7
        }, 
        {
          "dates": "09-03", 
          "placeon": 0, 
          "running": 24, 
          "stop": 0, 
          "warning": 0
        }, 
        {
          "dates": "09-04", 
          "placeon": 0, 
          "running": 23, 
          "stop": 1, 
          "warning": 0
        }, 
        {
          "dates": "09-05", 
          "placeon": 0, 
          "running": 19, 
          "stop": 4, 
          "warning": 1
        }, 
        {
          "dates": "09-06", 
          "placeon": 2, 
          "running": 18, 
          "stop": 2, 
          "warning": 2
        }, 
        {
          "dates": "09-07", 
          "placeon": 0, 
          "running": 14, 
          "stop": 3, 
          "warning": 7
        }, 
        {
          "dates": "10-03", 
          "placeon": 0, 
          "running": 24, 
          "stop": 0, 
          "warning": 0
        }, 
        {
          "dates": "10-04", 
          "placeon": 0, 
          "running": 23, 
          "stop": 1, 
          "warning": 0
        }, 
        {
          "dates": "10-05", 
          "placeon": 0, 
          "running": 19, 
          "stop": 4, 
          "warning": 1
        }, 
        {
          "dates": "10-06", 
          "placeon": 2, 
          "running": 18, 
          "stop": 2, 
          "warning": 2
        }, 
        {
          "dates": "10-07", 
          "placeon": 0, 
          "running": 14, 
          "stop": 3, 
          "warning": 7
        }, 
        {
          "dates": "10-13", 
          "placeon": 0, 
          "running": 24, 
          "stop": 0, 
          "warning": 0
        }, 
        {
          "dates": "10-14", 
          "placeon": 0, 
          "running": 23, 
          "stop": 1, 
          "warning": 0
        }, 
        {
          "dates": "10-15", 
          "placeon": 0, 
          "running": 19, 
          "stop": 4, 
          "warning": 1
        }, 
        {
          "dates": "10-16", 
          "placeon": 2, 
          "running": 18, 
          "stop": 2, 
          "warning": 2
        }, 
        {
          "dates": "10-17", 
          "placeon": 0, 
          "running": 14, 
          "stop": 3, 
          "warning": 7
        }, 
        {
          "dates": "11-02", 
          "placeon": 0, 
          "running": 20, 
          "stop": 2, 
          "warning": 2
        }, 
        {
          "dates": "11-03", 
          "placeon": 0, 
          "running": 21, 
          "stop": 2, 
          "warning": 1
        }, 
        {
          "dates": "11-04", 
          "placeon": 0, 
          "running": 14, 
          "stop": 3, 
          "warning": 7
        }, 
        {
          "dates": "11-05", 
          "placeon": 0, 
          "running": 24, 
          "stop": 0, 
          "warning": 0
        }, 
        {
          "dates": "11-06", 
          "placeon": 0, 
          "running": 23, 
          "stop": 1, 
          "warning": 0
        }, 
        {
          "dates": "11-13", 
          "placeon": 0, 
          "running": 24, 
          "stop": 0, 
          "warning": 0
        }, 
        {
          "dates": "11-14", 
          "placeon": 0, 
          "running": 23, 
          "stop": 1, 
          "warning": 0
        }, 
        {
          "dates": "11-15", 
          "placeon": 0, 
          "running": 19, 
          "stop": 4, 
          "warning": 1
        }, 
        {
          "dates": "11-16", 
          "placeon": 2, 
          "running": 18, 
          "stop": 2, 
          "warning": 2
        }, 
        {
          "dates": "11-17", 
          "placeon": 0, 
          "running": 14, 
          "stop": 3, 
          "warning": 7
        }, 
        {
          "dates": "12-09", 
          "placeon": 0, 
          "running": 4.5, 
          "stop": 3, 
          "warning": 3.5
        }
    ];

    var xData = [];
    var running = [];
    var stop = [];

    var afterdata = {};
    resdatas.forEach(resdata => {
      xData.push(resdata["dates"]);
      running.push(resdata["running"]);
      stop.push(resdata["stop"]);
    });
    afterdata["xData"] = xData;
    afterdata["running"] = running;
    afterdata["stop"] = stop;
    afterdata["title"] = ['运行', '停止'];

    // console.log("得到左侧第一个数据： ", afterdata);
    datacenter.left_one('.alert_trend', afterdata);


  }
  // --- 报警统计
  alert_statistics(){
    var resdatas = {
      "running": 810, 
      "stop": 466
    }
    var afterdatas = [];
    for(let k in resdatas){
      var afterdata = {};
      var key;
      switch (k) {
        case "running":
          key = "运行"
          break;
        case "stop":
          key = "停止"
          break;
      }
      afterdata["name"] = key;
      afterdata["value"] = resdatas[k];
      afterdatas.push(afterdata);
    }
    var title = ['运行', '停止'];
    datacenter.right_one('.alert_statistics', {afterdatas:afterdatas,title:title});

  }

  // 监听窗口变化来，重置echat的大小！
  listen_windows_resize(){
    window.onreset = function (){
      let left_one = document.querySelector('.alert_trend');
      if(left_one) echarts.init(left_one).resize();

      let right_one = document.querySelector('.alert_statistics');
      if(right_one) echarts.init(right_one).resize();
    }
  }
  // echart

  ngOnInit(): void {
    // 得到pathname --在得到button
    // var roleid = this.userinfo.getEmployeeRoleID();
    // this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
    //   this.button = result;
    //   localStorage.setItem("buttons_list", JSON.stringify(result));
    // })
    this.button = JSON.parse(localStorage.getItem("buttons_list"))


    // 初始化echart
    this.alert_trend(); // 报警趋势
    this.alert_statistics(); // 报表统计

    this.layoutService.onInitLayoutSize().subscribe(f=>{
      let left_one = document.querySelector('.alert_trend');
      if(left_one) echarts.init(left_one).resize();

      let right_one = document.querySelector('.alert_statistics');
      if(right_one) echarts.init(right_one).resize();
    })
    this.listen_windows_resize(); // 监听 窗口
    

  }

  ngAfterViewInit(){
    // 初始化table
    this.inttable();
    this.loading = false;
  }

  // 重置、刷新
  refresh_table(){
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择的数据 delselect
    this.myinput.del_input_value();
    this.groups_func.dropselect();
    this.eimdevicetpye.dropselect();
    
    this.inttable();
    this.loading = false;
    this.refresh = false;

    
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
      //   this.importfile();
      //   break;
      case 'download':
        this.download('设备报警')
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
    var assetnumber;
    if (inpuvalue){
      assetnumber = inpuvalue;
    }else{
      assetnumber = this.myinput?.getinput();// 设备名称
    }
    // 设备类型
    var device_tpye_data = this.eimdevicetpye.getselect();

    // 日期范围
    var daterange_data = this.data_range.getselect()
    console.log(
      "搜索：assetnumber", assetnumber, 
      "daterange_data:",daterange_data,
      "device_tpye_data",device_tpye_data
    )
  }

  // 导出文件
  download(title){
    this.agGrid.download(title);
  };
  
  // =================================================agGrid
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

  // 更新table
  update_agGrid(event?){
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
    var columns = {
      offset: offset, 
      limit: limit,
      employeeid: this.userinfo.getEmployeeID(),
      devicename: '',
      eimdevicetype: [], // 设备类型，可选
      group: []          // 科室/功能组，可选
    }

    this.loading = false
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
  nzpageindexchange_ag(event){
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

}
