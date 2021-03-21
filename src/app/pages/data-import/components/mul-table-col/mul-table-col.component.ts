import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "ngx-mul-table-col",
  templateUrl: "./mul-table-col.component.html",
  styleUrls: ["./mul-table-col.component.scss"],
})
export class MulTableColComponent implements OnInit {
  @Output() private multablecol_confirm = new EventEmitter<any>();

  allChecked = false;
  indeterminate = false;

  checkOptionsOne = [
    // { label: "Apple", value: "Apple", checked: true },
    {
      label: "devicename 设备名称",
      value: "devicename",
      checked: false,
    },
    { label: "location 设备位置", value: "location", checked: false },
    { label: "group 功能组", value: "group", checked: false },
    { label: "level 当前定义报警等级", value: "level", checked: false },
    { label: "message 报警内容", value: "message", checked: false },
    {
      label: "automessage 报警内容自定义注释",
      value: "automessage",
      checked: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  log(value: object[]): void {
    // console.log(value);
    this.updateSingleChecked();
  }

  // 点击取消！
  updateSingleChecked(): void {
    if (this.checkOptionsOne.every((item) => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every((item) => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  // 全选
  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map((item) => {
        return {
          ...item,
          checked: true,
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map((item) => {
        return {
          ...item,
          checked: false,
        };
      });
    }
  }
  // 取消
  cancle() {
    this.allChecked = false;
    this.indeterminate = false;
    this.checkOptionsOne = this.checkOptionsOne.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
  }

  // 确定
  confirm() {
    var confirmdata = this.checkOptionsOne.filter((item) => {
      if (item.checked) {
        return item;
      }
    });
    this.multablecol_confirm.emit(confirmdata);
    // console.error(
    //   "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=confirmdata",
    //   confirmdata
    // );
  }
}
