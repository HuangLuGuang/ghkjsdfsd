import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NbDialogService } from "@nebular/theme";

// 初始map中的point
import { map_init_point } from "../../../../appconfig";
import { SetWeilanComponent } from "../../../../pages-popups/gps/set-weilan/set-weilan.component";

let mapjs = require("../../../../../assets/pages/mobile-asset-management/js/my_map");

declare let $;

declare let Ping;

@Component({
  selector: "ngx-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  // 模拟离线
  noinlinedatas_list = [
    {
      name: "在线",
      device_info: [
        {
          title: "在线 11",
          lng_lat: [121.32290066, 30.33330255],
          info: "在线 11",
          updatatime: "2020-07-11 17:56:46(online)",
          positiontiome: "2020-07-06 09:56:46",
          positiontype: "卫星定位",
          deviceno: "9527",
        },
        {
          title: "在线 12",
          lng_lat: [121.32260066, 30.33330255],
          info: "在线 12",
          updatatime: "2020-08-11 17:56:46",
          positiontiome: "2020-08-06 09:02:46",
          positiontype: "卫星定位",
          deviceno: "9537",
        },
        {
          title: "在线 13",
          lng_lat: [121.32230066, 30.33330255],
          info: "在线 13",
          updatatime: "2020-07-13 19:56:46(online)",
          positiontiome: "2020-07-08 15:44:46",
          positiontype: "卫星定位",
          deviceno: "9547",
        },
      ],
      children: ["在线 11", "在线 12", "在线 13"],
    },
    {
      name: "离线",
      device_info: [
        {
          title: "离线 21",
          lng_lat: [121.32290077, 30.33220264],
          info: "离线 21",
          updatatime: "2020-07-11 17:56:46(online)",
          positiontiome: "2020-07-06 09:56:46",
          positiontype: "卫星定位",
          deviceno: "9527",
        },
        {
          title: "离线 22",
          lng_lat: [121.32260077, 30.33220264],
          info: "离线 22",
          updatatime: "2020-08-11 17:56:46",
          positiontiome: "2020-08-06 09:02:46",
          positiontype: "卫星定位",
          deviceno: "9537",
        },
        {
          title: "离线 23",
          lng_lat: [121.32200077, 30.33220264],
          info: "离线 23",
          updatatime: "2020-07-01 22:35:46",
          positiontiome: "2020-06-26 19:32:46",
          positiontype: "卫星定位",
          deviceno: "9557",
        },
      ],
      children: ["离线 21", "离线 22", "离线 23"],
    },
    {
      name: "其它",
      device_info: [
        {
          title: "其它 31",
          lng_lat: [121.32290099, 30.33020277],
          info: "其它 31",
          updatatime: "2020-07-11 17:56:46(online)",
          positiontiome: "2020-07-06 09:56:46",
          positiontype: "卫星定位",
          deviceno: "9527",
        },
        {
          title: "其它 32",
          lng_lat: [121.32260099, 30.33020334],
          info: "其它 32",
          updatatime: "2020-08-11 17:56:46",
          positiontiome: "2020-08-06 09:02:46",
          positiontype: "卫星定位",
          deviceno: "9537",
        },
        {
          title: "其它 33",
          lng_lat: [121.32200099, 30.33020664],
          info: "其它 33",
          updatatime: "2020-07-01 22:35:46",
          positiontiome: "2020-06-26 19:32:46",
          positiontype: "卫星定位",
          deviceno: "9557",
        },
      ],
      children: ["其它 31", "其它 32", "其它 33"],
    },
  ];
  @Output() private isno_refresh = new EventEmitter<Boolean>(); // 告诉父组件是否刷新

  //   定时刷新
  refreshInterval: any;
  constructor(private dialogService: NbDialogService) {
    var p = new Ping({ timeout: 4000 }); // 5s
    var that = this;
    p.ping("https://api.map.baidu.com", function (err, data) {
      if (err) {
        // console.error("error loading resource>>>", err);
        // $("#map_map").text("地图无法加载,请检查网络");
        var span = document.createElement("span");
        span.setAttribute("style", "color: red; font-size: 18px");
        span.innerText = "";
        span.innerText = "地图无法加载,请检查网络!";
        document.getElementById("map_map").appendChild(span);
      } else {
        // console.error(" loading data>>>", data, err);
        that.is_map_api = true;
      }
    });
  }

  // map api是否加载了
  is_map_api = false;

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      console.warn("++++++++000000++++++++", this.is_map_api);
      if (this.is_map_api) {
        // 初始化地图
        mapjs.initmap("map_map", map_init_point);

        // 初始化离线的设备！
        // mapjs.initnoinline(this.noinlinedatas_list[1]);

        // 初始化在线的设备
        // mapjs.initinline(this.noinlinedatas_list[0]);

        // 初始化其它的设备
        // mapjs.initother(this.noinlinedatas_list[2]);

        // 添加地图控件=地图类型+ 缩放图控件
        mapjs.addmapCtrlType();

        // 添加测距
        // mapjs.ranging();

        // 添加报警控件
        // mapjs.alert();

        // 20s后刷新
        var refresh_time = 20;
        this.refreshInterval = setInterval(() => {
          refresh_time -= 1;
          if (refresh_time === 0) {
            refresh_time = 20;
            // 执行刷新函数！及初始化全部小车,全部的小车包含了可能点击的小车，
            // 告诉父组件，让父组件去调用init_show_all初始化小车！
            // this.isno_refresh.emit(true);
          }

          mapjs.refresh(refresh_time);
          // mapjs.refresh(refresh_time);
        }, 1000);

        // mapjs.refresh(refresh_time);
        // 点击获取点击的经纬度
        // mapjs.hitgit_lng_lat()
      }
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
    this.clearOverlay();
  }

  // 父组件执行，告诉该组件，需要在map上展示设备详情！
  /*
    参数1： user_deviceInfo_ 展示设备信息
    参数2：setweilan事件，如点击设备围栏！
    
  */
  show_info_in_map(info) {
    // 创建图标，设备信息
    // 创建图标，设备信息

    // for (let index = 0; index < info.listitem.children.length; index++) {
    //   var user_deviceInfo_ = {
    //     it: "",
    //     listitem: {
    //       title: "",
    //       lng_lat: [],
    //       info: "",
    //     },
    //   };
    //   const childrenitem = info.listitem.children[index];
    //   if (childrenitem == info.it) {
    //     var device_info_item = info.listitem.device_info[index];
    //     user_deviceInfo_.it = info.it;
    //     user_deviceInfo_.listitem = device_info_item;
    //     // mapjs.device_info(user_deviceInfo_, this.setweilan);
    //     mapjs.device_info(user_deviceInfo_);
    //   }
    // }

    for (let index = 0; index < info.length; index++) {
      const element = info[index];
      mapjs.device_info(element);
    }
  }

  // 测试，点击行时，展示折线
  // points: ["121.32290099,30.33020277", "121.32250099,30.32020277", "121.32210099,30.30020277"]
  hit_to_show_line(points: any[]) {
    mapjs.hit_to_show_line(points);
  }

  // 清空所以的覆盖物
  clearOverlay() {
    mapjs.clearOverlay();
  }

  // 初始化全部小车！
  init_show_all(alldata: any[], isnorefresh?) {
    console.error(
      "初始化全部小车！alldata,isnorefresh>>>",
      alldata,
      isnorefresh
    );
    if (isnorefresh) {
      mapjs.clearOverlay();
    }
    alldata.forEach((element) => {
      if (element.info === "在线") {
        // 初始化在线的设备
        mapjs.initinline(element);
      } else if (element.info === "离线") {
        // 初始化离线的设备！
        // mapjs.initnoinline(element, this.setweilan);
        mapjs.initnoinline(element);
      } else {
        // 初始化其它的设备
        mapjs.initother(element);
      }
    });
  }

  //   监听 点击设置围栏
  setweilan = (params) => {
    console.error(params, "+++++++++++++++", "监听 点击设置围栏");
    this.dialogService
      .open(
        SetWeilanComponent,
        { closeOnBackdropClick: false } // 无背景、可滚动
      )
      .onClose.subscribe((result) => {});
  };
}
