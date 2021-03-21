import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";
declare let $;
declare let layui;

@Component({
  selector: "ngx-my-select-tree-input",
  templateUrl: "./my-select-tree-input.component.html",
  styleUrls: ["./my-select-tree-input.component.scss"],
})
export class MySelectTreeInputComponent implements OnInit {
  @Output() parent_query = new EventEmitter<Parent_Query>(); // 这是选择设备名称触发

  // 科室/功能组下拉框
  groups = [];
  // 设备id
  deviceid;
  // 设备名称
  devicename;
  // 设备编号
  deviceno;

  //  只是触发 功能组！
  isgroups = true;

  // 功能组id
  groups_id;

  form_data; // 表单数据

  constructor(
    private http: HttpserviceService,
    private userinfo: UserInfoService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.layuiform();
  }

  ngOnDestroy() {}

  // 初始化表单
  layuiform(isrender?) {
    var that = this;
    layui.use("form", function () {
      var form = layui.form;
      // form.render();
      var data = form.val("test_task_conf_add_inline_groups"); // 试验信息预览
      that.form_data = data;

      that.init_groups(form);
      // 监听选择的功能组
      form.on("select(test_task_conf_add_group)", function (data) {
        if (data.value !== "") {
          that.groups_id = data.value;
          that.init_devicename_deviceno(data.value, form);
          that.isgroups = true;
          setTimeout(() => {
            that.parent_query.emit(that.get_form_val("group"));
          }, 200);
        }
      });

      // 重置
      if (isrender) {
        $("#test_task_conf_add_devicename").html("");
        that.devicename = "";
        form.render();
      } else {
      }

      // 监听选择的设备名称
      form.on("select(test_task_conf_add_devicename)", function (data) {
        console.log("监听选择 设备名称：", data); //得到被选中的值,即为 group 的id
        if (data.value == "[];[]") {
          that.isgroups = true;
        } else {
          that.isgroups = false;
        }
        that.update_deviceno(data.value);
      });
    });
  }

  // 得到科室功能组
  init_groups(form) {
    var monthed = "dev_get_device_type";
    var columns = {
      employeeid: this.userinfo.getEmployeeID(),
    };
    this.http.callRPC("device", monthed, columns).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var groups = res["message"][0]["groups"];
        // 动态创建option
        // this.groups = groups;
        var option = `<option value="">请选择功能组</option>`;
        // var option = '`<option value=""></option>`';
        groups.forEach((element) => {
          option += `<option  value ="${element.id}">${element.label}</option>`;
          $("#test_task_conf_add_group").html(option);
        });
        form.render();
      }
    });
  }

  // 根据科室/功能组得到 设备名称-设备编号
  init_devicename_deviceno(groupsid, form) {
    var monthed = "dev_get_device_name";
    var columns = {
      groupsid: groupsid,
    };
    this.http.callRPC("device", monthed, columns).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var devicename_deviceno = res["message"];
        var option = "";

        devicename_deviceno.forEach((element, index) => {
          if (index === 0) {
            this.update_deviceno(element.deviceid + ";" + element.deviceno);
            this.devicename = element.devicename;
          }
          option += `<option  value ="${
            element.deviceid + ";" + element.deviceno
          }">${element.devicename}</option>`;
        });
        $("#test_task_conf_add_devicename").html(option);
        form.render();
      }
    });
  }

  // 更改设备编号 deveceno
  update_deviceno(deviceno) {
    // test_task_conf_add_deviceno
    this.deviceid = deviceno.split(";")[1];
    this.deviceno = deviceno.split(";")[0];
    this.devicename =
      $("#test_task_conf_add_devicename").find("option:selected").text() == ""
        ? ""
        : $("#test_task_conf_add_devicename").find("option:selected").text();
    $("#test_task_conf_add_deviceno").val(this.deviceid);
    // console.error("更改设备编号 deveceno",this.get_form_val());
    setTimeout(() => {
      if (this.isgroups) {
        this.parent_query.emit(this.get_form_val("group"));
      } else {
        this.parent_query.emit(this.get_form_val("device"));
      }
    }, 100);
  }

  // 得到 form值！
  get_form_val(group_device) {
    if (group_device === "group") {
      return {
        groups_id: this.groups_id,
        deviceid: this.deviceid,
        deviceno: this.deviceno,
        devicename:
          this.devicename === ""
            ? $("#test_task_conf_add_devicename").find("option:selected").text()
            : this.devicename,
        group: $("#test_task_conf_add_group").find("option:selected").text(),
      };
    }

    return {
      groups_id: this.groups_id,
      deviceid: this.deviceid,
      deviceno: this.deviceno,
      devicename:
        $("#test_task_conf_add_devicename").find("option:selected").text() ==
        "全部"
          ? ""
          : $("#test_task_conf_add_devicename").find("option:selected").text(),
    };
  }

  // 删除选择的
  delselect() {
    this.layuiform(true);
  }

  // 调用父组件---搜索
}
interface Parent_Query {
  groups_id: string;
  deviceid: string;
  deviceno: string;
  devicename?: string;
  group?: string;
}
