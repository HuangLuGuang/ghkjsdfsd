import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'

import { DeviceKpiReport2Service } from './device-kpi-report2-service';
@Component({
  selector: 'ngx-device-kpi-report2',
  templateUrl: './device-kpi-report2.component.html',
  styleUrls: ['./device-kpi-report2.component.scss']
})
export class DeviceKpiReport2Component implements OnInit, OnDestroy {

  constructor( private router: Router, 
    private deviceservice: DeviceKpiReport2Service, ) { 
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    // 删除 man-hour-kpi-report2-buttons
    localStorage.removeItem("device-kpi-report2-buttons");
    localStorage.removeItem("kpi_for_detail");
  }

  // kpi报表
  kpireport(){
    this.router.navigate(['/pages/tongji/deviceKpiReport/kpitable'])
  }
  // kpi 详情
  kpidetail(){
    this.router.navigate(['/pages/tongji/deviceKpiReport/kpidetail'])
  }

  // 导出文件
  download(){
    // this.mytable.download(title);
    // localStorage.setItem("device_kpi_table_down", JSON.stringify(true))
    // 发布方
    this.deviceservice.changeMessage(true)

  };

}

