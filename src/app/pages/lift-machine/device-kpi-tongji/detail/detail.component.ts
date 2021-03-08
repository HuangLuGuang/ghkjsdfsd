import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "ngx-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit, ICellRendererAngularComp {
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
