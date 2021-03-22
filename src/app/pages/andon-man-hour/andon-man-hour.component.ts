import { Component, OnInit } from "@angular/core";

declare let $;
@Component({
  selector: "ngx-andon-man-hour",
  templateUrl: "./andon-man-hour.component.html",
  styleUrls: ["./andon-man-hour.component.scss"],
})
export class AndonManHourComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    if (document.getElementsByClassName("cdk-overlay-container").length < 1) {
      var dom = document.createElement("div");
      dom.className = "cdk-overlay-container";
      document.getElementsByTagName("nb-layout")[0].appendChild(dom);
    }
    // ========================================
  }
}
