import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-one-layout",
  templateUrl: "./one-layout.component.html",
  styleUrls: ["./one-layout.component.scss"],
})
export class OneLayoutComponent implements OnInit {
  constructor() {}

  numbersage;
  numbersnow;
  ngOnInit(): void {}

  // {code: 1, numbersage: 8, numbersnow: 0}

  init_num(data) {
    this.numbersage = data["numbersage"];
    this.numbersnow = data["numbersnow"];
  }
}
