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

var equipment_four_road = require("../../../../assets/eimdoard/equipment/js/equipment-four-road");

import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";

@Component({
  selector: "ngx-equipment-maha",
  templateUrl: "./equipment-maha.component.html",
  styleUrls: ["./equipment-maha.component.scss"],
})
export class EquipmentMahaComponent implements OnInit {
  // 视频 video
  @ViewChild("pubvideo") pubvideo: any;

  device_maha = "device_maha_dyno01";
  device_langde = "device_langde_ac01";
  device_gas = "device_dongfang_gas01";

  object = Object;
  gas_chart = [
    {
      name: "CO",
      nameEn: "CO",
      unit: "%",
      value: [],
      color: [colors[0], colors[0]],
    },
    {
      name: "CH",
      nameEn: "CH",
      unit: "%",
      value: [],
      color: [colors[1], colors[1]],
    },
    // {
    //   name: "温度设定值",nameEn :'TempSet', unit: "℃",value: [],
    //   color:[colors[2], colors[3]]
    // },
    // {
    //   name: "湿度设定值",nameEn :'HumSet', unit: "RH",value: [],
    //   color:[colors[2], colors[3]]
    // },
  ];
  gas_cang = {
    co: 0,
    ch: 0,
  };

  img = {
    url: "assets/eimdoard/equipment/images/maha.jpg",
    name: "",
  };

  maha: any = {};
  langde: any = {};

  language;
  subscribeList: any = {};
  timer;
  constructor(
    private activateInfo: ActivatedRoute,
    private boardservice: EquipmentBoardService,
    private http: HttpserviceService,
    private publicmethod: PublicmethodService
  ) {}

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem("currentLanguage");
    if (language != "zh-CN") this.language = language;

    //订阅路由返回的标题
    this.subscribeList.router = this.activateInfo.params.subscribe((f) => {
      if (document.getElementById("head_title"))
        document.getElementById("head_title").innerText = f.title;
    });

    this.subscribeList.resize = this.boardservice
      .chartResize()
      .subscribe((f) => {
        this.resize();
      });
  }

  ngAfterViewInit() {
    this.boardservice.sendLoad({ close: false });
    this.getData();
    setTimeout(() => {
      create_img_16_9();
    }, 500);

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
      [
        "cang_pie_5",
        "cang_pie_6",
        "cang_chart_1",
        "dashboard_67",
        "line_chart_12_67",
      ].forEach((f) => {
        let dom = document.getElementById(f);
        if (dom) {
          echarts.init(dom).resize();
        }
      });
    }, 200);
  };

  getData() {
    let i = 0;
    this.timer = setInterval(() => {
      if( i%5==0){
        this.get_langde();
        setTimeout(() => {
          this.get_gas();
        }, 300);
        setTimeout(() => {
          this.get_maha();
        }, 300);
      }
      if (i % 61 == 0) {
        this.get_maha_list();
      }
     
      
      i++;
    }, 1000);
  }

  get_gas() {
    let arr = this.gas_chart;
    this.subscribeList.get_line_coolingWater = this.http
      .callRPC("device_realtime_list", library + "device_realtime_list", {
        deviceid: this.device_gas,
        arr: gas.join(","),
      })
      .subscribe((f: any) => {
        if (f.result.error || f.result.message[0].code == 0) return;
        let xAxisData = [],
          index = 0,
          key = "cts_plc_1_pv_db_temperature_deg_c",
          length = 0;
        let res = f.result.message[0].message;
        arr[0].value = res[0].air1.map((m) => m[0]); //co
        arr[1].value = res[1].air2.map((m) => m[0]); //ch

        setTimeout(() => {
          this.gas_cang.ch =
            arr[0].value.length > 0 ? arr[0].value[arr.length - 1] : 0;
          this.gas_cang.co =
            arr[1].value.length > 0 ? arr[1].value[arr.length - 1] : 0;

          if (document.getElementById("cang_pie_5"))
            equipment_four_road.create_motor_temperature(
              {
                value:
                  arr[0].value.length > 0 ? arr[0].value[arr.length - 1] : 0,
                title: "一氧化碳",
                unit: "%",
              },
              echarts.init(document.getElementById("cang_pie_5"))
            );
          if (document.getElementById("cang_pie_6"))
            equipment_four_road.create_motor_temperature(
              {
                value:
                  arr[1].value.length > 0 ? arr[1].value[arr.length - 1] : 0,
                title: "碳氢",
                unit: "%",
              },
              echarts.init(document.getElementById("cang_pie_6"))
            );
        }, 10);

        res.forEach((el, i) => {
          for (let k in el) {
            if (length < el[k].length) {
              (key = k), (index = i);
            }
            length = el[k].length;
          }
        });
        xAxisData = res[index][key].map((m) =>
          dateformat(new Date(rTime(m[1])), "hh:mm:ss")
        );

        if (document.getElementById("cang_chart_1"))
          equipment_four_road.create_real_discharge(
            { attrs: this.gas_chart, xData: xAxisData },
            echarts.init(document.getElementById("cang_chart_1"))
          );
      });
  }

  get_maha() {
    let res,
      data: any = {},
      chart;
    this.subscribeList.get_line_coolingWater = this.http
      .callRPC(
        "get_device_mts_realtimedata",
        library + "get_device_mts_realtimedata",
        {
          device: this.device_maha,
          arr: maha.join(","),
        }
      )
      .subscribe((f: any) => {
        if (f.result.error || f.result.message[0].code == 0) return;
        res = f.result.message[0].message;
        if (res) {
          res.forEach((el) => {
            for (let key in el) {
              data[key] = el[key][0][0] || 0;
            }
          });
        }

        this.maha = data;
        chart = document.getElementById("dashboard_67");
        if (chart)
          equipment_four_road.create_real_dashboard(
            [
              {
                name: "功率",
                unit: "Kw",
                value: data.power_total || 0,
              },
              {
                name: "速度",
                unit: "km/h",
                value: data.speed_total || 0,
              },
              {
                name: "牵引力",
                unit: "NW",
                value: data.tractive_force_total || 0,
              },
            ],
            echarts.init(chart)
          );
      });
  }

  get_langde() {
    let res,
      data: any = {};
    this.subscribeList.get_line_coolingWater = this.http
      .callRPC(
        "get_device_mts_realtimedata",
        library + "get_device_mts_realtimedata",
        {
          device: this.device_langde,
          arr: langde.join(","),
        }
      )
      .subscribe((f: any) => {
        if (f.result.error || f.result.message[0].code == 0) return;
        res = f.result.message[0].message;
        if (res) {
          res.forEach((el) => {
            for (let key in el) {
              data[key] = el[key][0][0] || 0;
            }
          });
        }

        this.langde = data;
      });
  }

  get_maha_list() {
    let chart, res;
    this.http
      .callRPC("device_realtime_list", library + "device_realtime_list", {
        deviceid: this.device_maha,
        arr: "speed_total,tractive_force_total",
      })
      .subscribe((f: any) => {
        if (f.result.error || f.result.message[0].code == 0) return;
        res = f.result.message[0].message;
        let attrs = [
            { name: "速度", data: [], color: "green" },
            { name: "牵引力", data: [], color: "#FF66CC" },
          ],
          xdata = [];
        attrs[0].data = res[0].speed_total.map((m) => m[0] || 0);
        attrs[1].data = res[1].tractive_force_total.map((m) => m[0] || 0);

        if (attrs[0].data.length > attrs[1].data.length) {
          xdata = res[0].speed_total.map((m) =>
            dateformat(new Date(rTime(m[1])), "hh:mm:ss")
          );
        } else {
          xdata = res[1].tractive_force_total.map((m) =>
            dateformat(new Date(rTime(m[1])), "hh:mm:ss")
          );
        }

        chart = document.getElementById("line_chart_12_67");
        if (chart)
          equipment_four_road.create_motor_chart(
            {
              xData: xdata,
              data: attrs,
              title: "速度/牵引力曲线",
            },
            echarts.init(chart)
          );
      });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    [
      "cang_pie_5",
      "cang_pie_6",
      "cang_chart_1",
      "dashboard_67",
      "line_chart_12_67",
    ].forEach((f) => {
      let dom = document.getElementById(f);
      if (dom) {
        echarts.init(dom).dispose();
      }
    });
  }
}

export const gas = [
  "air1", //co
  "air2", //ch
];

export const maha = [
  "speed_total", //速度
  "power_total", //功率
  "tractive_force_total", //牵引力

  "speed_front_left", //左前论速度
  "speed_front_right", //右前论速度
  "speed_rear_left", //左后论速度
  "speed_rear_right", //右后论速度

  "power_front_left", //左前轮功率
  "power_front_right", //右前轮功率
  "power_rear_left", //左后论功率
  "power_rear_right", //右后论功率

  "tractive_force_front_left", //左前牵引力
  "tractive_force_front_right", //右前牵引力
  "tractive_force_rear_left", //左后牵引力
  "tractive_force_rear_right", //右后牵引力
];

export const langde = [
  "status", //设备状态
  "heater_status", //加热器状态
  "front_wind_status", //迎风状态
  "point_cold_status", //点冷状态

  "room_humidity_1", //房间湿度1
  "room_temp_1", //房间温度1
  "room_humidity_2", //房间湿度2
  "room_temp_2", //房间温度2

  "ventilation_temp", //新风温度
  "supply_air_temp", //送风温度
  "room_pressure", //房间压力
  "front_wind_speed", //迎面风风速
  "exhaust_valve", //排风阀开度
  "ventilation_valve", //新风阀开度
  "mixer_valve", //混合阀开度
  "chilling_water_valve", //冷冻水阀开度

  "heating", //加热开度

  "blower_freq", //送风机频率
  "conditioning_freq", //回风机频率
  "tailpipe_fan_freq", //未排风机频率
  "point_cold_fan_1_freq", //点冷风机1频率
  "point_cold_fan_2_freq", //点冷风机2频率
  "front_blower_freq", //迎面送风机频率
  "front_conditioning_freq", //迎面回风机频率
];
