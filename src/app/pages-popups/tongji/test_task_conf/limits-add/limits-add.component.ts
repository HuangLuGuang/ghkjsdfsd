import { Component, OnInit, ViewChild } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

declare let $;
declare let layui;

@Component({
  selector: "ngx-limits-add",
  templateUrl: "./limits-add.component.html",
  styleUrls: ["./limits-add.component.scss"],
})
export class LimitsAddComponent implements OnInit {
  constructor(
    private dialogRef: NbDialogRef<LimitsAddComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicmethod: PublicmethodService
  ) {}

  ngOnInit(): void {}

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }
  // 取消
  cancel() {
    this.dialogRef.close(false);
  }
}
