import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { colors } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-vehicle-voc',
  templateUrl: './equipment-vehicle-voc.component.html',
  styleUrls: ['./equipment-vehicle-voc.component.scss']
})
export class EquipmentVehicleVocComponent implements OnInit {

  deviceid = 'device_mts_04';

  //舱1
  cang_1 = {
    status:1,
    tempSet:0,
    rhSet:0,
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
      {name:'',value:'',unit:''},
      {name:'',value:'',unit:''},
      {name:'',value:'',unit:''},
      {name:'',value:'',unit:''},
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
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })




  }

  ngAfterViewInit(){
    this.initChart();
  }

  initChart(){
    if(document.getElementById('cabin_pie_1'))
      equipment_four_road.create_real_disk({value:50,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
      echarts.init(document.getElementById('cabin_pie_1')));
    if(document.getElementById('cabin_pie_2'))
      equipment_four_road.create_real_disk({value:50,text:this.language?'RealRH':'实时湿度',unit:'℃'},
      echarts.init(document.getElementById('cabin_pie_2')));
    if(document.getElementById('cabin_line_1')){
      let myChart_9 = echarts.init(document.getElementById('cabin_line_1'));;
      equipment_four_road.create_real_discharge({attrs:this.cang_1.attrs,xData:this.cang_1.xdata},myChart_9);
    }
  }




  ngOnDestroy(){

  }

}
