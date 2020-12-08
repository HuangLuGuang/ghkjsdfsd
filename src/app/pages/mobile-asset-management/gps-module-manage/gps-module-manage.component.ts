import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-gps-module-manage',
  templateUrl: './gps-module-manage.component.html',
  styleUrls: ['./gps-module-manage.component.scss']
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
      link: "/pages/mobile-gps/gpsmodule-manage/power"
      // link: "/pages/mobile-gps/gpsmodule-manage/power"
    },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    // this.gotoassets();

  }
  // 默认为资产管理
  assets_status = "info";
  power_status = "control";

  // 资产管理
  gotoassets(){
    this.assets_status = "info";
    this.power_status = "control";
    this.router.navigate([this.items[0]["link"]]);
  }
  // 充电管理
  gotoapower(){
    this.assets_status = "control";
    this.power_status = "info";
    this.router.navigate([this.items[1]["link"]]);
  }

}
