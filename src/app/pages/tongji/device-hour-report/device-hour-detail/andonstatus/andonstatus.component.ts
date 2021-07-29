import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "ngx-andonstatus",
  templateUrl: "./andonstatus.component.html",
  styleUrls: ["./andonstatus.component.scss"],
})
export class AndonstatusComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  andonstatus; // 设备指标
  constructor() {}

  ngOnInit(): void {
    var andonstatus = this.params.node.data.andonstatus;
    const statusdata = [
      { id: "running", label: "运行" },
      { id: "stop", label: "空闲" },
      { id: "warning", label: "维修" },
      { id: "placeon", label: "占位" },
    ];
    statusdata.forEach((item) => {
      if (andonstatus == item["id"]) {
        this.andonstatus = item["label"];
      }
    });
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
