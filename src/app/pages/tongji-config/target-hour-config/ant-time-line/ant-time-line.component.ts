import { Component, OnInit,ViewChild } from '@angular/core';
declare let $;


@Component({
  selector: 'ngx-ant-time-line',
  templateUrl: './ant-time-line.component.html',
  styleUrls: ['./ant-time-line.component.scss']
})
export class AntTimeLineComponent implements OnInit {

  @ViewChild('creat') creat:any;
  @ViewChild('running') running:any;
  @ViewChild('stop') stop:any;
  @ViewChild('goto') goto:any;
  @ViewChild('done') done:any;
  @ViewChild('cancel') cancel:any;
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
      

    }else{
      this.timelinedata = []
    }

    

  }

  // 根据item中的 status 改变状态，创建试验号  试验启动  试验暂停  试验继续  试验完成
  znStatuse(item){
    switch (item['status']) {
      case "创建试验号":
        item["statusColor"] = '#0095FF';
        item["title"] = '创建试验号';
        break;
      case "试验启动":
        item["statusColor"] = '#00D68F';
        item["title"] = '试验启动';
        break;
      case "试验暂停":
        item["statusColor"] = '#FF3D71';
        item["title"] = '试验暂停';
        break;
      case "试验继续":
        item["statusColor"] = '#19d697';
        item["title"] = '试验继续';
        break;
      case "试验完成":
        item["statusColor"] = '#3366FF';
        item["title"] = '试验完成';
        break;
      case "试验取消":
        item["statusColor"] = '#EDF1F7';
        item["title"] = '试验取消';
        break;
    
    }
  }

  // ----icon
  getdot(status){
    switch (status) {
      case "创建试验号":
        return this.creat
      case "试验启动":
        return this.running
      case "试验暂停":
        return this.stop
      case "试验继续":
        return this.goto
      case "试验完成":
        return this.done
      case "试验取消":
        return this.cancel
    }
  }

}
