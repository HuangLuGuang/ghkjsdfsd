import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "ngx-isnot-favor",
  templateUrl: "./isnot-favor.component.html",
  styleUrls: ["./isnot-favor.component.scss"],
})
export class IsnotFavorComponent implements OnInit {
  private params: any;
  isfavor; //  是否关注
  constructor() {}

  ngOnInit(): void {
    if (this.params.node.data.isfavor === 1) {
      this.isfavor = "是";
    } else {
      this.isfavor = "否";
    }
  }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
