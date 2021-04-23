import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "ngx-exemplarchildnumbers",
  templateUrl: "./exemplarchildnumbers.component.html",
  styleUrls: ["./exemplarchildnumbers.component.scss"],
})
export class ExemplarchildnumbersComponent
  implements OnInit, ICellRendererAngularComp {
  private params: any;
  exemplarchildnumbers; // 样件名称
  constructor() {}

  ngOnInit(): void {
    this.exemplarchildnumbers = this.params.node.data.exemplarchildnumbers;
  }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
