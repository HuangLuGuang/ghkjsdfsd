import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../@core/utils';

import { NgZone } from '@angular/core';

let home = require('../../../assets/pages/home/js/home');

declare let $;



@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myChart;
  constructor(private layoutService: LayoutService,private ngZone: NgZone) { }


  ngOnInit(): void {
    this.createEchart();
    // this.myChart = echarts.init(document.querySelector('.home_chian_map'))
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.myChart.clear();
      this.myChart.dispose();
      if (this.myChart.isDisposed()){ // 是否被释放
        this.createEchart();
        home.chian_map(this.myChart);
        this.resize();
      }else{
        console.error("home示例未被释放")
      }


      // let chian_map = document.querySelector('.home_chian_map');
      // if(chian_map) echarts.init(chian_map).resize();
    })
    
    window.addEventListener('resize',this.resize);
  }
  createEchart() {
    // return this.ngZone.runOutsideAngular(() => {this.myChart = echarts.init(document.querySelector('.home_chian_map'))});
    this.ngZone.runOutsideAngular(() => {this.myChart = echarts.init(document.querySelector('.home_chian_map'))});
  }

  ngOnDestroy(){
    // var my_echart = echarts.init(document.querySelector('.home_chian_map'))
    this.myChart.clear();
    this.myChart.dispose();
    // my_echart.clear();
    // my_echart.dispose();
  }

  ngAfterViewInit(){
    home.chian_map(this.myChart);
    this.resize();
  }

  resize=()=>{
    this.myChart.resize();
    // let chian_map = document.querySelector('.home_chian_map');
    // if(chian_map) echarts.init(chian_map).resize();
  }

}
