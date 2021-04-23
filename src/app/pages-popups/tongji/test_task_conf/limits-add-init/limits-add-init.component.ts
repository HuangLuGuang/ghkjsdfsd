import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
} from "@angular/core";

import { NbDialogRef, NbDialogService } from "@nebular/theme";

import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";
import { EditDelTooltipComponent } from "../../../prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { LimitsAddComponent } from "../limits-add/limits-add.component";

declare let $;
declare let layui;

@Component({
  selector: "ngx-limits-add-init",
  templateUrl: "./limits-add-init.component.html",
  styleUrls: ["./limits-add-init.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitsAddInitComponent implements OnInit {
  constructor(
    private dialogRef: NbDialogRef<LimitsAddInitComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicmethod: PublicmethodService,
    private dialogService: NbDialogService,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  ngOnInit(): void {
    this.init_list();
    this.ninit_list(); // 未处理的
  }

  ngAfterViewInit() {}

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }
  // 取消
  cancel() {
    this.dialogRef.close(false);
  }

  TABLE = "get_lims_pendingdata";
  METHOD = "get_lims_pendingdata";

  // 正在处理的试验
  NTABLE = "get_lims_processed";
  NMETHOD = "get_lims_processed";

  messages = [];
  nmessages = []; // 正在处理的试验

  loading = false; // 加载

  input_dic = {
    devicetaskname: "",
    groups: "",
    tasknum: "",
  };

  diviceonCodeup(event) {
    var keycode = event.keyCode ? event.keyCode : 0;
    switch (keycode) {
      case 13:
        // enter, 得到输入值，调用父组件函数搜索
        this.input_dic.devicetaskname = $("#devicetaskname").val();
        this.input_dic.groups = $("#groups").val();
        this.input_dic.tasknum = $("#tasknum").val();
        this.init_list();
        break;
      case 27:
        break;
      default:
        break;
    }
  }

  // 未处理的试验
  init_list() {
    this.http
      .callRPC(this.TABLE, this.METHOD, this.input_dic)
      .subscribe((result) => {
        this.loading = false;
        // console.error("未处理的试验>>>", result);
        var res = result["result"]["message"][0];
        if (res["code"] === 1) {
          if (res["message"].length < 1) {
            // this.not_null("没有数据！");
            // this.dialogRef.close(false);
            this.messages = [];
          } else {
            this.ngZone.runOutsideAngular(() => {
              this.messages = res["message"];
              //强刷一次自己及子树.这个方法忽略了自己的ChecksEnabled状态.
              this.cd.detectChanges();
            });
          }
        }
      });
  }

  // 正在处理的试验
  ninit_list() {
    this.http.callRPC(this.NTABLE, this.NMETHOD, {}).subscribe((result) => {
      // console.error("正在处理的试验>>>", result);
      this.loading = false;
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        if (res["message"].length < 1) {
          // this.not_null("没有数据！");
          // this.dialogRef.close(false);
          this.nmessages = [];
        } else {
          this.ngZone.runOutsideAngular(() => {
            this.nmessages = res["message"];
            //强刷一次自己及子树.这个方法忽略了自己的ChecksEnabled状态.
            this.cd.detectChanges();
          });
          // console.error("this.nmessages", this.nmessages);
        }
      }
    });
  }

  // 处理按钮
  handle(message) {
    var result = {
      type: "handle",
      message: message,
    };
    // 发不方
    // this.dialogRef.close(result);

    this.dialogService
      .open(LimitsAddComponent, {
        closeOnBackdropClick: false,
        context: { res: result },
      })
      .onClose.subscribe((res) => {
        if (res) {
          this.loading = true;
          this.ninit_list(); // 正在处理的试验
          this.init_list(); // 未处理的试验
        }
      });
  }

  // 查看按钮- 需要得到 试验执行人executor；样件三级编号exemplarchildnumbers；设备名称exemplarname；样件信息taskmessage等
  check(message) {
    // console.error("查看按钮>>>>", message);
    var results = {
      type: "edit",
      message: message,
      checked: {
        checkid: [],
        checkgroupid: [],
      },
      executors: [],
      taskmessage: [],
    };
    // 得到选择的样件三级编号-设备名称数据格式，
    this.http
      .callRPC("device_task_info", "get_lims_processed_check", message)
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        // console.error("得到其它信息>>>", res["message"]);
        if (res["code"] === 1) {
          var message = res["message"];
          var checkid = []; // 点击选中的样件三级编号！
          var checkgroupid = []; // 点击选中的功能组
          var executors = []; // 负责人列表
          var taskmessage = []; // 样件信息列表
          message.forEach((m) => {
            // checkid.push(m["exemplarchildnumbers"]);
            checkid = checkid.concat(m["exemplarchildnumbers"].split(","));
            checkgroupid.push(m["deviceid"]);
            executors.push(m["executor"]);
            taskmessage.push(m["taskmessage"]);
          });

          this.ngZone.runOutsideAngular(() => {
            // results.checked.checkid = checkid;
            // results.checked.checkgroupid = checkgroupid;
            // results.executors = executors;
            results.checked.checkid = Array.from(new Set(checkid));
            results.checked.checkgroupid = Array.from(new Set(checkgroupid));
            results.executors = Array.from(new Set(executors));
            results.taskmessage = taskmessage;

            //强刷一次自己及子树.这个方法忽略了自己的ChecksEnabled状态.
            this.cd.detectChanges();
          });
        }
      });

    // this.dialogRef.close(result);
    this.dialogService
      .open(LimitsAddComponent, {
        closeOnBackdropClick: false,
        context: { res: results },
      })
      .onClose.subscribe((res) => {
        if (res) {
          this.ninit_list(); // 正在处理的试验
          this.init_list(); // 未处理的试验
        }
      });
  }

  // 删除按钮   get_lims_processed_remove
  remove(message) {
    // console.error("删除按钮>>>>", message);
    var table = "lims_data";
    var method = "get_lims_processed_remove";
    this.dialogService
      .open(EditDelTooltipComponent, {
        closeOnBackdropClick: false,
        context: {
          title: "提示",
          content: `确定要删除这条数据吗？`,
          rowData: JSON.stringify([message]),
        },
      })
      .onClose.subscribe((istrue) => {
        console.error("删除按钮>>>istrue", istrue);
        if (istrue) {
          this.http.callRPC(table, method, message).subscribe((result) => {
            var res = result["result"]["message"][0];
            if (res["code"] === 1) {
              this.ninit_list(); // 正在处理的试验
              this.init_list(); // 未处理的试验
            }
          });
        }
      });
  }

  // 正在处理的试验---取消 将 lims_data中的 active改为 1 表示未处理
  test_cancle(nmessages) {
    var table = "get_lims_processed_cancle";
    var method = "get_lims_processed_cancle";
    if (nmessages.length > 0) {
      this.http
        .callRPC(table, method, { message: nmessages })
        .subscribe((result) => {
          var res = result["result"]["message"][0];
          if (res["code"] === 1) {
            this.ninit_list(); // 正在处理的试验
            this.init_list(); // 未处理的试验
            this.dialogRef.close(false);
          }
        });
    }
  }

  // 正在处理的试验---确定
  test_confirm(nmessages) {
    // console.error("正在处理的试验---确定", nmessages);
    var table = "get_lims_processed_confirm";
    var method = "get_lims_processed_confirm";
    if (nmessages.length > 0) {
      this.http
        .callRPC(table, method, { message: nmessages })
        .subscribe((result) => {
          var res = result["result"]["message"][0];
          if (res["code"] === 1) {
            this.ninit_list(); // 正在处理的试验
            this.init_list(); // 未处理的试验
            this.dialogRef.close(false);
            this.addsuccess();
            // 发不方
            this.publicmethod.TeskChangeMessage(true);
          }
        });
    }
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

  // 刷新数据
  refresh() {
    $("#devicetaskname").val("");
    $("#groups").val("");
    $("#tasknum").val("");
    this.input_dic.devicetaskname = "";
    this.input_dic.groups = "";
    this.input_dic.tasknum = "";

    var url = "/api/v1/lims";
    this.http.get(url).subscribe((res) => {
      console.error("++++刷新数据++++", res);
      if (res["succeed"] == "成功") {
        this.success();
        this.init_list();
        this.ninit_list(); // 未处理的
      } else {
        var data = res["succeed"];
        this.danger(data);
      }
    });
  }

  success() {
    this.publicmethod.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "刷新成功!",
    });
  }
  danger(data) {
    this.publicmethod.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "刷新失败" + data,
    });
  }

  addsuccess() {
    this.publicmethod.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "新增成功!",
    });
  }
}
