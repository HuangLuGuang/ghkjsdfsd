import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as screenfull from "screenfull";
import { Screenfull } from "screenfull";
import { LayoutService } from "../../../@core/utils";

declare var $: any;

var alert_management = require("../../../../assets/pages/alert-management/js/alert_management");

@Component({
  selector: "ngx-centralized-monitoring",
  templateUrl: "./centralized-monitoring.component.html",
  styleUrls: ["./centralized-monitoring.component.scss"],
})
export class CentralizedMonitoringComponent implements OnInit {
  is_not_fullscreen = true; // 是否处于全屏

  loading = false;
  title = "试验室设备集中报警监控"; //标题
  isFirstLevel;
  date = {
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minute: 0,
    second: 0,
  }; //时间
  dateInterval: any; //定时器

  //看板路由下所有菜单配置
  menu;
  // 按钮的显影
  b_show = {
    back: true, //返回按钮
    home: true, //主页按钮
  };

  log_warm = {
    // '时间','日志等级','日志信息'
    title: ["时间", "日志等级", "日志报警"],
    data: [
      ["2020-10-12", "info", "Not ready"],
      ["2020-10-13", "info", "Not ready"],
      ["2020-10-14", "info", "Not ready"],
      ["2020-10-15", "warning", "Not ready"],
      ["2020-10-16", "info", "Not ready"],
      ["2020-10-17", "error", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
    ],
  };
  constructor(private layoutService: LayoutService, private router: Router) {
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  ngOnInit(): void {
    this.creatDateInterval();

    //监听推出全屏
    document.addEventListener("fullscreenchange", this.fullscreenchange);

    this.layoutService.onInitLayoutSize().subscribe((f) => {
      var ids = ["tj_test_number", "tj_test_number_line", "event_bar"];
      ids.forEach((item) => {
        var item_echart = document.getElementById(item);
        if (item_echart) echarts.init(item_echart).resize();
      });

      // nz-carousel-div
      var nz_carousel_style = document
        .getElementsByTagName("nz-carousel")[0]
        .getAttribute("style");
      console.log(
        "-------------nz_carousel_div_style-----------",
        nz_carousel_style
      );
      // if (nz_carousel_div_style.includes("width: 491.656px;")) {
      //   document
      //     .getElementsByClassName("nz-carousel-div")[0]
      //     .setAttribute("style", "width: 576.656px;");
      // } else {
      //   document
      //     .getElementsByClassName("nz-carousel-div")[0]
      //     .setAttribute("style", "width: 491.656px;");
      // }
    });

    window.onresize = function () {
      var ids = ["tj_test_number", "tj_test_number_line", "event_bar"];
      ids.forEach((item) => {
        var item_echart = document.getElementById(item);
        if (item_echart) echarts.init(item_echart).resize();
      });
    };
  }

  ngAfterViewInit() {
    // 初始化 echart
    var pie_data = {
      data: [
        { value: 1048, name: "三级" },
        { value: 735, name: "二级" },
        { value: 35, name: "一级" },
      ],
    };
    alert_management.devicepie("tj_test_number", pie_data);
    var deviceline = {
      legend_data: ["三级", "二级", "一级"],
      series_datas: [
        [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        [2.6, 9.0, 26.4, 175.6, 28.7, 5.9, 70.7, 182.2, 18.8, 6.0, 2.3, 48.7],
      ],
    };
    alert_management.deviceline("tj_test_number_line", deviceline);

    document
      .getElementsByTagName("nz-carousel")[0]
      .setAttribute("style", "height: 320px;line-height: 320px;");
  }

  //组件销毁
  ngOnDestroy() {
    document.removeEventListener("fullscreenchange", this.fullscreenchange);

    clearInterval(this.dateInterval);
    // 清除 echart
    var ids = ["tj_test_number", "tj_test_number_line", "event_bar"];
    ids.forEach((item) => {
      var item_echart = document.getElementById(item);
      if (item_echart) {
        var my_echart = echarts.init(item_echart);
        my_echart.clear();
        my_echart.dispose();
      }
    });
  }

  fullscreenchange = (event) => {
    if (!document.fullscreenElement) {
      this.is_not_fullscreen = true;
    }
  };

  //点击返回按钮
  return_btn_click() {
    //获取看板路由下所有菜单配置

    this.loading = true;
    console.log("返回上一级");
    window.history.go(-1);
    // this.router.navigate([router_str]);
    //当为最上级看板时
  }

  //点击菜单
  menu_btn_click() {
    console.log("点击菜单");
    this.router.navigate(["/pages"]);
  }

  //创建时间 定时
  creatDateInterval() {
    this.dateInterval = self.setInterval((f) => {
      this.date = this.getDate();
    }, 1000);
  }

  //获取当前时间字符串
  get_now_date_str() {
    let d = this.date;
    return (
      d.year +
      "-" +
      (d.month < 10 ? "0" + d.month : d.month) +
      "-" +
      (d.day < 10 ? "0" + d.day : d.day) +
      " " +
      (d.hours < 10 ? "0" + d.hours : d.hours) +
      ":" +
      (d.minute < 10 ? "0" + d.minute : d.minute) +
      ":" +
      (d.second < 10 ? "0" + d.second : d.second)
    );
  }

  //获取当前时间对象
  getDate() {
    var date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
  }

  // 全屏切换
  showAllTemplate() {
    var board = document.getElementsByTagName("ngx-centralized-monitoring")[0];
    var sf = <Screenfull>screenfull;
    if (sf.isEnabled) {
      // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board);
      //刷新表格
      // this.boradservice.sendChartResize();
      console.log("-------------按钮全屏功能-----------");
      // document
      //   .getElementsByTagName("nz-carousel")[0]
      //   .setAttribute("style", "height: 240px;line-height: 240px;");
      var nz_carousel_style = document
        .getElementsByTagName("nz-carousel")[0]
        .getAttribute("style");
      // console.log("-------------按钮全屏功能-----------", nz_carousel_style);

      if (nz_carousel_style == "height: 430px;line-height: 430px;") {
        document
          .getElementsByTagName("nz-carousel")[0]
          .setAttribute("style", "height: 320px;line-height: 320px;");
      } else {
        document
          .getElementsByTagName("nz-carousel")[0]
          .setAttribute("style", "height: 430px;line-height: 430px;");
      }
    }
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
