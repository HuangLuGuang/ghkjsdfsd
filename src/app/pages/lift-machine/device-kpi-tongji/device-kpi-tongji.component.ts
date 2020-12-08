import { Component, OnInit, ViewChild } from '@angular/core';

import { ALERT_REPORT_SETTINGS } from '../lift_machine_table';

import {LocalDataSource} from "@mykeels/ng2-smart-table";
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';

@Component({
  selector: 'ngx-device-kpi-tongji',
  templateUrl: './device-kpi-tongji.component.html',
  styleUrls: ['./device-kpi-tongji.component.scss']
})
export class DeviceKpiTongjiComponent implements OnInit {
  @ViewChild('mytable') mytable:any;
  @ViewChild('ag_Grid') agGrid:any;

  @ViewChild("departmentselect") departmentselect:any;
  @ViewChild("device_tpye") device_tpye: any;
  @ViewChild("asset_number") asset_number: any;
  @ViewChild("data_range") data_range: any;

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
  // 下拉框---资产编号
  assetnumber = {
    placeholder: "请选择资产编号",
    name: '资产编号',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }

  source:LocalDataSource
  // 设备KPI统计 table数据
  device_kpi_table_data = {
    settings: ALERT_REPORT_SETTINGS,
    source: new LocalDataSource(),
  };

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
      { field: 'liftMachineId', headerName: '举升机编号', resizable: true,},
      { field: 'liftMachinePosition', headerName: '举升机位置', resizable: true,},
      { field: 'startTime', headerName: '开始作业时间', resizable: true,},
      { field: 'time', headerName: '本次作业时间', resizable: true,},
      { field: 'principal', headerName: '负责人', resizable: true,},
      { field: 'totalTime', headerName: '累计作业时长', resizable: true,},
      { field: 'status', headerName: '状态', resizable: true,minWidth:10,},
      { field: 'chargePerson', headerName: '责任人', resizable: true,minWidth:10,},
      { field: 'detail', headerName: 'kpi详情', resizable: true,minWidth:10,},
    ],
    rowData: [ // data
    ]
  };
  private gridData = [];

  message = [
    { id: '1', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    { id: '2', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '故障', chargePerson: '李云龙', detail: '详情'},
    { id: '3', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '警告', chargePerson: '李云龙', detail: '详情'},
    { id: '4', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '完成', chargePerson: '李云龙', detail: '详情'},
    { id: '5', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '进行中', chargePerson: '李云龙', detail: '详情'},
    { id: '6', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    { id: '7', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    { id: '8', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    { id: '9', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    { id: '10', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    { id: '11', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    { id: '12', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    { id: '13', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
  ]

  constructor(private userinfo: UserInfoService,private publicservice: PublicmethodService,
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

    // 初始化table数据
    this.device_kpi_table_data.source["data"] = [
      { id: '1', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '2', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '故障', chargePerson: '李云龙', detail: '详情'},
      { id: '3', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '警告', chargePerson: '李云龙', detail: '详情'},
      { id: '4', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '完成', chargePerson: '李云龙', detail: '详情'},
      { id: '5', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '进行中', chargePerson: '李云龙', detail: '详情'},
      { id: '6', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '7', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '8', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '9', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '10', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '11', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '12', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
      { id: '13', liftMachineId: "四立柱", deparrtment: "验证中心", liftMachinePosition: "左-上-外",startTime: '2020-01-10',time: '7.8h', principal: '张大彪', totalTime: '7.8', status: '停止', chargePerson: '李云龙', detail: '详情'},
    ]
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
        this.download('设备kpi统计')
        break;
    }

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
    // this.myinput.del_input_value();
    // this.groups_func.dropselect();
    // this.eimdevicetpye.dropselect();
  }

  // 搜索按钮
  query(){
    // var departmentselect_datas = this.departmentselect.getselect();
    // var device_tpye_data = this.device_tpye.getselect();
    // var asset_number_data = this.asset_number.getselect();
    // console.log("<------------搜索----------->", departmentselect_datas, device_tpye_data,asset_number_data,daterange_data);
    var daterange_data = this.data_range.getselect();
    console.log("<------------搜索----------->", daterange_data);
 
  }

  // 导出
  download(title){
    this.mytable.download(title);
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
