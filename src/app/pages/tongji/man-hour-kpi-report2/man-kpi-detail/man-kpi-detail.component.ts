import { Component, OnInit } from '@angular/core';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../../../../services/http/httpservice.service'
import { ManKpiReport2Service } from '../man-hour-kpi-report2.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

let kpi_detail = require("../../../../../assets/pages/system-set/js/kpi_detail")

@Component({
  selector: 'ngx-man-kpi-detail',
  templateUrl: './man-kpi-detail.component.html',
  styleUrls: ['./man-kpi-detail.component.scss']
})
export class ManKpiDetailComponent implements OnInit {


  // 得到出入的数据 kpi_for_detail
  kpi_for_detail;
  constructor( private http: HttpserviceService, private publicservice: PublicmethodService, private mankpiservice: ManKpiReport2Service,
    private router: Router) {
    this.kpi_for_detail = JSON.parse(localStorage.getItem("kpi_for_detail"));
  }
  // 参数
  columns = {}

  // 左侧函数
  left_method1 = "dev_get_device_columnar_kpi"; //工时报表详细柱状图KPI
  left_method2 = "dev_get_device_month_kpi"; // 工时报表详细月份KPI

  // 右侧函数
  right_method1 = "dev_get_device_pie_kpi"; // 工时报表详细饼图KPI
  right_method2 = "dev_get_device_year_kpi"; // 工时报表详细年份KPI


  // kpi报表
  kpireport(){
    this.router.navigate(['/pages/tongji/manHourKpiReport/kpitable'])
  }
  
    // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })
  
    })
  }
  
  ngOnInit(): void {
    // 得到选则的日期 selectedMoments
    // 订阅方得到数据
    this.mankpiservice.currentData.subscribe(res=>{
      console.log("mankpiservice 查询：", res)
    })

    

    this.columns["start"] = this.kpi_for_detail["starttime"]
    this.columns["end"] = this.kpi_for_detail["endtime"]
    this.columns["deviceid"] = this.kpi_for_detail["deviceid"]
    console.log("kpi_detail----", this.kpi_for_detail);

    // 这是 左侧第一个柱状图
    this.init_left_one();
    
    // 这是 右侧第一个饼图 right-one
    this.init_right_ong();

    
    // 这是左侧第二个饼图 left_two
    this.init_left_two();

    // 这是 右侧第二个 柱状图 right-two
    this.init_right_two();
    

  };

  // 销毁组件时，删除 kpi_for_detail
  ngOnDestroy(){
    localStorage.removeItem("kpi_for_detail")
  }

  // 初始化 左侧第一个echart设备时间统计
  init_left_one(){
    // 得到数据
    this.querst("", this.left_method1, this.columns).subscribe(res=>{
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
      afterdata["warning"] = warning; // 占位
      afterdata["placeon"] = placeon; // 维保
      // ['运行', '空闲', '占位', "维保"]
      afterdata["title"] = ['运行', '空闲', '占位', "维保"];

      // console.log("得到左侧第一个数据： ", afterdata);
      kpi_detail.left_one('.left-one', afterdata);
    });
  };

  // 初始化右侧 第一个 echart 百分比
  init_right_ong(){
    // 得到数据
    this.querst("", this.right_method1, this.columns).subscribe(res=>{
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
            key = "维保"
            break;
          case "placeon":
            key = "占位"
            break;
        }
        afterdata["name"] = key;
        afterdata["value"] = resdatas[k];
        afterdatas.push(afterdata)
      }
      var title = ['运行', '空闲', '占位', "维保"];
      // console.log("得到右侧第一个数据： ", afterdatas);
      kpi_detail.right_one('.right-one', {afterdatas:afterdatas,title:title});
    })
  }

  // 初始化左侧 第二个 echart 月份数据
  init_left_two(){
    // 得到数据
    this.querst("", this.left_method2, this.columns).subscribe(res=>{
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
  init_right_two(){
    // 得到数据
    this.querst("", this.right_method2, this.columns).subscribe(res=>{
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


}
