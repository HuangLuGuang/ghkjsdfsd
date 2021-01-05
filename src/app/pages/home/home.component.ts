import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../@core/utils';

let home = require('../../../assets/pages/home/js/home');

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      let chian_map = document.querySelector('.home_chian_map');
      if(chian_map) echarts.init(chian_map).resize();
    })

    window.addEventListener('resize',this.resize);
  }

  ngAfterViewInit(){
    home.chian_map();
    setTimeout(() => {
      this.resize();
    }, 100);
  }

  resize=()=>{
    let chian_map = document.querySelector('.home_chian_map');
    if(chian_map) echarts.init(chian_map).resize();
  }

}
