import { Component, OnInit, NgZone } from "@angular/core";

import { LocalStorageService } from "../../../../services/local-storage/local-storage.service";

// my-echart
let second_level = require("../../../../../assets/pages/device-inline/js/second-level");

// 全屏
import * as screenfull from "screenfull";
import { Screenfull } from "screenfull";
import { LayoutService } from "../../../../@core/utils";
import { Router } from "@angular/router";
import { EquipmentBoardService } from "../../serivice/equipment-board.service";

import Highcharts3D from "highcharts/highcharts-3d";

declare let $;

@Component({
  selector: "ngx-second-level",
  templateUrl: "./second-level.component.html",
  styleUrls: ["./second-level.component.scss"],
})
export class SecondLevelComponent implements OnInit {
  first_level;

  is_not_fullscreen = true; // 是否处于全屏

  // 定时器
  currenttime_timer;

  Highcharts = require("highcharts");

  // 3d pie 对象 试验设备总量与分布
  key_index;

  // 设备活跃的
  device_active;

  // 试验设备总量与分布 data
  key_index_data = [
    { name: "验证中心", value: 2500 },
    { name: "工程中心", value: 1000 },
    { name: "智能电子软件中心", value: 500 },
    { name: "新能源中心", value: 250 },
  ];

  // 设备活跃的 数据
  device_active_data = [
    {
      xdata: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      name: ["结构", "环模", "理化", "噪声与震动", "新能源点击"],
      value: [
        [
          49.9,
          71.5,
          106.4,
          129.2,
          144.0,
          176.0,
          135.6,
          148.5,
          216.4,
          194.1,
          95.6,
          54.4,
        ],
        [
          83.6,
          78.8,
          98.5,
          93.4,
          106.0,
          84.5,
          105.0,
          104.3,
          91.2,
          83.5,
          106.6,
          92.3,
        ],
        [
          48.9,
          38.8,
          39.3,
          41.4,
          47.0,
          48.3,
          59.0,
          59.6,
          52.4,
          65.2,
          59.3,
          51.2,
        ],
        [
          42.4,
          33.2,
          34.5,
          39.7,
          52.6,
          75.5,
          57.4,
          60.4,
          47.6,
          39.1,
          46.8,
          51.1,
        ],
        [
          42.4,
          33.2,
          36.5,
          39.7,
          52.6,
          74.5,
          57.4,
          60.4,
          47.6,
          39.1,
          46.8,
          34.1,
        ],
      ],
    },
    [1288, 1200, 93], // 当前在线数量、今日活跃数量、今日活跃率
  ];

  // 试验条目状态
  teststatus = {
    color: ["#5D7FE5", "#26FF26"],
    xData: [
      "mts 329",
      "mts 320",
      "mts mast",
      "mts testline",
      "开闭件台架",
      "玻璃升降台架",
      "天窗开闭台架",
      "环境仓",
      "环境仓09",
      "环境仓10",
      "环境仓11",
      "环境仓12",
    ],
    Series: {
      name: "累计完成试验数量",
      totaldata: 132,
      data: [10, 52, 20, 34, 39, 33, 22, 0, 0, 0, 0, 0],
    },
  };

  myChart;
  items:any;
  //看板权限
  authority ={
    environment:false,//环模试验室
    noise:false,//噪声与振动试验室
    physical:false,//理化试验室
    structural:false,//结构试验室
    energy:false,//新能源电机试验室
  }

  chartResize;//图表刷新订阅

  constructor(
    private localstorage: LocalStorageService,
    private layoutService: LayoutService,
    private router: Router,
    private boardservice: EquipmentBoardService,
    private ngZone: NgZone,
    private equipmentservice: EquipmentBoardService
  ) {
    // 得到从first-leve级传递的数据
    this.first_level = this.localstorage.get("first_level");
    console.log("得到从first-leve级传递的数据: ", this.first_level);

    this.items = localstorage.get('mulu');
  }

  ngOnInit(): void {
    var title = "吉利汽车研究院";
    $("#head_title").text(title);
    //获取看板的实验室权限
    this.items = this.items.find(f => 
      f.link == '/pages/equipment/first-level').children.find(f=>
        f.link=='/pages/equipment/second-level').children;
    this.items.forEach(el => {
      let arr = el.link.split('/');
      if(arr.length>0){
       this.authority[arr[arr.length-1]] = true;
      }
    });
    // this.listen_windows_resize();
  }

  // 试验设备总数与分布
  testdevice(key_index_data) {
    Highcharts3D(this.Highcharts);
    this.Highcharts.setOptions({
      colors: [
        "#50B432",
        "#24CBE5",
        "#abad05",
        "#ED561B",
        "#64E572",
        "#FF9655",
        "#FFF263",
        "#6AF9C4",
      ],
    });
    this.key_index = this.Highcharts.chart("key-index", {
      chart: {
        type: "pie",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 2,
        margin: [0, 20, 0, 20],
        options3d: {
          enabled: true,
          alpha: 50,
          beta: 0,
          viewDistance: 40,
        },
        style: {
          fontsSze: "30px",
          fontWeight: "bole",
        },
        xAxis: {
          minRange: 50,
        },
      },
      // 版本信息
      credits: {
        enabled: false,
      },
      exporting: { enabled: false },
      title: {
        // text: '试验设备总量与分布',
        text: "",
        style: { color: "white" },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          // allowPointSelect: true,
          cursor: "pointer",
          center: ["50%", "50%"],
          slicedOffset: 20, // 扇形偏移
          depth: 35,
          dataLabels: {
            inside: true,
            distance: -30,
            format: "{point.name}",
            // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          type: "pie",
          name: "设备数量",
          size: 240, // 饼图大小
          // slicedOffset: 20, //

          data: [
            {
              name: key_index_data[0].name,
              y: key_index_data[0].value,
              sliced: true,
              selected: true,
              colorchart: 3,
              dataLabels: {
                x: -30,
                y: -10,
                style: {
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                },
                formatter: function () {
                  return this.y > 5 ? this.point.name : null;
                },
              },
            },
            {
              name: key_index_data[1].name,
              y: key_index_data[1].value,
              sliced: true,
              selected: true,
              dataLabels: {
                x: 20,
                y: 0,
                style: {
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                },
                formatter: function () {
                  return this.y > 5 ? this.point.name : null;
                },
              },
            },
            {
              name: key_index_data[2].name,
              y: key_index_data[2].value,
              sliced: true,
              selected: true,
              dataLabels: {
                x: 40,
                y: 0,
                style: {
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                },
                formatter: function () {
                  return this.y > 5 ? this.point.name : null;
                },
              },
            },
            {
              name: key_index_data[3].name,
              y: key_index_data[3].value,
              sliced: true,
              selected: true,
              dataLabels: {
                x: 60,
                y: -10,
                style: {
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                },
                formatter: function () {
                  return this.y > 5 ? this.point.name : null;
                },
              },
            },
          ],
        },
      ],
    });
  }
  // 设备活跃度
  deviceactive(device_active_data) {
    this.device_active = this.Highcharts.chart("device_active", {
      colors: [
        "#50B432",
        "#24CBE5",
        "#abad05",
        "#ED561B",
        "#64E572",
        "#FF9655",
        "#FFF263",
        "#6AF9C4",
      ],
      chart: {
        type: "column",
        // 顶部，右侧，底部和左侧
        // margin: [0, 20, -5, 20],
        // borderColor: 'red',
        // borderWidth:3,
        height: null,
        spacing: [-20, 20, 0, 10], // 内边距
        backgroundColor: "rgba(0,0,0,0)",
        style: {
          fontsSze: "30px",
          fontWeight: "bole",
        },
      },
      // 版本信息
      credits: {
        enabled: false,
      },
      // 关闭
      legend: {
        enabled: false,
      },
      title: {
        text: "",
      },

      xAxis: {
        categories: device_active_data[0].xdata,
        crosshair: true,
        labels: {
          style: {
            color: "#fff",
          },
        },
      },
      yAxis: {
        // min: 0,
        // title: {
        //     text: '降雨量 (mm)'
        // }
        visible: false,
      },
      tooltip: {
        // head + 每个 point + footer 拼接成完整的 table
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          borderWidth: 0,
        },
      },
      series: [
        {
          name: device_active_data[0].name[0],
          data: device_active_data[0].value[0],
        },
        {
          name: device_active_data[0].name[1],
          data: device_active_data[0].value[1],
        },
        {
          name: device_active_data[0].name[2],
          data: device_active_data[0].value[2],
        },
        {
          name: device_active_data[0].name[3],
          data: device_active_data[0].value[3],
        },
        {
          name: device_active_data[0].name[4],
          data: device_active_data[0].value[4],
        },
      ],
    });
  }

  ngAfterViewInit() {
    // 试验设备总量与分布
    this.testdevice(this.key_index_data);
    // 设备活跃的
    this.deviceactive(this.device_active_data);
    this.chartResize = this.equipmentservice.chartResize().subscribe((result) => {
      setTimeout(() => {
        this.device_active.reflow();
        this.key_index.reflow();
        this.myChart.resize();
      }, 100);
    });

    // 设备开动率、完好lv
    setTimeout(() => {
      this.boardservice.sendLoad({ close: false });
      this.createEchart();
      this.myChart.resize();
      this.device_active.reflow();
      this.key_index.reflow();
    }, 100);

    

    // this.layoutService.onInitLayoutSize().subscribe((f) => {
    //   this.key_index.reflow();
    //   this.device_active.reflow();
    //   this.myChart.resize();
    // });
  }
  createEchart() {
    this.ngZone.runOutsideAngular(() => {
      this.myChart = echarts.init(document.querySelector(".device-rate"));
      second_level.device_rate(this.myChart, this.teststatus);
    });
  }

  ngOnDestroy() {
    // this.device_active.destroy();
    // this.key_index.destroy();
    this.myChart.dispose();
    this.chartResize.unsubscribe();
  }

  // 跳转到具体的结构，
  goto_test_room(testname) {
    console.log("跳转到具体的结构试验室:", testname);
    setTimeout(() => {
      switch (testname) {
        case "newpower":
          // case 'electrical':
          this.router.navigate(["pages/equipment/third-level/energy"]);
          this.boardservice.sendLoad({ close: true });
          break;
        case "environment":
          this.router.navigate(["pages/equipment/third-level/environment"]);
          this.boardservice.sendLoad({ close: true });
          break;
        case "structural":
          this.router.navigate(["pages/equipment/third-level/structural"]);
          this.boardservice.sendLoad({ close: true });
          break;
        case "physicochemical":
          this.router.navigate(["/pages/equipment/third-level/physical"]);
          this.boardservice.sendLoad({ close: true });
          break;
      }
    }, 100);
  }

  // 全屏切换
  showAllTemplate() {
    const board = document.getElementById("rtmv2");
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled) {
      // sf.isEnabled 布尔值，判断是否允许进入全屏！

      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board);
    }
  }

  // 返回首页
  gohome() {}

  // 监听窗口变化来，重置echat的大小！
  listen_windows_resize() {
    window.onreset = function () {
      // this.device_active.reflow();
      // this.key_index.reflow();
      setTimeout(() => {
        
        this.myChart.resize();
      }, 100);
      
    };

  }
}
