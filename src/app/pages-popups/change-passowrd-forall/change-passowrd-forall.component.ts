import { Component, OnInit,Input } from '@angular/core';
import { NbDialogRef} from '@nebular/theme';
// Md5 加密
import { Md5 } from 'ts-md5';
// 盐 
import { salt } from '../../appconfig';
import { HttpserviceService } from '../../services/http/httpservice.service';
import { PublicmethodService } from '../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../services/user-info/user-info.service';

import { UpdatePassword } from './form_verification';

declare let layui;

declare let $;

@Component({
  selector: 'ngx-change-passowrd-forall',
  templateUrl: './change-passowrd-forall.component.html',
  styleUrls: ['./change-passowrd-forall.component.scss']
})
export class ChangePassowrdForallComponent implements OnInit {
  @Input() loginname: string;
  constructor(private dialogRef: NbDialogRef<ChangePassowrdForallComponent>,private userinfo: UserInfoService,private publicservice: PublicmethodService,
    private http: HttpserviceService,  
  ) { }

  TABLE = "employee";
  METHOD = "update_assign_passage";

  ngOnInit(): void {
    console.log("==========loginname==========",this.loginname);
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

  // 表单函数
  layuiform(){
    var that = this;
    layui.use(['form'], function () {
      var form = layui.form
      ,layer = layui.layer
      form.render(); // 刷新表单

      // 验证表单
      var special_sql = UpdatePassword["special_sql"]["special_sql"];
      var special_str = UpdatePassword["special_sql"]["special_str"];
      form.verify({
        // 域账号-- 这个虽然不是手动输入的，但也要验证
        loginname:function (value,item) {
          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (!str){
            return "域账号不能有特殊字符！"
          }
          if (value.length > 50){
            return "域账号最大长度不超过50！"
          }
        },
        // 登录密码：loginpassword
        loginpassword:function (value,item) {
          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (!str){
            return "登录密码不能有特殊字符！"
          }
          if (value.length < 6){
            return "登录密码长度至少为6个字符"
          }
          if (value.length > 32){
            return "登录密码长度不超过32个字符"
          }
        },
        // 确认密码：confirmpassword
        confirmpassword:function(value, item){
          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (!str){
            return "确认密码不能有特殊字符！"
          }
          if (value.length < 6){
            return "新密码长度至少为6个字符"
          }
          // 是否一致
          if($("input[name=loginpassword]").val() !== value){
            console.log("密码不一致",$("input[name=loginpassword]").val())
            return "两次输入的密码不一致"
          }
        }
      })

      // 表单 域账号赋值，从用户管理中得到的
      // form.val("updatepassword",{
      //   loginname: 'admin'
      // })

      // 提交表单
      
      form.on("submit(password)", function (data) {
        var formdata = Object.assign({}, data.field);
        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
        // 密码加密！
        // {loginname: "admin", loginpassword: "f86b5640ffb3e293d313bf9730fe906b", confirmpassword: "f86b5640ffb3e293d313bf9730fe906b"}
        formdata["loginname"] = that.loginname;
        formdata["loginpassword"] =  Md5.hashStr(formdata["loginpassword"]  + salt );
        formdata["confirmpassword"] =  Md5.hashStr(formdata["confirmpassword"]  + salt );
        // console.log("---formdata----",formdata);
        // 调用plv8  
        that.change_password(formdata);
      })

    })
  }

  // 调用plv8 修改密码
  change_password(formdata){
    var table = this.TABLE;
    var method = this.METHOD;
    var columns = formdata;
    $(".submit_password").attr('disabled','disabled');
    this.http.callRPC(table, method,columns).subscribe(result=>{
      // console.log("调用plv8 修改密码  :",result);
      var code = result["result"]["message"][0]["code"];
      if (code === 1){
        this.success();
        var info = "loginname:" + columns["loginname"];
        this.RecordOperation(1,"修改密码",info);
        this.dialogRef.close(true);
      }else{
        var data = result["result"]["message"][0]["message"];
        this.danger(data);
        this.RecordOperation(0,"修改密码",data);
      }
      $(".submit_password").removeAttr('disabled');
    })
  }

  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"修改成功!"});
  }
  danger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"修改失败:" + data});
  }

  // option_record  that.RecordOperation(1,"修改密码",info);
  RecordOperation(result,transactiontype, infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = transactiontype; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result, transactiontype, info, createdby);
    }

  }


}
