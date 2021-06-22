import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";
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

      // 判断是 新增还是编辑
      if (that.content) {
        // true: 表示edit
        // 表单初始化
        form.val("device", that.rowData[0]);
        console.error("------>", that.rowData);
      } else {
        // false: 表示add
      }

      form.on("submit(gpsvideo)", function (data) {
        layer.alert(JSON.stringify(data.field), {
          title: "得到的编辑表单的数据",
        });
      });
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
}
