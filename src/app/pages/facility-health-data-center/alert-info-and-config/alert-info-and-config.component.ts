import { Component, OnInit } from "@angular/core";
import { Event, NavigationEnd, Router } from "@angular/router";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";

import { UserInfoService } from "../../../services/user-info/user-info.service";

@Component({
  selector: "ngx-alert-info-and-config",
  templateUrl: "./alert-info-and-config.component.html",
  styleUrls: ["./alert-info-and-config.component.scss"],
})
export class AlertInfoAndConfigComponent implements OnInit {
  tabs = [
    {
      title: "报警信息",
      url: "/pages/datacenter/alert-info-config/info",
      toggle: "info",
    },
    {
      title: "推送设置",
      url: "/pages/datacenter/alert-info-config/config",
      toggle: "config",
    },
  ];

  // 根据url最后一个路径确定 index的值
  url_after_path = {
    info: 0,
    config: 1,
  };

  index = 0;
  isDocument;

  constructor(
    private router: Router,
    private publicservice: PublicmethodService,
    private userinfo: UserInfoService
  ) {
    // 得到url
    // this.publicservice.get_current_url().subscribe((res: string) => {
    //   this.index = this.url_after_path[res.split("/").pop()];
    // });
  }

  ngOnInit(): void {
    // 监听路由
    // this.isDocument = this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     var url = event.url;
    //     this.index = this.url_after_path[url.split("/").pop()];
    //   }
    // });
    // // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    // if (document.getElementsByClassName("cdk-overlay-container").length < 1) {
    //   var dom = document.createElement("div");
    //   dom.className = "cdk-overlay-container";
    //   document.getElementsByTagName("nb-layout")[0].appendChild(dom);
    // }
  }

  // 切换页签------------------
  toggle_config(type) {
    // console.error("切换页签------------------", type);
    if (type.toggle === "info") {
      // 切换到报警信息
      this.router.navigate([type.url]);
    } else if (type.toggle === "config") {
      // 切换到推送设置
      this.router.navigate([type.url]);
    } else {
    }
  }

  ngOnDestroy() {
    localStorage.removeItem("buttons_list");
  }
}
