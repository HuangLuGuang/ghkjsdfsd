import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

@Component({
  selector: 'ngx-target-hour-config',
  templateUrl: './target-hour-config.component.html',
  styleUrls: ['./target-hour-config.component.scss']
})
export class TargetHourConfigComponent implements OnInit {
  index = 0;
  isDocument;
  tabs_links = [
    {
      title: '目标工时配置',
      toggle: 'hour',
      url: '/pages/tongji/target_hour_config/hour_config'
    },
    {
      title: '试验任务配置',
      toggle: 'tesk',
      url: '/pages/tongji/target_hour_config/tesk_config'
    },
    {
      title: '试验结果配置',
      toggle: 'result',
      url: '/pages/tongji/target_hour_config/result_config'
    },
  ]

  // 根据url最后一个路径确定 index的值
  url_after_path = {
    hour_config: 0,
    tesk_config: 1,
    result_config: 2,
  }

  constructor(private router: Router, private publicservice: PublicmethodService 
  ) { 
    // 会话过期
    localStorage.removeItem("alert401flag");

    // 得到url
    this.publicservice.get_current_url().subscribe((res:string)=>{
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


    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    if (document.getElementsByClassName('cdk-overlay-container').length < 1){
      var dom = document.createElement("div");
      dom.className = "cdk-overlay-container"
      document.getElementsByTagName("nb-layout")[0].appendChild(dom)
    }
  }

  ngAfterViewInit(){

  }

  ngOnDestroy(){
    this.isDocument.unsubscribe();
  }


  // 切换配置------------------
  toggle_config(type){
    if (type === 'hour'){
      // 切换到目标工时配置
      this.router.navigate(["/pages/tongji/target_hour_config/hour_config"])
    }else if(type === 'tesk') {
      // 切换到试验任务配置
      this.router.navigate(["/pages/tongji/target_hour_config/tesk_config"])
    }else{
      // 切换到试验结果配置
      this.router.navigate(["/pages/tongji/target_hour_config/result_config"])

    }

    // switch (type) {
    //   case 'hour':
    //     // 切换到目标工时配置
    //     this.hour_status = "success";
    //     this.tesk_status = "basic";
    //     this.result_status = "basic";
    //     this.router.navigate(["/pages/tongji/target_hour_config/hour_config"])
    //     break;
    
    //   case 'tesk':
    //     // 切换到试验任务配置
    //     this.hour_status = "basic";
    //     this.tesk_status = "success";
    //     this.result_status = "basic";
    //     this.router.navigate(["/pages/tongji/target_hour_config/tesk_config"])
    //     break;
    //   case 'result':
    //     // 切换到试验任务配置
    //     this.hour_status = "basic";
    //     this.tesk_status = "basic";
    //     this.result_status = "success";
    //     this.router.navigate(["/pages/tongji/target_hour_config/result_config"])
    //   break;
    // }
    // if (type === 'hour'){
    //   // 切换到目标工时配置
    //   this.hour_status = "success";
    //   this.tesk_status = "basic";
    //   this.router.navigate(["/pages/tongji/target_hour_config/hour_config"])
    // }else{
    //   // 切换到试验任务配置
    //   this.hour_status = "basic";
    //   this.tesk_status = "success";
    //   this.router.navigate(["/pages/tongji/target_hour_config/tesk_config"])
    // }
  }
}
