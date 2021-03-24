import { Component, OnInit, Input } from "@angular/core";
import { DataSet } from "@mykeels/ng2-smart-table/lib/lib/data-set/data-set";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

import { Rule } from "./form_verification";

declare let $;
declare let layui;

@Component({
  selector: "ngx-set-rule-config",
  templateUrl: "./set-rule-config.component.html",
  styleUrls: ["./set-rule-config.component.scss"],
})
export class SetRuleConfigComponent implements OnInit {
  @Input() rowdata: any;
  constructor(
    private dialogRef: NbDialogRef<SetRuleConfigComponent>,
    private userinfo: UserInfoService,
    private publicmethod: PublicmethodService,
    private http: HttpserviceService,
    private publicservice: PublicmethodService
  ) {}

  employeeid = this.userinfo.getEmployeeID();
  employeename = this.userinfo.getName();
  TABLE = "device_monitor.device_log";
  METHOD = "insert_alarm";

  ngOnInit(): void {
    console.log("规则配置*****************", this.rowdata);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.layuiform();
    }, 200);
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }
  // 取消
  cancel() {
    this.dialogRef.close(false);
  }

  layuiform() {
    var that = this;
    layui.use(["form", "laydate"], function () {
      var form = layui.form;
      var laydate = layui.laydate;
      var layer = layui.layer;
      form.render(); // 刷新all
      form.render("select"); // 刷新select

      // 初始化
      form.val("ruleconfig", that.rowdata);
      form.render();

      // 表单验证
      form.verify({
        keyword: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Rule["special_sql"]["special_sql"];
          var special_str = Rule["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "keyword不能有特殊字符！";
          }
          if (value.length > 225) {
            return "keyword最大长度不超过225！";
          }
        },
        newmessage: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Rule["special_sql"]["special_sql"];
          var special_str = Rule["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "自定义报警规则不能有特殊字符！";
          }
          if (value.length > 225) {
            return "自定义报警规则最大长度不超过225！";
          }
        },
      });

      // 确定按钮
      var ruledata: RULEDATE = {
        deviceid: that.rowdata["deviceid"], // 设备ID
        level: 0, // 报警等级
        message: "", // 报警内容
        newmessage: "", // 自定义报警内容
        createdby: that.employeename, // 创建人
        lastupdatedby: that.employeename, // 更新人
      };
      form.on("submit(set_rule_config)", function (data) {
        var formdata = data.field;
        ruledata.level = Number(formdata.level);
        ruledata.message = formdata.keyword; // 关键词
        ruledata.newmessage = formdata.newmessage;
        that.insertdata(ruledata);
        // console.error("确定按钮>>>", ruledata);
      });
    });
  }

  // 插入数据
  insertdata(data: RULEDATE) {
    var message = data;
    this.http.callRPC(this.TABLE, this.METHOD, data).subscribe((result) => {
      const res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.addsuccess();
        this.RecordOperation("新增规则配置", 1, JSON.stringify(message));
        this.dialogRef.close(true);
      } else {
        var data = JSON.stringify(res["message"]);
        this.dialogRef.close(false);
        this.RecordOperation("新增规则配置", 0, data);
        this.adddanger(data);
      }
    });
  }
  addsuccess() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "添加成功!",
    });
  }
  adddanger(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "添加失败!" + data,
    });
  }

  // option_record
  RecordOperation(option, result, infodata) {
    // option:操作类型, result:操作的结果, infodata:附加信息!
    // console.warn("==============>", this.userinfo.getLoginName())
    console.warn("==============>", infodata);
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicmethod.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}

interface RULEDATE {
  deviceid: String; // 设备ID
  level: Number; // 报警等级
  message: String; // 关键词
  newmessage: String; // 自定义报警内容
  createdby: string; // 创建人
  lastupdatedby: string; // 更新人
}
