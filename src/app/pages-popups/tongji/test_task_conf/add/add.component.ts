import { Component, OnInit, ViewChild } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

declare let $;
declare let layui;

import { Tesk_Info } from "../../form_verification";

@Component({
  selector: "ngx-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  @ViewChild("groups_devices") groups_devices: any; // 当前主设备信息！

  // 试验编号是否重复！ false: 不重复， true： 重复
  is_taskchildnum = false;

  constructor(
    private dialogRef: NbDialogRef<AddComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicmethod: PublicmethodService
  ) {}

  // 样件信息 列表
  explarinfo_list = [];
  // 预览的数据
  previewinfodata: PreviewInfo = {
    tasknum: "", //试验任务编号
    exemplarnumbers: "", //样件编号
    exemplarchildnumbers: "", // 样件三级编号
    exemplarname: "", // 样件名称
    taskitemnumbers: "", // 试验条目编号

    taskchildnum: "", // 试验编号  = 试验任务编号+试验条目编号 tasknum + taskitemnumbers
    devicenum: "", // 设备编号
    devicetaskname: "", // 试验名称
    devicename: "", // 设备名称
    executor: "", // 执行人
    // exemplarinfo = exemplarnumbers + taskitemnumbers + exemplarchildnumbers + exemplarname
    taskmessage: [], // 样件信息 = 样件编号+试验条目编号+样件三级编号+样件名称
  };
  // info
  info;
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.layuiform();
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }
  // 取消
  cancel() {
    this.dialogRef.close(false);
  }

  // 表单 form
  layuiform() {
    var tesk_info = Tesk_Info;
    var that = this;

    layui.use("form", function () {
      var form = layui.form;

      // 验证表单
      form.verify({
        // 试验任务编号
        tasknum: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "试验任务编号");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式是否匹配
          if (!new RegExp(tesk_info.tasknum).test(value)) {
            return "试验任务编号格式不符：WTxxxx-yyyymm";
          }
        },
        // 样件编号 exemplarnumbers
        exemplarnumbers: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "样件编号");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式是否匹配
          if (!new RegExp(tesk_info.exemplarnumbers).test(value)) {
            return "样件编号格式不符：YPxxxx-yyyymm";
          }
          // 样件编号和试验任务编号的数字是一样的
          var tasknum = $("input[name='tasknum']").val().split("WT")[1];
          var exemplarnumbers = value.split("YP")[1];
          if (tasknum === exemplarnumbers && tasknum) {
          } else {
            return "样件编号数字部分和试验任务编号数字部分不一致！";
          }
        },

        // 试验条目编号 taskitemnumbers
        taskitemnumbers: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "试验条目编号");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式是否匹配
          if (!new RegExp(tesk_info.taskitemnumbers).test(value)) {
            return "试验条目编号格式不符：xxx";
          }
          // 长度
          if (value.length !== 3) {
            return "试验条目编号必须是3个数字：xxx";
          }
        },

        // 试验名称 devicetaskname
        devicetaskname(value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "试验名称");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式是否匹配
        },

        // 试验执行人 executor
        executor(value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "试验执行人");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式是否匹配
          if (!new RegExp(tesk_info.executor).test(value)) {
            return "试验执行人格式不符：不包含数字";
          }
        },

        // 样件三级编号 exemplarchildnumbers
        exemplarchildnumbers(value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "样件三级编号");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式是否匹配
          if (!new RegExp(tesk_info.exemplarchildnumbers).test(value)) {
            return "样件三级编号格式不符：xxx";
          }
          // 长度
          if (value.length !== 3) {
            return "样件三级编号必须是3个数字：xxx";
          }
        },

        // 样件名称 exemplarname
        exemplarname(value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "样件名称");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
        },
      });
      //监听提交
      form.on("submit(add)", function (data) {
        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
        // 得到当前主设备信息！
        var groups_devices_datas = that.groups_devices.get_form_val();
        // console.log("得到form的值 devicename", groups_devices_datas)
        data.field["devicename"] = groups_devices_datas.devicename;
        data.field["devicenum"] = groups_devices_datas.deviceid;
        // 根据试验编号去 判断是否唯一约束 info["taskchildnum"] = info.tasknum + "-" + info.taskitemnumbers
        var exemplarnumbers = data.field.exemplarnumbers.replace("YP", "SY");
        var info_taskchildnum =
          exemplarnumbers + "-" + data.field.taskitemnumbers;
        // var info_taskchildnum = data.field.exemplarnumbers + "-" + data.field.taskitemnumbers;
        var table = "device";
        var method = "get_task_checkout";
        var colums = {
          taskchildnum: info_taskchildnum,
        };
        that.http.callRPC(table, method, colums).subscribe((result) => {
          var res = result["result"]["message"][0];
          if (res["code"] === 1) {
            that.is_taskchildnum = false;
          } else {
            that.is_taskchildnum = true; //重复
            that.not_null(res["message"] + ":" + info_taskchildnum);
          }
        });

        that.previewinfo(data.field);
        return false;
      });
      // 确定 confirm
      form.on("submit(confirm)", function (data) {
        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
        // 得到当前主设备信息！
        var groups_devices_datas = that.groups_devices.get_form_val();

        // 得到预览的数据
        var previewinfodata = that.previewinfodata;
        // console.log("previewinfodata----->",previewinfodata);

        // 要保存的数据！
        var save_data = {};
        save_data["tasknum"] = previewinfodata.tasknum;
        save_data["exemplarnumbers"] = previewinfodata.exemplarnumbers;
        save_data["exemplarchildnumbers"] =
          previewinfodata.exemplarchildnumbers;
        save_data["exemplarname"] = previewinfodata.exemplarname;
        save_data["taskitemnumbers"] = previewinfodata.taskitemnumbers;
        save_data["taskchildnum"] = previewinfodata.taskchildnum;
        save_data["devicenum"] = previewinfodata.devicenum;
        save_data["executor"] = previewinfodata.executor;
        save_data["deviceid"] = groups_devices_datas.deviceno;
        save_data["deviceno"] = groups_devices_datas.deviceid;
        save_data["devicename"] = groups_devices_datas.devicename;
        save_data["devicetaskname"] = previewinfodata.devicetaskname;
        // 添加创建人getLoginName();
        save_data["createdby"] = that.userinfo.getName();
        save_data["taskmessage"] = previewinfodata["taskmessage"].join(",");

        // console.error("要保存的数据！>>>", save_data);
        // console.error("要保存的数据！is_taskchildnum>>>", that.is_taskchildnum);
        if (that.is_taskchildnum) {
          // 重复
          that.not_null("该试验编号已存在!");
        } else {
          if (save_data["tasknum"] !== "") {
            var table = "device";
            var monthed = "dev_insert_task";
            var conlumns = save_data;
            $(".submit_confirm").attr("disabled", "disabled");
            that.http.callRPC(table, monthed, conlumns).subscribe((result) => {
              var res = result["result"]["message"][0];
              if (res["code"] === 1) {
                // 保存成功
                that.dialogRef.close(true);
                that.RecordOperation(
                  "新增",
                  1,
                  "试验任务配置：" + JSON.stringify(conlumns)
                );
                that.success();
              } else {
                // 保存失败
                that.dialogRef.close(false);
                that.RecordOperation(
                  "新增",
                  0,
                  "试验任务配置:" + JSON.stringify(conlumns)
                );
                that.danger(JSON.stringify(res["message"]));
              }
              $(".submit_confirm").removeAttr("disabled");
            });
          } else {
            that.not_null("试验信息必填!");
            $(".submit_confirm").removeAttr("disabled");
          }
        }
        return false;
      });
    });
  }

  // 弹出提示，不为空！
  not_null(data) {
    layui.use("layer", function () {
      var layer = layui.layer;
      layer.open({
        title: [
          "提示",
          "padding: 1rem 1.5rem;border-bottom: 1px solid #edf1f7;border-top-left-radius: 0.25rem;border-top-right-radius: 0.25rem;color: #222b45;font-family: Open Sans, sans-serif;font-size: 0.9375rem;font-weight: 600;line-height: 0.5rem;background: #fff;",
        ],
        id: "LAY_layuipro", //设定一个id，防止重复弹出
        btn: ["关闭"],
        btnAlign: "r",
        moveType: 1, //拖拽模式，0或者1
        content: data,
        yes: function () {
          layer.closeAll();
        },
      });
    });
  }

  // 预览info
  previewinfo(info) {
    // 预览的数据
    // console.log("预览info: ", info);
    this.explarinfo_list.push(
      info.exemplarnumbers +
        "-" +
        info.taskitemnumbers +
        "-" +
        info.exemplarchildnumbers +
        " " +
        info.exemplarname
    );
    var exemplarnumbers = info.exemplarnumbers.replace("YP", "SY");
    var previewinfodata: PreviewInfo = {
      tasknum: info.tasknum, //试验任务编号
      exemplarnumbers: info.exemplarnumbers, //样件编号
      exemplarchildnumbers: info.exemplarchildnumbers, // 样件三级编号
      exemplarname: info.exemplarname, // 样件名称
      taskitemnumbers: info.taskitemnumbers, // 试验条目编号
      taskchildnum: exemplarnumbers + "-" + info.taskitemnumbers, // 试验编号
      devicenum: info.devicenum, // 设备编号
      devicetaskname: info.devicetaskname,
      devicename: info.devicename, // 从 当前设备信息中得到的
      executor: info.executor,
      taskmessage: this.explarinfo_list,
    };

    this.previewinfodata = previewinfodata;
    // console.log("最终预览的数据：", this.previewinfodata);
    // 清空 样件三级编号、样件名称！
    $("input[name='exemplarchildnumbers']").val("");
    $("input[name='exemplarname']").val("");
  }

  // 删除
  success() {
    this.publicmethod.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "新增成功!",
    });
  }
  danger(data) {
    this.publicmethod.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "新增失败" + data,
    });
  }

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title) {
    var special_sql = Tesk_Info["special_sql"]["special_sql"];
    var special_str = Tesk_Info["special_sql"]["special_str"];
    var sql = special_sql.test(data);
    var str = special_str.test(data);
    if (sql) {
      return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
    }
    if (!str) {
      return title + "不能有特殊字符！";
    }
    return 1;
  }

  // option_record
  RecordOperation(option, result, infodata) {
    // option:操作类型, result:操作的结果, infodata:附加信息!
    // console.warn("==============>", this.userinfo.getLoginName())
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicmethod.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}

interface PreviewInfo {
  tasknum: string; //试验任务编号
  exemplarnumbers: string; //样件编号
  exemplarchildnumbers: string; // 样件三级编号
  exemplarname: string; // 样件名称
  taskitemnumbers: string; // 试验条目编号

  taskchildnum: string; // 试验编号  = 试验任务编号+试验条目编号 tasknum + taskitemnumbers
  devicenum: string; // 设备编号
  devicetaskname: string; // 试验名称
  devicename: string; // 设备名称
  executor: string; // 执行人
  // exemplarinfo = exemplarnumbers + taskitemnumbers + exemplarchildnumbers + exemplarname
  taskmessage: string[]; // 样件信息 = 样件编号+试验条目编号+样件三级编号+样件名称
}
