import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss']
})
export class ShortcutComponent implements OnInit {

  // 快捷方式的数据
  data = [
    [
      { svg: "#iconjiankong", title: "监控看板", url: "/pages/board/rtm2" },
      { svg: "#iconlishi", title: "操作日志", url: "pages/system-set/operation_log" },
      { svg: "#iconyunying", title: "设备看板", url: "/pages/equipment/detailsDemo/%E8%AE%BE%E5%A4%87%E7%9C%8B%E6%9D%BF/device_boyang_01" },
      // { svg: "#iconlishi", title: "历史数据"},
      // { svg: "#iconyunying", title: "运营看板", url: "/pages/equipment/detailsDemo/%E8%AE%BE%E5%A4%87%E7%9C%8B%E6%9D%BF/device_boyang_01" },
    ],
    [
      { svg: "#icontongji", title: "统计分析", url: "/pages/tongji/deviceKpiReport/kpitable" },
      { svg: "#iconxiaoxi1-copy", title: "消息通知", url: "" },
      { svg: "#iconbaojing", title: "报警分析", url: "/pages/datacenter/real-time" },
    ],
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // 跳转到快捷界--面
  geto_shortcut(item){
    console.log("----------->",item)
    this.router.navigate([item.url]);
  }

}
