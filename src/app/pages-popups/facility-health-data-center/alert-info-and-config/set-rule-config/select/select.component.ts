import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpserviceService } from "../../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../../services/publicmethod/publicmethod.service";

declare let $;
declare let layui;

@Component({
  selector: "ngx-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements OnInit {
  @Output() device_info = new EventEmitter<Device>(); // 这是选择设备名称触发
  TABLE = "get_alarm_devices";
  METHOD = "get_alarm_devices";

  deviceid;
  id;

  ele_device;

  constructor(
    private http: HttpserviceService,
    private publicservice: PublicmethodService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.http.callRPC(this.TABLE, this.METHOD, {}).subscribe((result) => {
      const res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var message = res["message"];
        var message_select = [];
        message.forEach((element) => {
          var item = {};
          item["id"] = element["deviceid"];
          item["label"] = element["deviceid"];
          message_select.push(item);
        });
        this.layuiform(message_select);
      }
    });
  }

  layuiform(datas) {
    var that = this;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='rule_deviceid']").val(datas[0].label); // 初始化
      that.deviceid = datas[0].label;
      that.id = datas[0].id;
      // 调用父组件函数
      that.device_info.emit({
        id: that.id,
        deviceid: that.deviceid,
      });

      var click_toggle = false;

      $("[name='rule_deviceid']").on("click", function (e) {
        e.stopPropagation();
        that.ele_device = eleTree.render({
          elem: ".ele_device",
          data: datas,
          defaultExpandAll: true,
          expandOnClickNode: false,
          highlightCurrent: true,
          defaultCheckedKeys: [1],
          searchNodeMethod: function (value, data) {
            if (!value) {
              click_toggle = false;
              return true;
            }
            if (data.label.indexOf(value) !== -1) {
              return data.label.indexOf(value) !== -1;
            }
          },
        });
        $(".ele_device>.eleTree-node").children()[0].className =
          "eleTree-node-content eleTree-node-content-active";
        if (!that.ele_device) {
        }
        if (!click_toggle) {
          that.ele_device.search();
        }

        $(".ele_device").toggle();
      });

      $(".rule_deviceid").bind("input propertychange", function () {
        that.ele_device.search($(this).val());
      });

      eleTree.on("nodeClick(data_device)", function (d) {
        var firstnode_data = $(
          $(".ele_device>.eleTree-node").children()[0]
        ).text();
        if (d.data.currentData.label !== firstnode_data) {
          // console.error("++++++++++++++++++++++");
          $(".ele_device>.eleTree-node").children()[0].className =
            "eleTree-node-content";
        }
        // console.error("最终的数据值：", d.data.currentData);
        $("[name='rule_deviceid']").val(d.data.currentData.label);
        that.deviceid = d.data.currentData.label;
        that.id = d.data.currentData.id;
        // 调用父组件函数
        that.device_info.emit({
          id: that.id,
          deviceid: that.deviceid,
        });

        $(".ele_device").hide();
      });

      $(document).on("click", function () {
        $(".ele_device").hide();
      });
    });
  }

  // 得到 form值！
  get_form_val() {
    return {
      deviceid: this.deviceid,
      id: this.id,
    };
  }
}

interface Device {
  id: Number;
  deviceid: String;
}
