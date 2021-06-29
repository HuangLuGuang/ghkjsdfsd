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
let rtm3a = require("../../../../assets/eimdoard/rtm3/js/rtm3a");

import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";

@Component({
  selector: "ngx-equipment-atec",
  templateUrl: "./equipment-atec.component.html",
  styleUrls: ["./equipment-atec.component.scss"],
})
export class EquipmentAtecComponent implements OnInit {
  // 视频 video
  @ViewChild("pubvideo") pubvideo: any;

  device = "device_atec_06";

  img = {
    url: "assets/eimdoard/equipment/images/slz.png",
  };

  subscribeList: any = {};
  language;
  timer;
  atec = {
    tempid: "atec_pie_5",
    humid: "atec_pie_6",
    lineid: "atec_line_3",
    status: 0,
    tempSet: 0,
    humiSet: 0,
    tempReal: 0,
    humiReal: 0,
    attrs: [
      {
        name: "温度",
        nameEn: "Temp",
        unit: "℃",
        value: [],
        color: [colors[0], colors[0]],
      },
      {
        name: "湿度",
        nameEn: "RH",
        unit: "RH",
        value: [],
        color: [colors[1], colors[1]],
      },
    ],
    xdata: [],
  };
  constructor(
    private activateInfo: ActivatedRoute,
    private boardservice: EquipmentBoardService,
    private http: HttpserviceService,
    private publicmethod: PublicmethodService
  ) {}

  ngOnInit(): void {
    let language = localStorage.getItem("currentLanguage");
    if (language != "zh-CN") this.language = language;

    this.subscribeList.router = this.activateInfo.params.subscribe((f) => {
      // console.log(f);
      if (document.getElementById("head_title"))
        document.getElementById("head_title").innerText = f.title;
    });

    //赋值
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

  getData() {
    let o = 0;
    this.timer = setInterval(() => {
      this.get_atec();
      if (o % 60 == 0) {
        this.get_atec_list();
      }
      o++;
    }, 1000);
  }

  resize = () => {
    ["atec_pie_5", "atec_pie_6", "atec_line_3"].forEach((f) => {
      let dom = document.getElementById(f);
      if (dom) {
        echarts.init(dom).resize();
      }
    });
  };

  get_atec() {
    let res,
      data: any = {};
    this.http
      .callRPC(
        "get_device_mts_realtimedata",
        library + "get_device_mts_realtimedata",
        {
          device: this.device,
          arr: atec.join(","),
        }
      )
      .subscribe((g: any) => {
        if (g.result.error || g.result.message[0].code == 0) return;
        res = g.result.message[0].message;
        if (res) {
          res.forEach((el) => {
            for (let key in el) {
              data[key] = el[key][0][0];
            }
          });
        }

        this.atec.tempReal = data["realtime_temp"] || 0;
        this.atec.humiReal = data["realtime_humidity"] || 0;
        this.atec.tempSet = data["temp_setpoint"] || 0;
        this.atec.humiSet = data["humidity_setpoint"] || 0;
        this.atec.status = data["status"] || 0;

        if (document.getElementById(this.atec.tempid))
          equipment_four_road.create_motor_temperature(
            { value: this.atec.tempReal, title: "温度", unit: "℃" },
            echarts.init(document.getElementById(this.atec.tempid))
          );
        if (document.getElementById(this.atec.humid))
          equipment_four_road.create_motor_temperature(
            { value: this.atec.humiReal, title: "湿度", unit: "%RH" },
            echarts.init(document.getElementById(this.atec.humid))
          );
      });
  }

  get_atec_list() {
    let res, xdata;
    this.http
      .callRPC("device_realtime_list", library + "device_realtime_list", {
        deviceid: this.device,
        arr: atec_list.join(","),
      })
      .subscribe((g: any) => {
        if (g.result.error || g.result.message[0].code == 0) return;
        res = g.result.message[0].message;
        this.atec.attrs[0].value = res[0]["realtime_temp"].map(
          (m) => m[0] || 0
        );
        this.atec.attrs[1].value = res[1]["realtime_humidity"].map(
          (m) => m[0] || 0
        );

        if (this.atec.attrs[0].value.length > this.atec.attrs[1].value.length) {
          xdata = res[0]["realtime_temp"].map((m) =>
            dateformat(new Date(rTime(m[1])), "hh:mm:ss")
          );
        } else {
          xdata = res[1]["realtime_humidity"].map((m) =>
            dateformat(new Date(rTime(m[1])), "hh:mm:ss")
          );
        }
        this.atec.xdata = xdata;
        if (document.getElementById("atec_line_3")) {
          let myChart_9 = echarts.init(document.getElementById("atec_line_3"));
          equipment_four_road.create_real_discharge(
            { attrs: this.atec.attrs, xData: this.atec.xdata },
            myChart_9
          );
        }
      });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    for (let key in this.subscribeList) {
      this.subscribeList[key].unsubscribe();
    }
    ["atec_line_3", "atec_pie_5", "atec_pie_6"].forEach((f) => {
      let dom = document.getElementById(f);
      if (dom) {
        echarts.init(dom).dispose();
      }
    });
  }
}
export const atec = [
  "temp_setpoint", //设定温度
  "humidity_setpoint", //设定湿度值
  "realtime_humidity", //实时湿度
  "realtime_temp", //实时温度
  "status", //设备状态
];

export const atec_list = [
  "realtime_temp", //实时温度
  "realtime_humidity", //实时湿度
];
