import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";
declare let layui;

declare let $;

import { Device } from "../form_verification";
@Component({
  selector: "ngx-add-edit-gps",
  templateUrl: "./add-edit-gps.component.html",
  styleUrls: ["./add-edit-gps.component.scss"],
})
export class AddEditGpsComponent implements OnInit {
  @Input() title: string;
  @Input() content: string; // 'true': 表示edit 'false':表示add
  @Input() rowData: any[];
  // 加载
  loading;

  TABLE = "positioning_monitoring";
  METHOD = "dev_insert_positioning_monitoring_list";

  METHOD2 = "dev_update_positioning_monitoring";

  constructor(
    private dialogRef: NbDialogRef<AddEditGpsComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService
  ) {}

  ngOnInit(): void {}
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

      // 验证 表单
      form.verify({
        deviceid: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "设备ID不能有特殊字符！";
          }
          if (new RegExp(Device["deviceid"]).test(value)) {
            if (value.length > 50) {
              return "设备ID最大长度不超过50！";
            }
            return "设备ID不能有中文！";
          }
        },
        devicename: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];
          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "设备名称不能有特殊字符！";
          }
          if (value.length > 50) {
            return "设备名称最大长度不超过50！";
          }
        },
        imei: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "IMEI号不能有特殊字符！";
          }
          if (!new RegExp(Device["imei"]).test(value)) {
            if (value.length > 50) {
              return "IMEI号最大长度不超过50！";
            }
            return "IMEI号只能为数字！";
          }
          if (value.length != 15) {
            return "IMEI号必须是15个数字！";
          }
        },
        sim: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "SIM号不能有特殊字符！";
          }
          if (!new RegExp(Device["sim"]).test(value)) {
            if (value.length > 50) {
              return "SIM号最大长度不超过50！";
            }
            return "SIM号只能为数字！";
          }
          if (value.length != 13) {
            return "SIM号必须是13个数字！";
          }
        },
        belonged: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "负责人不能有特殊字符！";
          }
          if (value.length > 50) {
            return "负责人最大长度不超过50！";
          }
        },
        location: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "存放地点不能有特殊字符！";
          }
          if (value.length > 50) {
            return "存放地点最大长度不超过50！";
          }
        },
        // createdby: function (value, item) {
        //   // sql注入和特殊字符 special_str
        //   var special_sql = Device["special_sql"]["special_sql"];
        //   var special_str = Device["special_sql"]["special_str"];

        //   var sql = special_sql.test(value);
        //   var str = special_str.test(value);
        //   if (sql) {
        //     return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
        //   }
        //   if (!str) {
        //     return "创建人不能有特殊字符！";
        //   }
        //   if (value.length > 50) {
        //     return "创建人最大长度不超过50！";
        //   }
        // },
      });

      // 判断是 新增还是编辑
      if (content) {
        // true: 表示edit
        // 表单初始化
        form.val("device", that.rowData[0]);
      } else {
        // false: 表示add
      }

      // 监听表单的提交
      form.on("submit(gpsdevice)", function (data) {
        var formdata: FormData = {
          deviceid: "", //  设备ID
          devicename: "", // 设备名称
          imei: "", // IMEI号
          sim: "", // SIM号
          belonged: "", // 负责人
          location: "", // 存放地点
          createdby: name, // 创建人
          lastupdatedby: name, // 更新人
          active: 0, // 是否启用
          isfavor: 0, // 是否关注
        };
        // layer.alert(JSON.stringify(data.field), {
        //   title: "得到的编辑表单的数据",
        // });
        // 将表单的数据赋值个默认的数据，
        formdata.deviceid = data.field.deviceid;
        formdata.devicename = data.field.devicename;
        formdata.imei = data.field.imei;
        formdata.sim = data.field.sim;
        formdata.belonged = data.field.belonged;
        formdata.location = data.field.location;

        if (data.field.active != undefined) {
          formdata.active = Number(data.field.active);
        }
        if (data.field.isfavor != undefined) {
          formdata.isfavor = Number(data.field.isfavor);
        }
        // console.error("监听表单的提交", formdata);

        // 判断是 新增还是编辑
        if (content) {
          // true: 表示edit
          formdata.id = that.rowData[0]["id"];
          that.update_update(formdata);
        } else {
          // false: 表示add
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
        this.RecordOperation("新增设备", 1, JSON.stringify(data));
      } else {
        this.dialogRef.close(false);
        this.adddanger();
        this.RecordOperation("新增设备", 0, JSON.stringify(data));
      }
    });
  }
  // 请求数据 修改
  update_update(data: FormData) {
    this.http.callRPC(this.TABLE, this.METHOD2, data).subscribe((result) => {
      console.log("更新设备数据：", result);
      const res = result["result"]["message"][0];
      if (res["code"]) {
        this.dialogRef.close(true);
        this.editsuccess();
        this.RecordOperation("编辑设备", 1, JSON.stringify(data));
      } else {
        this.dialogRef.close(false);
        this.editdanger();
        this.RecordOperation("编辑设备", 0, JSON.stringify(data));
      }
    });
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }

  // 取消
  cancel() {
    this.dialogRef.close(false);
  }
  // 展示状态
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
// 表单数据的格式
interface FormData {
  deviceid: string; // 设备id
  devicename: string; // 设备名称
  imei: string; // IMEI号
  sim: string; // SIM号
  belonged: string; // 负责人
  location: string; // 存放地点
  createdby: string; // 创建人
  lastupdatedby: string; // 更新人
  active: Number; // 是否启用
  isfavor: Number; // 是否关注
  id?: number; // ID
}
