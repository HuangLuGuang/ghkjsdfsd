import { Component, OnInit } from '@angular/core';
import { NbDialogRef} from '@nebular/theme';
import { UserInfoService } from '../../services/user-info/user-info.service';

import { ChangePassword } from './form_verification';

// Md5 加密
import { Md5 } from 'ts-md5';
// 盐 
import { salt } from '../../appconfig';
import { HttpserviceService } from '../../services/http/httpservice.service';
import { PublicmethodService } from '../../services/publicmethod/publicmethod.service';
declare let layui;

declare let $;

@Component({
  selector: 'ngx-change-passowrd',
  templateUrl: './change-passowrd.component.html',
  styleUrls: ['./change-passowrd.component.scss']
})
export class ChangePassowrdComponent implements OnInit {

  constructor(
    private dialogRef: NbDialogRef<ChangePassowrdComponent>,
    private userinfo:UserInfoService,
    private http: HttpserviceService,
    private publicservice: PublicmethodService,
  ) { this.username = this.userinfo.getLoginName(); }

  username;

  TABLE = "employee";
  METHOD = "update_passage";
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
  
  // 表单函数
  layuiform(){
    var that = this;
    layui.use(['form'], function(){
      var form = layui.form
      ,layer = layui.layer
      form.render(); // 刷新 表单
      // 验证表单
      var special_sql = ChangePassword["special_sql"]["special_sql"];
      var special_str = ChangePassword["special_sql"]["special_str"];
      form.verify({
        // 旧密码
        oldpassword:function(value,item){
          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (!str){
            return "旧密码不能有特殊字符！"
          }
          if (value.length < 6){
            return "旧密码长度至少为6个字符"
          }
          // if (Md5.hashStr(value  + salt ) !== that.userinfo.getLoginPassword()){
          //   console.log("------------->",that.userinfo.getLoginPassword())
          //   console.log("md5------------->",Md5.hashStr(value  + salt ))
          //   return "旧密码不存在"
          // }
        },
        // 新密码
        newpassword:function(value,item){
          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if(sql){
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
          }
          if (!str){
            return "新密码不能有特殊字符！"
          }
          if (value.length < 6){
            return "新密码长度至少为6个字符"
          }
        },
        // 确认密码
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
          if($("input[name=newpassword]").val() !== value){
            console.log("密码不一致",$("input[name=newpassword]").val())
            return "两次输入的密码不一致"
          }
        }

      }); 

      form.on("submit(password)",function(data){
        var formdata = Object.assign({}, data.field);
        formdata["loginname"] = that.username;
        // 密码需要加密
        formdata["newpassword"] = Md5.hashStr(formdata["newpassword"]  + salt );
        formdata["confirmpassword"] = Md5.hashStr(formdata["confirmpassword"]  + salt );
        formdata["oldpassword"] = Md5.hashStr(formdata["oldpassword"]  + salt );
        // formdata: {oldpassword: "000000", newpassword: "000000", confirmpassword: "000000", loginname: "admin"}
        // 修改密码
        var table = that.TABLE;
        var method = that.METHOD;
        var colums = formdata
        console.log("====== formdata ====",formdata)
        that.http.callRPC(table, method, colums).subscribe(result=>{
          var code = result["result"]["message"][0]["code"];
          switch (code) {
            case 1:
              // 表示修改成功
              that.success();
              var info = "loginname:" + colums["loginname"];
              that.RecordOperation(1,"修改密码",info);
              that.dialogRef.close(true);
              break;
            default:
              // 表示修改失败
              var message = result["result"]["message"][0]["message"];
              that.danger(message);
              var info = "loginname:" + colums["loginname"];
              that.RecordOperation(0,"修改密码",info)
              break;
          }
          
          console.log("====== 修改密码 ====",result)
        });
        
        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
      })
    })
  }

  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"修改成功!"});
  }
  danger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"修改失败:" + data});
  }

   // option_record
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
