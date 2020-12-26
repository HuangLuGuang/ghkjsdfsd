import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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



  constructor(private router: Router, private publicservice: PublicmethodService 
  ) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.publicservice.get_current_url().subscribe((url:string)=>{
      console.warn("得到当前的url： ",url);
      if (url.search('/pages/tongji/target_hour_config/tesk_config') !==-1){
        // 切换到试验任务配置
        this.hour_status = "basic";
        this.tesk_status = "success";
      }else{
        this.hour_status = "success";
        this.tesk_status = "basic";
      }
    })
  }

  // 切换配置------------------
  toggle_config(type){
    if (type === 'hour'){
      // 切换到目标工时配置
      this.hour_status = "success";
      this.tesk_status = "basic";
      this.router.navigate(["/pages/tongji/target_hour_config/hour_config"])
    }else{
      // 切换到试验任务配置
      this.hour_status = "basic";
      this.tesk_status = "success";
      this.router.navigate(["/pages/tongji/target_hour_config/tesk_config"])
    }
  }
}
