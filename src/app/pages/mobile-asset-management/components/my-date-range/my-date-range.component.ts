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
  constructor(private publicservice: PublicmethodService) {}

  ngOnInit(): void {}

  init_value;
  default_date;

  min_date;
  max_date;

  ngAfterViewInit() {
    // 得到默认的日期
    var get_curr_mounth_one = this.publicservice.get_curr_mounth_one();
    var default_date = get_curr_mounth_one[0] + " - " + get_curr_mounth_one[1];
    console.log("得到默认的日期:>>", default_date); // 2020-12-01 - 2020-12-15
    this.init_value = default_date;
    this.default_date = default_date;
    this.max_date = default_date.split(" - ")[1];

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
        elem: "#divice_kpi_report_date",
        range: true,
        show: false,
        btns: ["confirm"],
        format: "yyyy-MM-dd",
        max: that.max_date,
        showBottom: false,
        // 初始化日期范围
        value: that.init_value,
        // ,trigger: 'click'//呼出事件改成click  控件选择完毕回调
        done: function (value, date, endDate) {
          that.init_value = value;
          if (value === "") {
            this.show = true;
            this.value = that.init_value;
          }
        },
        change: function (value, date, endDate) {
          that.init_value = value;
          this.show = true;
          $("#divice_kpi_report_date").val(value);
          $(".layui-laydate").remove();
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
}
