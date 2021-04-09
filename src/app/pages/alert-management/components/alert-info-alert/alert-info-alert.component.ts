import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpserviceService } from "../../../../services/http/httpservice.service";

declare let $;

@Component({
  selector: "ngx-alert-info-alert",
  templateUrl: "./alert-info-alert.component.html",
  styleUrls: ["./alert-info-alert.component.scss"],
})
export class AlertInfoAlertComponent implements OnInit {
  @Output() serious_alert = new EventEmitter<Boolean>(); // 是否是严重报警！
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.all_height = document.getElementsByClassName(
        "alert_info_alert_table_info_content"
      )[0]?.scrollHeight;
      // console.error("************************", this.all_height);
      if (this.all_height > 0) {
        this.animaltion_scroll();
      }
    }, 2000);
  }

  //组件销毁
  ngOnDestroy() {
    clearInterval(this.animaltion_scroll_t);
  }

  // 初始化事件/报警信息
  init_alert_info() {
    this.http.callRPC(this.TABLE, this.METHOD, {}).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.datas = res["message"];
        this.is_serious_alert(res["message"]);
      }
    });
  }

  // 是否有严重报警
  is_serious_alert(message: []) {
    for (let index = 0; index < message.length; index++) {
      const item = message[index];
      if (item["level"] === "Error") {
        this.serious_alert.emit(true);
        return 0;
      }
    }
  }

  // 滚动条动画
  // 总高度
  all_height = 0;

  // 单行高度
  line_height = 23 * 4;

  // 当前位置
  curr_local = 0;

  // 间隔函数
  animaltion_scroll_t;

  animaltion_scroll() {
    // 每一秒移动1行！
    this.animaltion_scroll_t = setInterval(() => {
      this.curr_local += this.line_height;
      if (this.curr_local < this.all_height) {
        document.getElementsByClassName(
          "alert_info_alert_table_info_content"
        )[0].scrollTop = this.curr_local;
      } else {
        //
        this.curr_local = 0;
      }
    }, 500);
  }

  auto_scroll(curr_local) {}
}
