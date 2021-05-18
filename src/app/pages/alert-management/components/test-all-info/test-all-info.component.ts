import { Component, Input, OnInit } from "@angular/core";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

@Component({
  selector: "ngx-test-all-info",
  templateUrl: "./test-all-info.component.html",
  styleUrls: ["./test-all-info.component.scss"],
})
export class TestAllInfoComponent implements OnInit {
  visible = false; // 抽屉
  test_all_info_height = false;
  // 试验汇总信息
  titles = ["设备名称", "设备位置", "是否报警", "用户操作"];
  datas = [];

  constructor(
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    this.init_info();
  }
  TABLE = "alarm_device";
  METHOD = "alarm_device";
  // 历史记录
  HTABLE = "get_history_alarm_log";
  HMETHOD = "get_history_alarm_log";

  ngOnInit(): void {}

  ngAfterViewInit() {
    // console.error("datas>>>>>>>>>>>", this.datas);
  }

  // 初始化试验汇总信息
  init_info() {
    this.http.callRPC(this.TABLE, this.METHOD, {}).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.datas = res["message"];
      }
    });
  }

  // 处理 count，
  handle(count) {
    if (count === 0) {
      return "是";
    } else {
      return "否";
    }
  }

  // 查看视频按钮
  lookvideo(item) {
    this.publicservice.ChangeVideo(item);
  }

  // 取消报警---》历史记录
  cancelalert(item) {
    this.visible = true;
    console.error("历史记录>>>>", item);
    this.http.callRPC(this.HTABLE, this.HMETHOD, item).subscribe((result) => {
      var res = result["result"]["message"][0];
      console.error("得到的历史记录>>>>>>>>>>>>>>>>>>>", res["message"]);
    });
  }

  close(): void {
    this.visible = false;
  }
}
