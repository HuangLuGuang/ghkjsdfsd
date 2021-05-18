import { Component, OnInit, ViewChild } from "@angular/core";
import { LayoutService } from "../../../@core/utils";
import { HttpserviceService } from "../../../services/http/httpservice.service";

declare let $;

const left = require("../../../../assets/pages/lift-machine/js/left");

@Component({
  selector: "ngx-status-monitor",
  templateUrl: "./status-monitor.component.html",
  styleUrls: ["./status-monitor.component.scss"],
})
export class StatusMonitorComponent implements OnInit {
  @ViewChild("status_monitor_title") status_monitor_title: any;
  constructor(
    private http: HttpserviceService,
    private layoutService: LayoutService
  ) {}
  ngOnInit(): void {}

  TABLE = "detector";
  METHOD = "dev_get_detector";
  METHODALL = "dev_get_detector_numbers";

  detector_datas = [];
  timer; // 定时器

  runing_all = 0; // 当日累计时长

  ngAfterViewInit() {
    setTimeout(() => {
      this.get_init_table();
    }, 100);

    setTimeout(() => {
      this.get_all_num();
    }, 200);

    this.layoutService.onInitLayoutSize().subscribe((f) => {
      var ids = ["pie", "bar"];
      ids.forEach((item) => {
        var item_echart = document.getElementById(item);

        if (item_echart) echarts.init(item_echart).resize();
      });
    });
  }

  // 得到 总数
  get_all_num() {
    this.http.callRPC(this.TABLE, this.METHODALL, {}).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var message = res;

        this.status_monitor_title?.init_num(message);
      }
    });
  }

  // 得到 NVH 数据
  get_init_table() {
    this.http.callRPC(this.TABLE, this.METHOD, {}).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var message = res["message"];
        message.sort(function (a, b) {
          return Number(a.deviceid) - Number(b.deviceid);
        });

        var message2 = [];
        message.forEach((item, index) => {
          if (index < 5) {
            this.runing_all += Number(item.time);
            message2.push(item);
          }
        });

        // 得到 有车、无车的数量 status：0 表示无车！
        var data = this.get_car_nocar(message2);
        left.pie("pie", data);

        // bar 要的数据
        var bardata = this.get_bar_data(message2);
        // console.error("bardata:", bardata);
        left.bar("bar", bardata);

        // this.detector_datas = message;
        // 前5

        this.detector_datas = message2;
        for (let index = 1; index < message.length + 1; index++) {
          const item = message[index - 1];
          $(".sm_span_" + index + 1).text("举升机工位:" + item["deviceid"]);
          var status;
          if (item["status"] === 1) {
            status = "占位";
          } else {
            status = "空闲";
          }
          $(".sm_span_" + index + 2).text("当前状态:" + status);
          $(".sm_span_" + index + 3).text("已使用时长:" + item["time"] + "h");
        }
      }
    });
  }

  // pie解析 设备如nvh的数据，得到 有车、无车的数量
  get_car_nocar(data) {
    var car = 0,
      nocar = 0;
    data.forEach((element) => {
      if (element["status"] === 1) {
        car += 1;
      }
    });
    nocar = data.length - car;

    // 初始化 饼状图
    var datas = [
      {
        value: car,
        name: "有车:" + String((car / data.length) * 100) + "%",
      },
      {
        value: nocar,
        name: "无车:" + String((nocar / data.length) * 100) + "%",
      },
    ];

    return datas;
  }
  // bar 解析 设备如nvh的数据，得到 前5个数据的工位
  get_bar_data(data) {
    // ydata:["0号工位", "1号工位", "2号工位", "3号工位", "4号工位"]
    // series: [{name: xxx, data: [19325, 23438, 31000, 121594, 134141]}]
    var datas = {};
    var ydata = [];
    var sdata = [];
    data.forEach((item, index) => {
      if (index < 5) {
        ydata.push(item.deviceid + "号工位");
        sdata.push(Number(item.time));
      }
    });
    datas["ydata"] = ydata;
    datas["sdata"] = sdata;
    return datas;
  }

  ngOnDestroy() {
    clearInterval(this.timer);

    var ids = ["pie", "bar"];
    ids.forEach((item) => {
      var item_echart = document.getElementById(item);
      if (item_echart) {
        var my_echart = echarts.init(item_echart);
        my_echart.clear();
        my_echart.dispose();
      }
    });
  }
}
