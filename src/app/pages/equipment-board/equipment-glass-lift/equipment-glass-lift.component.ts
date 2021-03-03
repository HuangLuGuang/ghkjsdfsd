import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');


@Component({
  selector: 'ngx-equipment-glass-lift',
  templateUrl: './equipment-glass-lift.component.html',
  styleUrls: ['./equipment-glass-lift.component.scss']
})
export class EquipmentGlassLiftComponent implements OnInit {
  deviceid_sky = 'device_skylight_02';
  deviceid_cabin = 'device_autoparts_cabin02';

  //ATEC-舱
  atec = {
    status:0,
    tempSet:0,
    rhSet:0,
    tempReal:0,
    rhReal:0,
    attrs:[
      { 
        name: "温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[0], colors[0]]
      },
      { 
        name: "湿度",nameEn :'RH', unit: "RH",value: [],
        color:[colors[1], colors[1]]
      },
    ],
    xdata:[]
  };


  current = {
    attrs:[
      { 
        name: "工位1-上升电流",nameEn :'工位1-上升电流', unit: "A",value: [],
        color:[colors[0], colors[0]]
      },
      { 
        name: "工位2-上升电流",nameEn :'工位2-上升电流', unit: "A",value: [],
        color:[colors[1], colors[1]]
      },
      { 
        name: "工位3-上升电流",nameEn :'工位3-上升电流', unit: "A",value: [],
        color:[colors[2], colors[2]]
      },
      { 
        name: "工位4-上升电流",nameEn :'工位4-上升电流', unit: "A",value: [],
        color:[colors[3], colors[3]]
      },
    ],
    xdata:[]
  };

  voltage = {
    attrs:[
      { 
        name: "工位1-升降器电压",nameEn :'工位1-升降器电压', unit: "V",value: [],
        color:[colors[0], colors[0]]
      },
      { 
        name: "工位2-升降器电压",nameEn :'工位2-升降器电压', unit: "V",value: [],
        color:[colors[1], colors[1]]
      },
      { 
        name: "工位3-升降器电压",nameEn :'工位3-升降器电压', unit: "V",value: [],
        color:[colors[0], colors[0]]
      },
      { 
        name: "工位4-升降器电压",nameEn :'工位4-升降器电压', unit: "V",value: [],
        color:[colors[1], colors[1]]
      },
    ],
    xdata:[]
  };

  sky_rate = {
    one:{
      rate: 0, //百分比
      station1_test_count_total: 0, //测试次数
      station1_test_time_total: 0, //测试时间
      station1_tested_count: 0,  //以测次数
      station1_tested_time: 0, //以测时间
    },
    two:{
      rate: 0, //百分比
      station2_test_count_total: 0, //测试次数
      station2_test_time_total: 0, //测试时间
      station2_tested_count: 0,  //以测次数
      station2_tested_time: 0, //以测时间
    },
    three:{
      rate: 0, //百分比
      station3_test_count_total: 0, //测试次数
      station3_test_time_total: 0, //测试时间
      station3_tested_count: 0,  //以测次数
      station3_tested_time: 0, //以测时间
    },
    four:{
      rate: 0, //百分比
      station4_test_count_total: 0, //测试次数
      station4_test_time_total: 0, //测试时间
      station4_tested_count: 0,  //以测次数
      station4_tested_time: 0, //以测时间
    }
  }

  imgsrc = {
    center:'assets/eimdoard/equipment/images/slz.png',
    car:'assets/eimdoard/equipment/images/car.png',
  }

  timer;
  language;
  subscribeList:any = {};
  constructor(private activateInfo:ActivatedRoute,
    private boardservice:EquipmentBoardService,
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
    let i = 0;
    this.timer = setInterval(()=>{
      this.get_atec_temp();
      if(i%60==0){
        this.get_atec_temp_list();
        setTimeout(() => {
          this.get_sky_list();
        }, 20);
      }
      i++;
    },1000)
    setTimeout(() => {
      this.boardservice.sendLoad({close:false});
      create_img_16_9();
    }, 500);
  }

  resize= ()=>{
    setTimeout(() => {
      [
        'cabin_pie_1','cabin_pie_2','cabin_line_1',
        'sky_line_1','sky_line_2'
      ].forEach(f=>{
        let chart = document.getElementById(f);
        if(chart)echarts.init(chart).resize();
      })
    },200);
  }


  get_atec_temp(){
    let res,data:any = {},time;
    this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.deviceid_cabin,arr:atec.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{

          this.atec.rhReal = data.realtime_humidity||0;
          this.atec.rhSet = data.humidity_setpoint||0;
          this.atec.status = data.status||0;
          this.atec.tempReal = data.realtime_temp||0;
          this.atec.tempSet = data.temp_setpoint||0;
    
          if(document.getElementById('cabin_pie_1'))
          // equipment_four_road.create_real_disk({value:this.atec.tempReal,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
            equipment_four_road.create_motor_temperature({value:this.atec.tempReal,title:this.language?'RealTEMP':'实时温度',unit:'%RH'},
            echarts.init(document.getElementById('cabin_pie_1')));
          if(document.getElementById('cabin_pie_2'))
            // equipment_four_road.create_real_disk({value:this.atec.rhReal,text:this.language?'RealRH':'实时湿度',unit:'℃'},
            equipment_four_road.create_motor_temperature({value:this.atec.rhReal,title:this.language?'RealRH':'实时湿度',unit:'℃'},
            echarts.init(document.getElementById('cabin_pie_2')));
        })
      }, 10);
      
      
      
    })
  }

  get_atec_temp_list(){
    let chart,arr = this.atec;
    this.subscribeList.get_line_speed_torque = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {"deviceid":this.deviceid_cabin,arr:'realtime_temp,realtime_humidity'}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;
      
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{
          chart = document.getElementById('cabin_line_1');
          //温度
          arr.attrs[0].value = res[0].realtime_temp.map(m => (m[0]|| 0));
          //湿度
          arr.attrs[1].value = res[1].realtime_humidity.map(m => (m[0]|| 0));
          let i = 0,c = 'realtime_temp';
          if(arr.attrs[0].value.length < arr.attrs[1].value.length){
            i = 1,c = 'realtime_humidity';
          }
          arr.xdata = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          if(chart){
            equipment_four_road.create_real_discharge({attrs:arr.attrs,xData:arr.xdata},echarts.init(chart));
          }
        });
      }, 20);
    });
  }


  get_sky_list(){
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',{
      "deviceid":this.deviceid_sky,arr:sky_list.join(',')
    }).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message||[];
      let xdata = [],key='',index = 0;
      res.forEach((el,i) => {
        for(let k in el){
          if(length < el[k].length){
            key = k,index = i;
          }
          length = el[k].length
        }
      });
      xdata = res[index][key].map(m => (dateformat(new Date(m[1]),'hh:mm:ss')));
      setTimeout(() => {
        this.current.attrs[0].value = res[0].station1_rise_current.map(m => (m[0]|| 0));
        this.current.attrs[1].value = res[1].station2_rise_current.map(m => (m[0]|| 0));
        this.current.attrs[2].value = res[2].station3_rise_current.map(m => (m[0]|| 0));
        this.current.attrs[3].value = res[3].station4_rise_current.map(m => (m[0]|| 0));
        if(document.getElementById('sky_line_1')){
          equipment_four_road.create_real_discharge({attrs:this.current.attrs,xData:xdata},echarts.init(document.getElementById('sky_line_1')));
        }
      }, 20);


      this.current.attrs[0].value = res[4].station1_lifter_voltage.map(m => (m[0]|| 0));
      this.current.attrs[1].value = res[5].station2_lifter_voltage.map(m => (m[0]|| 0));
      this.current.attrs[2].value = res[6].station3_lifter_voltage.map(m => (m[0]|| 0));
      this.current.attrs[3].value = res[7].station4_lifter_voltage.map(m => (m[0]|| 0));

      if(document.getElementById('sky_line_2')){
        equipment_four_road.create_real_discharge({attrs:this.current.attrs,xData:xdata},echarts.init(document.getElementById('sky_line_2')));
      }

    })
  }


  ngOnDestroy(){
    clearInterval(this.timer);
    let chart;
    [
      'cabin_pie_1','cabin_pie_2','cabin_line_1',
      
    ].forEach(f=>{
      chart = document.getElementById(f);
      if(chart)echarts.init(chart).dispose();
    })
  }


}
export const  atec = [
  'humidity_setpoint',// 湿度设定值
  'realtime_humidity',//湿度
  'temp_setpoint',//温度设定值
  'realtime_temp',//湿度
  'status',//状态
];

export const sky_list = [
  'station1_rise_current',//工位1上升电流
  'station2_rise_current',//工位2上升电流
  'station3_rise_current',//工位3上升电流
  'station4_rise_current',//工位4上升电流

  'station1_lifter_voltage',//工位1升降器电压
  'station2_lifter_voltage',//工位2升降器电压
  'station3_lifter_voltage',//工位3升降器电压
  'station4_lifter_voltage',//工位4升降器电压
];
