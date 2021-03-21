import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

import { Temperature } from "../add-edit-temperature/form_verification";
declare let layui;

declare let $;
@Component({
  selector: "ngx-add-edit-temperature",
  templateUrl: "./add-edit-temperature.component.html",
  styleUrls: ["./add-edit-temperature.component.scss"],
})
export class AddEditTemperatureComponent implements OnInit {
  @Input() title: string;
  @Input() content: string; // 'true': 表示edit 'false':表示add
  @Input() rowData: any[];
  // 加载
  loading;

  TABLE = "device_temperature_manage";
  METHOD = "dev_insert_temperature_manage";

  METHOD2 = "dev_update_temperature_manage";
  employeeid = this.userinfo.getEmployeeID();

  // 科室/用户组
  groups = [];

  constructor(
    private dialogRef: NbDialogRef<AddEditTemperatureComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService
  ) {
    // ====================================
    // 得到科室 sys_get_groups_limit
    var columns = {
      limit: 10,
      offset: 0,
      employeeid: this.employeeid,
    };
    this.http
      .callRPC("device", "sys_get_groups_limit", columns)
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        if (res["code"] === 1) {
          this.groups = res["message"];
          localStorage.setItem("Device_Groups", JSON.stringify(res["message"]));
        }
      });
    // ====================================
  }

  ngOnInit(): void {
    // 科室用户组
    this.get_groups();
  }

  ngAfterViewInit() {
    this.layuiform();
  }

  layuiform() {
    var name = this.userinfo.getName(); // zh name
    var content = JSON.parse(this.content); // 'true': 表示edit 'false':表示add
    var that = this;
    layui.use(["form", "layer"], function () {
      var form = layui.form;
      var layer = layui.layer;
      form.render(); // 刷新all
      form.render("select"); // 刷新select
      form.render("checkbox"); // 刷新checkbox
      form.render();
      // 验证 表单
      form.verify({
        deviceno: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Temperature["special_sql"]["special_sql"];
          var special_str = Temperature["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "传感器序列号不能有特殊字符！";
          }
          if (!new RegExp(Temperature["deviceno"]).test(value)) {
            if (value.length > 50) {
              return "传感器序列号最大长度不超过50！";
            }
            return "传感器序列号不能有中文！";
          }
        },
        room: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Temperature["special_sql"]["special_sql"];
          var special_str = Temperature["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "房间号不能有特殊字符！";
          }
          if (!new RegExp(Temperature["room"]).test(value)) {
            if (value.length > 50) {
              return "房间号最大长度不超过50！";
            }
            return "房间号不能有中文！";
          }
        },
      });

      // 判断是 新增还是编辑
      if (content) {
        // true: 表示edit
        // 表单初始化
        var formdatar = that.rowData[0];
        formdatar["groups"] = formdatar["groupsid"];
        form.val("device", formdatar);

        // 修改选择项
        setTimeout(() => {
          $('select[name="groups"]').val(formdatar["groupsid"]);
        }, 100);
        form.render("select");
      } else {
        // false: 表示add
        form.val("device", { groups: that.groups[0]["groupid"] });
      }

      // 监听表单的提交
      form.on("submit(gpsdevice)", function (data) {
        var formdata: FormData = {
          deviceno: "", //  传感器序列号
          room: "", // 存放地点
          createdby: name, // 创建人
          lastupdatedby: name, // 更新人
          active: 0, // 是否启用
          groups: "", // 科室
          groupsid: "", // 科室ID
        };
        // layer.alert(JSON.stringify(data.field), {
        //   title: "得到的编辑表单的数据",
        // });
        // 将表单的数据赋值个默认的数据，
        formdata.deviceno = data.field.deviceno;
        formdata.room = data.field.room;

        if (data.field.active != undefined) {
          formdata.active = Number(data.field.active);
        }

        // 判断是 新增还是编辑
        if (content) {
          // true: 表示edit
          formdata.id = that.rowData[0]["id"];
          formdata.groups = that.get_group(data.field.groups);
          formdata.groupsid = data.field.groups;
          // console.error("edit监听表单的提交", formdata);
          that.update_update(formdata);
        } else {
          // false: 表示add
          // console.error("add监听表单的提交", formdata);
          formdata.groups = that.get_group(data.field.groups);
          formdata.groupsid = data.field.groups;
          that.update_install([formdata]);
        }

        return false;
      });
    });
  }

  // 请求数据 新增
  update_install(data: FormData[]) {
    this.http.callRPC(this.TABLE, this.METHOD, data).subscribe((result) => {
      const res = result["result"]["message"][0];
      if (res["code"]) {
        this.dialogRef.close(true);
        this.addsuccess();
        this.RecordOperation("新增环境监测模块", 1, JSON.stringify(data));
      } else {
        this.dialogRef.close(false);
        this.adddanger();
        this.RecordOperation("新增环境监测模块", 0, JSON.stringify(data));
      }
    });
  }
  // 请求数据 修改
  update_update(data: FormData) {
    this.http.callRPC(this.TABLE, this.METHOD2, data).subscribe((result) => {
      // console.log("更新举升机设备数据：", result);
      const res = result["result"]["message"][0];
      if (res["code"]) {
        this.dialogRef.close(true);
        this.editsuccess();
        this.RecordOperation("编辑环境监测模块", 1, JSON.stringify(data));
      } else {
        this.dialogRef.close(false);
        this.editdanger();
        this.RecordOperation("编辑环境监测模块", 0, JSON.stringify(data));
      }
    });
  }

  addsuccess() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "添加成功!",
    });
  }
  adddanger() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "添加失败!",
    });
  }
  editsuccess() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "编辑成功!",
    });
  }
  editdanger() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "编辑失败!",
    });
  }

  // get groups
  get_groups() {
    var groups = JSON.parse(localStorage.getItem("Device_Groups"));
    this.groups = groups;
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }

  // 取消
  cancel() {
    this.dialogRef.close(false);
  }

  // 根据groups 如 '78' 得到 对应名称  "验证中心-系统试验部-新能源与电子电气试验室"
  get_group(groupid): string {
    var group: string;
    this.groups.forEach((item) => {
      if (item["groupid"] == groupid) {
        group = item["group"];
        return;
      }
    });
    return group;
  }

  // option_record
  RecordOperation(option, result, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}

// 导入需要的数据
interface FormData {
  deviceno: string; // 传感器序列号
  room: string; // 存放地点
  createdby: string; // 创建人
  lastupdatedby: string; // 更新人
  active: Number; // 是否启用
  id?: number; // ID
  groups: string; // 科室
  groupsid: string; // 科室id
}
