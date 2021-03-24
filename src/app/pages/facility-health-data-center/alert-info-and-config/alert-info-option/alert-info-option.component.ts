import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "ngx-alert-info-option",
  templateUrl: "./alert-info-option.component.html",
  styleUrls: ["./alert-info-option.component.scss"],
})
export class AlertInfoOptionComponent
  implements OnInit, ICellRendererAngularComp {
  private params: any;
  constructor() {}

  ngOnInit(): void {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  // 父组件调用
  public device_info(item) {
    var rowData = this.params.node.data;
    // this.itemdic[item](rowData);
    switch (item) {
      case "config":
        this.config(rowData);
        break;
      case "push":
        this.push(rowData);
        break;
    }
  }

  config(rowData) {
    this.params.data = { active: "config", data: [rowData] };
    this.params.clicked(this.params.data);
  }

  push(rowData) {
    this.params.data = { active: "push", data: [rowData] };
    this.params.clicked(this.params.data);
  }
}
