import { Component, OnInit } from "@angular/core";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

@Component({
  selector: "ngx-test-all-info",
  templateUrl: "./test-all-info.component.html",
  styleUrls: ["./test-all-info.component.scss"],
})
export class TestAllInfoComponent implements OnInit {
  test_all_info_height = false;
  // 试验汇总信息
  titles = ["设备名称", "设备位置", "是否报警", "用户操作"];
  datas = [];

  constructor(
    private http: HttpserviceService,
    private userinfo: UserInfoService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    this.init_info();
  }
  TABLE = "alarm_device";
  METHOD = "alarm_device";

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
    console.error("查看视频按钮>>>>", item);
  }

  // 取消报警
  cancelalert(item) {
    console.error("取消报警>>>>", item);
  }
}
