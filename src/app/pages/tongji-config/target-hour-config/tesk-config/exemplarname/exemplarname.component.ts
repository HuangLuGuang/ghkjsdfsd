import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "ngx-exemplarname",
  templateUrl: "./exemplarname.component.html",
  styleUrls: ["./exemplarname.component.scss"],
})
export class ExemplarnameComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  exemplarname; // 样件名称
  constructor() {}

  ngOnInit(): void {
    this.exemplarname = this.params.node.data.exemplarname;
  }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
