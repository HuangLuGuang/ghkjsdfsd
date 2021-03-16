import { Component, OnInit } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}
}
