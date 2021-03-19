import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-envitonmental-monitoring",
  templateUrl: "./envitonmental-monitoring.component.html",
  styleUrls: ["./envitonmental-monitoring.component.scss"],
})
export class EnvitonmentalMonitoringComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    if (document.getElementsByClassName("cdk-overlay-container").length < 1) {
      var dom = document.createElement("div");
      dom.className = "cdk-overlay-container";
      document.getElementsByTagName("nb-layout")[0].appendChild(dom);
    }
  }
}
