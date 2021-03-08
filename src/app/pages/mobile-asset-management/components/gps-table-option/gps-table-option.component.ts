import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
declare let $;
@Component({
  selector: "ngx-gps-table-option",
  templateUrl: "./gps-table-option.component.html",
  styleUrls: ["./gps-table-option.component.scss"],
})
export class GpsTableOptionComponent
  implements OnInit, ICellRendererAngularComp {
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
    var button_list = {};
    if (button_list) {
      if (button_lists["edit"]) {
        button_list["edit"] =
          button_lists["edit"]["active"] === 1 ? true : false;
      } else {
        button_list["edit"] = false;
      }
      if (button_lists["del"]) {
        button_list["del"] = button_lists["del"]["active"] === 1 ? true : false;
      } else {
        button_list["del"] = false;
      }
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

  // 调用父方法
  public device_info(item) {
    var rowData = this.params.node.data;
    switch (item) {
      case "edit":
        this.edit(rowData);
        break;
      case "del":
        this.remove(rowData);
        break;
    }
  }

  edit(rowData) {
    // 用户
    this.params.data = { active: "edit", data: [rowData] };
    this.params.clicked(this.params.data);
  }

  remove(rowData) {
    this.params.data = { active: "remove", data: [rowData] };
    this.params.clicked(this.params.data);
  }
}
