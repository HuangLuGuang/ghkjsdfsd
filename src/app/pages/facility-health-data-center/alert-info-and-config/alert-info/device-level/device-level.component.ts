import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "ngx-device-level",
  templateUrl: "./device-level.component.html",
  styleUrls: ["./device-level.component.scss"],
})
export class DeviceLevelComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  level;
  constructor() {}

  ngOnInit(): void {
    // console.error("this.params.node.data.level", this.params.node.data.level);
    switch (this.params.node.data.level) {
      case 1:
        this.level = "一级报警";
        break;
      case 2:
        this.level = "二级报警";
        break;
      case 3:
        this.level = "三级报警";
        break;
    }
  }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
