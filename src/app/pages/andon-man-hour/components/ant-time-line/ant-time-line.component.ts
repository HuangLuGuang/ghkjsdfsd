import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ant-time-line',
  templateUrl: './ant-time-line.component.html',
  styleUrls: ['./ant-time-line.component.scss']
})
export class AntTimeLineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  timelinedata = [];

  // 初始化时间线
  inint_timeline(data){
    if (data.length > 0){
      data.forEach(item => {
        this.znStatuse(item)
      });
      this.timelinedata = data;
    }else{
      this.timelinedata = []
    }
  }

  // 根据item中的 status 改变状态，running stop warning placeon
  znStatuse(item){
    console.log("+++++++++++++++++++++++++++++++++++",item)
    switch (item['status']) {
      case "running":
        item["statusColor"] = '#5D920D';
        item["title"] = '设备运行';
        break;
      case "stop":
        item["statusColor"] = '#3333FF';
        item["title"] = '设备空闲';
        break;
      case "warning":
        item["statusColor"] = '#FF4E0D';
        item["title"] = '设备维修';
        break;
      case "placeon":
        item["statusColor"] = '#DBB70D';
        item["title"] = '设备占位';
        break;
    
    }
  }

}
