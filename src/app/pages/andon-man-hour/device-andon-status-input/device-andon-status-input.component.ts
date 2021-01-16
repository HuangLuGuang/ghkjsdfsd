import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DeviceStatusInfoComponent } from '../../../pages-popups/andon-man-hour/device-status-info/device-status-info.component';
import { EditDelTooltipComponent } from '../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';


declare let $;

@Component({
  selector: 'ngx-device-andon-status-input',
  templateUrl: './device-andon-status-input.component.html',
  styleUrls: ['./device-andon-status-input.component.scss']
})
export class DeviceAndonStatusInputComponent implements OnInit {

  @ViewChild("groups_devieces") groups_devieces:any;
  @ViewChild("timeline") timeline:any;


  // 用户id
  employeeid = this.userinfo.getEmployeeID();

  // 设备数据
  device_message;

  // 历史时间选择器
  selectedItem = '3';

  constructor(private userinfo: UserInfoService, private http: HttpserviceService, private dialogService: NbDialogService, private publicservice: PublicmethodService) {
    // 会话过期
    localStorage.removeItem("alert401flag");


   }

  ngOnInit(): void {
    this.RecordOperation('查看', 1,  "安灯状态");
  }

  // 搜索
  query(){
    var groups_devieces = this.groups_devieces.get_form_val();
    // console.error("++++++++++++++groups_devieces",groups_devieces);
    if (groups_devieces["devicename"]){
      var monthed = "pc_device_status_get";
      var table = "device";
      var columns = {
        devicename: groups_devieces["devicename"]
      }
      this.http.callRPC(table,monthed,columns).subscribe(result=>{
        console.log("当前设备运行状态:", result);
        var res = result["result"]["message"][0];
        if (res["code"]===1){
          var message = res["message"][0];
          // message["loginname"] = this.userinfo.getLoginName();
          // console.log("当前message:", message);
          this.RecordOperation('搜索', 1,  "安灯状态:"+ JSON.stringify(columns));
          this.init_table(message);
        }else{
          var message = {
            deviceid:undefined,
            devicename:undefined,
            deviceno:undefined,
            errmsg:undefined,
            group:undefined,
            createdby:undefined,
            recordtime:undefined,
            status:undefined,
          };
          this.RecordOperation('搜索', 0,  "安灯状态:"+ JSON.stringify(res["message"]));
          this.init_table(message);
        }
      })
      //  点击搜索时，得到设备状态历史
      this.get_history();
    }else{
      this.dialogService.open(EditDelTooltipComponent,{ closeOnBackdropClick: false, context: { title: '提示', content:   `请选择设备!`}} ).onClose.subscribe(
        name=>{}
      )
    }
    
  }


  // 搜索得到 安灯信息后 填充数据
  // ['#5D920D', '#3333FF', '#FF4E0D', "#DBB70D"],
  // ['运行', '空闲', '维修', "占位"],
  init_table(message){
    this.device_message = message;
    for(let item in message){
      if (item === 'status'){
        var status_val = message[item];
        switch (status_val) {
          case 'running':
            $('.'+ item).attr("style", "color: black; background: #5D920D;font-weight:600");
            $('.'+ item).text('运行');
            break;
          case 'stop':
            $('.'+ item).attr("style", "color: black; background: #3333FF;font-weight:600");
            $('.'+ item).text('空闲');
            
          break;
          case 'warning':
            $('.'+ item).attr("style", "color: black; background: #FF4E0D;font-weight:600");
            $('.'+ item).text('维修');
            break;
        
          case 'placeon':
            $('.'+ item).attr("style", "color: black; background: #DBB70D;font-weight:600");
            $('.'+ item).text('占位');
            break
          default:
            $('.'+ item).text(null);
            $('.'+ item).attr("style", "");
            break
        }
      }else{
        $('.'+ item).text(message[item]===undefined?null:message[item]);
      }
    }
  }

  // 设备状态切换 button
  edit(){
    console.log("设备状态切换 button", this.device_message);
    if (this.device_message && this.device_message["deviceid"]){
      this.dialogService.open(DeviceStatusInfoComponent,{ closeOnBackdropClick: false, context: { title: '切换当前设备状态', rowData:this.device_message,}}).onClose.subscribe(
        name=>{
          if (name){
            // 修改成功
            this.query();
          }
        }
      )
    }else{
      this.dialogService.open(EditDelTooltipComponent,{ closeOnBackdropClick: false, context: { title: '提示', content:   `没有可切换的设备状态!`}} ).onClose.subscribe(
        name=>{}
      )
    }
  }

  // 得到设备状态历史
  get_history(){
    var times = this.selectedItem;
    var groups_devieces = this.groups_devieces.get_form_val();
    var devicename = groups_devieces["devicename"]
    if (devicename){
      var table = "andon";
      var method = "pc_device_status_log";
      var colums = {
        devicename: devicename,
        times: times,
      }
      this.http.callRPC(table,method,colums).subscribe(result=>{
        console.log("得到设备状态历史", result);
        var res = result["result"]["message"][0];
        if (res["code"]===1){
          if (res['message'].length<1){

            this.danger(JSON.stringify('数据为[]'));
          }else{
            var data = "查看设备历史状态"
            this.success(data)
            this.timeline.inint_timeline(res['message']);
          }
          this.RecordOperation('搜索', 1,  "设备状态历史:"+ JSON.stringify(colums));
        }else{
          this.danger(JSON.stringify(res["message"]));
          this.RecordOperation('搜索', 0,  "设备状态历史:"+ JSON.stringify(colums));
        }
      })
    }else{
      this.dialogService.open(EditDelTooltipComponent,{ closeOnBackdropClick: false, context: { title: '提示', content:   `请选择设备!`}} ).onClose.subscribe(
        name=>{}
      )
    }

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
