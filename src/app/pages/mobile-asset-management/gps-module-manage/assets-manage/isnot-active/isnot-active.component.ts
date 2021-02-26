import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "ngx-isnot-active",
  templateUrl: "./isnot-active.component.html",
  styleUrls: ["./isnot-active.component.scss"],
})
export class IsnotActiveComponent implements OnInit, ICellRendererAngularComp {
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
