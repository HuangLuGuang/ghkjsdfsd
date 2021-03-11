import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "ngx-temperature-management-active",
  templateUrl: "./temperature-management-active.component.html",
  styleUrls: ["./temperature-management-active.component.scss"],
})
export class TemperatureManagementActiveComponent
  implements OnInit, ICellRendererAngularComp {
  private params: any;
  active; //  是否启用
  constructor() {}

  ngOnInit(): void {
    if (this.params.node.data.active === 1) {
      this.active = "是";
    } else {
      this.active = "否";
    }
  }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
