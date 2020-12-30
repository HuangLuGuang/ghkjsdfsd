import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils';
import { HttpserviceService } from '../../../services/http/httpservice.service';

import { ActivatedRoute } from '@angular/router';

let kpi_detail = require("../../../../assets/pages/system-set/js/kpi_detail")
@Component({
  selector: 'ngx-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.scss']
})
export class KpiDetailComponent implements OnInit {

  type; // 判断是那个组件的kpi： device 设备数据汇总、group 功能组数据汇总、department 部门数据汇总

  // 得到出入的数据 kpi_for_detail
  kpi_for_detail;

  // 左侧函数
  left_method1 = "dev_get_device_columnar_kpi"; // 设备数据汇总详细柱状图KPI
  left_method2 = "dev_get_device_month_kpi"; // 设备数据汇总详细月份KPI

  // 右侧函数
  right_method1 = "dev_get_device_pie_kpi";  // 设备数据汇总详细饼图KPI
  right_method2 = "dev_get_device_year_kpi"; // 设备数据汇总详细年份KPI

  // device 设备数据汇总、group 功能组数据汇总、department 部门数据汇总 
  // 需要的mothed和对应的table的url 行数据！
  mothed_table_url = {
    device: {
      url: "/pages/tongji/device_hour_report/deivce_data_sum",
      left_method1: "dev_get_device_columnar_kpi",// 设备数据汇总详细柱状图KPI
      left_method2: "dev_get_device_month_kpi",// 设备数据汇总详细月份KPI
      right_method1: "dev_get_device_pie_kpi", // 设备数据汇总详细饼图KPI
      right_method2: "dev_get_device_year_kpi", // 设备数据汇总详细年份KPI
      kpi_for_detail: JSON.parse(localStorage.getItem("device_hour_report_kpi_for_detail"))
    },
    group: {
      url: "/pages/tongji/device_hour_report/group_data_sum",
      left_method1: "dev_get_device_columnar_kpi",// 功能组数据汇总详细柱状图KPI
      left_method2: "dev_get_device_month_kpi",// 功能组数据汇总详细月份KPI
      right_method1: "dev_get_device_pie_kpi", // 功能组数据汇总详细饼图KPI
      right_method2: "dev_get_device_year_kpi", // 功能组数据汇总详细年份KPI
      kpi_for_detail: JSON.parse(localStorage.getItem("device_hour_report_kpi_for_detail"))
    },
  }

  table_url = "";

  // 参数
  columns = {}

  // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable ((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })

    })
  }


  constructor(private http: HttpserviceService, private router: Router,
    private layoutService: LayoutService,private activerouter: ActivatedRoute
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    this.kpi_for_detail = JSON.parse(localStorage.getItem("device_hour_report_kpi_for_detail"));
  
    // 得到路由参数！
    this.activerouter.queryParamMap.subscribe(res=>{
      this.type = res.get("name")
    });
  }

  ngOnInit(): void {
    if (this.type === 'device'){
      this.table_url = this.mothed_table_url.device.url;
      var kpi_for_detail = this.mothed_table_url.device.kpi_for_detail;
      var columns = {
        start: kpi_for_detail["starttime"],
        end: kpi_for_detail["endtime"],
        deviceid: kpi_for_detail["deviceid"],
      }
      // 这是 左侧第一个柱状图
      this.init_left_one(this.mothed_table_url.device.left_method1,columns);
      // 这是 右侧第一个饼图 right-one
      this.init_right_ong(this.mothed_table_url.device.left_method1,columns);
      // 这是左侧第二个饼图 left_two
      this.init_left_two(this.mothed_table_url.device.left_method1,columns);
      // 这是 右侧第二个 柱状图 right-two
      this.init_right_two(this.mothed_table_url.device.left_method1,columns);

    }

    console.log("kpi_detail----", this.kpi_for_detail);

    // this.columns["start"] = this.kpi_for_detail["starttime"]
    // this.columns["end"] = this.kpi_for_detail["endtime"]
    // this.columns["deviceid"] = this.kpi_for_detail["deviceid"]

    this.layoutService.onInitLayoutSize().subscribe(f=>{
      let left_one = document.querySelector('.left-one');
      if(left_one) echarts.init(left_one).resize();
      let right_one = document.querySelector('.right-one');
      if(right_one) echarts.init(right_one).resize();
      let left_two = document.querySelector('.left-two');
      if(left_two) echarts.init(left_two).resize();
      let right_two = document.querySelector('.right-two');
      if(right_two) echarts.init(right_two).resize();
    })

    // // 这是 左侧第一个柱状图
    // this.init_left_one();
    // // 这是 右侧第一个饼图 right-one
    // this.init_right_ong();
    // // 这是左侧第二个饼图 left_two
    // this.init_left_two();
    // // 这是 右侧第二个 柱状图 right-two
    // this.init_right_two();
    // this.listen_windows_resize();

  }

  // 销毁组件时，删除 kpi_for_detail
  ngOnDestroy(){
    localStorage.removeItem("device_hour_report_kpi_for_detail")
  }

  // kpi报表
  kpireport(){
    // this.router.navigate(['/pages/tongji/device_hour_report'])
    this.router.navigate([this.table_url])
  }
  
  // 初始化 左侧第一个echart设备时间统计
  init_left_one(left_method1, columns){
    // 得到数据
    // this.querst("", this.left_method1, this.columns).subscribe(res=>{
    this.querst("", left_method1, columns).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      var xData = [];
      var running = [];
      var stop = [];
      var warning = [];
      var placeon = [];

      var afterdata = {};
      resdatas.forEach(resdata => {
        xData.push(resdata["dates"]);
        running.push(resdata["running"]);
        stop.push(resdata["stop"]);
        warning.push(resdata["warning"]);
        placeon.push(resdata["placeon"]);
      });
      afterdata["xData"] = xData;
      afterdata["running"] = running; // 运行
      afterdata["stop"] = stop;       // 空闲
      afterdata["warning"] = warning; // 维修
      afterdata["placeon"] = placeon; // 占位
      // ['运行', '空闲', '维修', "占位"]
      afterdata["title"] = ['运行', '空闲', '维修', "占位"];

      // console.log("得到左侧第一个数据： ", afterdata);
      kpi_detail.left_one('.left-one', afterdata);
    });
  };

  
  // 初始化右侧 第一个 echart 百分比
  init_right_ong(right_method1, columns){
    // 得到数据
    // this.querst("", this.right_method1, this.columns).subscribe(res=>{
    this.querst("", right_method1, columns).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0][0];
      var afterdatas = [];
      for(let k in resdatas){
        var afterdata = {};
        var key;
        switch (k) {
          case "running":
            key = "运行"
            break;
          case "stop":
            key = "空闲"
            break;
          case "warning":
            key = "占位"
            break;
          case "placeon":
            key = "维修"
            break;
        }
        afterdata["name"] = key;
        afterdata["value"] = resdatas[k];
        afterdatas.push(afterdata)
      }
      var title = ['运行', '空闲', '维修', "占位"];
      // console.log("得到右侧第一个数据： ", afterdatas);
      kpi_detail.right_one('.right-one', {afterdatas:afterdatas,title:title});
    })
  }

  // 初始化左侧 第二个 echart 月份数据
  init_left_two(left_method2, columns){
    // 得到数据
    // this.querst("", this.left_method2, this.columns).subscribe(res=>{
    this.querst("", left_method2, columns).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      var afterdatas = {};
      var xData = [];
      var yData = [];
      resdatas.forEach(data => {
        xData.push(data["dates"] + '月');
        yData.push(data["running"]);
      });
      afterdatas["xData"] = xData;
      afterdatas["yData"] = yData;
      
      // console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.left_two('.left-two', afterdatas);
    })
  }

  
  // 初始化右侧 第二个 echart 年份数据
  init_right_two(right_method2, columns){
    // 得到数据
    // this.querst("", this.right_method2, this.columns).subscribe(res=>{
    this.querst("", right_method2, columns).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      var afterdatas = {};
      var xData = [];
      var yData = [];
      resdatas.forEach(data => {
        xData.push(data["dates"] + '年');
        yData.push(data["running"]);
      });
      afterdatas["xData"] = xData;
      afterdatas["yData"] = yData;
      
      // console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.right_two('.right-two', afterdatas);
    })
  }

  // 监听窗口变化来，重置echat的大小！
  listen_windows_resize(){
    window.onreset = function (){
      let left_one = document.querySelector('.left-one');
      if(left_one) echarts.init(left_one).resize();
      let right_one = document.querySelector('.right-one');
      if(right_one) echarts.init(right_one).resize();
      let left_two = document.querySelector('.left-two');
      if(left_two) echarts.init(left_two).resize();
      let right_two = document.querySelector('.right-two');
      if(right_two) echarts.init(right_two).resize();
    }
  }

}
