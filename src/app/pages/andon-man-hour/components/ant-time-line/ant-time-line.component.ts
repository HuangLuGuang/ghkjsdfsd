import { Component, OnInit,ViewChild } from '@angular/core';
declare let $;


@Component({
  selector: 'ngx-ant-time-line',
  templateUrl: './ant-time-line.component.html',
  styleUrls: ['./ant-time-line.component.scss']
})
export class AntTimeLineComponent implements OnInit {

  @ViewChild('running') running:any;
  @ViewChild('stop') stop:any;
  @ViewChild('warning') warning:any;
  @ViewChild('placeon') placeon:any;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    
  }

  timelinedata = [];

  // 初始化时间线
  inint_timeline(data){
    if (data.length > 0){
      data.forEach(item => {
        this.znStatuse(item)
      });
      this.timelinedata = data;
      // 将空心的圆圈--改为实心的 fill
      

    }else{
      this.timelinedata = []
    }

    

  }

  // 根据item中的 status 改变状态，running stop warning placeon
  znStatuse(item){
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

  // ----icon
  getdot(status){
    switch (status) {
      case "running":
        return this.running
      case "stop":
        return this.stop
      case "warning":
        return this.warning
      case "placeon":
        return this.placeon
    }
  }

}
