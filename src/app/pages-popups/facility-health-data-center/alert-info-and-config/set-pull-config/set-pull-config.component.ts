import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";
declare let $;
declare let layui;

@Component({
  selector: "ngx-set-pull-config",
  templateUrl: "./set-pull-config.component.html",
  styleUrls: ["./set-pull-config.component.scss"],
})
export class SetPullConfigComponent implements OnInit {
  @Input() rowdata: any;

  init_value;
  default_date;

  min_date;
  max_date;

  constructor(
    private dialogRef: NbDialogRef<SetPullConfigComponent>,
    private userinfo: UserInfoService,
    private publicmethod: PublicmethodService
  ) {}

  ngOnInit(): void {
    console.log("*****************", this.rowdata);
  }

  ngAfterViewInit() {
    // 得到默认的日期
    var get_curr_mounth_one = this.publicmethod.get_curr_mounth_one();
    var default_date = get_curr_mounth_one[0] + " - " + get_curr_mounth_one[1];
    console.log("得到默认的日期:>>", default_date); // 2020-12-01 - 2020-12-15
    this.init_value = default_date;
    this.default_date = default_date;
    this.max_date = default_date.split(" - ")[1];

    setTimeout(() => {
      this.layuiform();
    }, 200);
  }

  layuiform() {
    var that = this;
    layui.use(["form", "laydate"], function () {
      var form = layui.form;
      var laydate = layui.laydate;
      var layer = layui.layer;
      form.render(); // 刷新all
      form.render("select"); // 刷新select

      // pulltimes
      var laydate = layui.laydate;
      //日期范围 2010-10-01 2020-11-21
      laydate.render({
        elem: "#pulltimes",
        range: true,
        show: false,
        format: "yyyy-MM-dd",
        max: that.max_date,
        trigger: "click", //呼出事件改成click  控件选择完毕回调
        btns: ["confirm"],
        showBottom: false,
        // 初始化日期范围
        value: that.init_value,
        // ,trigger: 'click'//呼出事件改成click  控件选择完毕回调
        ready: function (date) {
          // console.log("得到初始的日期时间对象:",init_value); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
          console.log("得到初始的日期时间对象:", this.value); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        },
        done: function (value, date, endDate) {
          that.init_value = value;
          if (value === "") {
            this.show = true;
            this.value = that.init_value;
          }
        },
        change: function (value, date, endDate) {
          console.log("在控件上弹出value值--------------------", value);
          that.init_value = value;
          this.show = true;
          $("#pulltimes").val(value);
          $(".layui-laydate").remove();
        },
      });
    });
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }
  // 取消
  cancel() {
    this.dialogRef.close(false);
  }

  // option_record
  RecordOperation(option, result, infodata) {
    // option:操作类型, result:操作的结果, infodata:附加信息!
    // console.warn("==============>", this.userinfo.getLoginName())
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
