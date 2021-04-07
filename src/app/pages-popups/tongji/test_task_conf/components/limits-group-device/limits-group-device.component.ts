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

  // 设备id
  deviceid;
  // 设备名称
  devicename;
  // 设备编号
  deviceno;

  // 初始化表单
  layuiform(datas) {
    var that = this;
    layui.use("form", function () {
      var form = layui.form;
      console.error("----------------datas,formdata--------->", datas);
      var datasd = datas[1];
      that.init_groups_device(datas, form);

      // 监听选择的功能组
      form.on("select(test_task_conf_add_group)", function (data) {
        // console.log("监听选择 功能组：",data.value); //得到被选中的值,即为 group 的id
        if (data.value !== "") {
          that.init_devicename_deviceno(data.value, datasd, form);
        }
      });

      // 监听选择的设备名称
      form.on("select(test_task_conf_add_devicename)", function (data) {
        console.error("----------------data,datasd--------->", data, datasd);
        // console.log("监听选择 设备名称：", data); //得到被选中的值,即为 group 的id
        datasd.forEach((element) => {
          element["value"].forEach((v) => {
            if (v["deviceno"] === data.value) {
              that.update_deviceno(v.deviceno, v);
              that.devicename = v.label;
            }
          });
        });

        // that.update_deviceno(data.value);
      });
    });
  }

  // 初始化 功能组-设备名称
  init_groups_device(datas, form) {
    var option = `<option value="">请选择功能组</option>`;
    datas[0].forEach((element, index) => {
      option += `<option  value ="${element.id}">${element.label}</option>`;
      $("#test_task_conf_add_group").html(option);
    });
    form.render();
  }

  init_devicename_deviceno(datas, datasd, form) {
    console.error("初始化 功能组-设备名称", datasd);
    datasd.forEach((element) => {
      if (datas === element["name"]) {
        var d = element["value"];
        var option_d = "";
        d.forEach((item, index) => {
          if (index === 0) {
            this.update_deviceno(item.deviceno, item);
            this.devicename = element.label;
          }

          option_d += `<option  value ="${item.deviceno}">${item.label}</option>`;
          $("#test_task_conf_add_devicename").html(option_d);
        });
        form.render();
      }
    });
  }

  // 设备编号
  update_deviceno(data, fordatas?) {
    console.error("设备编号", data, fordatas);
    this.deviceno = data;
    this.devicename = $("#test_task_conf_add_devicename")
      .find("option:selected")
      .text();
    $("#test_task_conf_add_deviceno").val(data);

    this.device_info.emit(fordatas);
  }

  // 得到 form值！
  get_form_val() {
    return {
      deviceid: this.deviceid,
      deviceno: this.deviceno,
      devicename: this.devicename,
    };
  }
}

interface GroupsDevice {
  id: String;
  label: String;
  deviceno?: String;
  devicetaskname?: String;
  executor?: String;
  exemplarno?: String;
  exemplarnum?: String;
  tasknum?: String;
  taskstatus?: String;
}
