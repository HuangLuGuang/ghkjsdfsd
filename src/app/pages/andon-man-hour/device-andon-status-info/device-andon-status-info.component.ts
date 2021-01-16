import { Component, OnInit,ViewChild } from '@angular/core';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'ngx-device-andon-status-info',
  templateUrl: './device-andon-status-info.component.html',
  styleUrls: ['./device-andon-status-info.component.scss']
})
export class DeviceAndonStatusInfoComponent implements OnInit {
  @ViewChild("groups_devieces") groups_devieces:any;
  @ViewChild('ag_Grid') agGrid:any;
  constructor(private publicservice: PublicmethodService,private userinfo: UserInfoService,) { 

    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  ngOnInit(): void {
    // 添加操作列
    var that = this;
    this.detail = { field: 'detail', headerName: '详情', resizable: true, fullWidth: true, width: 100, pinned: 'right',cellRendererFramework: DetailComponent,
      cellRendererParams: {
        clicked: function(data: any) {
          console.log("--详情---",data);
          // that.edit(data);
          // that.change_target_hour([data]);
        }
      },
    };
  }
  ngAfterViewInit(){
    this.tableDatas.columnDefs.push(
      this.detail
    );

    // 初始化table
    this.inttable();
    this.loading = false;
  }

  loading = false;  // 加载
  refresh = false; // 刷新tabel
  detail; // aggrid 详情

  // agGrid
  tableDatas = {
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection
      { field: 'id', headerName: '序号',  headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 30,resizable: true, sortable: true},
      { field: 'liftMachineId', headerName: '科室功能组', resizable: true, sortable: true},
      { field: 'liftMachinePosition', headerName: '试验设备', resizable: true, sortable: true},
      { field: 'startTime', headerName: '当前设备状态', resizable: true, sortable: true},
      { field: 'time', headerName: '试验任务状态', resizable: true, sortable: true},
      { field: 'principal', headerName: '执行人', resizable: true, sortable: true},
      { field: 'totalTime', headerName: '状态变更时间', resizable: true, sortable: true},
      { field: 'status', headerName: '历史记录', resizable: true,minWidth:10, sortable: true},
      { field: 'chargePerson', headerName: '当前试验状态', resizable: true,minWidth:10, sortable: true},
      // { field: 'detail', headerName: '详情', resizable: true,width:100, sortable: true,pinned: 'right'},
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
  

  // 搜索
  query(){
    var groups_devieces = this.groups_devieces.get_form_val();
    console.error("++++++++++++++groups_devieces",groups_devieces);
  }

  // 导出
  import(){
    this.agGrid.download('设备安灯状态信息');
  }

  // 重置table
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
    // this.department.dropselect();
    // this.device_tpye.dropselect();
  }

  // table

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
