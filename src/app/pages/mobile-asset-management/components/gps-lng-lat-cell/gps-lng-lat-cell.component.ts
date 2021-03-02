import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "ngx-gps-lng-lat-cell",
  templateUrl: "./gps-lng-lat-cell.component.html",
  styleUrls: ["./gps-lng-lat-cell.component.scss"],
})
export class GpsLngLatCellComponent
  implements OnInit, ICellRendererAngularComp {
  private params: any;
  lng_lat; // 经纬度 lng：表示经度，lat：表示纬度
  latlon; // "121.32290099,30.33020277",
  latlon_title;
  nzTooltipOverlayStyle = {
    color: "#87d068",
  }; //#00D68F
  constructor() {}

  ngOnInit(): void {
    // this.params.node.data.latlon // "121.32290099,30.33020277",
    this.lng_lat = this.params.node.data.latlon.split(",");
    this.latlon = this.params.node.data.latlon;
    this.latlon_title =
      "经度：" + this.lng_lat[0] + "  纬度：" + this.lng_lat[1];
  }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }
}
