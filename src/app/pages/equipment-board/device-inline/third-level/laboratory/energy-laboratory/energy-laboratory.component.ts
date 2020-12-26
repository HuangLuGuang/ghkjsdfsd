import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-energy-laboratory',
  templateUrl: './energy-laboratory.component.html',
  styleUrls: ['./energy-laboratory.component.scss']
})
export class EnergyLaboratoryComponent implements OnInit {
  list = [
    {
      name:'电机-1',
      number:'S1013',
      andon:0,
      speed:[10],
      router:'pages/equipment/motor/电机系统测试台架-1/device_avlmotor_01',
    },
    {
      name:'电机-2',
      number:'S1014',
      andon:1,
      speed:[10],
      router:'pages/equipment/motor2/电机系统测试台架-2/device_avlmotor_02'
    },
    {
      name:'电机-3',
      number:'S1003',
      andon:3,
      speed:[10],
      router:'pages/equipment/motor3/电机系统测试台架-3/device_avlmotor_03'
    },
    {
      name:'电机-4',
      number:'S1010',
      andon:4,
      speed:[1],
      router:'pages/equipment/motor4/电机系统测试台架-4/device_avlmotor_04'
    },
    {
      name:'电机-5',
      number:'S1008',
      andon:5,
      speed:[10],
      router:''
    },
    {
      name:'电机-6',
      number:'S1011',
      andon:6,
      speed:[10],
      router:'pages/equipment/motor6/电机系统测试台架-6/six'
    },
    {
      name:'电机-7',
      number:'S1012',
      andon:0,
      speed:[10],
      router:'pages/equipment/motor7/电机系统测试台架-7/seven'
    },
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
        document.getElementById('head_title').innerText = '新能源与电子电气试验室';
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
