import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

declare let $;
declare let layui;

@Component({
  selector: "ngx-task-edit",
  templateUrl: "./task-edit.component.html",
  styleUrls: ["./task-edit.component.scss"],
})
export class TaskEditComponent implements OnInit {
  @Input() rowdata: any;
  @ViewChild("exemplar_no_name") exemplar_no_name: any; // 样件三级编号-样件名称
  constructor(
    private dialogRef: NbDialogRef<TaskEditComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  // 编辑
  ETABLE = "get_lims_data_processed";
  EMETHOD = "get_lims_data_processed";

  createdby = this.userinfo.getName();

  ngOnInit(): void {
    // console.error("修改---试验任务信息>>>", this.rowdata);
  }

  ngAfterViewInit() {
    this.layuiform();

    // 样件三级编号，样件名称！
    this.init_exemplar();
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }
  // 取消
  cancel() {
    this.dialogRef.close(false);
  }

  layuiform() {
    var that = this;
    layui.use(["form"], function () {
      var form = layui.form,
        layer = layui.layer;
      // 初始化--表单
      form.val("edit_task_info", that.rowdata);

      form.on("submit(confirm)", function (data) {
        // layer.alert(JSON.stringify(data.field), {
        //   title: "最终的提交信息",
        // });
        // 要更新的数据！
        var update_data = {};
        update_data["taskchildnum"] = that.rowdata["taskchildnum"]; // 按这个试验编号去修改
        update_data["lastupdatedby"] = that.createdby;
        update_data["deviceid"] = that.rowdata["deviceid"];
        update_data["exemplarname"] = data.field["exemplar_devicename"]; // 样件名称
        update_data["exemplarchildnumbers"] = data.field["exemplar_select_all"]; // 样件三级编号

        update_data["devicetaskname"] = that.rowdata["devicetaskname"]; // 试验名称
        update_data["tasknum"] = that.rowdata["tasknum"]; // 试验任务编号
        // console.error("要更新的数据->", update_data);
        that.save_update_task(update_data);
      });
    });
  }

  init_exemplar() {
    var message = {};
    message["devicetaskname"] = this.rowdata["devicetaskname"];
    message["groups"] = "";
    message["tasknum"] = this.rowdata["tasknum"];
    this.http
      .callRPC(this.ETABLE, this.EMETHOD, message)
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        if (res["code"] === 1) {
          var message = res["message"];
          // console.error("****init_exemplar message****", message);
          var handle_get_message_for_device = this.handle_get_message_for_device(
            message
          );
          this.exemplar_no_name.init_layuiform([handle_get_message_for_device]);
          // console.error("init_exemplar>>", handle_get_message_for_device);
        }
        // this.analysis_handle_edit(result);
      });
  }

  // 要的得到 devicename：[]、deviceno: []
  handle_get_message_for_device(res) {
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

    // if (exemplar_no_name.length === 0) {
    //   var exemplar = {};
    //   exemplar["id"] = this.rowdata["exemplarnumbers"];
    //   exemplar["label"] =
    //     this.rowdata["exemplarnumbers"] + "&" + this.rowdata["exemplarname"];
    //   exemplar_no_name.push(exemplar);
    // }
    if (exemplar_no_name.length === 0) {
      return {
        id: "all",
        label: "全选",
        checkedid: [],
        children: exemplar_no_name,
      };
    }
    return {
      id: "all",
      label: "全选",
      checkedid: this.rowdata["exemplarchildnumbers"].split(","),
      children: exemplar_no_name,
    };
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

  // 保存-更新的数据
  save_update_task(data) {
    var table = "dev_update_added_task";
    var method = "dev_update_added_task";
    this.http.callRPC(table, method, data).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.dialogRef.close(true);
        this.RecordOperation("更新试验任务信息", 1, JSON.stringify(data));
        this.success();
      } else {
        var message = res["message"];
        this.RecordOperation("更新试验任务信息", 0, JSON.stringify(message));
        this.danger(JSON.stringify(message));
      }
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

  // 更新成功
  success() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "更新成功!",
    });
  }

  // 更新失败
  danger(data) {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "失败:" + data,
    });
  }
}
