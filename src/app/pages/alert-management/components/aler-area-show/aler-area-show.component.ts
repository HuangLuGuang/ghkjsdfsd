import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-aler-area-show",
  templateUrl: "./aler-area-show.component.html",
  styleUrls: ["./aler-area-show.component.scss"],
})
export class AlerAreaShowComponent implements OnInit {
  groups_data = [
    {
      name: "结构试验室",
      status: 1,
    },
    {
      name: "环境试验室",
      status: 1,
    },
    {
      name: "电机试验室",
      status: 1,
    },
    {
      name: "理化试验室",
      status: 0,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
