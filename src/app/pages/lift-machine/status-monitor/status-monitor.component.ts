import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpserviceService } from "../../../services/http/httpservice.service";

declare let $;

@Component({
  selector: "ngx-status-monitor",
  templateUrl: "./status-monitor.component.html",
  styleUrls: ["./status-monitor.component.scss"],
})
export class StatusMonitorComponent implements OnInit {
  @ViewChild("status_monitor_title") status_monitor_title: any;
  constructor(private http: HttpserviceService) {}
  ngOnInit(): void {}

  TABLE = "detector";
  METHOD = "dev_get_detector";
  METHODALL = "dev_get_detector_numbers";

  detector_datas = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.get_init_table();
    }, 100);

    setTimeout(() => {
      this.get_all_num();
    }, 200);
  }

  // 得到 总数
  get_all_num() {
    this.http.callRPC(this.TABLE, this.METHODALL, {}).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var message = res;
        this.status_monitor_title?.init_num(message);
      }
    });
  }

  // 得到 NVH 数据
  get_init_table() {
    this.http.callRPC(this.TABLE, this.METHOD, {}).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var message = res["message"];
        this.detector_datas = message;
        for (let index = 1; index < message.length + 1; index++) {
          const item = message[index - 1];
          $(".sm_span_" + index + 1).text("举升机工位:" + item["deviceid"]);
          var status;
          if (item["status"] === 1) {
            status = "占位";
          } else {
            status = "空闲";
          }
          $(".sm_span_" + index + 2).text("当前状态:" + status);
          $(".sm_span_" + index + 3).text("已使用时长:" + item["time"] + "h");
        }
      }
    });
  }
}
