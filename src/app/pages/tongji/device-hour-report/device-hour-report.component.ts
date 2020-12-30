import { Component, OnInit,ViewChild } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
declare let $;
declare let layui;
@Component({
  selector: 'ngx-device-hour-report',
  templateUrl: './device-hour-report.component.html',
  styleUrls: ['./device-hour-report.component.scss']
})
export class DeviceHourReportComponent implements OnInit {
  
  isDocument; // 切换页签后，点击目录，重置table

  index = 0;
  tabs_links = [
    {
      title: '设备数据汇总',
      toggle: 'deivce',
      status: 'success',
      link: "deivce_data_sum",
      url: '/pages/tongji/device_hour_report/deivce_data_sum'
    },
    {
      title: '功能组数据汇总',
      toggle: 'group',
      status: 'basic',
      link: "group_data_sum",
      url: '/pages/tongji/device_hour_report/group_data_sum'
    },
    {
      title: '部门数据汇总',
      toggle: 'department',
      status: 'basic',
      link: "department_data_sum",
      url: '/pages/tongji/device_hour_report/department_data_sum'
    },
  ]

  constructor(private router:Router, private publicservice: PublicmethodService,) { 
      // 会话过期
      localStorage.removeItem("alert401flag");

  }
  ngOnInit(): void {
   
  }
  ngOnDestroy(){
  }

  ngAfterViewInit(){
    
  }


  // 切换数据汇总-------------------
  toggle_sum(type){
    // console.error("=++++++++++++++++==切换数据汇总++++++++++=",type)
    if (type === "department"){
      this.router.navigate(["/pages/tongji/device_hour_report/department_data_sum"])
    }else if(type === "group"){
      this.router.navigate(["/pages/tongji/device_hour_report/group_data_sum"])
    }else{
      this.router.navigate(["/pages/tongji/device_hour_report/deivce_data_sum"])
    }
  }



}
