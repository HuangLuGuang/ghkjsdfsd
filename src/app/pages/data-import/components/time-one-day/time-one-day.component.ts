import { Component, OnInit } from "@angular/core";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";

declare let $;

declare let layui;

@Component({
  selector: "ngx-time-one-day",
  templateUrl: "./time-one-day.component.html",
  styleUrls: ["./time-one-day.component.scss"],
})
export class TimeOneDayComponent implements OnInit {
  init_value;
  default_date;

  min_date;
  max_date;

  constructor(private publicservice: PublicmethodService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    // 得到默认的日期
    var get_curr_mounth_one = this.publicservice.get_curr_mounth_one();
    this.init_value = get_curr_mounth_one[1];
    this.default_date = get_curr_mounth_one[1];
    this.max_date = get_curr_mounth_one[1];

    // 初始化 日期范围！
    this.initdate();
  }

  ngOnDestroy() {
    $(".time_one_day").remove();
  }

  // 初始化日期范围
  initdate() {
    var init_value = this.init_value;
    var that = this;
    layui.use("laydate", function () {
      var laydate = layui.laydate;
      //日期范围 2010-10-01 2020-11-21
      laydate.render({
        elem: "#time_one_day",
        show: false,
        format: "yyyy-MM-dd",
        max: that.max_date,
        trigger: "click", //呼出事件改成click  控件选择完毕回调
        btns: ["confirm"],
        showBottom: false,
        value: that.init_value,
        isInitValue: true,

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
          $("#time_one_day").val(value);
          $(".layui-laydate").remove();
        },
      });
    });
  }

  // 得到日期
  getselect() {
    var date_range = this.init_value;
    return date_range;
  }

  // 重置日期范围 到默认的日期！
  reset_mydate() {
    this.init_value = this.default_date;
    this.initdate();
  }
}
