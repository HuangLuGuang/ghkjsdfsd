import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// my-echart
let first_level = require('../../../../../assets/pages/device-inline/js/first-level');
// let first_level = require('../../../../../assets/pages/device-inline/js/first-level');

// 全屏
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';
import { LayoutService } from '../../../../@core/utils';
import { EquipmentBoardService } from '../../serivice/equipment-board.service';

@Component({
  selector: 'ngx-first-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.scss']
})
export class FirstLevelComponent implements OnInit {

  is_not_fullscreen = true; // 是否处于全屏
  // 定时器
  currenttime_timer;

  constructor( private router: Router, private layoutService: LayoutService,
    private boardservice:EquipmentBoardService,private activateInfo:ActivatedRoute) { }

  ngOnInit(): void {

    this.layoutService.onInitLayoutSize().subscribe(f=>{
      let chian_map = document.querySelector('.chian_map');
      if(chian_map) echarts.init(chian_map).resize();
    })

    this.activateInfo.params.subscribe(f =>{
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '智慧实验室(G-iLAB)';
    })

    // map 地图

    // this.currenttime_timer = self.setInterval(this.currenttime, 1000);

    window.addEventListener('resize',this.resize)
    
  }
  
  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false});

    first_level.chian_map(this.eclick);
    setTimeout(() => {
      this.resize();
    }, 100);
  }

  resize=()=>{
    let chian_map = document.querySelector('.chian_map');
    if(chian_map) echarts.init(chian_map).resize();
    
  }

  ngOnDestroy(){
    var my_echart = echarts.init(document.querySelector('.chian_map'))
    my_echart.clear();
    my_echart.dispose();
  };

  // 返回首页
  gohome(){
    this.router.navigate(['/pages']);
  }

  // 全屏切换
  showAllTemplate(){
    var board = document.getElementsByTagName('ngx-equipment-board')[0];
    // const board = document.getElementById("rtmv2");
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
    // console.error("******************",params.data)
    // console.error("******************",params)
    if (params.seriesType === 'scatter') {
      // console.log("点击执行： ", params);
      // console.log("点击执行： ", params.seriesType);
      var store = require('store');
      store.set('first_level', JSON.stringify(params.data));
      // 跳转页面 _parent:在当前页面打开，_blank、默认：在新的窗口打开
      var lng = params.data[0];
      var lat = params.data[1];
      if (lng === 121.25158 && lat ===  30.342533){
        this.boardservice.sendLoad({close:true});
        this.router.navigate(['/pages/equipment/second-level']);
      }else{}
    }
}

  

}
