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
      $(testrun).attr("class", "testrun layui-btn layui-btn-normal");
      $(teststop).addClass("layui-btn-disabled");
      $(testcontinue).addClass("layui-btn-disabled");
      $(testcomplete).addClass("layui-btn-disabled");
      this.isShow = false;
      switch (taskstatus) {
        case '试验暂停':
          $(teststop).attr("class", "teststop" + " layui-btn layui-btn-normal");
          break;
        case '试验继续':
          $(testcontinue).attr("class", "testcontinue" + " layui-btn layui-btn-normal");
          break;
        case '试验完成':
          $(testcomplete).attr("class", "testcomplete" + " layui-btn layui-btn-normal");
          
          break;
 
      }
      

    }else{
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
      form.verify({});

      //监听提交
      form.on('submit(confirm)', function(data){
        data.field["taskstatus"] = that.taskstatus_value
        layer.alert(JSON.stringify(data.field), {
          title: '最终的提交信息'
        })
        console.log("***************data.field************",data.field)
        return false;
      });
    })
  }

  // 编辑按钮
  teststatus(value){
    var myclass = value.split(',')[0];
    var mytitle = value.split(',')[1];
    var is_click = $('.'+myclass).attr("class").split(" ")[3];
    if (is_click === 'layui-btn-disabled'){

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

}
