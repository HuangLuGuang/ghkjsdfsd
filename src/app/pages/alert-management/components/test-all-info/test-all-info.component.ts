import { Component, Input, OnInit } from "@angular/core";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

declare let layui;

declare let $;

@Component({
  selector: "ngx-test-all-info",
  templateUrl: "./test-all-info.component.html",
  styleUrls: ["./test-all-info.component.scss"],
})
export class TestAllInfoComponent implements OnInit {
  visible = false; // 抽屉
  is_cancelalert = false; // 是否是点击 历史记录
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

  // 历史记录的数据
  histoery_data = [];

  ngOnInit(): void {}

  ngAfterViewInit() {
    // console.error("datas>>>>>>>>>>>", this.datas);
    // 测试弹出
    var $abc = $(".abc");
    $abc.hide();

    // 点击隐藏 测试弹框
    var that = this;
    $(".abc").on("click", function () {
      $abc.hide();
    });
  }

  // 初始化试验汇总信息
  init_info() {
    this.http.callRPC(this.TABLE, this.METHOD, {}).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.datas = res["message"];

        // 初始化显示第一条数据！
        this.publicservice.ChangeVideo(res["message"][0]);
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
    // 弹出 窗口
    // this.popup();

    this.is_cancelalert = !this.is_cancelalert;
    // 测试弹出
    this.visible = true;
    var $abc = $(".abc");
    $abc.show();

    // console.error("历史记录>>>>", item);
    this.http.callRPC(this.HTABLE, this.HMETHOD, item).subscribe((result) => {
      var res = result["result"]["message"][0];
      this.histoery_data = res["message"];
      // [{deviceid: "device_weiss_01", level: 1, message: "[94](156)IR-radiation not Ready",to_char: "2021-05-20 12:48:18"}]

      // 添加 statusColor 根据 level
      this.histoery_data.forEach((item) => {
        if (item.level === 3) {
          // 三级报警
          item["statusColor"] = "red";
        }
      });

      console.log("得到的历史记录>>>>>>>>>>>>>>>>>>>", this.histoery_data);
    });
  }

  close(): void {
    this.visible = false;
  }

  // 弹出
  popup() {
    layui.use("layer", function () {
      var layer = layui.layer;
      layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        // content: $('.layer_notice'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        content: "捕获的元素，注意：最好该指定的元素要存放",
        zIndex: 99891014,
        // cancel: function () {
        //   layer.msg("捕获就是从页面已经存在的元素上，包裹layer的结构", {
        //     time: 5000,
        //     icon: 6,
        //   });
        // },
      });
    });
  }
}
