import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import {
  colors,
  create_img_16_9,
  dateformat,
  library,
  rTime,
} from "../equipment-board";
import { EquipmentBoardService } from "../serivice/equipment-board.service";

let equipment_four_road = require("../../../../assets/eimdoard/equipment/js/equipment-four-road");

import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";

@Component({
  selector: "ngx-central-four-jinhua",
  templateUrl: "./central-four-jinhua.component.html",
  styleUrls: ["./central-four-jinhua.component.scss"],
})
export class CentralFourJinhuaComponent implements OnInit {
  // 视频 video
  @ViewChild("pubvideo") pubvideo: any;

  discharge = [
    { value: "0", name: "mileage1", unit: "Km" },
    { value: "0", name: "mileage2", unit: "Km" },
    { value: "0", name: "mileage3", unit: "Km" },
    { value: "0", name: "mileage4", nameEn: "", unit: "Km" },
    { value: "0", name: "FanSpeedCoefficient_n0", unit: "%" },
    { value: "0", name: "FanSpeedCoefficient_n1", unit: "%/km/h" },
    { value: "0", name: "FanSpeedCoefficient_n2", unit: "%/(km/h)^2" },
  ];
  discharge_chart = [
    { value: [], name: "功率", unit: "Kw", color: [colors[3], colors[3]] },
    // {value:[],name:'里程1',unit:'Km',color:[colors[0],]},
    // {value:[],name:'里程2',unit:'Km',color:[colors[1],colors[1]]},
    // {value:[],name:'里程3',unit:'Km',color:[colors[2],colors[2]]},
    // {value:[],name:'里程4',nameEn:'',unit:'Km',color:[colors[3],colors[3]]},
    // {value:[],name:'风扇转动系数n0',unit:'%',color:[colors[4],colors[4]]},
    // {value:[],name:'风扇转动系数n1',unit:'%/km/h',color:[colors[5],colors[5]]},
    // {value:[],name:'风扇转动系数n2',unit:'%/(km/h)^2',color:[colors[6],colors[6]]},
  ];
  discharge_xdata = [];

  avl_paramlist = [
    // {value:'12',name:'roadAnalogyDragCoeff_F0R',unit:'N'},
    // {value:'12',name:'roadAnalogyDragCoeff_F1R',unit:'N/km/h'},
    // {value:'12',name:'roadAnalogyDragCoeff_F2R',unit:'N/(km/h)^2'},
    { value: "12", name: "drumDragCoeff_F0D", unit: "N" },
    { value: "12", name: "drumDragCoeff_F1D", unit: "N/km/h" },
    { value: "12", name: "drumDragCoeff_F2D", unit: "N/(km/h)^2" },
  ];

  gauge = [
    {
      id: "gauge_1",
      dataLine: {
        value: 50,
        name: "轮速力",
        max: 100,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "N",
      },
    },
    {
      id: "gauge_2",
      dataLine: {
        value: 12,
        name: "速度",
        max: 100,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "km/h",
      },
    },
    {
      id: "gauge_3",
      dataLine: {
        value: 12,
        name: "加速度",
        max: 100,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "m/s^2",
      },
    },
    {
      id: "gauge_4",
      dataLine: {
        value: 12,
        name: "轮边功率",
        max: 100,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "Kw",
      },
    },
  ];
  //速度/加速度曲线
  gauge_chart = [
    { value: [], name: "速度", unit: "km/h", color: [colors[1], colors[1]] },
    // {value:[],name:'加速度',unit:'m/s^2',color:[colors[2],colors[2]]},
  ];
  gauge_xData = [];

  //轮转力曲线
  gauge_chart_1 = [
    { value: [], name: "轮边力", unit: "N", color: [colors[0], colors[0]] },
  ];
  gauge_1_xData = [];

  jinhua: any = {};
  //环境仓
  EnvironBin = [
    {
      id: "en_gauge_1",
      dataLine: {
        value: 0,
        name: "实时温度",
        max: 100,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "℃",
        un: "常温",
      },
    },
    {
      id: "en_gauge_2",
      dataLine: {
        value: 0,
        name: "实时湿度",
        max: 100,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "%RH",
        un: "常湿",
      },
    },
    {
      id: "en_gauge_3",
      dataLine: {
        value: 0,
        name: "阳光辐照",
        max: 1000,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "w/m^2",
      },
    },
    {
      id: "en_gauge_5",
      dataLine: {
        value: 0,
        name: "舱内压力",
        max: 100,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "Pa",
      },
    },
    {
      id: "en_gauge_6",
      dataLine: {
        value: 0,
        name: "排费压力",
        max: 100,
        color: [
          [0.4, "#203add"],
          [1, "#0d1758"],
        ],
        unit: "Pa",
      },
    },
  ];

  EnvironBinParam = [
    // {value:'0',name:'CxHy',unit:'ppm'},
    // {value:'0',name:'WasteDisPressDiff',unit:'Pa'},
    // {value:'0',name:'CabinTemp',unit:'℃'},
    // {value:'0',name:'CO',unit:'LEL'},
    { value: "0", name: "WasteDisOutput", unit: "%" },
    { value: "0", name: "effluentTemp", unit: "℃" },
    { value: "0", name: "effluentPressure", unit: "Pa" },

    // {value:'0',name:'CabinHumidity',unit:'%RH'},
  ];

  img = {
    url: "assets/eimdoard/equipment/images/sqdp.png",
    name: "",
  };

  deviceid_four = "device_avl4dyno_02"; //四驱底盘
  deviceid_jinhua = "device_jinhua_cabin01"; //锦华
  rw = 0;

  //设备介绍
  introd_name = "zzsjhc";
  equipIntroduceList = [{ title: "" }, { title: "" }];

  timer: any; //定时器
  language = ""; //语言 空为zh-CN中文
  subscribeList: any = {};

  constructor(
    private activateInfo: ActivatedRoute,
    private http: HttpserviceService,
    private boardservice: EquipmentBoardService,
    private publicmethod: PublicmethodService
  ) {}

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem("currentLanguage");
    if (language != "zh-CN") this.language = language;

    this.subscribeList.router = this.activateInfo.params.subscribe((f) => {
      // console.log(f);
      if (document.getElementById("head_title"))
        document.getElementById("head_title").innerText = f.title;
    });

    this.getData();

    this.subscribeList.resize = this.boardservice
      .chartResize()
      .subscribe((f) => {
        this.resize();
      });
  }

  ngAfterViewInit() {
    this.boardservice.sendLoad({ close: false });
    setTimeout(() => {
      create_img_16_9();
    }, 1000);

    // 视频播放-----！
    this.subscribeList.router = this.activateInfo.params.subscribe((f) => {
      if (document.getElementById("head_title"))
        document.getElementById("head_title").innerText = f.title;
      // console.error("f.title>>>>>>>>>>>>>", f.title);
      this.publicmethod.get_url_withid(f.title).subscribe((res) => {
        if (res !== undefined) {
          var id = res["id"];
          this.pubvideo.get_url_menuid(id);
        }
      });
    });
  }

  resize = () => {
    setTimeout(() => {
      this.EnvironBin.forEach((f) => {
        if (document.getElementById(f.id))
          echarts.init(document.getElementById(f.id)).resize();
      });
      this.gauge.forEach((f) => {
        if (document.getElementById(f.id))
          echarts.init(document.getElementById(f.id)).resize();
      });
      if (document.getElementById("avl_discharge_chart"))
        echarts.init(document.getElementById("avl_discharge_chart")).resize();
      if (document.getElementById("avl_param_chart_1"))
        echarts.init(document.getElementById("avl_param_chart_1")).resize();
      if (document.getElementById("avl_param_chart_2"))
        echarts.init(document.getElementById("avl_param_chart_2")).resize();
      console.log("表刷新");
    }, 500);
  };

  getData() {
    let i = 0;
    this.timer = self.setInterval(() => {
      if(i%5 == 0){
        this.get_four();
        setTimeout(() => {
          this.get_jinhua();
        }, 500);
      }
      if (i % 61 == 0) {
        this.get_four_list();
      }
      i++;
    }, 1000);
  }

  /**
   * 中置式四驱底盘测功
   */
  get_four() {
    let res,
      data: any = {};
    this.subscribeList.four = this.http
      .callRPC(
        "get_device_mts_realtimedata",
        library + "get_device_mts_realtimedata",
        { device: this.deviceid_four, arr: four_param.join(",") }
      )
      .subscribe((g: any) => {
        if (g.result.error || g.result.message[0].code == 0) return;
        res = g.result.message[0].message || [];
        if (res)
          res.forEach((el) => {
            for (let key in el) {
              data[key] = el[key][0][0];
            }
          });
        //里程
        this.discharge[0].value = data.distance1 || 0;
        this.discharge[1].value = data.distance2 || 0;
        this.discharge[2].value = data.distance3 || 0;
        this.discharge[3].value = data.distance4 || 0;
        // 风扇转动系数
        this.discharge[4].value = data.n0 || 0;
        this.discharge[5].value = data.n1 || 0;
        this.discharge[6].value = data.n2 || 0;

        // this.discharge_chart[0].value.push(data.distance1);
        // this.discharge_chart[1].value.push(data.distance2);
        // this.discharge_chart[2].value.push(data.distance3);
        // this.discharge_chart[3].value.push(data.distance4);
        // this.discharge_chart[4].value.push(data.n0);
        // this.discharge_chart[5].value.push(data.n1);
        // this.discharge_chart[6].value.push(data.n2);

        // 道路模拟阻力系数
        // this.avl_paramlist[0].value = data.f0r ||0;
        // this.avl_paramlist[1].value = data.f1r||0;
        // this.avl_paramlist[2].value = data.f2r||0;
        //转鼓阻力系数
        this.avl_paramlist[0].value = data.f0d || 0;
        this.avl_paramlist[1].value = data.f1d || 0;
        this.avl_paramlist[2].value = data.f2d || 0;

        //惯量
        this.rw = data.rw || 0;
        //轮边力  -- 牵引力
        this.gauge[0].dataLine.value = data.f || 0;
        //速度
        this.gauge[1].dataLine.value = data.v || 0;
        //加速度
        // this.gauge[2].dataLine.value = data.a||0;
        //功率
        this.gauge[3].dataLine.value = data.p || 0;
        this.gauge.forEach((el) => {
          if (document.getElementById(el.id))
            equipment_four_road.create_temp_h_1_p_gauge(
              el.dataLine,
              echarts.init(document.getElementById(el.id))
            );
        });

        //取消订阅
        this.subscribeList.four.unsubscribe();
        // console.log(data)
        // console.log(res)
      });
  }

  get_four_list() {
    let res;
    this.http
      .callRPC("device_realtime_list", library + "device_realtime_list", {
        deviceid: this.deviceid_four,
        arr: "p,v,f",
      })
      .subscribe((g: any) => {
        if (g.result.error || g.result.message[0].code == 0) return;
        res = g.result.message[0].message;
        setTimeout(() => {
          this.discharge_chart[0].value = res[0].p.map((m) => m[0] || 0);
          this.discharge_xdata = res[0].p.map((m) =>
            dateformat(new Date(rTime(m[1])), "hh:mm:ss")
          );
          if (document.getElementById("avl_discharge_chart")) {
            let myChart_8 = echarts.init(
              document.getElementById("avl_discharge_chart")
            );
            equipment_four_road.create_broken_line(
              {
                series: this.discharge_chart,
                xData: this.discharge_xdata,
                title: "功率曲线",
              },
              myChart_8
            );
          }
        }, 10);

        setTimeout(() => {
          this.gauge_chart[0].value = res[1].v.map((m) => m[0] || 0);
          // this.gauge_chart[1].value = res[2].a.map(m =>(m[0]));
          // if(this.gauge_chart[0].value.length > this.gauge_chart[1].value.length){
          //   this.gauge_xData = res[1].v.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));;
          // }else{
          //   this.gauge_xData = res[2].a.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));;
          // }
          this.gauge_xData = res[1].v.map((m) =>
            dateformat(new Date(rTime(m[1])), "hh:mm:ss")
          );
          if (document.getElementById("avl_param_chart_1"))
            equipment_four_road.create_broken_line(
              {
                series: this.gauge_chart,
                xData: this.gauge_xData,
                title: "速度曲线",
              },
              echarts.init(document.getElementById("avl_param_chart_1"))
            );
        }, 20);

        this.gauge_chart_1[0].value = res[2].f.map((m) => m[0] || 0);
        this.gauge_1_xData = res[2].f.map((m) =>
          dateformat(new Date(rTime(m[1])), "hh:mm:ss")
        );
        if (document.getElementById("avl_param_chart_2"))
          equipment_four_road.create_broken_line(
            {
              series: this.gauge_chart_1,
              xData: this.gauge_1_xData,
              title: "轮边力曲线",
            },
            echarts.init(document.getElementById("avl_param_chart_2"))
          );
      });
  }

  get_jinhua() {
    let res,
      data: any = {};
    this.subscribeList.jinhua = this.http
      .callRPC(
        "get_device_mts_realtimedata",
        library + "get_device_mts_realtimedata",
        { device: this.deviceid_jinhua, arr: jinhua_param.join(",") }
      )
      .subscribe((g: any) => {
        if (g.result.error || g.result.message[0].code == 0) return;
        res = g.result.message[0].message || [];
        res.forEach((el) => {
          for (let key in el) {
            data[key] = el[key][0][0];
          }
        });
        //温度
        this.EnvironBin[0].dataLine.value =
          data.mwsmart_main_emission_vw200 || 0;
        this.EnvironBin[0].dataLine.color[0] = [
          (data.mwsmart_main_emission_vw202 || 0) /
            this.EnvironBin[0].dataLine.max,
          "#203add",
        ];

        //湿度
        this.EnvironBin[1].dataLine.value =
          data.mwsmart_main_emission_vw206 || 0;
        this.EnvironBin[1].dataLine.color[0] = [
          (data.mwsmart_main_emission_vw208 || 0) /
            this.EnvironBin[1].dataLine.max,
          "#203add",
        ];

        //阳光辐射
        this.EnvironBin[2].dataLine.value =
          data.mwsmart_main_emission_vw212 || 0;
        this.EnvironBin[2].dataLine.color[0] = [
          (data.mwsmart_main_emission_vw214 || 0) /
            this.EnvironBin[2].dataLine.max,
          "#203add",
        ];

        //舱内压力
        this.EnvironBin[3].dataLine.value =
          data.mwsmart_main_emission_vw218 || 0;
        this.EnvironBin[3].dataLine.color[0] = [
          (data.mwsmart_main_emission_vw220 || 0) /
            this.EnvironBin[3].dataLine.max,
          "#203add",
        ];

        //排费压力
        this.EnvironBin[4].dataLine.value =
          data.mwsmart_main_emission_vw224 || 0;
        this.EnvironBin[4].dataLine.color[0] = [
          (data.mwsmart_main_emission_vw226 || 0) /
            this.EnvironBin[4].dataLine.max,
          "#203add",
        ];

        this.EnvironBinParam[0].value = data.mwsmart_main_emission_vw228 || 0;
        this.EnvironBinParam[1].value = data.mwsmart_main_emission_v322 || 0;
        this.EnvironBinParam[2].value = data.mwsmart_main_emission_v320 || 0;

        this.EnvironBin.forEach((el) => {
          if (document.getElementById(el.id))
            equipment_four_road.create_temp_h_1_p_gauge(
              el.dataLine,
              echarts.init(document.getElementById(el.id))
            );
        });

        if (document.getElementById("en_gauge_7"))
          equipment_four_road.create_gauge_jinhua(
            {
              value: data.mwsmart_main_emission_vw246 || 0,
              title: "冷却水进水温度",
              max: 100,
              unit: "℃",
            },
            echarts.init(document.getElementById("en_gauge_7"))
          );

        if (document.getElementById("en_gauge_8"))
          equipment_four_road.create_gauge_jinhua(
            {
              value: data.mwsmart_main_emission_vw244 || 0,
              title: "冷却水进水压力",
              max: 100,
              unit: "Pa",
            },
            echarts.init(document.getElementById("en_gauge_8"))
          );

        this.jinhua = data;

        //取消订阅
        this.subscribeList.jinhua.unsubscribe();
      });
  }

  getleft(item) {
    return item > 40 ? item - 20 + "%" : "20%";
  }

  get_td_width(num) {
    return 100 / num + "%";
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    for (let key in this.subscribeList) {
      this.subscribeList[key].unsubscribe();
    }

    let chart;
    this.EnvironBin.forEach((f) => {
      chart = document.getElementById(f.id);
      if (chart) echarts.init(chart).dispose();
    });
    this.gauge.forEach((f) => {
      chart = document.getElementById(f.id);
      if (chart) echarts.init(chart).dispose();
    });
    chart = document.getElementById("avl_discharge_chart");
    if (chart) echarts.init(chart).dispose();
    chart = document.getElementById("avl_param_chart_1");
    if (chart) echarts.init(chart).dispose();
    chart = document.getElementById("avl_param_chart_2");
    if (chart) echarts.init(chart).dispose();
  }
}
export const four_param = [
  // 'recordtime',//记录时间
  // 'f0r',//道路模拟阻力系数F0R
  // 'f1r',//道路模拟阻力系数F1R
  // 'f2r',//道路模拟阻力系数F2R
  "v", //速度
  "f", //牵引力
  "p", //功率
  // 'a',//加速度
  "n0", //风扇转动系数n0
  "n1", //风扇转动系数n1
  "n2", //风扇转动系数n2
  "f0d", //转鼓阻力系数F0D
  "f1d", //转鼓阻力系数F1D
  "f2d", //转鼓阻力系数F2D
  "distance1", //里程1
  "distance2", //里程2
  "distance3", //里程3
  "distance4", //里程4
  "rw", //惯量
];
export const jinhua_param = [
  "mwsmart_main_emission_vw200", //温度
  "mwsmart_main_emission_vw202", //温度设定值
  "mwsmart_main_emission_vw206", //湿度
  "mwsmart_main_emission_vw208", //湿度设定值
  "mwsmart_main_emission_vw212", //阳光辐射
  "mwsmart_main_emission_vw214", //阳光辐射设定值
  "mwsmart_main_emission_vw218", //舱内压力
  "mwsmart_main_emission_vw220", //舱内压力设定值
  "mwsmart_main_emission_vw224", //排废压力
  "mwsmart_main_emission_vw226", //排废压力设定值
  "mwsmart_main_emission_vw228", //排废输出
  "mwsmart_main_emission_vw322", //出水温度
  "mwsmart_main_emission_vw320", //出水压力

  "mwsmart_main_emission_vw246", //冷金水温度
  "mwsmart_main_emission_vw244", //冷金水压力
  "mwsmart_main_emission_v03", //制冷机组A状态
  "mwsmart_main_emission_v04", //制冷机组B状态
  "mwsmart_main_emission_v00", //舱状态
];
