import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

// my-echart
let second_level = require('../../../../../assets/pages/device-inline/js/second-level');

// 全屏
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';
import { LayoutService } from '../../../../@core/utils';
import { Router } from '@angular/router';
import { EquipmentBoardService } from '../../serivice/equipment-board.service';

declare let $;

@Component({
  selector: 'ngx-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.scss']
})
export class SecondLevelComponent implements OnInit {

  first_level;

  is_not_fullscreen = true; // 是否处于全屏

  // 定时器
  currenttime_timer;

  constructor(
    private localstorage:LocalStorageService,
    private layoutService: LayoutService,
    private router:Router,
    private boardservice:EquipmentBoardService
  ) {
    // 得到从first-leve级传递的数据
    this.first_level = this.localstorage.get("first_level");
    console.log("得到从first-leve级传递的数据: ", this.first_level)
   }

  ngOnInit(): void {

    var title = "吉利汽车研究院"
    $("#head_title").text(title)

    this.layoutService.onInitLayoutSize().subscribe(f=>{
      let key_index = document.querySelector('.key-index');
      if(key_index) echarts.init(key_index).resize();
      let device_rate = document.querySelector('.device-rate');
      if(device_rate) echarts.init(device_rate).resize();
      

      let geely_info = document.querySelector('.geely-info');
      if(geely_info) echarts.init(geely_info).resize();
    })



    
  }

  ngAfterViewInit(){
    

    // 关键指标
    second_level.key_index();
    // 设备开动率、完好lv
    second_level.device_rate(70);
    setTimeout(() => {
      let key_index = document.querySelector('.key-index');
      if(key_index) echarts.init(key_index).resize();
      let device_rate = document.querySelector('.device-rate');
      if(device_rate) echarts.init(device_rate).resize();
      
    }, 100);
    this.boardservice.sendLoad({close:false})
  }

  

  ngOnDestroy(){
    let key_index = document.querySelector('.key-index');
    if(key_index) echarts.init(key_index).dispose();
    let device_rate = document.querySelector('.device-rate');
    if(device_rate) echarts.init(device_rate).dispose();
  }

  // 跳转到具体的结构，
  goto_test_room(testname){
    console.log("跳转到具体的结构试验室:", testname)
    setTimeout(() => {
      switch(testname){
        case 'newpower':
        // case 'electrical':
          this.router.navigate(['pages/equipment/third-level/energy']);
          this.boardservice.sendLoad({close:true})
          break;
        case 'environment':
          this.router.navigate(['pages/equipment/third-level/environment']);
          this.boardservice.sendLoad({close:true})
          break;
        case 'structural':
          this.router.navigate(['pages/equipment/third-level/structural']);
          this.boardservice.sendLoad({close:true})
          break;
      }
    }, 100);
    
  }



  // 全屏切换
  showAllTemplate(){
    const board = document.getElementById("rtmv2");
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board);
      
    }

    setTimeout(() => {
      let key_index = document.querySelector('.key-index');
      if(key_index) echarts.init(key_index).resize();
      let device_rate = document.querySelector('.device-rate');
      if(device_rate) echarts.init(device_rate).resize();
      
  
      let geely_info = document.querySelector('.geely-info');
      if(geely_info) echarts.init(geely_info).resize();
      
    }, 500);
    
   


  };

  // 返回首页
  gohome(){}



  // 监听窗口变化来，重置echat的大小！
  listen_windows_resize(){
    window.onreset = function (){

      let key_index = document.querySelector('.key-index');
      if(key_index) echarts.init(key_index).resize();
      let device_rate = document.querySelector('.device-rate');
      if(device_rate) echarts.init(device_rate).resize();


      let geely_info = document.querySelector('.geely-info');
      if(geely_info) echarts.init(geely_info).resize();
    }
  }

}
