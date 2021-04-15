import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { HttpserviceService } from "../../../../../services/http/httpservice.service";
import { UserInfoService } from "../../../../../services/user-info/user-info.service";

declare let $;
declare let layui;

@Component({
  selector: "ngx-limits-group-device",
  templateUrl: "./limits-group-device.component.html",
  styleUrls: ["./limits-group-device.component.scss"],
})
export class LimitsGroupDeviceComponent implements OnInit {
  @Output() device_info = new EventEmitter<GroupsDevice>(); // 这是选择设备名称触发
  constructor() {}

  ngOnInit(): void {}

  selectedValue = null;
  ngAfterViewInit() {}

  // 科室
  groups;
  // 设备名称
  devicename;
  // 设备编号
  deviceno;

  el7;

  // 初始化表单
  layuiform(datas) {
    var that = this;
    // console.error("初始化表单》》》》", datas);
    layui.use("form", function () {
      var form = layui.form;
      // console.error(
      //   "----------------datas,formdata, id--------->",
      //   datas,
      //   datas[0]["id"]
      // );
      var datasd = datas;
      that.init_groups_device(datas, form);
      var device = datas[0]["deivce"];
      that.init_deviceno_devicename(device, form);
      // 监听选择的功能组
      form.on("select(test_task_conf_add_group)", function (data) {
        console.log("监听选择 功能组：", data.value); //得到被选中的值,即为 group 的id
        if (data.value === datasd[0]["label"]) {
          console.log("==data===：", data); //得到被选中的值,即为 group 的id
          that.groups = data.value;

          // $(".ele7").remove();
          // var p_div = document.getElementsByClassName("ele7_parent")[0];
          // var el7 = document.createElement("div");
          // el7.className = "eleTree ele7";
          // el7.setAttribute("lay-filter", "data7");
          // el7.setAttribute(
          //   "style",
          //   "height: 200px;overflow-y: scroll;font-size: xx-small;width: 100%;display:none;position: absolute;top:100%;background-color: #fff;z-index: 100;"
          // );
          // p_div.appendChild(el7);
          that.init_deviceno_devicename(datasd[0]["deivce"], form);
          that.init_deviceno_devicename(datasd[0]["deivce"], form);
          // that.el7.reload({ data: datasd[0]["deivce"] });
          // this.el7?.unCheckNodes(); //取消所有选中的节点
        }
      });
    });
  }

  // 初始化 功能组
  init_groups_device(datas, form) {
    // var option = `<option value="">请选择功能组</option>`;
    var option = "";
    datas.forEach((element, index) => {
      this.groups = element.label;
      option += `<option  value ="${element.id}">${element.label}</option>`;
      $("#test_task_conf_add_group").html(option);
    });
    form.render();
  }

  // 初始化 设备编号-设备名称
  init_deviceno_devicename(datas, form) {
    // 搜索+下拉
    var that = this;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;

      $("[name='select_search']").val(datas[0].label); // 初始化
      that.deviceno = datas[0].deviceno;
      that.devicename = datas[0].label.split("&")[1];

      var click_toggle = false;
      $("[name='select_search']").on("click", function (e) {
        e.stopPropagation();
        that.el7 = eleTree.render({
          elem: ".ele7",
          data: datas,
          // url: "../eleTree/tree.json",
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
        $(".ele7>.eleTree-node").children()[0].className =
          "eleTree-node-content eleTree-node-content-active";
        if (!that.el7) {
        }
        if (!click_toggle) {
          that.el7.search();
        }

        $(".ele7").toggle();
      });
      $(".select_search").bind("input propertychange", function () {
        // console.error("$(this).val()>>>>>>>>>>",$(this).val());
        that.el7.search($(this).val());
      });

      eleTree.on("nodeClick(data7)", function (d) {
        var firstnode_data = $($(".ele7>.eleTree-node").children()[0]).text();
        if (d.data.currentData.label !== firstnode_data) {
          // console.error("++++++++++++++++++++++");
          $(".ele7>.eleTree-node").children()[0].className =
            "eleTree-node-content";
        }
        // console.error("最终的数据值：", d.data.currentData);
        $("[name='select_search']").val(d.data.currentData.label);
        that.deviceno = d.data.currentData.deviceno;
        that.devicename = d.data.currentData.label.split("&")[1];

        // 调用父组件函数
        that.device_info.emit({
          groups: that.groups,
          deviceno: that.deviceno,
          devicename: that.devicename,
        });

        $(".ele7").hide();
      });

      $(document).on("click", function () {
        $(".ele7").hide();
      });
    });
  }

  // 得到 form值！
  get_form_val() {
    return {
      groups: this.groups,
      deviceno: this.deviceno,
      devicename: this.devicename,
    };
  }

  // =========================================设备名称带有搜索！

  // =========================================设备名称带有搜索！
}

interface GroupsDevice {
  groups: String;
  deviceno: Number;
  devicename: String;
}
