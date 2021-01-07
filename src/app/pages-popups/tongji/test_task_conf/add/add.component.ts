import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';

declare let $;
declare let layui;

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('groups_devices') groups_devices:any; // 当前主设备信息！
  constructor(private dialogRef: NbDialogRef<AddComponent>, private http: HttpserviceService, private userinfo: UserInfoService,
    private publicmethod: PublicmethodService  
  ) { }

  // 样件信息 列表
  explarinfo_list = [];
  // 预览的数据
  previewinfodata: PreviewInfo = {
    tasknum: '', //试验任务编号
    exemplarnumbers: '', //样件编号
    exemplarchildnumbers: '', // 样件三级编号
    exemplarname: '', // 样件名称
    taskitemnumbers: '', // 试验条目编号
    
    taskchildnum:"", // 试验编号  = 试验任务编号+试验条目编号 tasknum + taskitemnumbers
    devicenum: "",   // 设备编号
    devicetaskname: "", // 试验名称
    devicename: "",       // 设备名称
    executor: "",         // 执行人
    // exemplarinfo = exemplarnumbers + taskitemnumbers + exemplarchildnumbers + exemplarname
    taskmessage: []     // 样件信息 = 样件编号+试验条目编号+样件三级编号+样件名称
  };
  // info
  info;
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.layuiform();
  }

  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
  }
  // 取消
  cancel(){
    this.dialogRef.close(false);
  }

  // 表单 form
  layuiform(){
    var that = this;
    layui.use('form', function(){
      var form = layui.form,
      layer = layui.layer;

      // 验证表单
      form.verify({});

      //监听提交
      form.on('submit(add)', function(data){
        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
        // 得到当前主设备信息！
        var groups_devices_datas = that.groups_devices.get_form_val()
        // console.log("得到form的值 devicename", groups_devices_datas)
        data.field["devicename"] = groups_devices_datas.devicename
        data.field["devicenum"] = groups_devices_datas.deviceid
        that.previewinfo(data.field)
        return false;
      });

      // 确定 confirm
      form.on('submit(confirm)', function(data){
        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
        // 得到当前主设备信息！
        var groups_devices_datas = that.groups_devices.get_form_val()
        // console.log("得到form的值 deviceid", groups_devices_datas.deviceid)
        // console.log("得到form的值 deviceno", groups_devices_datas.deviceno)
        // console.log("得到form的值 devicename", groups_devices_datas.devicename)

        // 得到预览的数据
        var previewinfodata = that.previewinfodata;
        // console.log("previewinfodata----->",previewinfodata);

        // 要保存的数据！
        var save_data = {};
        save_data["tasknum"] = previewinfodata.tasknum;
        save_data["exemplarnumbers"] = previewinfodata.exemplarnumbers;
        save_data["exemplarchildnumbers"] = previewinfodata.exemplarchildnumbers;
        save_data["exemplarname"] = previewinfodata.exemplarname;
        save_data["taskitemnumbers"] = previewinfodata.taskitemnumbers;
        save_data["taskchildnum"] = previewinfodata.taskchildnum;
        save_data["devicenum"] = previewinfodata.devicenum;
        save_data["executor"] = previewinfodata.executor;

        save_data["deviceid"] = groups_devices_datas.deviceid;
        save_data["deviceno"] = groups_devices_datas.deviceno;
        save_data["devicename"] = groups_devices_datas.devicename;
        
        // 添加创建人
        save_data["createdby"] = that.userinfo.getLoginName();


        save_data["taskmessage"] = previewinfodata["taskmessage"].join(',');
        console.error("要保存的数据！>>>", save_data);
        
        var table = "device";
        var monthed = 'dev_insert_task';
        var conlumns = save_data;
        that.http.callRPC(table, monthed, conlumns).subscribe(result=>{
          var res = result['result']['message'][0];
          if (res["code"] === 1){
            // 保存成功
            that.dialogRef.close(true);
            that.RecordOperation("新增", 1, '试验任务配置：' + JSON.stringify(conlumns));
            that.success();
          }else{
            // 保存失败
            that.dialogRef.close(false);
            that.RecordOperation("新增", 0, '试验任务配置:' + JSON.stringify(conlumns));
            that.danger(JSON.stringify(res["message"]))
          }
        })
        
        return false;
      });

    })
  }

  // 预览info
  previewinfo(info){
    // 预览的数据
    
    console.log("预览info: ", info);
    
    this.explarinfo_list.push(info.exemplarnumbers + "-" + info.taskitemnumbers + "-" + info.exemplarchildnumbers + " " + info.exemplarname)
    var previewinfodata: PreviewInfo = {
      tasknum: info.tasknum, //试验任务编号
      exemplarnumbers: info.exemplarnumbers, //样件编号
      exemplarchildnumbers: info.exemplarchildnumbers, // 样件三级编号
      exemplarname: info.exemplarname, // 样件名称
      taskitemnumbers: info.taskitemnumbers, // 试验条目编号
      taskchildnum: info.tasknum + "-" + info.taskitemnumbers,
      devicenum: info.devicenum, // 设备编号
      devicetaskname: info.devicetaskname,
      devicename: info.devicename, // 从 当前设备信息中得到的
      executor: info.executor,
      taskmessage: this.explarinfo_list,
    }
    this.previewinfodata = previewinfodata,
    console.log("最终预览的数据：", this.previewinfodata);
    
    // 清空 样件三级编号、样件名称！
    $("input[name='exemplarchildnumbers']").val("");
    $("input[name='exemplarname']").val("");

  }


  // 删除
  success(){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"新增成功!"});
  }
  danger(data){
    this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"新增失败" + data});
  }


  // option_record
  RecordOperation(option, result,infodata){
    // option:操作类型, result:操作的结果, infodata:附加信息!
    // console.warn("==============>", this.userinfo.getLoginName())
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicmethod.option_record(employeeid, result,transactiontype,info,createdby);
    }

  }

}

interface PreviewInfo {
  tasknum: string, //试验任务编号
  exemplarnumbers: string, //样件编号
  exemplarchildnumbers: string, // 样件三级编号
  exemplarname: string, // 样件名称
  taskitemnumbers: string, // 试验条目编号

  taskchildnum:string, // 试验编号  = 试验任务编号+试验条目编号 tasknum + taskitemnumbers
  devicenum: string,   // 设备编号
  devicetaskname: string, // 试验名称
  devicename: string,       // 设备名称
  executor: string,         // 执行人
  // exemplarinfo = exemplarnumbers + taskitemnumbers + exemplarchildnumbers + exemplarname
  taskmessage: string[]     // 样件信息 = 样件编号+试验条目编号+样件三级编号+样件名称

}
