import { Component, OnInit,ViewChild } from '@angular/core';

import { ASSETS_MANAGE_SETTINGS } from '../gps_module_manage_table';


import * as XLSX from 'xlsx';
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
type AOA = any[][];


@Component({
  selector: 'ngx-assets-manage',
  templateUrl: './assets-manage.component.html',
  styleUrls: ['./assets-manage.component.scss']
})
export class AssetsManageComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("myinput") myinput: any;

  importdata: AOA = [[1,2], [3,4]];

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
      { field: 'gpsId', headerName: 'GPS编号', resizable: true,},
      { field: 'assetsId', headerName: '移动资产编号', resizable: true,},
      { field: 'time', headerName: '时间', resizable: true,},
      { field: 'gpsIp', headerName: 'GPSIP', resizable: true,},
      { field: 'principal', headerName: '负责人', resizable: true,},
      { field: 'power', headerName: '电量', resizable: true,},
      { field: 'networkDescribe', headerName: '联网描述', resizable: true,minWidth:10,},
      { field: 'lastHeartbeatTime', headerName: '最后心跳时间', resizable: true,minWidth:10,},
      { field: 'heartbeatSept', headerName: '心跳间隔', resizable: true,minWidth:10,},
    ],
    rowData: [ // data
    ]
  };
  private gridData = [];

  message = [
    { id: '1', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '2', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '3', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '4', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '5', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '6', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '7', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '8', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '9', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '10', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '11', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '12', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '13', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '14', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '15', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '16', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '17', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
    { id: '18', gpsId: '19-TM-KG-1', assetsId:'2网口', time:'2020-01-06', department: '试验中心',gpsIp:'192.168.8.108', principal:'张大彪',power:'79%',networkDescribe:"modbus协议", lastHeartbeatTime:"2020-07-05", heartbeatSept: '24h'},
  ]


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
      case 'import':
        this.import();
        break;
      case 'download':
        this.download('资产管理')
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
    console.log("<------------搜索----------->", devicetype);
  
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
    // this.groups_func.dropselect();
    // this.eimdevicetpye.dropselect();
  }


  // 导出
  download(title){
    this.agGrid.download(title);
  }

  // 导入数据
  import(){
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
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

  // agGrid
  // nzpageindexchange 页码改变的回调
  nzpageindexchange(event){
    // console.log("页码改变的回调", event);
    // this.loading = true;
    this.gridData = [];
    this.inttable(event);
    this.loading = false;
  }


  // ----------------------------导入---------------------------
  onFileChange(evt: any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    // console.log("导入：---------------------------", target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.importdata = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      // console.log("importdata: ", this.importdata); // 这是读取的数据转为json

      this.analysis_sheet_to_json_to_ng2(this.importdata)
    };
    reader.readAsBinaryString(target.files[0]);

  }

  // 将sheet_json转换为smart-table 数据格式！ 
  analysis_sheet_to_json_to_ng2(importdata){
    // console.log("这是导入的Excel的原始数据！", importdata, "\n")
    var rowData_list = importdata.slice(1,importdata.length);
    var excel_title = importdata.slice(0,1)[0];
    console.log("rowData_list----excel 除了表头的数据>", rowData_list)
    console.log("excel_title---- excel的表头>", excel_title)
    var ag_Grid_columns = this.tableDatas.columnDefs.slice(0, excel_title.length);
    // console.log("ag_Grid_columns--------->ag_Grid_columns 的表头", ag_Grid_columns, "\n")

    var agGridTitle = [];
    var noexist_title = [];
    for (let index = 0; index < ag_Grid_columns.length; index++) {
      const agitem = ag_Grid_columns[index];
      const exitem = excel_title[index];

      if (agitem.headerName === exitem){
        agGridTitle.push(agitem.field);
      }else{
        console.log("字段不一致", "agTitle != exetitle", agitem.headerName, '!=', exitem);
        noexist_title.push(agitem.headerName)
      }
    }

    if (noexist_title.length >0 ){
      this.importdanger(noexist_title);
    }else{
      var rowData = []; // rowData 就是table需要的source
      rowData_list.forEach(element => {  // rowData_list excel 除了第一列字段，其它的数据！
        var item = {};
        if(element.length != 0){
          for (let index = 0; index < element.length; index++) {
            item[agGridTitle[index]] = element[index];  
          }
          rowData.push(item);
        }
      });
  
      var verify_err = [];
      // var verify_after = this.verify_rowdatas(rowData, verify_err);  // 验证后的数据 得到的是验证的 错误信息！
      var verify_after = [];  // 验证后的数据 得到的是验证的 错误信息！
      if (verify_after.length > 0){
        // this.verify_import(verify_after);
        // this.RecordOperation("导入(eim台账)", 0,'导入excel表');

      }else{
        // 插入数据库之前 处理数据
        console.log("插入数据库之前 处理数据", rowData)
        // var datas = this.option_table_before(rowData)
        // console.log("插入数据库之前 处理数据---->", datas);
        // 将导入的数据存入数据库
        // this.dev_insert_device(datas).subscribe(result=>{
        //   if (result){
        //     // 将导入的数据展示在table中
        //     // var after_datas = this.show_table_before(rowData)
        //     this.gridData = [];
        //     this.loading = true;
        //     this.update_agGrid();// 告诉组件刷新！
        //     this.loading = false;
        //     this.RecordOperation("导入(eim台账)", 1,'导入excel表');
        //   }
        // });
    

      }
    }



  }

 
  // ----------------------------导入---------------------------

  // 将导入的数据插入到数据库中
  // dev_insert_device(datas){
  //   return new Observable((observale)=>{
  //     const table = "device";
  //     const method = 'dev_insert_device_list';
  //     try {
  //       this.http.callRPC(table, method, datas).subscribe((result)=>{
  //         // console.log("插入设备数据：", result)
  //         const status = result['result']['message'][0]["code"];
  //         if (status === 1){
  //           this.RecordOperation("导入", 1, "eim台账");
  //           this.success()
  //           observale.next(true)
  //         }else{
  //             var data_info = result['result']["message"][0]["message"];
  //             // console.log("------------------->",data_info)
  //             this.RecordOperation("导入", 0, String(data_info));
  //             this.importSuccess(result['result']["message"][0]["message"])
  //             observale.next(false)
  //           throw 'error, 删除失败！'
  //         }
  //       })
        
  //       this.loading = false
        
  //     }catch(err){
  //       this.RecordOperation("导入", 0, String(err));
  //       observale.next(false)
  //       this.danger()
  //     }
  //   })
  // }

  importdanger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"缺少："+data.join(",")});
  }

}
