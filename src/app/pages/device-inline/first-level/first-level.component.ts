import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// my-echart
let first_level = require('../../../../assets/pages/device-inline/js/first-level');

// 全屏
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';
import { LayoutService } from '../../../@core/utils';

@Component({
  selector: 'ngx-first-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.scss']
})
export class FirstLevelComponent implements OnInit {

  is_not_fullscreen = true; // 是否处于全屏
  // 定时器
  currenttime_timer;

  constructor( private router: Router, private layoutService: LayoutService) { }

  ngOnInit(): void {

    this.layoutService.onInitLayoutSize().subscribe(f=>{
      let chian_map = document.querySelector('.chian_map');
      if(chian_map) echarts.init(chian_map).resize();
    })

    // map 地图
    first_level.chian_map(this.eclick);

    // this.currenttime_timer = setInterval(this.currenttime, 1000);
    
  }

  ngOnDestroy(){
    // clearInterval(this.currenttime_timer); // 销毁组件时，取消定时任务

  };

  // 返回首页
  gohome(){
    this.router.navigate(['/pages']);
  }

  // 全屏切换
  showAllTemplate(){
    const board = document.getElementById("rtmv2");
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board)
    }
    setTimeout(() => {
      let chian_map = document.querySelector('.chian_map');
      if(chian_map) echarts.init(chian_map).resize();
      
    }, 500);
  };

  // 时间展示
  currenttime(){
    var dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var CurrentTime = document.querySelector('.currenttime');
    CurrentTime.innerHTML = y + '-' + mt + '-' + day + '  ' + h + ':' + m + ':' + s;
  }

  // 跳转到二级
  eclick=(params)=> {
    if (params.seriesType === 'scatter') {
      console.log("点击执行： ", params);
      console.log("点击执行： ", params.seriesType);
      var store = require('store');
      store.set('first_level', JSON.stringify(params.data));
      // 跳转页面 _parent:在当前页面打开，_blank、默认：在新的窗口打开
      this.router.navigate(['/pages/deviceinline/second-level']);
    }
}

  

}
