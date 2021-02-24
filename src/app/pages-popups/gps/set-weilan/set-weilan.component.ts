import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-set-weilan",
  templateUrl: "./set-weilan.component.html",
  styleUrls: ["./set-weilan.component.scss"],
})
export class SetWeilanComponent implements OnInit {
  constructor(private dialogRef: NbDialogRef<SetWeilanComponent>) {}

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
