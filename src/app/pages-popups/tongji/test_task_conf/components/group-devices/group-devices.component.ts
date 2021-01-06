import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../../services/http/httpservice.service';
import { UserInfoService } from '../../../../../services/user-info/user-info.service';

declare let $;
declare let layui;

@Component({
  selector: 'ngx-group-devices',
  templateUrl: './group-devices.component.html',
  styleUrls: ['./group-devices.component.scss']
})
export class GroupDevicesComponent implements OnInit {

  // 科室/功能组下拉框
  groups = [];
  // 设备id
  deviceid;
  // 设备名称
  devicename;
  // 设备编号
  deviceno;

  form_data; // 表单数据
  constructor(private userinfo: UserInfoService, private http: HttpserviceService) {
    // this.init_groups();
   }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.layuiform()

  }

  ngOnDestroy(){
    
  }

  // 初始化表单
  layuiform(){
    var that = this;
    layui.use('form',function(){
      var form = layui.form;
      // form.render();
      var data = form.val("test_task_conf_add_inline_groups"); // 试验信息预览 
      that.form_data = data;

      that.init_groups(form)
      // 监听选择的功能组
      form.on('select(test_task_conf_add_group)', function(data){
        // console.log("监听选择 功能组：",data.value); //得到被选中的值,即为 group 的id
        if (data.value !== ""){
          that.init_devicename_deviceno(data.value,form)
        }
      }); 
      
      // 监听选择的设备名称
      form.on('select(test_task_conf_add_devicename)', function(data){
        // console.log("监听选择 设备名称：",data); //得到被选中的值,即为 group 的id
        that.update_deviceno(data.value)
      })
      

    })
  }

  // 得到科室功能组
  init_groups(form){
    var monthed = "dev_get_device_type";
    var columns = {
      employeeid:this.userinfo.getEmployeeID(),
    }
    this.http.callRPC("device", monthed, columns).subscribe(result=>{
      var res = result["result"]["message"][0];
      if (res["code"] === 1){
        var groups = res["message"][0]["groups"];
        console.log("得到科室功能组", groups)
        // 动态创建option
        console.log("得到科室功能组", groups)
        // this.groups = groups;
        var option = `<option value="">请选择功能组</option>`;
        groups.forEach(element => {
          option += `<option  value ="${element.id}">${element.label}</option>`;
          $("#test_task_conf_add_group").html(option)
        });
        form.render();
        
      }
    })

  }


  // 根据科室/功能组得到 设备名称-设备编号
  init_devicename_deviceno(groupsid,form){
    var monthed = "dev_get_device_name";
    var columns = {
      groupsid:groupsid,
    }
    this.http.callRPC("device", monthed, columns).subscribe(result=>{
      var res = result["result"]["message"][0];
      if (res["code"] === 1){
        var devicename_deviceno = res["message"];
        var option = ''
        devicename_deviceno.forEach((element, index) => {
          if (index === 0){
            this.update_deviceno(element.deviceid + ';' + element.deviceno);
            this.devicename = element.devicename;
          }
          option +=  `<option  value ="${element.deviceid + ';' + element.deviceno}">${element.devicename}</option>`;
        });
        $("#test_task_conf_add_devicename").html(option);
        form.render();
      }
    })
    
  }

  // 更改设备编号 deveceno
  update_deviceno(deviceno){
    // test_task_conf_add_deviceno
    this.deviceid = deviceno.split(';')[1];
    this.deviceno = deviceno.split(';')[0];
    this.devicename = $("#test_task_conf_add_devicename").find("option:selected").text();
    // console.log("更改设备编号 deveceno",deviceno);
    $("#test_task_conf_add_deviceno").val(this.deviceid)
  }

  // 得到 form值！
  get_form_val(){
    
   
    return {
      deviceid: this.deviceid,
      deviceno: this.deviceno,
      devicename: this.devicename,
    }
  }

}
