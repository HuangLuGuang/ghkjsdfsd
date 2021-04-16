import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";

declare let $;

declare let layui;

@Component({
  selector: "ngx-my-date-range",
  templateUrl: "./my-date-range.component.html",
  styleUrls: ["./my-date-range.component.scss"],
})
export class MyDateRangeComponent implements OnInit {
  constructor(
    private publicservice: PublicmethodService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {}

  // init_value = "2019-12-01 - 2020-12-21"; // 默认日期
  init_value; // 默认日期
  default_date;
  ngAfterViewInit() {
    // 得到默认的日期
    var get_curr_mounth_one = this.publicservice.get_curr_mounth_one();
    var default_date = get_curr_mounth_one[0] + " - " + get_curr_mounth_one[1];
    this.init_value = default_date;
    this.default_date = default_date;
    console.log("得到默认的日期:>>", default_date); // 2020-12-01 - 2020-12-15

    // 初始化 日期范围！
    this.initdate();
  }

  ngOnDestroy() {
    $(".divice_kpi_report_date").remove();
  }

  // 初始化日期范围
  initdate() {
    var init_value = this.init_value;
    var that = this;
    layui.use("laydate", function () {
      var laydate = layui.laydate;
      //日期范围 2010-10-01 2020-11-21

      laydate.render({
        elem: ".divice_kpi_report_date",
        range: true,
        show: false,
        format: "yyyy-MM-dd",
        btns: ["confirm"],
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
            // that.delet_default();

            // console.log("得到初始的日期时间对象  已经清空了:",that.init_value , "value", this.value  ); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            this.value = that.init_value;
          }
        },
        change: function (value, date, endDate) {
          console.log("在控件上弹出value值--------------------");
        },
      });
    });
  }

  // 得到日期
  getselect() {
    var date_range = this.init_value;
    var date = date_range.split(" - ");
    // console.log("date--->", date)
    var date_list = date[0] === "" ? [] : date;
    return date_list;
  }

  // 重置日期范围 到默认的日期！
  reset_mydate() {
    this.init_value = this.default_date;
    this.initdate();
  }

  // 清空
  delet_default() {
    $(".divice_kpi_report_date").remove();
    $(".divice_kpi_report_date_div").html(
      '<input style="height: 31px;" type="text" name="date-range" class="layui-input divice_kpi_report_date" id="divice_kpi_report_date" placeholder=" - ">'
    );
    var that = this;
    layui.use("laydate", function () {
      var laydate = layui.laydate;
      //日期范围 2010-10-01 2020-11-21
      laydate.render({
        elem: ".divice_kpi_report_date",
        range: true,
        show: true,
        format: "yyyy-MM-dd",
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
            that.initdate();
            // console.log("得到初始的日期时间对象  已经清空了:",that.init_value , "value", this.value  ); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            this.value = that.init_value;
          }
        },
        change: function (value, date, endDate) {
          console.log("在控件上弹出value值--------------------");
        },
      });
    });
  }
}
