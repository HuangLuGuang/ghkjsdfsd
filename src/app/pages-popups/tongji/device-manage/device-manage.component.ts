import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";

// 验证表单
import { Device } from "../form_verification";

declare let layui;

declare let $;

@Component({
  selector: "ngx-device-manage",
  templateUrl: "./device-manage.component.html",
  styleUrls: ["./device-manage.component.scss"],
})
export class DeviceManageComponent implements OnInit {
  @Input() title: string;
  @Input() content: string; // 'true': 表示edit 'false':表示add
  @Input() rowData: string;
  // 加载
  loading;
  constructor(
    private dialogRef: NbDialogRef<DeviceManageComponent>,
    private http: HttpserviceService,
    private publicservice: PublicmethodService,
    private userinfo: UserInfoService
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
        // console.log("sys_get_groups_limit------------------------>>>", res);
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

  // 科室/用户组
  groups = [];

  // 设备ABC分类
  linklevels = [
    { id: "A", linklevel: "A" },
    { id: "B", linklevel: "B" },
    { id: "C", linklevel: "C" },
  ];

  // 域账号
  // loginname = this.userinfo.getLoginName();
  loginname = this.userinfo.getName();
  employeeid = this.userinfo.getEmployeeID();

  ngAfterViewInit() {
    // console.log("编辑----添加",this.rowData)
    // console.log("编辑----添加  content---",this.content)

    // form 表单
    setTimeout(() => {
      this.layuiform();
    }, 200);
  }

  ngOnDestroy() {
    $("#groups").remove();
  }

  // get groups
  get_groups() {
    var groups = JSON.parse(localStorage.getItem("Device_Groups"));
    this.groups = groups;
  }
  // form表单
  layuiform() {
    var content = JSON.parse(this.content); // 'true': 表示edit 'false':表示add
    var rowData = this.rowData;
    var http = this.http;
    var dialogRef = this.dialogRef;
    var publicservice = this.publicservice;
    var editsuccess = this.editsuccess;
    var editdanger = this.editdanger;
    var addsuccess = this.addsuccess;
    var adddanger = this.adddanger;

    var that = this;
    layui.use(["layer", "form", "layedit", "laydate"], function () {
      var layer = layui.layer;
      var form = layui.form;
      var laydate = layui.laydate; // 时间日期
      form.render(); // 刷新all
      form.render("select"); // 刷新select
      form.render("checkbox"); // 刷新checkbox
      form.render();
      //自定义验证规则
      // 验证 表单
      form.verify({
        // 设备编号 验证：deviceno character(50)
        deviceno: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "设备编号不能有特殊字符！";
          }
          if (new RegExp(Device["deviceno"]).test(value)) {
            if (value.length > 50) {
              return "设备编号最大长度不超过50！";
            }
            return "设备编号不能有中文！";
          }
        },

        // 设备名称 验证：devicename character(50)
        devicename: function (value, item) {
          // console.log("验证、表单: devicename",Device["devicename"]);
          // console.log("验证、表单: value",value);
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

        // 设备类型 type character(50)
        type: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "设备类型不能有特殊字符！";
          }

          if (value.length > 50) {
            return "设备类型最大长度不超过50！";
          }
        },

        // 设备ID deviceid character(50)
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
          if (value.length > 50) {
            return "设备ID最大长度不超过50！";
          }
          // 不为中文！
          if (new RegExp(Device["deviceid"]).test(value)) {
            return "设备ID不能为中文";
          }
        },

        // 存放地点 验证：location character(50)
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

        // 科室 验证：groups character(50)
        groups: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "科室不能有特殊字符！";
          }
          if (value.length > 50) {
            return "科室最大长度不超过50！";
          }
        },

        // 归属人 验证：belonged character(50)
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
            return "归属人不能有特殊字符！";
          }
          if (value.length > 50) {
            return "归属人最大长度不超过50！";
          }
        },

        // 供应商 验证：supplier character(50)
        supplier: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "供应商不能有特殊字符！";
          }
          if (value.length > 200) {
            return "供应商最大长度不超过200！";
          }
        },

        // 设备ABC分类 验证：linklevel character(50)
        linklevel: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "设备ABC分类不能有特殊字符！";
          }

          if (!new RegExp(Device["linklevel"]).test(value)) {
            return "设备ABC分类是A,B,C";
          }
        },

        // 设备统计归类 验证：devicetype character(50)
        devicetype: function (value, item) {
          // sql注入和特殊字符 special_str
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);
          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "设备统计归类不能有特殊字符！";
          }
          if (value.length > 4) {
            return "设备统计归类最大长度不超过4！";
          }
        },
      });

      // form.render("checkbox"); // 刷新checkbox

      // 是编辑还是新增
      var success;
      var danger;
      var method;
      if (content) {
        // true: 表示edit
        // console.log("---------------------------------表示edit---------------------------------------------")
        success = editsuccess;
        danger = editdanger;

        // 注意这里有2个，1[{}],2{}
        // var formdatar = JSON.parse(rowData).length != 1? JSON.parse(rowData): JSON.parse(rowData)[0];
        var formdatar = JSON.parse(rowData)[0];

        // 科室/功能组的赋值，名称对应的id！
        formdatar["groups"] = formdatar["groupsid"];
        // formdatar["groups"] = formdatar["group"]
        // 初始化表单

        // 修改选择项
        setTimeout(() => {
          form.val("device", formdatar);
          $('select[name="groups"]').val(formdatar["groupsid"]);
          form.render("select");
        }, 200);
        form.render("select");

        // 初始化createdon（创建时间）、purchaseon (购置日期)

        var createdon = formdatar["createdon"];
        var purchaseon = formdatar["purchaseon"];
        method = "dev_update_device";
      } else {
        // false: 表示add
        // form.val("device", {groups: JSON.parse(localStorage.getItem("Device_Groups")),devicetype: "1"})
        var groups = JSON.parse(localStorage.getItem("Device_Groups"));
        form.val("device", { groups: groups[0]["groupid"], devicetype: "1" });

        method = "dev_insert_device";
        success = addsuccess;
        danger = adddanger;
      }

      //日期时间选择器
      laydate.render({
        elem: "#createdon",
        type: "datetime",
        // 初始化
        value: createdon,
        isInitValue: true,
      });
      laydate.render({
        elem: "#purchaseon",
        type: "datetime",
        // 初始化
        value: purchaseon,
        isInitValue: true,
      });

      //监听提交
      form.on("submit(device)", function (data) {
        // layer.msg(JSON.stringify(data.field));
        if (content) {
          // 表示编辑
          data.field.id = JSON.parse(rowData)[0].id;
          // data.field.deviceid = JSON.parse(rowData)[0].deviceid;
          // 指定科室/功能组！
          var group = "";
          var groupid = 0;
          that.groups.forEach((item) => {
            if (Number(data.field["groups"]) === item["groupid"]) {
              groupid = item["groupid"];
              group = item["group"];
            }
          });
          data.field["group"] = group;
          data.field["groupid"] = groupid;
        } else {
          // 表示添加
          // 添加 设备，需要 添加字段，group：科室/功能组， groupid： 科室/功能组 id
          var group = "";
          var groupid = 0;
          that.groups.forEach((item) => {
            if (Number(data.field["groups"]) === item["groupid"]) {
              groupid = item["groupid"];
              group = item["group"];
            }
          });
          data.field["group"] = group;
          data.field["groupid"] = groupid;
        }
        // layer.alert(JSON.stringify(data.field), {
        //   title: '得到的编辑表单的数据'
        // })
        if (data.field["active"] != undefined) {
          data.field["active"] = 1;
        } else {
          data.field["active"] = 0;
        }
        // 是否纳入kpi计算
        if (data.field["iscalkpi"] != undefined) {
          data.field["iscalkpi"] = 1;
        } else {
          data.field["iscalkpi"] = 0;
        }
        if (data.field["type"] != undefined) {
          data.field["type"] = Number(data.field["type"]);
        }

        var colums = data.field;
        // 创建人
        colums["createdby"] = that.loginname;
        // 更新人
        colums["lastupdatedby"] = that.loginname;

        // 当前年份 year
        colums["year"] = that.get_year();

        const table = "device";
        $(".submit_device").attr("disabled", "disabled");
        http.callRPC(table, method, colums).subscribe((result) => {
          // console.log("更新设备数据：", result)
          const status = result["result"]["message"][0]["code"];
          if (status === 1) {
            success(publicservice);
            if (content) {
              that.RecordOperation(
                "编辑eim台账",
                1,
                "deviceno:" +
                  colums["deviceno"] +
                  "," +
                  "assetno:" +
                  colums["assetno"]
              );
            } else {
              that.RecordOperation(
                "新增eim台账",
                1,
                "deviceno:" +
                  colums["deviceno"] +
                  "," +
                  "assetno:" +
                  colums["assetno"]
              );
            }
            dialogRef.close(true);
          } else {
            if (content) {
              that.RecordOperation(
                "编辑eim台账",
                0,
                "deviceno:" +
                  colums["deviceno"] +
                  "," +
                  "assetno:" +
                  colums["assetno"]
              );
            } else {
              that.RecordOperation(
                "新增eim台账",
                0,
                "deviceno:" +
                  colums["deviceno"] +
                  "," +
                  "assetno:" +
                  colums["assetno"]
              );
            }
            dialogRef.close(false);
            danger(publicservice);
          }
          $(".submit_device").removeAttr("disabled");
        });
        return false;
      });
    });
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    $("#groups").remove();
    this.dialogRef.close(false);
  }

  // 取消
  cancel() {
    $("#groups").remove();
    this.dialogRef.close(false);
  }

  // 得到当前年份
  get_year() {
    var date = new Date();
    var year = date.getFullYear();
    return year;
  }

  // 展示状态
  editsuccess(publicservice) {
    publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "编辑成功!",
    });
  }
  editdanger(publicservice) {
    publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "编辑失败!",
    });
  }

  addsuccess(publicservice) {
    publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "添加成功!",
    });
  }
  adddanger(publicservice) {
    publicservice.showngxtoastr({
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
