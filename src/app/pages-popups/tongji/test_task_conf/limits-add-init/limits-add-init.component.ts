import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { NbDialogRef, NbDialogService } from "@nebular/theme";

import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";
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
    private dialogService: NbDialogService
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

  // 未处理的试验
  init_list() {
    this.http.callRPC(this.TABLE, this.METHOD, {}).subscribe((result) => {
      this.loading = false;
      console.error("未处理的试验>>>", result);
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        if (res["message"].length < 1) {
          // this.not_null("没有数据！");
          // this.dialogRef.close(false);
          this.messages = [];
        } else {
          this.messages = res["message"];
        }
      }
    });
  }

  // 正在处理的试验
  ninit_list() {
    this.http.callRPC(this.NTABLE, this.NMETHOD, {}).subscribe((result) => {
      console.error("正在处理的试验>>>", result);
      this.loading = false;
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        if (res["message"].length < 1) {
          // this.not_null("没有数据！");
          // this.dialogRef.close(false);
          this.nmessages = [];
        } else {
          this.nmessages = res["message"];
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
          console.error("********处理按钮***********", res);
          this.loading = true;
          this.ninit_list(); // 正在处理的试验
          this.init_list(); // 未处理的试验
        }
      });
  }

  // 编辑按钮
  edit(message) {
    var result = {
      type: "edit",
      message: message,
    };
    // this.dialogRef.close(result);
    this.dialogService
      .open(LimitsAddComponent, {
        closeOnBackdropClick: false,
        context: { res: result },
      })
      .onClose.subscribe((res) => {
        console.error("********编辑按钮***********", res);
        if (res) {
          this.ninit_list(); // 正在处理的试验
          this.init_list(); // 未处理的试验
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
            console.error(
              "********messages,nmessages ***********",
              this.messages,
              this.nmessages
            );
          }
        });
    }
  }

  // 正在处理的试验---确定
  test_confirm(nmessages) {
    console.error("正在处理的试验---确定", nmessages);
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
