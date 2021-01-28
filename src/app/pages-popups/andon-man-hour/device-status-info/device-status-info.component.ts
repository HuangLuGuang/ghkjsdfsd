import { Component, OnInit,Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';

declare let layui;

declare let $;


@Component({
  selector: 'ngx-device-status-info',
  templateUrl: './device-status-info.component.html',
  styleUrls: ['./device-status-info.component.scss']
})
export class DeviceStatusInfoComponent implements OnInit {
  @Input() title: string;
  @Input() rowData: any;
  constructor(private dialogRef: NbDialogRef<DeviceStatusInfoComponent>, private http: HttpserviceService,
    private publicservice: PublicmethodService,private userinfo: UserInfoService
  ) { }

  ngOnInit(): void {
    this.init_table(this.rowData)
  }
  
  ngAfterViewInit(){
    this.commit();
    
  }


  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
  }
  
  // 取消
  cancel(){
    this.dialogRef.close(false);
  }

  // 确定按钮
  commit(){
    var dialogRef = this.dialogRef;
    var rowData = this.rowData;
    var that = this;
    layui.use(['layer','form'], function(){
      var layer = layui.layer;
      var form = layui.form;
      form.render();

      form.on('submit(tooltip)', function(data){
        var save_data = that.save_data(rowData);

        // 防止重复点击
        $(".submit_tooltip").attr('disabled','disabled');
        
        if (save_data){
          if (save_data["status"]===rowData["status"]){
            that.alert_status();
            $(".submit_tooltip").removeAttr('disabled');
          }else{
            var monthed = "pc_device_status_insert";
            var table = "andon";
            that.http.callRPC(table,monthed,save_data).subscribe(result=>{
              var res = result["result"]["message"][0];
              var data = res["message"]
              if (res['code']===1){
                that.success(data);
                dialogRef.close(true);
                that.RecordOperation('修改', 1,  "安灯状态:"+ JSON.stringify(save_data));
              }else{
                that.danger(data);
                dialogRef.close(false);
                that.RecordOperation('修改', 0,  "安灯状态:"+ JSON.stringify(data));
              }
              $(".submit_tooltip").removeAttr('disabled');
            })
          }
        }
        
        return false;
      });

    });
  }

  // 初始化table
  init_table(message){
    for(let item in message){
      if (item === 'status'){
        var status_val = message[item];
        var sttus_ = "input[name='groupStatus'][value="+status_val+"]"
        $(sttus_).attr("checked", true);
      }
      else if(item === 'createdby'){ // 提交人!
        var createdby = this.userinfo.getName();
        message[item] = createdby;
        // $('.'+ item).val(message[item]===undefined?null:message[item]);
        $('.'+ item).text(createdby);
      }else {
        $('.'+ item).text(message[item]===undefined?null:message[item]);
      }
    }
  }

  // 保存修改的数据
  save_data(rowData){
    var save_data = Object.assign({},rowData)
    // 得到当前设备状态
    var status = "input[name='groupStatus']:checked"
    var status_valu = $(status).val()
    save_data["status"] = status_valu;
    // 故障描述
    var errmsg = $('textarea').val();
    save_data["errmsg"] = errmsg;
    return save_data
    
  };

  // 弹出提示，不为空！
  not_null(){
    layui.use('layer',function() {
      var layer = layui.layer
      layer.open({
        title: ["提示","padding: 1rem 1.5rem;border-bottom: 1px solid #edf1f7;border-top-left-radius: 0.25rem;border-top-right-radius: 0.25rem;color: #222b45;font-family: Open Sans, sans-serif;font-size: 0.9375rem;font-weight: 600;line-height: 0.5rem;background: #fff;"]
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['关闭']
        ,btnAlign: 'r'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: "提交人必填!"
        ,yes:function () {
          layer.closeAll();
        }

      })
    })
  }

  // 弹出提示，状态不能相同！
  alert_status(){
    layui.use('layer',function() {
      var layer = layui.layer
      layer.open({
        title: ["提示","padding: 1rem 1.5rem;border-bottom: 1px solid #edf1f7;border-top-left-radius: 0.25rem;border-top-right-radius: 0.25rem;color: #222b45;font-family: Open Sans, sans-serif;font-size: 0.9375rem;font-weight: 600;line-height: 0.5rem;background: #fff;"]
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['关闭']
        ,btnAlign: 'r'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: "当前设备状态必须改变!"
        ,yes:function () {
          layer.closeAll();
        }

      })
    })
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
