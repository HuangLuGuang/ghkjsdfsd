import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { NbMenuItem } from "@nebular/theme";

declare let $;

@Component({
  selector: "ngx-gps-module-manage",
  templateUrl: "./gps-module-manage.component.html",
  styleUrls: ["./gps-module-manage.component.scss"],
})
export class GpsModuleManageComponent implements OnInit {
  // items: NbMenuItem[] = [
  //   {
  //     title: "资产管理",
  //     link: "/pages/mobile-gps/gpsmodule-manage/assets",
  //     pathMatch: 'prefix',
  //   },
  //   {
  //     title: "充电管理",
  //     link: "/pages/mobile-gps/gpsmodule-manage/power"
  //   },
  // ]

  items = [
    {
      title: "资产管理",
      link: "/pages/mobile-gps/gpsmodule-manage/assets",
    },
    {
      title: "充电管理",
      link: "/pages/mobile-gps/gpsmodule-manage/power",
      // link: "/pages/mobile-gps/gpsmodule-manage/power"
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    if (document.getElementsByClassName("cdk-overlay-container").length < 1) {
      var dom = document.createElement("div");
      dom.className = "cdk-overlay-container";
      document.getElementsByTagName("nb-layout")[0].appendChild(dom);
    } else {
      $(".cdk-overlay-container").remove();
    }
    // ========================================
  }

  ngAfterViewInit() {
    // this.gotoassets();
  }
  // 默认为资产管理
  assets_status = "info";
  power_status = "control";

  // 资产管理
  gotoassets() {
    this.assets_status = "info";
    this.power_status = "control";
    this.router.navigate([this.items[0]["link"]]);
  }
  // 充电管理
  gotoapower() {
    this.assets_status = "control";
    this.power_status = "info";
    this.router.navigate([this.items[1]["link"]]);
  }
}
