import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

@Component({
  selector: 'ngx-target-hour-config',
  templateUrl: './target-hour-config.component.html',
  styleUrls: ['./target-hour-config.component.scss']
})
export class TargetHourConfigComponent implements OnInit {

  // 目标工时配置button status 默认激活：success
  hour_status = "success";

  // 试验任务配置button status 默认不激活 basic
  tesk_status = "basic";
  
  // 试验结果配置  默认不激活 basic
  result_status = "basic";

  isDocument; // 切换页签后，点击目录，重置table

  constructor(private router: Router, private publicservice: PublicmethodService 
  ) { 
    // 会话过期
    localStorage.removeItem("alert401flag");
  }

  ngOnInit(): void {
    // 监听路由
    this.isDocument =  this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        var fileActive = event.url.indexOf('target_hour_config/hour_config') >= 0 || event.url.indexOf('target_hour_config/hour_config') >= 0;
        console.log("**********************", fileActive);
        console.log("**********************", event.url);
        if (fileActive){
          this.toggle_config('hour');
        }
      }
    });

    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    var dom = document.createElement("div");
    dom.className = "cdk-overlay-container"
    document.getElementsByTagName("nb-layout")[0].appendChild(dom)
    
        

  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.publicservice.get_current_url().subscribe((url:string)=>{
        console.warn("得到当前的url： ",url);
        if (url.search('/pages/tongji/target_hour_config/tesk_config') > 0){
          // 切换到试验任务配置
          this.toggle_config('tesk')
        }else if (url.search('/pages/tongji/target_hour_config/hour_config') >0){
          this.toggle_config('hour')
        }else{
          this.toggle_config('result')
        }
      })
    }, );


  }

  ngOnDestroy(){
    this.isDocument.unsubscribe();
  }


  // 切换配置------------------
  toggle_config(type){
    switch (type) {
      case 'hour':
        // 切换到目标工时配置
        this.hour_status = "success";
        this.tesk_status = "basic";
        this.result_status = "basic";
        this.router.navigate(["/pages/tongji/target_hour_config/hour_config"])
        break;
    
      case 'tesk':
        // 切换到试验任务配置
        this.hour_status = "basic";
        this.tesk_status = "success";
        this.result_status = "basic";
        this.router.navigate(["/pages/tongji/target_hour_config/tesk_config"])
        break;
      case 'result':
        // 切换到试验任务配置
        this.hour_status = "basic";
        this.tesk_status = "basic";
        this.result_status = "success";
        this.router.navigate(["/pages/tongji/target_hour_config/result_config"])
      break;
    }
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
