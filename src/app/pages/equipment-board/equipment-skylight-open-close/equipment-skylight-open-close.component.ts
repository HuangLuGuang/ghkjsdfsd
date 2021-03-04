import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-skylight-open-close',
  templateUrl: './equipment-skylight-open-close.component.html',
  styleUrls: ['./equipment-skylight-open-close.component.scss'],
  // 
})
export class EquipmentSkylightOpenCloseComponent implements OnInit {
  deviceid = 'device_skylight_01';//天窗开闭件试验台
  atec_deviceid = 'device_autoparts_cabin01';//atec

  tablelist = ['时间','日志等级','日志信息']
  table_1 = [
    // [dateformat(new Date(),'yyyy-MM-dd'),'error','1日志信息111111111dadadsddsdsads'],
    // [dateformat(new Date(),'yyyy-MM-dd'),'infor','2日志信息'],
    // [dateformat(new Date(),'yyyy-MM-dd'),'warm','3日志信息'],
    // [dateformat(new Date(),'yyyy-MM-dd'),'error','4日志信息'],
    // [dateformat(new Date(),'yyyy-MM-dd'),'error','5日志信息'],
    // [dateformat(new Date(),'yyyy-MM-dd'),'error','6日志信息'],
    // [dateformat(new Date(),'yyyy-MM-dd'),'error','7日志信息'],
    // [dateformat(new Date(),'yyyy-MM-dd'),'error','8日志信息'],
  ]

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

  //电机温度
  electric_temp = {
    realdata_1:0,
    realdata_2:0,
    xdata:[],
    attrs:[
      { 
        name: "电机温度1",nameEn :'电机温度1', unit: "℃",value: [],
        color:[colors[0], colors[0]]
      },
      { 
        name: "电机温度2",nameEn :'电机温度2', unit: "℃",value: [],
        color:[colors[1], colors[1]]
      },
    ],
  }

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
    }
  }


  imgsrc = {
    center:'assets/eimdoard/equipment/images/slz.png',
    car:'assets/eimdoard/equipment/images/car.png',
  }
  subscribeList:any = {};

  language;//语言
  timer;

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
    // this.get_log();
    let i = 0;
    this.timer = setInterval(()=>{
      this.get_sky_rate();
      this.get_atec_temp();
      this.get_log();
      if(i%60==0){
        this.get_atec_temp_list();
        setTimeout(() => {
          this.get_sky();
        }, 10);
      }
      i++;
    },1000);
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
        'electric_temp','progress_1','progress_4',
      ].forEach(f=>{
        chart = document.getElementById(f);
        if(chart)echarts.init(chart).resize();
      })
      
    }, 500);
  }


  get_atec_temp(){
    let res,data:any = {},time;
    this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.atec_deviceid,arr:atec.join(',')}).subscribe((g:any)=>{
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
    {"deviceid":this.atec_deviceid,arr:'realtime_temp,realtime_humidity'}).subscribe((f:any)=>{
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

  get_sky(){
    let res,arr;
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {"deviceid":this.deviceid,arr:sky.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      setTimeout(() => {
        this.ngzone.runOutsideAngular(()=>{

          this.electric_temp.attrs[0].value = res[0].station1_motor_temp.map(m => (m[0]|| 0));
          this.electric_temp.attrs[1].value = res[1].station2_motor_temp.map(m => (m[0]|| 0));

          arr = res[0].station1_motor_temp;
          this.electric_temp.realdata_1 = arr.length > 0? arr[arr.length-1][0]: 0;
          arr = res[1].station2_motor_temp;
          this.electric_temp.realdata_2 = arr.length > 0? arr[arr.length-1][0]: 0;

          let i = 0,c = 'station1_motor_temp';
          if(this.electric_temp.attrs[0].value.length < this.electric_temp.attrs[1].value.length){
            i = 1,c = 'station2_motor_temp';
          }
          this.electric_temp.xdata = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
          if(document.getElementById('electric_temp')){
            let myChart_9 = echarts.init(document.getElementById('electric_temp'));;
            equipment_four_road.create_real_discharge({attrs:this.electric_temp.attrs,xData:this.electric_temp.xdata},myChart_9);
          }

        })
      }, 10);
    })
  }

  get_sky_rate(){
    // SELECT get_sky_rate('{"deviceid":"device_skylight_01"}')
    let res;
    this.http.callRPC('get_sky_rate',library+'get_sky_rate',
    {"deviceid":this.deviceid}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0];
      this.sky_rate.one = res.results_data01[0];
      this.sky_rate.two = res.results_data02[0];
      if(document.getElementById('progress_1'))
          equipment_four_road.progress({plan:100,now:this.sky_rate.one.rate ||0},echarts.init(document.getElementById('progress_1')));
      if(document.getElementById('progress_4'))
          equipment_four_road.progress({plan:100,now:this.sky_rate.two.rate ||0},echarts.init(document.getElementById('progress_4')));


    })
  }

  get_log(){
    let res;
    this.http.callRPC('get_log',library+'get_logs',{"deviceid":this.deviceid}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      this.table_1 = res[0].map( m=> [dateformat(new Date(m.recordtime),'hh:mm:ss'),this.log_lv(m.level),m.message ])
    })
  }

  /**
   * log等级转换
   */
  log_lv(level){
    switch(level){
      case 1:
        return 'infor';
      case 2:
        return 'warm';
      case 3:
        return 'error'; 
    }
  }

  initChart(){
    // if(document.getElementById('cabin_pie_1'))
    //   equipment_four_road.create_real_disk({value:this.atec.tempReal,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
    //   echarts.init(document.getElementById('cabin_pie_1')));
    // if(document.getElementById('cabin_pie_2'))
    //   equipment_four_road.create_real_disk({value:this.atec.rhReal,text:this.language?'RealRH':'实时湿度',unit:'℃'},
      // echarts.init(document.getElementById('cabin_pie_2')));
    if(document.getElementById('cabin_line_1')){
      let myChart_9 = echarts.init(document.getElementById('cabin_line_1'));;
      equipment_four_road.create_real_discharge({attrs:this.atec.attrs,xData:this.atec.xdata},myChart_9);
    }

    if(document.getElementById('electric_temp')){
      let myChart_9 = echarts.init(document.getElementById('electric_temp'));;
      equipment_four_road.create_real_discharge({attrs:this.electric_temp.attrs,xData:this.electric_temp.xdata},myChart_9);
    }

    ['progress_1','progress_4'].forEach(f=>{
      if(document.getElementById(f))
            equipment_four_road.progress({plan:100,now:0},echarts.init(document.getElementById(f)));
    })
  }

  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
     }
    let chart;
    [
      'cabin_pie_1','cabin_pie_2','cabin_line_1',
      'electric_temp','progress_1','progress_4',
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

export const sky = [
  'station1_motor_temp',//电机温度1
  'station2_motor_temp',//电机温度2
];
