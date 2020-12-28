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

  device_data = 'success'; // 设备数据汇总
  group_data = 'basic'; // 功能组数据汇总
  department_data = 'basic'; // 部门数据汇总

  
  isDocument; // 切换页签后，点击目录，重置table

  index = 0;
  tabs = ['设备数据汇总', '功能组数据汇总','功能组数据汇总'];
  tabs_links = [
    {
      title: '设备数据汇总',
      toggle: 'deivce',
      status: 'success',
      url: '/pages/tongji/device_hour_report/deivce_data_sum'
    },
    {
      title: '功能组数据汇总',
      toggle: 'group',
      status: 'basic',
      url: '/pages/tongji/device_hour_report/group_data_sum'
    },
    {
      title: '部门数据汇总',
      toggle: 'department',
      status: 'basic',
      url: '/pages/tongji/device_hour_report/department_data_sum'
    },
  ]

  constructor(private router:Router, private publicservice: PublicmethodService,) { 
      // 会话过期
      localStorage.removeItem("alert401flag");

  }
  ngOnInit(): void {
    // 监听路由
    this.isDocument =  this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        var fileActive = event.url.indexOf('deivce_data_sum') >= 0 || event.url.indexOf('deivce_data_sum') >= 0;
        console.log("**********************", fileActive);
        if (fileActive){
          this.toggle_sum('device');
        }
      }
    });
  }
  ngOnDestroy(){
    this.isDocument.unsubscribe();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.publicservice.get_current_url().subscribe((url:string)=>{
        console.warn("得到当前的url： ",url);
        if (url.search('/pages/tongji/device_hour_report/deivce_data_sum') !==-1){
          // 切换到试验任务配置
          this.toggle_sum('device')
        }else if (url.search('/pages/tongji/device_hour_report/group_data_sum') !==-1){
          this.toggle_sum('group')
        }else{
          this.toggle_sum('department')
        }
      })
    }, );
  }


  // 切换数据汇总-------------------
  toggle_sum(type){
    switch (type) {
      case 'device':
       // 切换到设备数据汇总
       this.device_data = "success";
       this.group_data = "basic";
       this.department_data = "basic";
       this.router.navigate(["/pages/tongji/device_hour_report/deivce_data_sum"])
       break;
    
      case 'group':
        // 切换到功能组数据汇总
        this.device_data = "basic";
        this.group_data = "success";
        this.department_data = "basic";
        this.router.navigate(["/pages/tongji/device_hour_report/group_data_sum"])
        break;

      case 'department':
        // 切换到部门数据汇总
        this.device_data = "basic";
        this.group_data = "basic";
        this.department_data = "success";
        this.router.navigate(["/pages/tongji/device_hour_report/department_data_sum"])
        break;
    }
  }



}
