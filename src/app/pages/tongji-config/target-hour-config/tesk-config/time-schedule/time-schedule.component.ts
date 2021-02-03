import { Component, OnInit } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

declare let $;

@Component({
  selector: "ngx-time-schedule",
  templateUrl: "./time-schedule.component.html",
  styleUrls: ["./time-schedule.component.scss"],
})
export class TimeScheduleComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  rate; // 时间进度

  square = "square"; // 进度条端点形状，round
  constructor() {}

  ngOnInit(): void {
    this.rate = this.params.node.data.rate;
  }

  ngAfterViewInit() {}

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
