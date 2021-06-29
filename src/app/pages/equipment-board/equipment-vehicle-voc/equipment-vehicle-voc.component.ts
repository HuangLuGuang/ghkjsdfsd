import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
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
  selector: "ngx-equipment-vehicle-voc",
  templateUrl: "./equipment-vehicle-voc.component.html",
  styleUrls: ["./equipment-vehicle-voc.component.scss"],
})
export class EquipmentVehicleVocComponent implements OnInit {
  // 视频 video
  @ViewChild("pubvideo") pubvideo: any;

  deviceid = "device_auto_voc01";

  //舱1
  cang_1 = {
    tempid: "cabin_pie_1",
    humid: "cabin_pie_2",
    lineid: "cabin_line_1",
    status: 0,
    tempSet: 0,
    rhSet: 0,
    tempReal: 0,
    rhReal: 0,
    inner: 0, //内循环
    exhaust: 0, //强排气
    outside: 0, //外循环
    fan: 0, //尾气排扇
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

  //舱2
  cang_2 = {
    tempid: "cabin_pie_3",
    humid: "cabin_pie_4",
    lineid: "cabin_line_2",
    status: 1,
    tempSet: 0,
    rhSet: 0,
    tempReal: 0,
    rhReal: 0,
    inner: 0, //内循环
    exhaust: 0, //强排气
    outside: 0, //外循环
    fan: 0, //尾气排扇
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

  //舱3
  cang_3 = {
    tempid: "cabin_pie_5",
    humid: "cabin_pie_6",
    lineid: "cabin_line_3",
    status: 0,
    tempSet: 0,
    rhSet: 0,
    tempReal: 0,
    rhReal: 0,
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

  //舱加热
  cang_hot = {
    status: 1,
    list: [
      { name: "红外顶板 ", value: 0, unit: "W/m²" },
      { name: "", value: "", unit: "" },
      { name: "红外侧板1", value: 0, unit: "℃" },
      { name: "红外侧板2", value: 0, unit: "℃" },
      { name: "红外侧板3", value: 0, unit: "℃" },
      { name: "红外侧板4", value: 0, unit: "℃" },
    ],
  };
  imgsrc = {
    center: "assets/eimdoard/equipment/images/vehicle.jpg",
  };

  //设备介绍
  introd_name = "vehicle";
  equipIntroduceList = [{ title: "" }, { title: "" }];

  timer;

  subscribeList: any = {}; //订阅

  language;

  constructor(
    private activateInfo: ActivatedRoute,
    private boardservice: EquipmentBoardService,
    private http: HttpserviceService,
    private publicmethod: PublicmethodService,
    private ngzone: NgZone
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
    let i = 0;
    this.timer = setInterval(() => {
      this.getData();
      if (i % 60 == 0) {
        this.get_chart_list();
      }
      i++;
    }, 1000);
  }

  ngAfterViewInit() {
    this.boardservice.sendLoad({ close: false });
    setTimeout(() => {
      this.initChart();
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

  //获取数据
  getData() {
    let res,
      data: any = {};
    this.subscribeList.left = this.http
      .callRPC(
        "get_device_mts_realtimedata",
        library + "get_device_mts_realtimedata",
        { device: this.deviceid, arr: voc.join(",") }
      )
      .subscribe((g: any) => {
        if (g.result.error || g.result.message[0].code == 0) return;
        res = g.result.message[0].message;
        if (res)
          res.forEach((el) => {
            for (let key in el) {
              data[key] = el[key][0][0];
            }
          });
        //红外顶板1
        this.cang_hot.list[0].value = data.irtoppv1 || 0;
        //红外侧板
        this.cang_hot.list[2].value = data.irside1pv || 0;
        this.cang_hot.list[3].value = data.irside2pv || 0;
        this.cang_hot.list[4].value = data.irside3pv || 0;
        this.cang_hot.list[5].value = data.irside4pv || 0;

        //仓1
        setTimeout(() => {
          this.assignment(1, data);
          this.cang_1.inner = data.plc_innercircleonoff2; //内循环
          this.cang_1.exhaust = data.plc_exhaustonoff2; //强排气
          this.cang_1.outside = data.plc_outercircleonoff2; //外循环
          this.cang_1.fan = data.plc_gasonoff2; //尾气排扇
        }, 10);
        //仓2
        setTimeout(() => {
          this.assignment(2, data);
          this.cang_2.inner = data.plc_innercircleonoff2; //内循环
          this.cang_2.exhaust = data.plc_exhaustonoff2; //强排气
          this.cang_2.outside = data.plc_outercircleonoff2; //外循环
          this.cang_2.fan = data.plc_gasonoff2; //尾气排扇
        }, 10);
        //仓3
        setTimeout(() => {
          this.assignment(3, data);
        }, 10);

        // this.cang_2.status = data.chb2_run;
        // this.cang_2.tempReal = data.chb2_temppv||0;
        // this.cang_2.tempSet = data.chb2_tempsv||0;
        // this.cang_2.rhReal = data.chb2_humipv||0;
        // this.cang_2.rhSet = data.chb2_humisv||0;
        // this.cang_2.rhSet = data.chb2_humisv||0;
        // this.cang_2.inner = data.plc_innercircleonoff2;//内循环
        // this.cang_2.exhaust = data.plc_exhaustonoff2;//强排气
        // this.cang_2.outside = data.plc_outercircleonoff2;//外循环
        // this.cang_2.fan = data.plc_gasonoff2;//尾气排扇

        // this.cang_2.attrs[0].value.push(this.cang_2.tempReal);
        // this.cang_2.attrs[1].value.push(this.cang_2.rhReal);
        // this.cang_2.xdata.push(res[0]?dateformat(new Date(rTime(res[0].chb1_tempsv[0][1])),'MM-dd hh:mm:ss'):'0');
        // if(this.cang_2.xdata.length > 10){
        //   this.cang_2.attrs[0].value.splice(0,1);
        //   this.cang_2.attrs[1].value.splice(0,1);
        //   this.cang_2.xdata.splice(0,1);
        // }

        // if(document.getElementById('cabin_pie_3'))
        //   equipment_four_road.create_real_disk({value:this.cang_2.tempReal,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
        //   echarts.init(document.getElementById('cabin_pie_3')));
        // if(document.getElementById('cabin_pie_4'))
        //   equipment_four_road.create_real_disk({value:this.cang_2.rhReal,text:this.language?'RealRH':'实时湿度',unit:'℃'},
        //   echarts.init(document.getElementById('cabin_pie_4')));
        // if(document.getElementById('cabin_line_2')){
        //   let myChart_9 = echarts.init(document.getElementById('cabin_line_2'));;
        //   equipment_four_road.create_real_discharge({attrs:this.cang_2.attrs,xData:this.cang_2.xdata},myChart_9);
        // }
      });
  }

  get_chart_list() {
    this.subscribeList.get_line_coolingWater = this.http
      .callRPC(
        "device_realtime_list_second",
        library + "device_realtime_list_second",
        {
          deviceid: this.deviceid,
          arr: "chb1_temppv,chb1_humipv,chb2_temppv,chb2_humipv,chb3_temppv,chb3_humipv",
        }
      )
      .subscribe((f: any) => {
        if (f.result.error || f.result.message[0].code == 0) return;
        let res = f.result.message[0].message;
        //仓1
        setTimeout(() => {
          let xdata_1 = [];
          if (res[0].chb1_temppv.length > res[1].chb1_humipv.length) {
            xdata_1 = res[0].chb1_temppv.map((m) =>
              dateformat(new Date(rTime(m[1])), "hh:mm:ss")
            );
          } else {
            xdata_1 = res[1].chb1_humipv.map((m) =>
              dateformat(new Date(rTime(m[1])), "hh:mm:ss")
            );
          }
          this.assignment_line(
            1,
            {
              tempList: res[0].chb1_temppv.map((m) => m[0] || 0),
              humList: res[1].chb1_humipv.map((m) => m[0 || 0]),
            },
            xdata_1
          );
        }, 10);
        //仓2
        setTimeout(() => {
          let xdata_2 = [];
          if (res[2].chb2_temppv.length > res[3].chb2_humipv.length) {
            xdata_2 = res[2].chb2_temppv.map((m) =>
              dateformat(new Date(rTime(m[1])), "hh:mm:ss")
            );
          } else {
            xdata_2 = res[3].chb2_humipv.map((m) =>
              dateformat(new Date(rTime(m[1])), "hh:mm:ss")
            );
          }
          this.assignment_line(
            2,
            {
              tempList: res[2].chb2_temppv.map((m) => m[0] || 0),
              humList: res[3].chb2_humipv.map((m) => m[0] || 0),
            },
            xdata_2
          );
        }, 20);
        //仓3
        let xdata_3 = [];
        if (res[4].chb3_temppv.length > res[5].chb3_humipv.length) {
          xdata_3 = res[4].chb3_temppv.map((m) =>
            dateformat(new Date(rTime(m[1])), "hh:mm:ss")
          );
        } else {
          xdata_3 = res[5].chb3_humipv.map((m) =>
            dateformat(new Date(rTime(m[1])), "hh:mm:ss")
          );
        }
        this.assignment_line(
          3,
          {
            tempList: res[4].chb3_temppv.map((m) => m[0] || 0),
            humList: res[5].chb3_humipv.map((m) => m[0] || 0),
          },
          xdata_3
        );
      });
  }

  /**
   * 仓1-3赋值
   * @param cang_name 全局对象名
   * @param data
   * @param time x轴时间
   */
  assignment(cang_num, data) {
    this.ngzone.runOutsideAngular(() => {
      let cang_name = "cang_" + cang_num;
      this[cang_name].status = data[`chb${cang_num}_run`];
      this[cang_name].tempReal = data[`chb${cang_num}_temppv`]
        ? data[`chb${cang_num}_temppv`] || 0
        : 0;
      this[cang_name].tempSet = data[`chb${cang_num}_tempsv`] || 0;
      this[cang_name].rhReal = data[`chb${cang_num}_humipv`] || 0;
      this[cang_name].rhSet = data[`chb${cang_num}_humisv`] || 0;
      // this[cang_name].rhSet = Math.random()*100;
      if (document.getElementById(this[cang_name].tempid))
        equipment_four_road.create_motor_temperature(
          { value: this[cang_name].tempReal, title: "温度", unit: "℃" },
          echarts.init(document.getElementById(this[cang_name].tempid))
        );
      // equipment_four_road.create_real_disk({value:this[cang_name].tempReal,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
      // echarts.init(document.getElementById(this[cang_name].tempid)));
      if (document.getElementById(this[cang_name].humid))
        equipment_four_road.create_motor_temperature(
          { value: this[cang_name].rhReal, title: "湿度", unit: "%RH" },
          echarts.init(document.getElementById(this[cang_name].humid))
        );
      // equipment_four_road.create_real_disk({value:this[cang_name].rhReal,text:this.language?'RealRH':'实时湿度',unit:'℃'},
      // echarts.init(document.getElementById(this[cang_name].humid)));
    });
  }

  assignment_line(cang_num, data: any, xdata) {
    let cang_name = "cang_" + cang_num;
    this[cang_name].attrs[0].value = data.tempList;
    this[cang_name].attrs[1].value = data.humList;
    this[cang_name].xdata = xdata;

    if (document.getElementById(this[cang_name].lineid)) {
      let myChart_9 = echarts.init(
        document.getElementById(this[cang_name].lineid)
      );
      equipment_four_road.create_real_discharge(
        { attrs: this[cang_name].attrs, xData: this[cang_name].xdata },
        myChart_9
      );
    }
  }

  initChart() {
    if (document.getElementById("cabin_pie_1"))
      equipment_four_road.create_motor_temperature(
        {
          value: this.cang_1.tempReal,
          title: this.language ? "RealTEMP" : "实时温度",
          unit: "%RH",
        },
        echarts.init(document.getElementById("cabin_pie_1"))
      );
    if (document.getElementById("cabin_pie_2"))
      equipment_four_road.create_motor_temperature(
        {
          value: this.cang_1.rhReal,
          title: this.language ? "RealRH" : "实时湿度",
          unit: "℃",
        },
        echarts.init(document.getElementById("cabin_pie_2"))
      );
    if (document.getElementById("cabin_line_1")) {
      let myChart_9 = echarts.init(document.getElementById("cabin_line_1"));
      equipment_four_road.create_real_discharge(
        { attrs: this.cang_1.attrs, xData: this.cang_1.xdata },
        myChart_9
      );
    }

    if (document.getElementById("cabin_pie_3"))
      equipment_four_road.create_motor_temperature(
        {
          value: this.cang_1.tempReal,
          title: this.language ? "RealTEMP" : "实时温度",
          unit: "%RH",
        },
        echarts.init(document.getElementById("cabin_pie_3"))
      );
    if (document.getElementById("cabin_pie_4"))
      equipment_four_road.create_motor_temperature(
        {
          value: this.cang_1.rhReal,
          title: this.language ? "RealRH" : "实时湿度",
          unit: "℃",
        },
        echarts.init(document.getElementById("cabin_pie_4"))
      );
    if (document.getElementById("cabin_line_2")) {
      let myChart_9 = echarts.init(document.getElementById("cabin_line_2"));
      equipment_four_road.create_real_discharge(
        { attrs: this.cang_1.attrs, xData: this.cang_1.xdata },
        myChart_9
      );
    }

    if (document.getElementById("cabin_pie_5"))
      equipment_four_road.create_motor_temperature(
        {
          value: this.cang_3.tempReal,
          title: this.language ? "RealTEMP" : "实时温度",
          unit: "%RH",
        },
        echarts.init(document.getElementById("cabin_pie_5"))
      );
    if (document.getElementById("cabin_pie_6"))
      equipment_four_road.create_motor_temperature(
        {
          value: this.cang_3.rhReal,
          title: this.language ? "RealRH" : "实时湿度",
          unit: "℃",
        },
        echarts.init(document.getElementById("cabin_pie_6"))
      );
    if (document.getElementById("cabin_line_3")) {
      let myChart_9 = echarts.init(document.getElementById("cabin_line_3"));
      equipment_four_road.create_real_discharge(
        { attrs: this.cang_3.attrs, xData: this.cang_3.xdata },
        myChart_9
      );
    }
  }

  resize = () => {
    setTimeout(() => {
      let chart;
      [
        "cabin_pie_1",
        "cabin_pie_2",
        "cabin_pie_3",
        "cabin_pie_4",
        "cabin_pie_5",
        "cabin_pie_6",
        "cabin_line_1",
        "cabin_line_2",
        "cabin_line_3",
      ].forEach((f) => {
        chart = document.getElementById(f);
        if (chart) echarts.init(chart).resize();
      });
    }, 500);
  };

  ngOnDestroy() {
    clearInterval(this.timer);

    for (let key in this.subscribeList) {
      this.subscribeList[key].unsubscribe();
    }

    let chart;
    [
      "cabin_pie_1",
      "cabin_pie_2",
      "cabin_pie_3",
      "cabin_pie_4",
      "cabin_pie_",
      "cabin_pie_6",
      "cabin_line_1",
      "cabin_line_2",
      "cabin_line_3",
    ].forEach((f) => {
      chart = document.getElementById(f);
      if (chart) echarts.init(chart).dispose();
    });
  }
}

export let voc = [
  "chb1_tempsv", //仓1温度设定值
  "chb1_temppv", //仓1温度实际值
  "chb1_humisv", //仓1湿度设定值
  "chb1_humipv", //仓1湿度实际值
  "chb1_run", //启动状态
  "plc_outercircleonoff1", //仓1外循环
  "plc_innercircleonoff1", //仓1内循环
  "plc_exhaustonoff1", //仓1强排气
  "plc_gasonoff1", //仓1尾气排放

  "chb2_tempsv", //仓2温度设定值
  "chb2_temppv", //仓2温度实际值
  "chb2_humisv", //仓2湿度设定值
  "chb2_humipv", //仓2湿度实际值
  "chb2_run", //启动状态
  "plc_outercircleonoff2", //仓2外循环
  "plc_innercircleonoff2", //仓2内循环
  "plc_exhaustonoff2", //仓2强排气
  "plc_gasonoff2", //仓2尾气排放

  "chb3_tempsv", //仓3温度设定值
  "chb3_temppv", //仓3温度实际值
  "chb3_humisv", //仓3湿度设定值
  "chb3_humipv", //仓3湿度实际值
  "chb3_run", //启动状态

  // 'irtoppv3',//红外顶板3
  // 'irtoppv2',//红外顶板2
  "irtoppv1", //红外顶板1

  "irside1pv", //红外侧板1
  "irside2pv", //红外侧板2
  "irside3pv", //红外侧板3
  "irside4pv", //红外侧板4
];
