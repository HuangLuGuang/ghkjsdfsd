import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../../@core/utils";

import { NgZone } from "@angular/core";
import { HttpserviceService } from "../../services/http/httpservice.service";

let home = require("../../../assets/pages/home/js/home");

declare let $;

@Component({
  selector: "ngx-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  myChart;
  myChartData = {
    // card的数据
    LableData: [
      {
        name: "黑河冬季试验基地", // card名称
        coords: [
          [127.528588, 50.247033], // 坐标点
          [132, 52, 100], // card的坐标点
        ],
        value: ["*", "*"], // 第一个设备总数，第二个在线数量
      },
      {
        name: "吐鲁番夏季试验基地",
        coords: [
          [89.192125, 42.956351],
          [90, 51],
        ],
        value: ["*", "*"],
      },
      {
        name: "吉利研究院",
        coords: [
          [121.25158, 30.342533],
          [132, 27, 100],
        ],
        value: ["*", 60],
      },
      {
        name: "盐城试车场",
        coords: [
          [120.168403, 33.355342],
          [132, 37, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "格尔木高原试验基地",
        coords: [
          [94.794758, 36.405633],
          [90, 20, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "广德试车场",
        coords: [
          [119.417702, 30.919115],
          [132, 32, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "山东招远试车场",
        coords: [
          [120.410991, 37.389355],
          [132, 42, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "江西上饶试车场",
        coords: [
          [117.957799, 28.470025],
          [115, 20, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "牙克石冬季试验基地",
        coords: [
          [120.734156, 49.30199],
          [108, 53.2, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "襄阳试车场",
        coords: [
          [112.115597, 32.003774],
          [100, 51, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "海南热带试车场",
        coords: [
          [109.848175, 19.506262],
          [100, 18, 100],
        ],
        value: ["*", "*"],
      },
    ],
    // 线和点的数据
    LinesPointDate: [
      {
        fromName: "吉利研究院",
        toName: "黑河冬季试验基地",
        coords: [
          [127.528588, 50.247033], // 开始坐标
          [121.25158, 30.342533], // 中间坐标
          [121.25158, 30.342533], // 结束坐标
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        fromName: "吉利研究院",
        toName: "吐鲁番夏季试验基地",
        coords: [
          [89.192125, 42.956351],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        //120.168403,33.355342
        fromName: "吉利研究院",
        toName: "盐城试车场",
        coords: [
          [120.168403, 33.355342],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        //120.168403,33.355342
        fromName: "吉利研究院",
        toName: "格尔木高原试验基地",
        coords: [
          [94.794758, 36.405633],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        fromName: "吉利研究院",
        toName: "广德试车场",
        coords: [
          [119.417702, 30.919115],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        fromName: "吉利研究院",
        toName: "牙克石冬季试验基地",
        coords: [
          [120.734156, 49.30199],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        fromName: "吉利研究院",
        toName: "襄阳试车场",
        coords: [
          [112.115597, 32.003774],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        fromName: "吉利研究院",
        toName: "江西上饶试车场",
        coords: [
          [117.957799, 28.470025],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        fromName: "吉利研究院",
        toName: "山东招远试车场",
        coords: [
          [120.410991, 37.389355],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
      {
        fromName: "吉利研究院",
        toName: "海南热带试车场",
        coords: [
          [109.848175, 19.506262],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
        ],
        lineStyle: {
          color: "#4fb6d2",
        },
      },
    ],
    // 气球 数据
    QiQiu: {
      // 红色突出
      main: [
        [121.25158, 30.342533, 200], // 吉利研究院
      ],
      // 黄色其它
      Other: [
        [127.528588, 50.247033, 2], // 黑河冬季试验基地
        [89.192125, 42.956351, 4], // 吐鲁番夏季试验基地
        // [121.25158, 30.342533, 200], // 吉利研究院
        [120.168403, 33.355342, 2], // 盐城试车场
        [94.794758, 36.405633, 2], // 格尔木高原试验基地
        [119.417702, 30.919115, 2], //广德试车场

        [120.410991, 37.389355], //山东招远试车场
        [117.957799, 28.470025], //江西上饶试车场
        [120.734156, 49.30199], //牙克石冬季试验基地
        [112.115597, 32.003774], //襄阳试车场
      ],
    },
  };
  constructor(
    private layoutService: LayoutService,
    private ngZone: NgZone,
    private http: HttpserviceService
  ) {}

  ngOnInit(): void {
    this.createEchart();
    // this.myChart = echarts.init(document.querySelector('.home_chian_map'))
    this.layoutService.onInitLayoutSize().subscribe((f) => {
      this.myChart.clear();
      this.myChart.dispose();
      if (this.myChart.isDisposed()) {
        // 是否被释放
        this.createEchart();
        home.chian_map(this.myChart, this.myChartData);
        this.myChart.resize();
      } else {
        console.warn("home示例未被释放");
      }

      // let chian_map = document.querySelector('.home_chian_map');
      // if(chian_map) echarts.init(chian_map).resize();
    });
    window.addEventListener("resize", this.resize);
  }
  createEchart() {
    // return this.ngZone.runOutsideAngular(() => {this.myChart = echarts.init(document.querySelector('.home_chian_map'))});
    this.ngZone.runOutsideAngular(() => {
      let dom = document.querySelector(".home_chian_map");
      if (dom) {
        this.myChart = echarts.init(dom);
      }
    });
  }

  ngOnDestroy() {
    if (this.myChart.isDisposed()) {
      console.warn("home示例已经被释放");
      this.myChart.resize();
    } else {
      this.myChart.clear();
      this.myChart.dispose();
    }
  }

  ngAfterViewInit() {
    home.chian_map(this.myChart, this.myChartData);
    // this.resize();
    this.getData();
  }

  getData() {
    this.http
      .callRPC("get_board_device_heartbeat", "get_board_device_heartbeat", {
        date_interval: "7days",
      })
      .subscribe((f: any) => {
        if (f.result.error || f.result.message[0].code == 0) return;
        let res = f.result.message[0];
        this.myChartData.LableData[2].value[0] = res.current_total_device || 0;
        home.chian_map(this.myChart, this.myChartData);
      });
  }

  resize = () => {
    this.myChart.resize();
    // let chian_map = document.querySelector('.home_chian_map');
    // if(chian_map) echarts.init(chian_map).resize();
  };
}
