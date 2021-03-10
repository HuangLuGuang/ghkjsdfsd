import { Component, OnInit } from "@angular/core";
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
    title: ["time", "Loglevel", "logInfor"],
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
  constructor(private layoutService: LayoutService) {}

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
    alert_management.devicepie("tj_test_number", {});
    alert_management.deviceline("tj_test_number_line", {});
    alert_management.devicebar("event_bar", {});
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
    // let router_str = this.boradservice.back_router_str(this.menu)
    // this.router.navigate([router_str]);
    //当为最上级看板时
  }

  //点击菜单
  menu_btn_click() {
    console.log("点击菜单");
    // this.router.navigate(['/pages']);
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
    }
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
