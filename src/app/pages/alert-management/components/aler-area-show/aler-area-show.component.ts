import { Component, OnInit } from "@angular/core";
import { HttpserviceService } from "../../../../services/http/httpservice.service";

@Component({
  selector: "ngx-aler-area-show",
  templateUrl: "./aler-area-show.component.html",
  styleUrls: ["./aler-area-show.component.scss"],
})
export class AlerAreaShowComponent implements OnInit {
  groups_datas = [];

  constructor(private http: HttpserviceService) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    this.alert_show();
  }
  alert_show_data = {
    minutes: 30,
    level: 3,
  };

  ngOnInit(): void {}

  ngAfterViewInit() {}

  // 报警区域显示
  alert_show() {
    this.http
      .callRPC("get_groups_alarm_log", "get_groups_alarm_log", {
        minutes: this.alert_show_data.minutes,
        level: this.alert_show_data.level,
      })
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        if (res["code"] === 1) {
          // console.error("报警区域显示>>>>>>>>>", res["message"]);
          this.groups_datas = res["message"];
        }
      });
  }

  // 处理科室
  handle_group(item) {
    return item.split("-")[2];
  }
}
