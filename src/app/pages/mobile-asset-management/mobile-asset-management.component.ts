import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-mobile-asset-management",
  templateUrl: "./mobile-asset-management.component.html",
  styleUrls: ["./mobile-asset-management.component.scss"],
})
export class MobileAssetManagementComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    if (document.getElementsByClassName("cdk-overlay-container").length < 2) {
      var dom = document.createElement("div");
      dom.className = "cdk-overlay-container";
      document.getElementsByTagName("nb-layout")[0].appendChild(dom);
    }
  }
}
