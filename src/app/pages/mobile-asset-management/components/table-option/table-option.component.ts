import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "ngx-table-option",
  templateUrl: "./table-option.component.html",
  styleUrls: ["./table-option.component.scss"],
})
export class TableOptionComponent implements OnInit {
  private params: any;
  constructor() {}

  ngOnInit(): void {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  // option 操作

  // 编辑
  edit() {
    this.params.data.option = "edit";
    this.params.clicked(this.params.data);
  }
  // 指令
  order() {
    this.params.data.option = "order";
    this.params.clicked(this.params.data);
  }
  // 操作
  detail() {
    this.params.data.option = "detail";
    this.params.clicked(this.params.data);
  }
}
