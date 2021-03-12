import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-test-all-info",
  templateUrl: "./test-all-info.component.html",
  styleUrls: ["./test-all-info.component.scss"],
})
export class TestAllInfoComponent implements OnInit {
  // 试验汇总信息
  test_all_info = {
    title: ["设备名称", "设备位置", "是否报警", "用户操作"],
    data: [
      ["AVL电机1", "S1003", 1, "video1 alert1"],
      ["AVL电机3", "S1003", 0, "video1 alert1"],
      ["AVL电机2", "S1003", 0, "video1 alert1"],
      ["AVL电机6", "S1003", 0, "video1 alert1"],
      ["AVL转股", "S1003", 0, "video1 alert1"],
      ["MTS台架1", "S1003", 1, "video1 alert1"],
      ["MTS台架2", "S1003", 0, "video1 alert1"],
      ["MTS台架6", "S1003", 1, "video1 alert1"],
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
