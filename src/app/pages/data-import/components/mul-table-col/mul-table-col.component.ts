import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-mul-table-col",
  templateUrl: "./mul-table-col.component.html",
  styleUrls: ["./mul-table-col.component.scss"],
})
export class MulTableColComponent implements OnInit {
  allChecked = false;
  indeterminate = false;

  checkOptionsOne = [
    // { label: "Apple", value: "Apple", checked: true },
    {
      label: "Apple 感觉感觉感觉感觉撒旦发射点发",
      value: "Apple",
      checked: false,
    },
    { label: "Pear 撒旦发射点发", value: "Pear", checked: false },
    { label: "Orange 撒旦发射点发", value: "Orange", checked: false },
    { label: "Orange1 撒旦发射点发", value: "Orange1", checked: false },
    { label: "Orange20000 撒旦发射点发", value: "Orange2", checked: false },
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
    console.log(
      "****************************确定**************",
      this.checkOptionsOne
    );
  }
}
