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

  index = 0;
  isDocument;
  tabs_links = [
    {
      title: '设备数据汇总',
      toggle: 'deivce',
      url: '/pages/tongji/device_hour_report/deivce_data_sum'
    },
    {
      title: '功能组数据汇总',
      toggle: 'group',
      url: '/pages/tongji/device_hour_report/group_data_sum'
    },
    {
      title: '部门数据汇总',
      toggle: 'department',
      url: '/pages/tongji/device_hour_report/department_data_sum'
    },
  ];

  // 根据url最后一个路径确定 index的值
  url_after_path = {
    deivce_data_sum: 0,
    group_data_sum: 1,
    department_data_sum: 2,
  }

  constructor(private router:Router, private publicservice: PublicmethodService,) { 
      // 会话过期
      localStorage.removeItem("alert401flag");
      // 得到url

      this.publicservice.get_current_url().subscribe((res:string)=>{
        // console.error("+++++++++++++得到url：", res);
        this.index = this.url_after_path[res.split("/").pop()]
      })

  }
  ngOnInit(): void {
    // 监听路由
    this.isDocument =  this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        var url = event.url;
        // console.error("+++++++++++++得到url：", url);
        this.index = this.url_after_path[url.split("/").pop()]
      }
    });
  }
  ngOnDestroy(){
    this.isDocument.unsubscribe();
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
