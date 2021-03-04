import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');


@Component({
  selector: 'ngx-equipment-shengwei',
  templateUrl: './equipment-shengwei.component.html',
  styleUrls: ['./equipment-shengwei.component.scss']
})
export class EquipmentShengweiComponent implements OnInit {
  deviceid_voc = 'device_cabin_voc01';
  deviceid_4m3 = 'device_4m3_01';

  data_4m3:any = {
    temperature_set:0,
    humidity_set:0,
  };
  data_4m3_chart = {
    attrs:[
      {
        name: "温度",nameEn :'Temp', unit: "℃",value: [2,4,5,7,8],
        color:[colors[0], colors[0]]
      },
      {
        name: "湿度",nameEn :'Hum', unit: "RH",value: [9,4,5,7,8],
        color:[colors[1], colors[1]]
      }
    ],
    xdata:[1,1,2,3,4,5,6,7]
  }

  data_voc:any = {};
  data_voc_chart = {
    attrs:[
      {
        name: "温度",nameEn :'Temp', unit: "℃",value: [2,4,5,7,8],
        color:[colors[0], colors[0]]
      },
      {
        name: "设定",nameEn :'Set', unit: "℃",value: [9,4,5,7,8],
        color:[colors[1], colors[1]]
      }
    ],
    xdata:[1,1,2,3,4,5,6,7]
  };

  imgsrc = {
    center:'assets/eimdoard/equipment/images/slz.png'
  }

  timer;
  subscribeList:any ={};
  language;
  constructor(private activateInfo:ActivatedRoute,
    private boardservice:EquipmentBoardService,
    private http:HttpserviceService) { }

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
    this.boardservice.sendLoad({close:false});
    this.getData();
  }

  resize=()=>{
    setTimeout(() => {
      ['cabin_pie_4','cabin_pie_5','line_chart_1','cabin_line_4'].forEach(f=>{
        let dom = document.getElementById(f);
        if(dom){
          echarts.init(dom).resize();
        }
      })
    }, 200);
  }


  getData(){
    let i = 0;
    this.timer = setInterval(()=>{
      this.fourMthree();
      this.voc();
      if(i %60 == 0){
        this.fourMthreeList();
        setTimeout(() => {
          this.vocList();
        }, 200);
      }
    },1000)
  }

  fourMthree(){
    let res,time,data:any = {};
    this.subscribeList._4400 = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.deviceid_4m3,arr:FmT.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res){
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      }
      this.data_4m3 = data;
      
      if(document.getElementById('cabin_pie_4'))
          equipment_four_road.create_motor_temperature({value:data.temperature_actual ||0,title:'温度',unit:'℃'},
          echarts.init(document.getElementById('cabin_pie_4')));
      
      if(document.getElementById('cabin_pie_5'))
          equipment_four_road.create_motor_temperature({value:data.humidity_actual ||0,title:'湿度',unit:'RH'},
          echarts.init(document.getElementById('cabin_pie_5')));
      // cabin_pie_4,cabin_pie_5
    });
  }

  fourMthreeList(){
    this.subscribeList.get_line_coolingWater = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {
      deviceid:this.deviceid_4m3,
      arr:'temperature_actual,humidity_actual'
    }).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;

      let xdata = [];
      this.data_4m3_chart.attrs[0].value = res[0].temperature_actual.map(m =>(m[0]|| 0));
      this.data_4m3_chart.attrs[1].value = res[1].humidity_actual.map(m =>(m[0]|| 0));
      if(this.data_4m3_chart.attrs[0].value.length > this.data_4m3_chart.attrs[1].value.length){
        xdata = res[0].temperature_actual.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }else{
        xdata = res[1].humidity_actual.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }
      this.data_4m3_chart.xdata = xdata;
      if(document.getElementById('cabin_line_4'))
        equipment_four_road.create_real_discharge({attrs:this.data_4m3_chart.attrs,xData:this.data_4m3_chart.xdata},
        echarts.init(document.getElementById('cabin_line_4')));

    })
  }

  voc(){
    let res,time,data:any = {};
    this.subscribeList._4400 = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.deviceid_voc,arr:voc.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res){
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      }
      this.data_voc = data;



    });
  }

  vocList(){  
    this.subscribeList.get_line_coolingWater = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {
      deviceid:this.deviceid_voc,
      arr:'temperature_actual,testing_temperature_set'
    }).subscribe((f:any)=>{
          if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;

      let xdata = [];

      this.data_voc_chart.attrs[0].value = res[0].temperature_actual.map(m =>(m[0]|| 0));
      this.data_voc_chart.attrs[1].value = res[1].testing_temperature_set.map(m =>(m[0]|| 0));
      if(this.data_voc_chart.attrs[0].value.length > this.data_voc_chart.attrs[1].value.length){
        xdata = res[0].temperature_actual.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }else{
        xdata = res[1].testing_temperature_set.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }
      this.data_voc_chart.xdata = xdata;
      if(document.getElementById('line_chart_1'))
        equipment_four_road.create_real_discharge({attrs:this.data_voc_chart.attrs,xData:this.data_voc_chart.xdata},
        echarts.init(document.getElementById('line_chart_1')));

    });
  }


  getdevices(){
    return this.deviceid_voc+','+this.deviceid_4m3;
  }

  ngOnDestroy(){
    clearInterval(this.timer);
    ['cabin_pie_4','cabin_pie_5','line_chart_1','cabin_line_4'].forEach(f=>{
      let dom = document.getElementById(f);
      if(dom){
        echarts.init(dom).dispose();
      }
    })
  }
} 

export const FmT = [
  'humidity_actual',//湿度
  'humidity_set',//湿度设定值
  'temperature_actual',//温度
  'temperature_set',//温度设定值
];


export const voc = [
  'temperature_actual',//温度
  'testing_temperature_set',//温度设定值
  'heating_time_set',//升温设定值
  'testing_time_set',//测试事件设定值
  'beep_time_set',//蜂鸣时间设定值
  'pressure',//压力

  'warning',//报警状态

  'heating_output_power',//功率


]