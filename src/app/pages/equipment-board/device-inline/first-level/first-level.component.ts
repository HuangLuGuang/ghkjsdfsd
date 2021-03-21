import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

// my-echart
let first_level = require("../../../../../assets/pages/device-inline/js/first-level");
// let first_level = require('../../../../../assets/pages/device-inline/js/first-level');

// 全屏
import * as screenfull from "screenfull";
import { Screenfull } from "screenfull";
import { SYSMENU } from "../../../../appconfig";
import { EquipmentBoardService } from "../../serivice/equipment-board.service";

@Component({
  selector: "ngx-first-level",
  templateUrl: "./first-level.component.html",
  styleUrls: ["./first-level.component.scss"],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FirstLevelComponent implements OnInit {
  is_not_fullscreen = true; // 是否处于全屏
  // 定时器
  myChart;
  subscribeList: any = {};
  isJump = true;//是否可以跳转下一个路由

  myChartData = {
    // card的数据
    LableData: [
      {
        name: "黑河冬季试验基地",
        coords: [
          [127.528588, 50.247033],
          [132, 52, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "吐鲁番夏季试验基地",
        coords: [
          [89.192125, 42.956351],
          [90, 48.2],
        ],
        value: ["*", "*"],
      },
      {
        name: "吉利研究院",
        coords: [
          [121.25158, 30.342533],
          [132, 27, 100],
        ],
        value: [38, 50],
      },
      {
        name: "盐城试车场",
        coords: [
          [120.168403, 33.355342],
          [132, 37, 100],
        ],
        value: ["*", "*"],
      },
      //94.794758,36.405633
      {
        name: "格尔木高原试验基地",
        coords: [
          [94.794758, 36.405633],
          [90, 21.2, 100],
        ],
        value: ["*", "*"],
      },
      //119.417702,30.919115
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
          [115, 21.2, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "牙克石冬季试验基地",
        coords: [
          [120.734156, 49.301992],
          [109, 49.855, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "襄阳试车场",
        coords: [
          [112.115597, 32.003774],
          [100, 48.2, 100],
        ],
        value: ["*", "*"],
      },
      {
        name: "海南热带试车场",
        coords: [
          [109.848175, 19.506262],
          [100, 19.5, 100],
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
          [127.528588, 50.247033],
          [121.25158, 30.342533],
          [121.25158, 30.342533],
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
      //119.417702,30.919115
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
          [120.734156, 49.301992],
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
      jili: [
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
        [120.734156, 49.301992], //牙克石冬季试验基地
        [112.115597, 32.003774], //襄阳试车场
      ],
    },
  };

  constructor(
    private router: Router,
    private boardservice: EquipmentBoardService,
    private activateInfo: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.subscribeList.resize = this.boardservice
      .chartResize()
      .subscribe((f) => {
        this.resize();
      });

    this.activateInfo.params.subscribe((f) => {
      // console.log(f);
      if (document.getElementById("head_title"))
        document.getElementById("head_title").innerText = "智慧实验室(G-iLAB)";
    });
    var menu:any = localStorage.getItem(SYSMENU);
    if(menu){
      menu = JSON.parse(menu);
      this.isJump = !!menu.find(f => 
        f.link == '/pages/equipment/second-level');
    }
    // map 地图
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.boardservice.sendLoad({ close: false });
      this.createEchart();

      this.myChart.resize();
    }, 100);
  }

  createEchart() {
    this.ngZone.runOutsideAngular(() => {
      this.myChart = echarts.init(document.querySelector(".chian_map"));
      first_level.chian_map(this.myChart, this.eclick, this.myChartData);
    });
  }

  resize = () => {
    setTimeout(() => {
      this.myChart.clear();
      this.myChart.dispose();
      if (this.myChart.isDisposed()) {
        // 是否被释放
        this.createEchart();
        // first_level.chian_map(this.myChart,this.eclick);
        // this.myChart.resize();
      } else {
        console.error("home示例未被释放");
      }
    }, 100);
  };

  ngOnDestroy() {
    var my_echart = echarts.init(document.querySelector(".chian_map"));
    my_echart.clear();
    my_echart.dispose();
    for (let key in this.subscribeList) {
      this.subscribeList[key].unsubscribe();
    }
  }

  // 返回首页
  gohome() {
    this.router.navigate(["/pages"]);
  }

  // 全屏切换
  showAllTemplate() {
    var board = document.getElementsByTagName("ngx-equipment-board")[0];
    // const board = document.getElementById("rtmv2");
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled) {
      // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board);
    }
    setTimeout(() => {
      let chian_map = document.querySelector(".chian_map");
      if (chian_map) echarts.init(chian_map).resize();
    }, 500);
  }

  // 时间展示
  currenttime() {
    var dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var CurrentTime = document.querySelector(".currenttime");
    CurrentTime.innerHTML =
      y + "-" + mt + "-" + day + "  " + h + ":" + m + ":" + s;
  }

  // 跳转到二级
  eclick = (params) => {
    if(!this.isJump){
      return;
    }
    // console.error("******************",params.data)
    // console.error("******************",params)
    if (params.seriesType === "scatter") {
      // console.log("点击执行： ", params);
      // console.log("点击执行： ", params.seriesType);
      var store = require("store");
      store.set("first_level", JSON.stringify(params.data));
      // 跳转页面 _parent:在当前页面打开，_blank、默认：在新的窗口打开
      var lng = params.data[0];
      var lat = params.data[1];
      if (lng === 121.25158 && lat === 30.342533) {
        this.boardservice.sendLoad({ close: true });
        this.router.navigate(["/pages/equipment/second-level"]);
      } else {
      }
    }
  };
}
