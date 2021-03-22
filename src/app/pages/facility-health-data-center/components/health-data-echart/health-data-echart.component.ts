import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../../../../@core/utils";

let health_data = require("../../../../../assets/pages/facility-health-data-center/js/health_data");

@Component({
  selector: "ngx-health-data-echart",
  templateUrl: "./health-data-echart.component.html",
  styleUrls: ["./health-data-echart.component.scss"],
})
export class HealthDataEchartComponent implements OnInit {
  constructor(private layoutService: LayoutService) {}

  item_echarts = []; // echart 对象列表

  ngOnInit(): void {
    var ids = ["health_data_echart_pie", "health_data_echart_bar"];
    ids.forEach((item) => {
      var item_id = document.getElementById(item);
      this.item_echarts.push(echarts.init(item_id));
    });

    // 左侧菜单栏，伸缩
    this.layoutService.onInitLayoutSize().subscribe((f) => {
      this.item_echarts.forEach((item) => {
        if (item) item.resize();
      });
    });

    // 初始化 echart
    this.init_health();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.error("this.item_echarts>>>>>>>>>>>", this.item_echarts);
      this.item_echarts.forEach((item) => {
        if (item) item.resize();
      });
    }, 500);
  }

  //组件销毁
  ngOnDestroy() {
    // 清除 echart
    this.item_echarts.forEach((item) => {
      if (item) {
        item.clear();
        item.dispose();
      }
    });
  }

  init_health(datas?) {
    if (this.item_echarts.length > 0 && datas) {
      var get_devicepie = this.get_devicepie(datas);
      health_data.devicepie(this.item_echarts[0], get_devicepie);
      health_data.deviceline(this.item_echarts[1], {});
    }
  }

  // 得到pie的数据，
  get_devicepie(datas) {
    var normal = 0; // 一般报警
    var important = 0; // 重要报警
    var urgency = 0; // 紧急报警
    datas.forEach((data) => {
      switch (data["level"]) {
        case 1:
          normal += 1;
          break;
        case 2:
          important += 1;
          break;
        case 3:
          urgency += 1;
          break;

        default:
          break;
      }
    });

    return [
      { value: normal, name: "一级报警" },
      { value: important, name: "二级报警" },
      { value: urgency, name: "三级报警" },
    ];
  }
}
