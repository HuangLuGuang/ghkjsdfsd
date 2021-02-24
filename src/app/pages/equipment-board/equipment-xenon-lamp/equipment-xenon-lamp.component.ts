import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-xenon-lamp',
  templateUrl: './equipment-xenon-lamp.component.html',
  styleUrls: ['./equipment-xenon-lamp.component.scss']
})
export class EquipmentXenonLampComponent implements OnInit {

  deviceid_4000 = 'device_atlas_4000';
  deviceid_4400 = 'device_atlas_4400';

  //纯水
  line_chart_1 = {
    tempset:0,
    conductivity:0,
    attrs:[
      { 
        name: "温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[0], colors[0]]
      },
    ],
    xdata:[]
  }

  //温度 4400
  line_chart_2={
    attrs:[
      { 
        name: "温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[0], colors[0]]
      },
    ],
    xdata:[]
  }

  // 照度曲线 4400
  illuminance = {
    power:20,
    radioactivity1:20,
    radioactivity2:20,
    attrs:[
      { 
        name: "辐照度1",nameEn :'辐照度1', unit: "MJ/㎡",value: [],
        color:[colors[0], colors[0]]
      },
      { 
        name: "辐照度2",nameEn :'辐照度2', unit: "MJ/㎡",value: [],
        color:[colors[1], colors[1]]
      },
    ],
    xdata:[]

  }

  //温湿度 4400
  tempHumid = {
    tempSet:0,
    rhSet:0,
    temp:0,
    hum:0,
    attrs:[
      {
        name: "温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[0], colors[0]]
      },
      {
        name: "湿度",nameEn :'Hum', unit: "RH",value: [],
        color:[colors[1], colors[1]]
      }
    ],
    xdata:[]
  }

  // 照度曲线 4000
  illuminance_4000 ={
    power:20,
    radioactivity1:0,
    radioactivity2:0,
    attrs:[
      { 
        name: "辐照度1",nameEn :'辐照度1', unit: "MJ/㎡",value: [2,4,5,7,8],
        color:[colors[0], colors[0]]
      },
      { 
        name: "辐照度2",nameEn :'辐照度2', unit: "MJ/㎡",value: [2,4,5,7,8],
        color:[colors[1], colors[1]]
      },
    ],
    xdata:[1,2,3,4,5,6,7,8,9]
  }

  //温湿度 4000
  tempHumid_4000 = {
    tempSet:0,
    rhSet:0,
    temp:0,
    hum:0,
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





  subscribeList:any = {};
  language;
  timer;

  constructor(private activateInfo:ActivatedRoute,private boardservice:EquipmentBoardService,
    private http:HttpserviceService,private ngzone:NgZone) { }

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
    setTimeout(() => {
      this.initChart();
    }, 10);
    let i = 0;
    this.timer = setInterval(()=>{
      this.get_4400();
      this.get_4000();
      if(i%60 == 0){
        setTimeout(() => {
          this.get_4400_list();
        }, 10);
        this.get_4000_list();
      }
      i++;
    },1000)
    // this.get_4400_illuminance();
  }


  // get_4400_illuminance(){
  //   // SELECT xenon_realtime_list('{"deviceid":device_atlas_4400}')
  //   this.http.callRPC('device_realtime_list',library+'device_realtime_list',
  //   {deviceid:"device_avlmotor_02",arr:'speed'}).subscribe((f:any)=>{
  //     if(f.result.error || f.result.message[0].code == 0)return;
  //     let res = f.result.message[0].message;
  //     console.log(res)
  //     // res.forEach(el => {
  //     //     this.illuminance.xdata.push(el.dates);
  //     //     this.illuminance.attrs[0].value.push(el.tr_irradiance1);
  //     //     this.illuminance.attrs[0].value.push(el.tr_irradiance2);
  //     // });
  //     res[0].speed.forEach(el => {
  //       this.illuminance.xdata.push(el[1]);
  //         this.illuminance.attrs[0].value.push(el[0]);
  //     });
  //     if(document.getElementById('line_chart_2')){
  //         let myChart_9 = echarts.init(document.getElementById('line_chart_2'));;
  //         equipment_four_road.create_real_discharge({attrs:this.illuminance.attrs,xData:this.illuminance.xdata},myChart_9);
  //     }
  //   })
  // }

  get_4400(){
    let res,time,data:any = {};
    this.subscribeList._4400 = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.deviceid_4400,arr:d_4400.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      //纯水温度导电率
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          this.line_chart_1.tempset = data.c_cooling_water_temperature|| 0;
          this.line_chart_1.tempset = data.tr_water_resistivity|| 0;
        });
      }, 10);

      //辐照
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          
          this.illuminance.power = data.tr_lamp_power|| 0;
          this.illuminance.radioactivity1 = data.tr_irradiance1|| 0;
          this.illuminance.radioactivity2 = data.tr_irradiance2|| 0;
          
          if(document.getElementById('pie_chart_1'))
              equipment_four_road.create_motor_temperature({value:this.illuminance.power,title:'功率',unit:'P'},
              echarts.init(document.getElementById('pie_chart_1')));
          
          if(document.getElementById('pie_chart_2'))
              equipment_four_road.create_motor_temperature({value:this.illuminance.radioactivity1,title:'辐照度1',unit:'MJ/㎡'},
              echarts.init(document.getElementById('pie_chart_2')));
          
          if(document.getElementById('pie_chart_3'))
              equipment_four_road.create_motor_temperature({value:this.illuminance.radioactivity2,title:'辐照度2',unit:'MJ/㎡'},
              echarts.init(document.getElementById('pie_chart_3')));
        });
      },10)

      //箱体空气温湿度
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          this.tempHumid.tempSet = data.trps_chamber_temperature_set_point || 0;
          this.tempHumid.temp = data.tr_chamber_temperature || 0;
          this.tempHumid.rhSet = data.trps_relative_humidity_set_point || 0;
          this.tempHumid.hum = data.tr_relative_humidity || 0;

          if(document.getElementById('cabin_pie_1'))
              equipment_four_road.create_motor_temperature({value:this.tempHumid.temp,title:'温度',unit:'℃'},
              echarts.init(document.getElementById('cabin_pie_1')));

          if(document.getElementById('cabin_pie_2'))
              equipment_four_road.create_motor_temperature({value:this.tempHumid.hum,title:'湿度',unit:'RH'},
              echarts.init(document.getElementById('cabin_pie_2')));
        });
      }, 10);
    })
  }

  get_4400_list(){
    this.subscribeList.get_line_coolingWater = this.http.callRPC('device_realtime_list_4400',library+'device_realtime_list_4400',
    {
      deviceid:this.deviceid_4400,
      arr:'tr_water_temperature,tr_irradiance1,tr_irradiance2,tr_chamber_temperature,tr_relative_humidity'
    }).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          let xdata = [];
          let data = [];
          res[0].tr_water_temperature.forEach(el => {
            data.push(el[0]|| 0);
            xdata.push(dateformat(new Date(rTime(el[1])),'hh:mm:ss'));
          });
          this.line_chart_1.attrs[0].value = data;
          this.line_chart_1.xdata = xdata;
          if(document.getElementById('line_chart_1')){
            let myChart_9 = echarts.init(document.getElementById('line_chart_1'));;
            equipment_four_road.create_real_discharge({attrs:this.line_chart_1.attrs,xData:this.line_chart_1.xdata},myChart_9);
          }
        });
      }, 10);

      setTimeout(() => {
        let xdata_2 = [];
        this.ngzone.runOutsideAngular(()=>{
          this.illuminance.attrs[0].value = res[1].tr_irradiance1.map(m =>(m[0]|| 0));
          this.illuminance.attrs[1].value = res[2].tr_irradiance2.map(m =>(m[0]|| 0));
          if(this.illuminance.attrs[1].value.length > this.illuminance.attrs[0].value.length){
            xdata_2 = res[2].tr_irradiance2.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          }else{
            xdata_2 = res[1].tr_irradiance1.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          }
          this.illuminance.xdata = xdata_2;
          if(document.getElementById('line_chart_2')){
            let myChart_9 = echarts.init(document.getElementById('line_chart_2'));;
            equipment_four_road.create_real_discharge({attrs:this.illuminance.attrs,xData:this.illuminance.xdata},myChart_9);
          }
        });
      },20);

      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          let xdata_3 = [];
          this.tempHumid.attrs[0].value = res[3].tr_chamber_temperature.map(m =>(m[0]|| 0));
          this.tempHumid.attrs[1].value = res[4].tr_relative_humidity.map(m =>(m[0]|| 0));
          if(this.tempHumid.attrs[0].value.length > this.tempHumid.attrs[1].value.length){
            xdata_3 = res[3].tr_chamber_temperature.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          }else{
            xdata_3 = res[4].tr_relative_humidity.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          }
          this.tempHumid.xdata = xdata_3;
          if(document.getElementById('cabin_line_3'))
            equipment_four_road.create_real_discharge({attrs:this.tempHumid.attrs,xData:this.tempHumid.xdata},
            echarts.init(document.getElementById('cabin_line_3')));
        })
      }, 30);
      
    })
  }

  get_4000(){
    let res,time,data:any = {};
    this.subscribeList._4000 = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.deviceid_4000,arr:d_4000.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });

      //辐照
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          this.illuminance_4000.power = data.lamppower ||0;
          this.illuminance_4000.radioactivity1 = data.data_340nm ||0;
          this.illuminance_4000.radioactivity2 = data.data_420nm ||0;
          
          if(document.getElementById('pie_chart_4'))
              equipment_four_road.create_motor_temperature({value:this.illuminance_4000.power,title:'功率',unit:'kw'},
              echarts.init(document.getElementById('pie_chart_4')));

          if(document.getElementById('pie_chart_5'))
              equipment_four_road.create_motor_temperature({value:this.illuminance_4000.radioactivity1,title:'辐照度1',unit:'MJ/㎡'},
              echarts.init(document.getElementById('pie_chart_5')));

          if(document.getElementById('pie_chart_6'))
              equipment_four_road.create_motor_temperature({value:this.illuminance_4000.radioactivity2,title:'辐照度2',unit:'MJ/㎡'},
              echarts.init(document.getElementById('pie_chart_6')));
        })
      }, 10);

      //温湿度
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          this.tempHumid_4000.temp = data.cht||0;
          this.tempHumid_4000.hum = data.rh||0;
          this.tempHumid_4000.tempSet = data.bst||0;
          this.tempHumid_4000.rhSet = data.bpt||0;

          

          if(document.getElementById('cabin_pie_4'))
              equipment_four_road.create_motor_temperature({value:this.tempHumid_4000.temp,title:'温度',unit:'℃'},
              echarts.init(document.getElementById('cabin_pie_4')));
          
          if(document.getElementById('cabin_pie_5'))
              equipment_four_road.create_motor_temperature({value:this.tempHumid_4000.hum,title:'湿度',unit:'RH'},
              echarts.init(document.getElementById('cabin_pie_5')));
          
          
        })
      }, 10);
      
    });
  }

  get_4000_list(){
    this.subscribeList.get_line_coolingWater = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {
      deviceid:this.deviceid_4000,
      arr:'data_340nm,data_420nm,cht,rh'
    }).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;

      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          let xdata = [];
          this.illuminance_4000.attrs[0].value = res[0].data_340nm.map(m =>(m[0]|| 0));
          this.illuminance_4000.attrs[1].value = res[1].data_420nm.map(m =>(m[0]|| 0));
          if(this.illuminance_4000.attrs[0].value.length > this.illuminance_4000.attrs[1].value.length){
            xdata = res[0].data_340nm.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          }else{
            xdata = res[1].data_420nm.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          }
          this.illuminance_4000.xdata = xdata;
          if(document.getElementById('line_chart_3')){
            let myChart_9 = echarts.init(document.getElementById('line_chart_3'));;
            equipment_four_road.create_real_discharge({attrs:this.illuminance_4000.attrs,xData:this.illuminance_4000.xdata},myChart_9);
          }
        })
      }, 10);

      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          let xdata = [];
          this.tempHumid_4000.attrs[0].value = res[2].cht.map(m =>(m[0]|| 0));
          this.tempHumid_4000.attrs[1].value = res[3].rh.map(m =>(m[0]|| 0));
          if(this.tempHumid_4000.attrs[0].value.length > this.tempHumid_4000.attrs[1].value.length){
            xdata = res[2].cht.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          }else{
            xdata = res[3].rh.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          }
          this.tempHumid_4000.xdata = xdata;
          if(document.getElementById('cabin_line_4'))
              equipment_four_road.create_real_discharge({attrs:this.tempHumid_4000.attrs,xData:this.tempHumid_4000.xdata},
              echarts.init(document.getElementById('cabin_line_4')));
        });
      })
    });
  }

  initChart(){
    if(document.getElementById('line_chart_1')){
      let myChart_9 = echarts.init(document.getElementById('line_chart_1'));;
      equipment_four_road.create_real_discharge({attrs:this.line_chart_1.attrs,xData:this.line_chart_1.xdata},myChart_9);
    }
    if(document.getElementById('pie_chart_1'))
        equipment_four_road.create_motor_temperature({value:this.illuminance.power,title:'功率',unit:'kw'},
        echarts.init(document.getElementById('pie_chart_1')));
    
    if(document.getElementById('pie_chart_2'))
        equipment_four_road.create_motor_temperature({value:this.illuminance.radioactivity1,title:'辐照度1',unit:'MJ/㎡'},
        echarts.init(document.getElementById('pie_chart_2')));
    
    if(document.getElementById('pie_chart_3'))
        equipment_four_road.create_motor_temperature({value:this.illuminance.radioactivity2,title:'辐照度2',unit:'MJ/㎡'},
        echarts.init(document.getElementById('pie_chart_3')));

    // if(document.getElementById('line_chart_2')){
    //   let myChart_9 = echarts.init(document.getElementById('line_chart_2'));;
    //   equipment_four_road.create_real_discharge({attrs:this.illuminance.attrs,xData:this.illuminance.xdata},myChart_9);
    // }

    if(document.getElementById('cabin_pie_1'))
        equipment_four_road.create_motor_temperature({value:this.tempHumid.temp,title:'温度',unit:'℃'},
        echarts.init(document.getElementById('cabin_pie_1')));

    if(document.getElementById('cabin_pie_2'))
        equipment_four_road.create_motor_temperature({value:this.tempHumid.hum,title:'湿度',unit:'RH'},
        echarts.init(document.getElementById('cabin_pie_2')));

    // if(document.getElementById('cabin_line_3'))
    //     equipment_four_road.create_real_discharge({attrs:this.tempHumid.attrs,xData:this.tempHumid.xdata},
    //     echarts.init(document.getElementById('cabin_line_3')));

// ________________4000
    if(document.getElementById('pie_chart_4'))
        equipment_four_road.create_motor_temperature({value:this.illuminance_4000.power,title:'功率',unit:'kw'},
        echarts.init(document.getElementById('pie_chart_4')));

    if(document.getElementById('pie_chart_5'))
        equipment_four_road.create_motor_temperature({value:this.illuminance_4000.radioactivity1,title:'辐照度1',unit:'MJ/㎡'},
        echarts.init(document.getElementById('pie_chart_5')));

    if(document.getElementById('pie_chart_6'))
        equipment_four_road.create_motor_temperature({value:this.illuminance_4000.radioactivity2,title:'辐照度2',unit:'MJ/㎡'},
        echarts.init(document.getElementById('pie_chart_6')));

    // if(document.getElementById('line_chart_3')){
    //   let myChart_9 = echarts.init(document.getElementById('line_chart_3'));;
    //   equipment_four_road.create_real_discharge({attrs:this.illuminance.attrs,xData:this.illuminance.xdata},myChart_9);
    // }

    if(document.getElementById('cabin_pie_4'))
        equipment_four_road.create_motor_temperature({value:this.tempHumid_4000.temp,title:'温度',unit:'℃'},
        echarts.init(document.getElementById('cabin_pie_4')));
    
    if(document.getElementById('cabin_pie_5'))
        equipment_four_road.create_motor_temperature({value:this.tempHumid_4000.hum,title:'湿度',unit:'RH'},
        echarts.init(document.getElementById('cabin_pie_5')));
    
    // if(document.getElementById('cabin_line_4'))
    //     equipment_four_road.create_real_discharge({attrs:this.tempHumid.attrs,xData:this.tempHumid.xdata},
    //     echarts.init(document.getElementById('cabin_line_4')));

  }

  resize=()=>{
    let dom;
    setTimeout(() => {
      [
        'line_chart_1','pie_chart_1','pie_chart_2','pie_chart_3',
        'line_chart_2','cabin_pie_1','cabin_pie_2','cabin_line_3',
        'pie_chart_4','pie_chart_5','pie_chart_6','line_chart_3',
        'cabin_pie_4','cabin_pie_5','cabin_line_4'
    ].forEach(f=>{
        dom = document.getElementById(f);
        if(dom)echarts.init(dom).resize();
      })
    }, 500);
  }


  getdevices(){
    return this.deviceid_4400+','+this.deviceid_4000;
  }

  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }

    let dom;
    [
      'line_chart_1','pie_chart_1','pie_chart_2','pie_chart_3',
      'line_chart_2','cabin_pie_1','cabin_pie_2','cabin_line_3',
      'pie_chart_4','pie_chart_5','pie_chart_6','line_chart_3',
      'cabin_pie_4','cabin_pie_5','cabin_line_4'
  ].forEach(f=>{
      dom = document.getElementById(f);
      if(dom)echarts.init(dom).dispose();
    })
  }



}

export let d_4400 = [
  'c_cooling_water_temperature',//纯水温度设定值
  'tr_water_resistivity',//纯水导电率
  'tr_water_temperature',//纯水温度
  'tr_lamp_power',//功率
  'tr_irradiance1',//辐照度1
  'tr_irradiance2',//辐照度2
  'tr_chamber_temperature',//箱体空气温度
  'tr_relative_humidity',//箱体空气湿度
  'trps_chamber_temperature_set_point',//箱体空气温度设定值
  'trps_relative_humidity_set_point',//箱体空气湿度设定值
]

export let d_4000 = [
  'lamppower',//功率
  'data_340nm',//辐照1
  'data_420nm',//辐照2
  'cht',//箱体空气温度
  'rh',//箱体空气湿度
  'bst',//温度设定值
  'bpt',//湿度设定值
]