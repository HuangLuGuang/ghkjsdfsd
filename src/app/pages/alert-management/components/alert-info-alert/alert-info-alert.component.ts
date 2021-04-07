import { Component, OnInit } from "@angular/core";
import { HttpserviceService } from "../../../../services/http/httpservice.service";

@Component({
  selector: "ngx-alert-info-alert",
  templateUrl: "./alert-info-alert.component.html",
  styleUrls: ["./alert-info-alert.component.scss"],
})
export class AlertInfoAlertComponent implements OnInit {
  // 事件/报警信息
  log_warm = {
    // '时间','日志等级','日志信息'
    title: ["时间", "日志等级", "日志报警"],
    data: [
      ["2020-10-12", "info", "Not ready"],
      ["2020-10-13", "info", "Not ready"],
      ["2020-10-14", "info", "Not ready"],
      ["2020-10-15", "warning", "Not ready"],
      ["2020-10-16", "info", "Not ready"],
      ["2020-10-17", "error", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
      ["2020-10-17", "info", "Not ready"],
    ],
    error: 1,
  };

  METHOD = "get_alarm_device";
  TABLE = "get_alarm_device";

  // 事件/报警信息数据
  titles = ["时间", "日志等级", "日志报警"];
  datas = [];

  constructor(private http: HttpserviceService) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    this.init_alert_info();
  }

  ngOnInit(): void {}

  // 初始化事件/报警信息
  init_alert_info() {
    this.http.callRPC(this.TABLE, this.METHOD, {}).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        // console.error("初始化事件/报警信息>>>>", res["message"]);
        this.datas = res["message"];
      }
    });
  }
}
