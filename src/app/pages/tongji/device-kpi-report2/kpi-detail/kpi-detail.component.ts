import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { DeviceKpiReport2Service } from '../device-kpi-report2-service';

let kpi_detail = require("../../../../../assets/pages/system-set/js/kpi_detail")
@Component({
  selector: 'ngx-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.scss']
})
export class KpiDetailComponent implements OnInit, OnDestroy {

  // 得到出入的数据 kpi_for_detail
  kpi_for_detail;
  constructor( private http: HttpserviceService, 
    private publicservice: PublicmethodService, 
    private deviceservice: DeviceKpiReport2Service,
    private router: Router ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    this.kpi_for_detail = JSON.parse(localStorage.getItem("kpi_for_detail"));
  }

  // 左侧函数
  left_method1 = "dev_get_device_columnar"; // 设备报表详细柱状图KPI
  left_method2 = "dev_get_device_month"; // 设备报表详细月份KPI

  // 右侧函数
  right_method1 = "dev_get_device_pie";  // 设备报表详细饼图KPI
  right_method2 = "dev_get_device_year"; // 设备报表详细年份KPI

  // 参数
  columns = {}

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
    this.deviceservice.currentData.subscribe(res=>{
      console.log("查询：", res)
    })

    console.log("kpi_detail----", this.kpi_for_detail);
    this.columns["start"] = this.kpi_for_detail["starttime"]
    this.columns["end"] = this.kpi_for_detail["endtime"]
    this.columns["deviceid"] = this.kpi_for_detail["deviceid"]

    console.log("kpi_detail----", this.columns);


    // 这是 左侧第一个柱状图
    this.init_left_one();
    
    // 这是 右侧第一个饼图 right-one
    this.init_right_ong();

    
    // 这是左侧第二个饼图 left_two
    this.init_left_two();

    // 这是 右侧第二个 柱状图 right-two
    this.init_right_two();
    

  };

  // 销毁组件，删除 kpi_for_detail

  ngOnDestroy(){
    localStorage.removeItem("kpi_for_detail")
  }


  // kpi报表
  kpireport(){
    this.router.navigate(['/pages/tongji/deviceKpiReport/kpitable'])
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

      var afterdata = {};
      resdatas.forEach(resdata => {
        xData.push(resdata["dates"]);
        running.push(resdata["running"]);
        stop.push(resdata["stop"]);
      });
      afterdata["xData"] = xData;
      afterdata["running"] = running;
      afterdata["stop"] = stop;
      afterdata["title"] = ['运行', '停止'];

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
            key = "停止"
            break;
        }
        afterdata["name"] = key;
        afterdata["value"] = resdatas[k];
        afterdatas.push(afterdata);
      }
      var title = ['运行', '停止'];
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
      
      console.log("得到左侧 第二个数据： ", afterdatas);
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
      
      console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.right_two('.right-two', afterdatas);
    })
  }


}
