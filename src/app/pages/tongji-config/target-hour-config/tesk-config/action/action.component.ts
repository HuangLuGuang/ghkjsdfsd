import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

declare let $;
@Component({
  selector: "ngx-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"],
})
export class ActionComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  constructor() {}

  ngOnInit(): void {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isactive();
    }, 1000);
  }

  // 是否禁用button
  isactive() {
    var button_lists = JSON.parse(localStorage.getItem("buttons_list"));
    // console.log("是否禁用button----------->", button_lists)
    var button_list = {};
    if (button_lists["edit"]) {
      button_list["edit"] = button_lists["edit"]["active"] === 1 ? true : false;
    } else {
      button_list["edit"] = false;
    }
    if (button_lists["del"]) {
      button_list["del"] = button_lists["del"]["active"] === 1 ? true : false;
    } else {
      button_list["del"] = false;
    }
    if (button_list) {
      if (button_list["edit"]) {
        // 编辑存在
        $(".edit-edit").attr("disabled", false);
        $(".edit-edit").attr("class", "buedit edit-edit");
      } else {
        $(".edit-edit").attr("disabled", true);
        $(".edit-edit").attr("class", "disable_edit edit-edit");
      }

      if (button_list["del"]) {
        // 删除存在
        $(".remove-remove").attr("disabled", false);
        $(".remove-remove").attr("class", "buremove remove-remove");
      } else {
        $(".remove-remove").attr("disabled", true);
        $(".remove-remove").attr("class", "disable_remove remove-remove");
      }

      // console.log("actions_list>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",button_list);
    }
  }

  // 修改按钮
  change_target_hour() {
    this.params.clicked({ action: "edit", data: this.params.data });
  }

  // 详情
  detail() {
    this.params.clicked({ action: "detail", data: this.params.data });
  }
  // 编辑
  edit() {
    this.params.clicked({ action: "tesk_edit", data: this.params.data });
  }
}
