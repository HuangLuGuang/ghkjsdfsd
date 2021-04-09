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

  // 科室
  groups;
  // 设备名称
  devicename;
  // 设备编号
  deviceno;

  // 初始化表单
  layuiform(datas) {
    var that = this;
    layui.use("form", function () {
      var form = layui.form;
      console.error(
        "----------------datas,formdata, id--------->",
        datas,
        datas[0]["id"]
      );
      var datasd = datas;
      that.init_groups_device(datas, form);
      that.init_devicename_deviceno(datas[0]["id"], datas[0]["deivce"], form);

      // 监听选择的功能组
      form.on("select(test_task_conf_add_group)", function (data) {
        console.log("监听选择 功能组：", data.value); //得到被选中的值,即为 group 的id
        if (data.value !== "") {
          that.init_devicename_deviceno(data.value, datasd[0]["deivce"], form);
        }
      });

      // 监听选择的设备名称
      form.on("select(test_task_conf_add_devicename)", function (data) {
        console.error(
          "----------------data,datasd--------->",
          data.value,
          datasd
        );
        // console.log("监听选择 设备名称：", data); //得到被选中的值,即为 group 的id
        var deivce = datasd[0]["deivce"];
        console.error(">>>>>>>>>>>>>>>>deivce", deivce);
        deivce.forEach((element) => {
          if (data.value == element["id"]) {
            that.update_deviceno(element.deviceno, element);
          }
        });

        // that.update_deviceno(data.value);
      });
    });
  }

  // 初始化 功能组-设备名称
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

  init_devicename_deviceno(datas, datasd, form) {
    console.error("初始化 功能组-设备名称", datasd);
    var option = "";
    datasd.forEach((item, index) => {
      if (index === 0) {
        console.error("*****************index,====item", index, item);
        this.update_deviceno(item.deviceno, item);
        this.devicename = item.label;
      }
      option += `<option  value ="${item.id}">${item.label}</option>`;
      $("#test_task_conf_add_devicename").html(option);

      form.render();
    });
  }

  // 设备编号
  update_deviceno(data, fordatas?) {
    console.error("设备编号", data, fordatas);

    this.deviceno = data;
    this.devicename = $("#test_task_conf_add_devicename")
      .find("option:selected")
      .text();
    if (this.devicename === "") {
      this.devicename = fordatas.label;
    }
    $("#test_task_conf_add_deviceno").val(data);
    var groupdata: GroupsDevice = {
      groups: this.groups,
      deviceno: fordatas.deviceno,
      devicename: this.devicename,
    };
    // this.device_info.emit(fordatas);
    this.device_info.emit(groupdata);
  }

  // 得到 form值！
  get_form_val() {
    return {
      groups: this.groups,
      deviceno: this.deviceno,
      devicename: this.devicename,
    };
  }
}

interface GroupsDevice {
  groups: String;
  deviceno: Number;
  devicename: String;
}
