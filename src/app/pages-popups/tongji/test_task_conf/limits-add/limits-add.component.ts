import { Component, OnInit, ViewChild, Output } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

import { Tesk_Info } from "../../form_verification";

declare let $;
declare let layui;

@Component({
  selector: "ngx-limits-add",
  templateUrl: "./limits-add.component.html",
  styleUrls: ["./limits-add.component.scss"],
})
export class LimitsAddComponent implements OnInit {
  @Output("res") res: any;
  @ViewChild("groups_devices") groups_devices: any; // 当前主设备信息！

  @ViewChild("limits_groups_devices") limits_groups_devices: any; // limits
  @ViewChild("exemplar_no_name") exemplar_no_name: any; // 样件三级编号-样件名称

  constructor(
    private dialogRef: NbDialogRef<LimitsAddComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicmethod: PublicmethodService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  // 试验编号是否重复！ false: 不重复， true： 重复
  is_taskchildnum = false;

  ngOnInit(): void {
    // 待处理试验编号-处理、编辑按钮传递来的数据！
    // console.error("res>>>>>", this.res);
  }

  ngAfterViewInit() {
    this.get_message();
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }
  // 取消
  cancel() {
    if (this.res["type"] !== "edit") {
      this.dialogRef.close(false);
    }
  }

  TABLE = "get_lims_data";
  METHOD = "get_lims_data";
  // METHOD = "get_lims_data_bak";

  // 编辑
  ETABLE = "get_lims_data_processed";
  EMETHOD = "get_lims_data_processed";

  limitd: LimitD = {
    devicetaskname: "", // 试验名称
    executor: "", // 负责人
    exemplarname: "", // 样件名称
    exemplarno: "", // 样件编号
    exemplarchildnumbers: "", // 样件三级编号
    exemplarnum: "", // 样件数量
    tasknum: "", // 试验任务父编号
    taskstatus: "", // 试验状态
    devicename: "null", // 设备名称
    groups: "null", // 科室
    deviceno: "null", // 设备编号
    deviceid: "", // 设备ID
    exemplarnumbers: "", // 样件编号
    device_name_no: [
      {
        id: "",
        label: "",
        deivce: [{ id: "", label: "", label_deviceno: "" }],
      },
    ], // 设备名称、设备标号
    taskitemnumbers: "", // 试验条目编号
  };

  // 根据传来的res {devicetaskname: "测试三级条目", groups: "测试科22502", tasknum: "WT0003-202101"}  得到 对应的数据

  // 样件信息 列表
  explarinfo_list = [];
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

  get_message() {
    if (this.res["type"] === "handle") {
      // 处理
      this.http
        .callRPC(this.TABLE, this.METHOD, this.res["message"])
        .subscribe((result) => {
          this.analysis_handle_edit(result);
        });
    } else {
      // 编辑
      // console.error("***编辑***this.res", this.res);
      this.http
        .callRPC(this.ETABLE, this.EMETHOD, this.res["message"])
        .subscribe((result) => {
          this.analysis_handle_edit(result);
          // this.edit_check(result);
        });
    }
  }

  // 解析：处理 编辑 按钮 传入的数据，得到科室=设备名称=设备编号---改为查看
  analysis_handle_edit(result) {
    var res = result["result"]["message"][0];
    if (res["code"] === 1) {
      // console.error("get_lims_data++++++++++res>>>>", res);

      var handle_get_message_for_device = this.handle_get_message_for_device(
        res["message"]
      );
      this.limitd.devicetaskname = res["message"][0]["devicetaskname"];
      if (this.res["executors"]) {
        this.limitd.executor = this.res["executors"].join(",");
      } else {
        this.limitd.executor = "";
      }
      this.limitd.exemplarnum = res["message"][0]["exemplarnum"];
      this.limitd.tasknum = res["message"][0]["tasknum"];
      this.limitd.device_name_no = handle_get_message_for_device;
      this.limitd.exemplarnumbers = res["message"][0]["tasknum"].replace(
        "WT",
        "YP"
      );
      this.limitd.exemplarno = res["message"][0]["tasknum"].replace("WT", "YP");
      this.limitd.taskstatus = res["message"][0]["taskstatus"];
      this.limitd.taskitemnumbers = res["message"][0]["numbers"];

      // 样件三级编号 exemplarchildnumbers
      this.limitd.exemplarchildnumbers = res["message"][0]["exemplarno"];

      // console.error("this.limitd>>>>>>>>>>>>>>>>>>>", this.limitd);
      var is_device_name_no = this.limitd.device_name_no[0]["deivce"].filter(
        (item) => {
          if (item["deviceno"] !== null) {
            return item;
          }
        }
      );

      // 样件三级编号-样件名称
      var exemplar_no_name = this.limitd.device_name_no[0]["exemplar_no_name"];
      var handle_exemplar_no_name = this.handle_exemplar_no_name(
        exemplar_no_name
      );

      setTimeout(() => {
        // console.error(
        //   "样件三级编号-样件名称>>>>>>>>>>>",
        //   handle_exemplar_no_name
        // );
        this.exemplar_no_name.init_layuiform(handle_exemplar_no_name);
      }, 500);

      // if (this.limitd.device_name_no[0]["id"] != null) {
      if (is_device_name_no.length > 0) {
        // 科室--设备名称--设备编号的
        setTimeout(() => {
          // console.error(
          //   "科室--设备名称--设备编号的>>>>>>>>>>>",
          //   this.limitd.device_name_no
          // );
          this.limits_groups_devices?.layuiform(this.limitd.device_name_no);
        }, 500);
      } else {
        var groups = res["message"][0]["groups"];
        var table = "get_lims_groups";
        var method = "get_lims_groups";
        this.http
          .callRPC(table, method, { groups: groups })
          .subscribe((result) => {
            var res = result["result"]["message"][0];
            if (res["code"] === 1) {
              var message = res["message"];
              // console.error("device 为Null>>>>>>>>>>>>>>>>>>>>", message);
              var handle_get_message_for_device = this.handle_get_message_for_device(
                message
              );
              // console.error(
              //   "科室--设备名称--设备编号的>>>>>>>>>>>",
              //   handle_get_message_for_device
              // );
              this.limits_groups_devices?.layuiform(
                handle_get_message_for_device
              );
            }
          });
      }
      this.layuiform(this.limitd);

      if (this.res["type"] !== "handle") {
        $(".add").addClass("layui-btn-disabled");
        $(".add").addClass("mouse_forbid");

        $(".submit_cancel").addClass("layui-btn-disabled");
        $(".submit_cancel").addClass("mouse_forbid");

        $(".submit_confirm").addClass("layui-btn-disabled");
        $(".submit_confirm").addClass("mouse_forbid");
        setTimeout(() => {
          this.edit_check(result);
        }, 300);
      }
    }
  }

  // 要的得到 devicename：[]、deviceno: []
  handle_get_message_for_device(res) {
    var res_list = {};
    var device = [];
    var exemplar_no_name = [];
    res.forEach((element) => {
      var item = {};
      item["id"] = element["deviceno"];
      item["label"] = element["deviceno"] + "&" + element["devicename"];
      item["deviceno"] = element["deviceno"];

      device.push(item);

      var exemplar = {};
      exemplar["id"] = element["exemplarno"];
      exemplar["label"] = element["exemplarno"] + "&" + element["exemplarname"];
      exemplar_no_name.push(exemplar);
    });
    res_list["id"] = res[0]["groups"];
    res_list["label"] = res[0]["groups"];
    res_list["deivce"] = this.unique(device, "id");
    res_list["exemplar_no_name"] = exemplar_no_name;
    if (this.res["checked"]) {
      res_list["checkgroupid"] = this.res["checked"]["checkgroupid"];
    } else {
      res_list["checkgroupid"] = [];
    }
    return [res_list];
  }

  // 根据 datas 去重
  unique(arr, field) {
    const map = {};
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      if (!map[arr[i][field]]) {
        map[arr[i][field]] = 1;
        res.push(arr[i]);
      }
    }
    return res;
  }

  // 处理 exemplar_no_name 样件三级编号-样件名称
  handle_exemplar_no_name(datas) {
    // console.error("处理 exemplar_no_name 样件三级编号-样件名称", datas);

    var checkedid = [];
    if (this.res["checked"]) {
      checkedid = this.res["checked"]["checkid"];
    }
    return [
      {
        id: "all",
        label: "全选",
        checkedid: checkedid,
        children: datas,
      },
    ];
  }

  // 当选择 设备时触发
  device_info(data) {
    console.error("当选择 设备时触发>>>>>>>", data);
    // console.error("++++++++++this.limitd>>>>", this.limitd);
    this.limitd.devicename = data["devicename"];
    this.limitd.deviceno = data["deviceno"];
    this.limitd.deviceid = data["deviceno"];
    this.limitd.groups = data["groups"];
  }
  // 初始化表单
  layuiform(data) {
    var tesk_info = Tesk_Info;
    var that = this;
    layui.use("form", function () {
      var form = layui.form;
      var layer = layui.layer;
      // form.render();
      form.val("test_task_info", data);

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
          // if (!new RegExp(tesk_info.executor).test(value)) {
          //   return "试验执行人格式不符：不包含数字";
          // }
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

      if (that.res["type"] !== "edit") {
        //监听提交
        form.on("submit(add)", function (data) {
          // 隐藏下拉框
          that.exemplar_no_name.hide_exemplar_no_name();
          that.explarinfo_list = [];
          // 得到当前主设备信息！
          var get_form_val = that.limits_groups_devices.get_form_val();

          data.field["devicename"] = get_form_val["devicename"];
          data.field["devicenum"] = get_form_val["deviceno"];
          // 得到当前主设备信息！
          data.field.taskchildnum =
            data.field.exemplarno + "-" + data.field.taskitemnumbers;

          // layer.alert(JSON.stringify(data.field), {
          //   title: "最终的提交信息",
          // });

          // console.error("data.field>>>", data.field);
          var data_ = that.limits_groups_devices.get_form_val();
          // console.error("监听提交,Add>>>", data_);
          that.limitd.devicename = data_["devicename"];
          that.limitd.deviceno = data_["deviceno"];
          that.limitd.deviceid = data_["deviceno"];
          that.limitd.groups = data_["groups"];

          // 得到样件三级编号-样件名称
          var exemplar_no_name = that.exemplar_no_name.get_form_val();
          // console.error("监听提交 编号,Add2>>>", exemplar_no_name);

          var exemplarnumbers = data.field.exemplarno.replace("YP", "SY");
          var info_taskchildnum =
            exemplarnumbers + "-" + data.field.taskitemnumbers;

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
              // 清除 当前输入试验信息预览
              that.previewinfodata.taskchildnum = "";
              that.previewinfodata.devicenum = "";
              that.previewinfodata.devicetaskname = "";
              that.previewinfodata.devicename = "";
              that.previewinfodata.executor = "";
              that.explarinfo_list = [];
            }
          });

          that.previewinfo(data.field);
          return false;
        });

        form.on("submit(confirm)", function (data) {
          // layer.alert(JSON.stringify(that.previewinfodata), {
          //   title: "最终的提交信息",
          // });

          // 要保存的数据！
          var save_data = {};
          save_data["tasknum"] = that.previewinfodata.tasknum;
          save_data["exemplarnumbers"] = that.previewinfodata.exemplarnumbers;
          save_data["exemplarchildnumbers"] =
            that.previewinfodata.exemplarchildnumbers;
          save_data["exemplarname"] = that.previewinfodata.exemplarname;
          save_data["taskitemnumbers"] = that.previewinfodata.taskitemnumbers;
          save_data["taskchildnum"] = that.previewinfodata.taskchildnum; // 试验编号
          save_data["devicenum"] = that.previewinfodata.devicenum; // 设备编号
          save_data["executor"] = that.previewinfodata.executor;
          save_data["deviceid"] = that.limitd.deviceno;
          save_data["deviceno"] = that.limitd.deviceid;
          save_data["devicename"] = that.limitd.devicename;
          save_data["devicetaskname"] = that.limitd.devicetaskname;
          save_data["createdby"] = that.userinfo.getName();
          save_data["taskmessage"] = that.previewinfodata["taskmessage"].join(
            ","
          );
          save_data["type"] = that.res["type"];

          // console.error("要保存的数据！>>>", save_data);
          if (that.is_taskchildnum) {
            // 重复
            that.not_null("该试验编号已存在!");
          } else {
            if (save_data["tasknum"] !== "") {
              var table = "device";
              var monthed = "dev_insert_task";
              var conlumns = save_data;
              $(".submit_confirm").attr("disabled", "disabled");
              // console.error(
              //   "=================save_data=============>>>",
              //   save_data
              // );

              // this.res["type"] !== "handle" 表示编辑，不在table中展示！

              that.http
                .callRPC(table, monthed, conlumns)
                .subscribe((result) => {
                  var res = result["result"]["message"][0];
                  if (res["code"] === 1) {
                    // 保存成功
                    that.dialogRef.close(true);
                    that.RecordOperation(
                      "新增",
                      1,
                      "试验任务配置：" + JSON.stringify(conlumns)
                    );
                    // that.success();
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
      }
    });
  }

  // 编辑---改为查看
  edit_check(data) {
    var res = data["result"]["message"][0];
    var handle_get_message_for_device = this.handle_get_message_for_device(
      res["message"]
    );

    var checkgroupid = handle_get_message_for_device[0]["checkgroupid"];
    var device = handle_get_message_for_device[0]["deivce"];
    var devicenames = [];
    checkgroupid.forEach((cid) => {
      device.forEach((d) => {
        if (cid === d["id"]) {
          devicenames.push(d["label"].split("&")[1]);
        }
      });
    });
    // 设备名称  设备编号 去重
    devicenames = Array.from(new Set(devicenames));
    checkgroupid = Array.from(new Set(checkgroupid));

    var taskitemnumbers = $("input[name='taskitemnumbers']").val(); // 试验条目编号
    var exemplarno = $("input[name='exemplarno']").val(); // 样件编号
    var devicetaskname = this.res["message"]["devicetaskname"]; // 试验名称

    var executor = $("input[name='executor']").val(); // 试验执行人
    var taskmessage = this.res["taskmessage"]; // 样件信息

    var taskchildnum = exemplarno.replace("YP", "SY") + "-" + taskitemnumbers;
    // console.error("试验编号", taskchildnum);
    // console.error("设备编号", checkgroupid);
    // console.error("试验名称", devicetaskname);
    // console.error("设备名称", devicenames);
    // console.error("试验执行人", executor);
    // console.error("样件信息", taskmessage);
    this.previewinfodata.taskchildnum = taskchildnum; // 试验编号
    this.previewinfodata.devicenum = checkgroupid.join(","); // 设备编号
    this.previewinfodata.devicetaskname = devicetaskname; // 试验名称
    // this.previewinfodata.devicename = this.unique(devicenames, "name"); // 设备名称
    this.previewinfodata.devicename = devicenames.join(","); // 设备名称
    this.previewinfodata.executor = executor; // 试验执行人

    this.explarinfo_list = taskmessage;
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

  // 预览info
  previewinfo(info) {
    // 预览的数据
    // console.log("预览info: ", info);
    var exemplarchildnumbers = info.exemplar_select_all.split(",");
    var exemplarname = info.exemplar_devicename.split(",");
    for (let index = 0; index < exemplarchildnumbers.length; index++) {
      const no = exemplarchildnumbers[index];
      const name = exemplarname[index];
      this.explarinfo_list.push(
        info.exemplarno + "-" + info.taskitemnumbers + "-" + no + "-" + name
      );
    }

    var exemplarnumbers = info.exemplarno.replace("YP", "SY");
    var previewinfodata: PreviewInfo = {
      tasknum: info.tasknum, //试验任务编号
      exemplarnumbers: info.exemplarno, //样件编号
      exemplarchildnumbers: exemplarchildnumbers, // 样件三级编号
      exemplarname: exemplarname, // 样件名称
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

interface LimitD {
  devicetaskname: String; // 试验名称
  executor: String; // 负责人
  exemplarname: String; // 样件名称
  exemplarno: String; // 样件编号
  exemplarchildnumbers: string; // 样件三级编号
  exemplarnum: String; // 样件数量
  tasknum: String; // 试验任务父编号
  taskstatus: String; // 试验状态
  devicename: String; // 设备名称
  deviceno: String; // 设备编号
  deviceid: String; // 设备ID
  groups: String; // 科功能组
  exemplarnumbers: String; // 样件编号 -
  device_name_no: any[];
  taskitemnumbers: String; // 试验条目编号
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
