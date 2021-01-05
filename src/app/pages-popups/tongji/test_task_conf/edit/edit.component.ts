import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';

declare let $;
declare let layui;

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() rowdata:any;

  taskstatus_value = "试验启动"; // 试验状态
  isShow = false; // 未启动时，不展示！

  constructor(private dialogRef: NbDialogRef<EditComponent>, private http: HttpserviceService,
    private userinfo: UserInfoService, private publicmethod: PublicmethodService
  ) { }

  ngOnInit(): void {
    console.log("*****************", this.rowdata);
    var testrun = ".testrun"; // 试验启动
    var teststop = ".teststop"; // 试验暂停
    var testcontinue = ".testcontinue"; // 试验继续
    var testcomplete = ".testcomplete"; // 试验完成

    var taskstatus = this.rowdata["taskstatus"];
    if (taskstatus === '未启动'){
      this.taskstatus_value = '试验启动'
      $(testrun).attr("class", "testrun layui-btn layui-btn-normal");
      $(teststop).addClass("layui-btn-disabled");
      $(testcontinue).addClass("layui-btn-disabled");
      $(testcomplete).addClass("layui-btn-disabled");
      this.isShow = false;
    }else{
      switch (taskstatus) {
        case '暂停中': // 暂停中对应试验继续
          this.taskstatus_value = '试验继续'
          $(testcontinue).attr("class", "testcontinue" + " layui-btn layui-btn-normal");
          break;
        case '进行中': //进行中对应试验完成
          this.taskstatus_value = '试验完成'
          $(testcomplete).attr("class", "testcomplete" + " layui-btn layui-btn-normal");
          break;
      }
      this.isShow = true;
    }

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
      form.verify({})
      // 表单赋值 this.rowdata 传递来的行数据！

      form.val('test_task_info_edit',{
        expectedtime:that.rowdata.expectedtime, // 预计天数
        devicetasknumbers: that.rowdata.devicetasknumbers, // 试验轮次
        devicetasknownumbers: that.rowdata.devicetasknownumbers, // 当前试验轮次
        lastupdateon: that.rowdata.lastupdateon, // 上次状态修改时间
        // statuscause: '状态变更原因', // 状态变更原因
        causemessage: null, // 其它备注
      });

      // 初始化 状态变更原因
      that.statuscause_seleect(form);

      //监听提交
      form.on('submit(confirm)', function(data){
        data.field["taskstatus"] = that.taskstatus_value;
        data.field["taskchildnum"] = that.rowdata.taskchildnum;
        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
        that.updatetaskinfo(data.field)
        // console.log("***************data.field************",data.field);
        // 保存数据
        return false;
      });
    })
  }

  // 状态变更装填原因 下拉框  statuscause
  // 临时试验插入/更改设备/设备维修/更换样件/试验完成/等待支持/其他
  statuscause_seleect(form){
    var data = [
      {
        id: "临时试验插入",
        title: "临时试验插入"
      },
      {
        id: "更改设备",
        title: "更改设备"
      },
      {
        id: "设备维修",
        title: "设备维修"
      },
      {
        id: "更换样件",
        title: "更换样件"
      },
      {
        id: "试验完成",
        title: "试验完成"
      },
      {
        id: "等待支持",
        title: "等待支持"
      },
      {
        id: "其他",
        title: "其他"
      },
    ];
    var option = '`<option  value ="">请选择变更原因</option>`'
    data.forEach(item=>{
      option += `<option  value ="${item.id}">${item.title}</option>`;
    })
    $("#statuscause").html(option);
    form.render();
  }

  // 更新编辑的试验任务信息
  updatetaskinfo(data){
    console.log("***************更新编辑的试验任务信息 data************",data);
    var monthed = "dev_update_task";
    var columns = data;
    this.http.callRPC('device', monthed, columns).subscribe(result=>{
      var res = result["result"]["message"][0];
      console.log("++++++++++++++++更新编辑的试验任务信息", result);
      if (res["code"] === 1){
        this.success();
        this.RecordOperation('编辑', 1, '试验任务信息');
        this.dialogRef.close(true);
      }else{
        var data = JSON.stringify(res["messsage"]);
        this.danger(data);
        this.RecordOperation('编辑', 0, '试验任务信息')
      }
    })
  }



  // 编辑按钮
  teststatus(value){
    var myclass = value.split(',')[0];
    var mytitle = value.split(',')[1];
    var is_click = $('.'+myclass).attr("class").split(" ")[3];
    if (is_click === 'layui-btn-disabled'){

    }else if(this.rowdata["taskstatus"] === '未启动'){

    }else{
      var testrun = "testrun"; // 试验启动
      var teststop = "teststop"; // 试验暂停
      var testcontinue = "testcontinue"; // 试验继续
      var testcomplete = "testcomplete"; // 试验完成
      $('.'+testrun).attr("class", testrun + " layui-btn layui-btn-primary");
      $('.'+teststop).attr("class", teststop + " layui-btn layui-btn-primary");
      $('.'+testcontinue).attr("class", testcontinue + " layui-btn layui-btn-primary");
      $('.'+testcomplete).attr("class", testcomplete + " layui-btn layui-btn-primary");
      console.log("+++++++++++++++++++++++++++++++++++++++++++++",mytitle );
      $('.'+myclass).attr("class", myclass + " layui-btn layui-btn-normal");

      this.taskstatus_value = mytitle;

    }
  }


    // 编辑
    success(){
      this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"编辑成功!"});
    }
    danger(data){
      this.publicmethod.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"编辑失败" + data});
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
