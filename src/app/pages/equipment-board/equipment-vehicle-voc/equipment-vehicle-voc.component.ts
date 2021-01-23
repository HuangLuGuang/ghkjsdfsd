import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { colors, create_img_16_9 } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-vehicle-voc',
  templateUrl: './equipment-vehicle-voc.component.html',
  styleUrls: ['./equipment-vehicle-voc.component.scss']
})
export class EquipmentVehicleVocComponent implements OnInit {

  deviceid = 'device_auto_voc01';

  //舱1
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

  //舱2
  cang_2 = {
    status:1,
    tempSet:0,
    rhSet:0,
    tempReal:50,
    rhReal:50,
    inner:0,//内循环
    exhaust:0,//强排气
    outside:0,//外循环
    fan:0,//尾气排扇
    attrs:[
      { 
        name: "温度",nameEn :'Temp', unit: "℃",value: [2],
        color:[colors[0], colors[0]]
      },
      { 
        name: "湿度",nameEn :'RH', unit: "RH",value: [2],
        color:[colors[1], colors[1]]
      },
    ],
    xdata:['2020-10-10']
  };

  //舱3
  cang_3 = {
    status:1,
    tempSet:0,
    rhSet:0,
    tempReal:0,
    rhReal:0,
    inner:0,//内循环
    exhaust:0,//强排气
    outside:0,//外循环
    fan:0,//尾气排扇
    attrs:[
      { 
        name: "温度",nameEn :'Temp', unit: "℃",value: [2],
        color:[colors[0], colors[0]]
      },
      { 
        name: "湿度",nameEn :'RH', unit: "RH",value: [2],
        color:[colors[1], colors[1]]
      },
    ],
    xdata:['2020-10-10']
  };


  //舱加热
  cang_hot = {
    status:1,
    list:[
      {name:'红外顶板',value:50,unit:'℃'},
      {name:'',value:'',unit:''},
      {name:'红外侧板1',value:50,unit:'%RH'},
      {name:'红外侧板3',value:50,unit:'℃'},
      {name:'红外侧板1',value:50,unit:'RH'},
      {name:'红外侧板3',value:50,unit:'℃'},
    ]
  }
  imgsrc = {
    center:'assets/eimdoard/equipment/images/slz.png'
  }

  subscribeList:any={};//订阅

  language;

  constructor(private activateInfo:ActivatedRoute,
    private boardservice:EquipmentBoardService) { }

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
    this.initChart();
    this.boardservice.sendLoad({close:false})
    setTimeout(() => {
      create_img_16_9();
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

    if(document.getElementById('cabin_pie_3'))
      equipment_four_road.create_real_disk({value:this.cang_2.tempReal,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
      echarts.init(document.getElementById('cabin_pie_3')));
    if(document.getElementById('cabin_pie_4'))
      equipment_four_road.create_real_disk({value:this.cang_2.rhReal,text:this.language?'RealRH':'实时湿度',unit:'℃'},
      echarts.init(document.getElementById('cabin_pie_4')));
    if(document.getElementById('cabin_line_2')){
      let myChart_9 = echarts.init(document.getElementById('cabin_line_2'));;
      equipment_four_road.create_real_discharge({attrs:this.cang_2.attrs,xData:this.cang_2.xdata},myChart_9);
    }

    if(document.getElementById('cabin_pie_5'))
      equipment_four_road.create_real_disk({value:this.cang_3.tempReal,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
      echarts.init(document.getElementById('cabin_pie_5')));
    if(document.getElementById('cabin_pie_6'))
      equipment_four_road.create_real_disk({value:this.cang_3.rhReal,text:this.language?'RealRH':'实时湿度',unit:'℃'},
      echarts.init(document.getElementById('cabin_pie_6')));
    if(document.getElementById('cabin_line_3')){
      let myChart_9 = echarts.init(document.getElementById('cabin_line_3'));;
      equipment_four_road.create_real_discharge({attrs:this.cang_3.attrs,xData:this.cang_3.xdata},myChart_9);
    }
  }

  resize=()=>{
    setTimeout(() => {
      let chart;
      [
        'cabin_pie_1','cabin_pie_2','cabin_pie_3',
        'cabin_pie_4','cabin_pie_5','cabin_pie_6',
        'cabin_line_1','cabin_line_2','cabin_line_3'
      ].forEach(f=>{
        chart = document.getElementById(f);
        if(chart)echarts.init(chart).resize();
      })
    }, 500);
  }




  ngOnDestroy(){



    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }

    let chart;
    [
      'cabin_pie_1','cabin_pie_2','cabin_pie_3',
      'cabin_pie_4','cabin_pie_','cabin_pie_6',
      'cabin_line_1','cabin_line_2','cabin_line_3'
    ].forEach(f=>{
      chart = document.getElementById(f);
      if(chart)echarts.init(chart).dispose();
    })

  }

}
