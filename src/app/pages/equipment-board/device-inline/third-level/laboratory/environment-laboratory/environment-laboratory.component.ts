import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-environment-laboratory',
  templateUrl: './environment-laboratory.component.html',
  styleUrls: ['./environment-laboratory.component.scss']
})
export class EnvironmentLaboratoryComponent implements OnInit {

  list = [
    {
      name:'AVL耐久2驱-1',
      number:'S1060',
      andon:0,
      speed:[10],
      router:'pages/equipment/twodrive/两驱底盘测功机-1/device_avldyno_01',
    },
    {
      name:'AVL耐久2驱-2',
      number:'S1060',
      andon:1,
      speed:[10],
      router:'pages/equipment/twodrive/两驱底盘测功机-1/device_avldyno_02'
    },
    {
      name:'AVL耐久4驱',
      number:'S1060',
      andon:3,
      speed:[10],
      router:''
    },
    {
      name:'AVL排放2驱',
      number:'S1070',
      andon:4,
      speed:[1],
      router:'pages/equipment/avl/AVL转毂+久鼎环境舱+排放分析'
    },
    {
      name:'AVL环模四驱',
      number:'S1070',
      andon:5,
      speed:[10],
      router:'pages/equipment/central-jinhua/中置式四驱底盘测功机+锦华高低温环境舱'
    },
    {
      name:'AVL排放2驱',
      number:'S1074',
      andon:6,
      speed:[10],
      router:'pages/equipment/avl-etec/两驱AVL转毂+ATEC环境舱+排放分析/two'
    },
    {
      name:'AVL排放4驱',
      number:'S1074',
      andon:0,
      speed:[10],
      router:'pages/equipment/avl-etec2/四驱AVL转毂+ATEC环境舱+排放分析/four'
    },
    {
      name:'常温浸车舱',
      number:'S1071',
      other:{
        name:'ATEC舱',
        number:'S1074',
        andon:0,
        speed:[10],
      },
      andon:0,
      type:'multiple',
      router:'pages/equipment/monitoring/环境舱集中监控'
    }
  ]
  @ViewChild('left')left:any;
  @ViewChild('right')right:any;
    //安灯状态
  andon = [
      {name:'运行',color:'green',t:1},
      {name:'空闲',color:'blue',t:3},
      {name:'占位',color:'yellow',t:2},
      {name:'维修',color:'red',t:4},
  ];
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '环境实验室';
  }

  ngAfterViewInit(){
    setTimeout(() => {
      
      this.left.initDeviceCircula({running:1,stop:1,placeon:1,warning:1},'left_chart_1','当月','安灯状态');
      this.left.initDeviceCircula({running:1,stop:1,placeon:1,warning:1},'left_chart_2','上个月','安灯状态');
      this.left.initDeviceCircula({running:1,stop:1,placeon:1,warning:1},'left_chart_3','上年均值','');
      this.left.initDeviceStatus( [[1],[1],[1],[1],[1]],[1,2,2,3,4,5,6,7]);
      this.right.initChart();
    }, 1000);
  }

  goto_borad(map){
    console.log(map.router)
    if(map.router)this.router.navigate([map.router]);
  }

}
