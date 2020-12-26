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

}
