import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { colors, create_img_16_9 } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-skylight-open-close',
  templateUrl: './equipment-skylight-open-close.component.html',
  styleUrls: ['./equipment-skylight-open-close.component.scss'],
  // 
})
export class EquipmentSkylightOpenCloseComponent implements OnInit {
  deviceid = 'device_mts_04';

  //ATEC-舱
  cang_1 = {
    status:1,
    tempSet:0,
    rhSet:0,
    tempReal:50,
    rhReal:50,
    attrs:[
      { 
        name: "温度",nameEn :'Temp', unit: "℃",value: [2,4,5,7,8],
        color:[colors[0], colors[0]]
      },
      { 
        name: "湿度",nameEn :'RH', unit: "RH",value: [2,4,5,5,5],
        color:[colors[1], colors[1]]
      },
    ],
    xdata:['2020-10-10','2020-10-10','2020-10-10','2020-10-10','2020-10-10']
  };

  //电流
  current = {
    xdata:['2020-10-10','2020-10-10','2020-10-10','2020-10-10','2020-10-10'],
    attrs:[
      { 
        name: "电流",nameEn :'Current', unit: "",value: [2,4,5,7,8],
        color:[colors[0], colors[0]]
      },
    ],
  }

  //电压
  voltage = {
    xdata:['2020-10-10','2020-10-10','2020-10-10','2020-10-10','2020-10-10'],
    attrs:[
      { 
        name: "电压",nameEn :'Voltage', unit: "",value: [2,4,5,7,8],
        color:[colors[0], colors[0]]
      },
    ],
  }

  imgsrc = {
    center:'assets/eimdoard/equipment/images/slz.png',
    car:'assets/eimdoard/equipment/images/yellow_car.png',
  }
  subscribeList:any = {};

  language;//语言

  constructor(private activateInfo:ActivatedRoute,
    private boardservice:EquipmentBoardService,) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    

    //订阅路由返回的标题
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })

    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.resize();
    })
  }


  ngAfterViewInit(){
    setTimeout(() => {
      this.boardservice.sendLoad({close:false});
      this.initChart();
      create_img_16_9();
    }, 500);
  }

  resize=()=>{
    setTimeout(() => {
      let chart;
      [
        'cabin_pie_1','cabin_pie_2','cabin_line_1',
        'current','voltage','progress_1','progress_2',
        'progress_3','progress_4','progress_5','progress_6'
      ].forEach(f=>{
        chart = document.getElementById(f);
        if(chart)echarts.init(chart).resize();
      })
      
    }, 500);
  }

  initChart(){
    if(document.getElementById('cabin_pie_1'))
      equipment_four_road.create_real_disk({value:this.cang_1.tempReal,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
      echarts.init(document.getElementById('cabin_pie_1')));
    if(document.getElementById('cabin_pie_2'))
      equipment_four_road.create_real_disk({value:this.cang_1.rhReal,text:this.language?'RealRH':'实时湿度',unit:'℃'},
      echarts.init(document.getElementById('cabin_pie_2')));
    if(document.getElementById('cabin_line_1')){
      let myChart_9 = echarts.init(document.getElementById('cabin_line_1'));;
      equipment_four_road.create_real_discharge({attrs:this.cang_1.attrs,xData:this.cang_1.xdata},myChart_9);
    }

    if(document.getElementById('current')){
      let myChart_9 = echarts.init(document.getElementById('current'));;
      equipment_four_road.create_real_discharge({attrs:this.current.attrs,xData:this.current.xdata},myChart_9);
    }

    if(document.getElementById('voltage')){
      let myChart_9 = echarts.init(document.getElementById('voltage'));
      equipment_four_road.create_real_discharge({attrs:this.voltage.attrs,xData:this.voltage.xdata},myChart_9);
    }

    ['progress_1','progress_2','progress_3','progress_4','progress_5','progress_6'].forEach(f=>{
      if(document.getElementById(f))
            equipment_four_road.progress({plan:100,now:50},echarts.init(document.getElementById(f)));
    })
  }

  ngOnDestroy(){
    let chart;
    [
      'cabin_pie_1','cabin_pie_2','cabin_line_1',
      'current','voltage','progress_1','progress_2',
      'progress_3','progress_4','progress_5','progress_6'
    ].forEach(f=>{
      chart = document.getElementById(f);
      if(chart)echarts.init(chart).dispose();
    })
  }

}
