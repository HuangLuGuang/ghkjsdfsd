import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";

import { VideoIntegration } from "../form_verification";

declare let $;
declare let layui;

@Component({
  selector: "ngx-add-edit-video-integration",
  templateUrl: "./add-edit-video-integration.component.html",
  styleUrls: ["./add-edit-video-integration.component.scss"],
})
export class AddEditVideoIntegrationComponent implements OnInit {
  @Input() title: string;
  @Input() content: boolean; // true: 表示edit false:表示add
  @Input() rowData: any[];
  // 加载
  loading;
  constructor(
    private dialogRef: NbDialogRef<AddEditVideoIntegrationComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService
  ) {}

  TABLE = "video_integration";
  UMETHOD = "update_video_integration";
  IMETHOD = "insert_video_integration";

  groups;

  listengroups = false; // 是否点击监听，默认没有点击

  // pc_device_status_get 选择功能组得到设备编号，设备名称等信息！
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.layuiform();
  }

  layuiform() {
    var that = this;
    layui.use(["form", "layer"], function () {
      var form = layui.form;
      var layer = layui.layer;
      form.render(); // 刷新all
      form.render("select"); // 刷新select
      form.render("checkbox"); // 刷新checkbox

      that.init_groups(form);

      // 判断是 新增还是编辑
      if (that.content) {
        // true: 表示edit
        // 表单初始化
        var rowData = Object.assign({}, that.rowData[0]);
        rowData["videoservicestatus"] =
          that.rowData[0]["videoservicestatus"] === "1" ? true : false;
        form.val("device", rowData);
        // form.val("device", that.rowData[0]);
      } else {
        // false: 表示add
      }

      // 表单验证
      form.verify({
        // 科室设备ID
        deviceid: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "设备ID");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          if (value == "") {
            return "设备ID不能为空";
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.deviceid).test(value)) {
            return "设备ID 格式不对";
          }
        },
        // 摄像头IP
        cameraip: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "摄像头IP");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.cameraip).test(value)) {
            return "摄像头IP 格式不对";
          }
        },
        // 负责区域 territory
        territory: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "负责区域");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.territory).test(value)) {
            return "负责区域 格式不对";
          }
        },
        // 摄像头唯一标识符 cameraindexcode
        cameraindexcode: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "摄像头唯一标识符");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 是32 位的
          if (value.length !== 32) {
            return "摄像头唯一标识符,长度必须是32位";
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.cameraindexcode).test(value)) {
            return "摄像头唯一标识符 格式不对";
          }
        },
        // 描述 description
        description: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "描述");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.description).test(value)) {
            return "描述 格式不对";
          }
        },
        // IP地址 description
        ipaddress: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "IP地址");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.ipaddress).test(value)) {
            return "IP地址 格式不对";
          }
        },
        // 摄像头名称  cameraname
        cameraname: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "摄像头名称");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.cameraname).test(value)) {
            return "摄像头名称 格式不对";
          }
        },
      });

      // 监听选择的功能组
      form.on("select(group)", function (data) {
        that.listengroups = true;
        // console.error("监听功能组==data>>>>", data);
        if (data.value !== "") {
          that.init_devicename_deviceno(data.value, form);
        }
      });

      // 监听选择的设备名称
      form.on("select(devicename)", function (data) {
        console.log("监听选择 设备名称：", data); //得到被选中的值,即为 group 的id
        that.update_deviceid(data.value);
      });

      // 提交表单
      form.on("submit(gpsvideo)", function (data) {
        // layer.alert(JSON.stringify(data.field), {
        //   title: "得到的编辑表单的数据",
        // });
        var videoservicestatus = "0";

        var savedata = Object.assign({}, data.field);
        if (savedata.hasOwnProperty("videoservicestatus")) {
          videoservicestatus = savedata["videoservicestatus"];
        }
        savedata["videoservicestatus"] = videoservicestatus;
        // console.error("======?savedata", savedata);

        if (that.content) {
          savedata["id"] = that.rowData[0].id;
          savedata["lastupdateon"] = that.userinfo.getName();
          that.updata(savedata);
          // layer.alert(JSON.stringify(savedata), {
          //   title: "编辑数据",
          // });
        } else {
          savedata["createdby"] = that.userinfo.getName();
          // layer.alert(JSON.stringify(savedata), {
          //   title: "新增数据",
          // });
          that.insert(savedata);
        }
      });
    });
  }

  // 初始化科室、功能组
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
        var option = `<option value="">请选择功能组</option>`;
        groups.forEach((element) => {
          option += `<option  value ="${element.id}">${element.label}</option>`;
          $("#group").html(option);
        });
        form.render();

        if (this.rowData.length !== 0) {
          // console.error("groups>>>>", groups);
          // console.error("this.rowData>>>>", this.rowData);
          var gid = this.rowData[0]["gid"];
          // console.error("gid>>>>>>>>>>", gid);
          var options = (<HTMLSelectElement>document.getElementById("group"))
            .options;
          // console.error("options>>>>>>>>>>", options);
          groups.forEach((group, index) => {
            if (group["id"] === gid) {
              options.selectedIndex = index + 1;
            }
          });
          form.render();
          this.init_devicename_deviceno(gid, form);
        }
      }
    });
  }

  // 初始化设备名称
  init_devicename_deviceno(groupsid, form) {
    var monthed = "dev_get_device_name";
    var columns = {
      groupsid: groupsid,
    };
    this.http.callRPC("device", monthed, columns).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var devicename_deviceno = res["message"];
        // console.error("devicename>>>>", devicename_deviceno);
        var option = "";

        devicename_deviceno.forEach((element, index) => {
          // && this.rowData.length == 0
          if (index === 0 && !this.content) {
            // 添加
            this.update_deviceid(element);
          }
          option += `<option  value ="${element.deviceid}">${element.devicename}</option>`;
        });
        $("#devicename").html(option);
        form.render();

        if (this.rowData.length !== 0) {
          var deviceid = this.rowData[0]["deviceid"];
          var options = (<HTMLSelectElement>(
            document.getElementById("devicename")
          )).options;
          // console.error("devicename>>>>", devicename_deviceno);
          // console.error("this.listengroups >>>>", this.listengroups);
          devicename_deviceno.forEach((devicename, index) => {
            if (devicename["deviceid"] === deviceid) {
              if (this.listengroups) {
              } else {
                options.selectedIndex = index;
              }
            } else {
              if (this.listengroups && index === 0) {
                // console.error("listengroups>>>>", this.listengroups);
                this.update_deviceid(devicename);
              }
            }
          });
          form.render();
        }
      }
    });
  }

  // 更新设备编号
  update_deviceid(element) {
    // console.error("****>element", element);
    if (element.hasOwnProperty("deviceid")) {
      var deviceid = element.deviceid;
      $("input[name='deviceid']").val(deviceid);
    } else {
      $("input[name='deviceid']").val(element);
    }
  }

  // 更新数据
  updata(data) {
    this.http.callRPC(this.TABLE, this.UMETHOD, data).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.dialogRef.close(true);
        this.editsuccess();
        this.RecordOperation("更新", 1, "视频集成服务器管理");
      } else {
        this.editdanger();
        this.RecordOperation("更新", 0, "视频集成服务器管理");
      }
    });
  }
  // 新增数据
  insert(data) {
    this.http.callRPC(this.TABLE, this.IMETHOD, data).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.dialogRef.close(true);
        this.addsuccess();
        this.RecordOperation("新增", 1, "视频集成服务器管理");
      } else {
        this.adddanger();
        this.RecordOperation("新增", 0, "视频集成服务器管理");
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

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title) {
    var special_sql = VideoIntegration["special_sql"]["special_sql"];
    var special_str = VideoIntegration["special_sql"]["special_str"];
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
