import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-mul-table-col",
  templateUrl: "./mul-table-col.component.html",
  styleUrls: ["./mul-table-col.component.scss"],
})
export class MulTableColComponent implements OnInit {
  allChecked = false;
  indeterminate = true;

  checkOptionsOne = [
    { label: "Apple", value: "Apple", checked: true },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
    { label: "Orange1", value: "Orange1" },
    { label: "Orange2", value: "Orange2" },
  ];

  constructor() {}

  ngOnInit(): void {}

  log(value: object[]): void {
    console.log(value);
  }

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
}
