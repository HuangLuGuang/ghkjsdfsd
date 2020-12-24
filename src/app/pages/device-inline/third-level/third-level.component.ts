import { Component, OnInit } from '@angular/core';


// 全屏
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';

@Component({
  selector: 'ngx-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.scss']
})
export class ThirdLevelComponent implements OnInit {

  is_not_fullscreen = true; // 是否处于全屏

  constructor() { }

  ngOnInit(): void {
  }

  // 全屏切换
  showAllTemplate(){
    const board = document.getElementById("rtmv2");
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board);
    }

    
  };

}
