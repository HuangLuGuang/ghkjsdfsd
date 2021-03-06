import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';
let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-cabin-centralized-monitoring',
  templateUrl: './cabin-centralized-monitoring.component.html',
  styleUrls: ['./cabin-centralized-monitoring.component.scss'],
  
})
export class CabinCentralizedMonitoringComponent implements OnInit {


  img = {
    url:'assets/eimdoard/equipment/images/lqdp.png',
    name:''
  }

  gauge =[
    {
      id:'real_temperature_4',
      dataLine:{
        value:12,name:'实时温度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'℃',un:'常温'
      }
    }
    ,{
      id:'real_temperature_5',
      dataLine:{
        value:12,name:'实时湿度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'%RH',un:'常湿'
      }
    }
    ,{
      id:'real_temperature_6',
      dataLine:{
        value:0,name:'微压差',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'Pa',un:'常压'
      }
    },
    {
      id:'real_temperature_7',
      dataLine:{
        value:12,name:'实时温度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'℃',un:'常温'
      }
    }
    
  ]


  TempHumidity = [
    {
      id:'TempHumidity1',
      dataLine:{
        value:0,title:'实时温度',max:100,unit:'℃'
      }
    },
    {
      id:'TempHumidity2',
      dataLine:{
        value:0,title:'实时温度',max:100,unit:'℃'
      }
    },
    {
      id:'TempHumidity3',
      dataLine:{
        value:0,title:'实时温度',max:100,unit:'℃'
      }
    },
    {
      id:'TempHumidity4',
      dataLine:{
        value:0,title:'实时湿度',max:100,unit:'%RH'
      }
    },
    {
      id:'TempHumidity5',
      dataLine:{
        value:0,title:'实时湿度',max:100,unit:'%RH'
      }
    },
    {
      id:'TempHumidity6',
      dataLine:{
        value:0,title:'实时湿度',max:100,unit:'%RH'
      }
    },
   
  ]

  //锦华环境仓
  jinhua_en = [
    {
      id:'real_temperature_8',
      dataLine:{
        value:10,title:'冷却水-温度',max:100,unit:'℃'
      }
    }
    ,{
      id:'real_temperature_9',
      dataLine:{
        value:10,title:'冷却水-压力',max:100,unit:'Pa'
      }
    }
    // ,{
    //   id:'real_temperature_10',
    //   dataLine:{
    //     value:10,title:'设备间温度',max:100,unit:'℃'
    //   }
    // }
  ]
  jinhua_en_charts = [
    {
      name:'冷却水-温度',
      color:[colors[0],colors[0]],
      value:[]
    },
    {
      name:'冷却水-压力',
      color:[colors[1],colors[1]],
      value:[]
    },
    {
      name:'设备间温度',
      color:[colors[2],colors[2]],
      value:[]
    },
  ]
  jinhua_en_xData = [];
  jinhua = {
    cang:0,
    newF:0
  }

  // ATEC
  atec = {
    cang:0,
    newF:0,
    hc:0,//碳氢化合物
    co:0,//一氧化碳
  }
  atec_chart = [
    {
      name:'温度',
      color:[colors[0],colors[0]],
      value:[],
      unit:'℃',
    },
    {
      name:'湿度',
      color:[colors[1],colors[1]],
      value:[],
      unit:'%RH',

    },
  ];
  atec_xdata = [];
  
  language;
  subscribeList:any = {};
  deviceid_jinhua = 'device_jinhua_cabin02';
  deviceid_ATEC = 'device_atec_05';
  timer;
  constructor(private activateInfo:ActivatedRoute,
    private http:HttpserviceService,private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;

    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
    this.getData();
    setTimeout(() => {
      create_img_16_9();
    }, 1000);

    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.resize();
    })

  }

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})
  }

  resize = () =>{
    setTimeout(() => {
      this.jinhua_en.forEach(f=>{
        if(document.getElementById(f.id))
          echarts.init(document.getElementById(f.id)).resize();
      })
      this.gauge.forEach(f=>{
        if(document.getElementById(f.id))
          echarts.init(document.getElementById(f.id)).resize();
      })
      if(document.getElementById('cabin_discharge_chart_2'))
          echarts.init(document.getElementById('cabin_discharge_chart_2')).resize();
      if(document.getElementById('cabin_discharge_chart_1'))
          echarts.init(document.getElementById('cabin_discharge_chart_1')).resize();
      ['sensor_t_h_01','sensor_t_h_02','sensor_t_h_03'].forEach(f=>{
        if(document.getElementById(f))
            echarts.init(document.getElementById(f)).resize();
      })
      console.log('图表刷新')
    }, 500);
  }



  getData(){
    let i = 0;
    this.timer = self.setInterval(() =>{
      setTimeout(() => {
        this.get_environmental_warehouse_jinhua();
      },10);
      setTimeout(() => {
        this.get_ATEC();
      },20)
      setTimeout(() => {
        this.get_TempHumidity('sensor_t_h_01',[this.TempHumidity[0],this.TempHumidity[3]]);
      },25)
      setTimeout(() => {
        this.get_TempHumidity('sensor_t_h_02',[this.TempHumidity[1],this.TempHumidity[4]]);
      },30)
      setTimeout(() => {
        this.get_TempHumidity('sensor_t_h_03',[this.TempHumidity[2],this.TempHumidity[5]]);
      }, 35);
      
      if(i%60 == 0){
        setTimeout(() => {
          this.get_jinhua_list();
        }, 10);
        this.get_ATEC_list();
      }
      i++;
      // this.TempHumidity.forEach(f=>{
      //   if(document.getElementById(f.id))
      //   equipment_four_road.create_gauge_jinhua(f.dataLine,echarts.init(document.getElementById(f.id)));
      // })

    },1000)

    
  }


  /**
   * 锦华环境仓
   */
  get_environmental_warehouse_jinhua(){
    let res,data:any = {};
    this.subscribeList.jinhua = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',{"device":this.deviceid_jinhua,
    arr:param_jinhua.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      // 冷却水压力
      this.jinhua_en[0].dataLine.value = data.mwsmart_main_soaking_s_vw206;
      //冷却水温度
      this.jinhua_en[1].dataLine.value = data.mwsmart_main_soaking_s_vw208;
      // //温度实际值
      // this.jinhua_en[2].dataLine.value = data.mwsmart_main_soaking_s_vw200;

      this.jinhua_en.forEach(f=>{
        if(document.getElementById(f.id))
        equipment_four_road.create_gauge_jinhua(f.dataLine,echarts.init(document.getElementById(f.id)));
      })
      // 实时温度
      this.gauge[3].dataLine.value = data.mwsmart_main_soaking_s_vw200;
      this.gauge[3].dataLine.color[0] = [data.mwsmart_main_soaking_s_vw202/this.gauge[3].dataLine.max, '#203add'];
      if(document.getElementById(this.gauge[3].id))
        equipment_four_road.create_temp_h_1_p_gauge(
          this.gauge[3].dataLine
          ,echarts.init(document.getElementById(this.gauge[3].id)));

      //新风系统
      this.jinhua.newF = data.mwsmart_main_soaking_s_v10;
      //设备运行状态
      this.jinhua.cang = data.mwsmart_main_soaking_s_v00;

      // TODO
      // this.jinhua_en_charts[0].value.push(this.jinhua_en[0].dataLine.value||0);
      // this.jinhua_en_charts[1].value.push(this.jinhua_en[1].dataLine.value||0);
      // this.jinhua_en_charts[2].value.push( this.gauge[3].dataLine.value||0);
      // this.jinhua_en_xData.push(rTime(res?res[0].mwsmart_main_soaking_s_vw206[0][1]:'0'))

      // if(this.jinhua_en_xData.length>10){
      //   this.jinhua_en_xData.splice(0,1);
      //   this.jinhua_en_charts.forEach(f=>{
      //     f.value.splice(0,1)
      //   })
      // }
      // if(document.getElementById('cabin_discharge_chart_2'))
      // equipment_four_road.create_broken_line({
      //     series:this.jinhua_en_charts,
      //     xData: this.jinhua_en_xData,
      //     title:'温度、冷却水温度曲线'
      // },echarts.init(document.getElementById('cabin_discharge_chart_2')));


      //取消订阅
      this.subscribeList.jinhua.unsubscribe();
    })
  }

  get_jinhua_list(){
      // 'mwsmart_main_soaking_s_vw206',//冷却水压力
      // 'mwsmart_main_soaking_s_vw200',//温度
      // 'mwsmart_main_soaking_s_vw202',//温度设定
      // 'mwsmart_main_soaking_s_vw208',//冷却水温度
    let res,arr = this.jinhua_en_charts;
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',{
      deviceid:this.deviceid_jinhua,arr:'mwsmart_main_soaking_s_vw208,mwsmart_main_soaking_s_vw206,mwsmart_main_soaking_s_vw200'
    }).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      arr[0].value = res[0].mwsmart_main_soaking_s_vw208.map(m=>(m[0]));//冷却水温度
      arr[1].value = res[1].mwsmart_main_soaking_s_vw206.map(m=>(m[0]));//冷却水压力
      arr[2].value = res[2].mwsmart_main_soaking_s_vw200.map(m=>(m[0]));//温度
      let max_index = 0,max = [];
      for (let i = 0; i < res.length - 1; i++) {
        if(max.length < arr[i+1].value.length){
          max_index = i;
          max = arr[i+1].value;
        }
      };
      let xarr:any = Object.values(res[max_index])[0];
      this.jinhua_en_xData = xarr.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));

      if(document.getElementById('cabin_discharge_chart_2'))
      equipment_four_road.create_broken_line({
          series:this.jinhua_en_charts,
          xData: this.jinhua_en_xData,
          title:'温度、冷却水温度曲线'
      },echarts.init(document.getElementById('cabin_discharge_chart_2')));
    });
  }

  /**
   * atec
   */
  get_ATEC(){
    let res,data:any = {};
    this.subscribeList.atec = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',{"device":this.deviceid_ATEC,
    arr:param_ATEC.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      //舱状态
      this.atec.cang = data.status;
      //新风状态
      this.atec.newF = data.ventilation_status;
      this.atec.co = data.co_concentration;
      this.atec.hc = data.hc_concentration;

      // 温度
      this.gauge[0].dataLine.value = data.realtime_temp;
      this.gauge[0].dataLine.color[0] = [data.realtime_temp/this.gauge[0].dataLine.max, '#203add'];
      //湿度
      this.gauge[1].dataLine.value = data.realtime_humidity;
      this.gauge[1].dataLine.color[0] = [data.realtime_humidity/this.gauge[1].dataLine.max, '#203add'];
      // 微压差
      this.gauge[2].dataLine.value = data.micro_pressure_pv;
      this.gauge[2].dataLine.color[0] = [data.micro_pressure_sp/this.gauge[2].dataLine.max, '#203add'];
      [0,1,2].forEach(f=>{
        if(document.getElementById(this.gauge[f].id))
        equipment_four_road.create_temp_h_1_p_gauge(
          this.gauge[f].dataLine
          ,echarts.init(document.getElementById(this.gauge[f].id)));
      })

      

      //取消订阅
      this.subscribeList.atec.unsubscribe();
    })
  }

  get_ATEC_list(){
  //   'realtime_temp',//实时温度
  // 'realtime_humidity',//实时湿度
    let res,xdata = [];
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',{
      deviceid:this.deviceid_ATEC,arr:'realtime_temp,realtime_humidity'
    }).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;

      this.atec_chart[0].value = res[0].realtime_temp.map(m => m[0]);
      this.atec_chart[1].value = res[1].realtime_humidity.map(m => m[0]);
      if(this.atec_chart[0].value.length > this.atec_chart[0].value.length){
        xdata = res[0].realtime_temp.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }else{
        xdata = res[1].realtime_humidity.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }
      this.atec_xdata = xdata;

      if(document.getElementById('cabin_discharge_chart_1')){
        let myChart_9 = echarts.init(document.getElementById('cabin_discharge_chart_1'));;
        equipment_four_road.create_broken_line({
          title :'温湿度曲线',
          series:this.atec_chart,
          xData:this.atec_xdata,
        },myChart_9);
      }
    });
  }

  get_TempHumidity(device,arr){
    let res;
    this.subscribeList[device] = this.http.callRPC('get_temperature',library+'get_temperature'
    ,{device:device}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message[0]?g.result.message[0].message[0]:{};
      arr[0].dataLine.value = res.temperature? res.temperature:0;
      arr[1].dataLine.value = res.humidity?res.humidity:0;
      arr.forEach(el => {
        if(document.getElementById(el.id))
          equipment_four_road.create_gauge_jinhua(el.dataLine,echarts.init(document.getElementById(el.id)));
      });

      //取消订阅
      this.subscribeList[device].unsubscribe();
    })
    
  }



  ngOnDestroy(){
    clearInterval(this.timer);
    // clearInterval(this.timer1)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }

    let chart;
    this.jinhua_en.forEach(f=>{
      chart = document.getElementById(f.id);
      if(chart)echarts.init(chart).dispose();
    });
    this.gauge.forEach(f=>{
      chart = document.getElementById(f.id);
      if(chart)echarts.init(chart).dispose();
    });
    this.TempHumidity.forEach(f=>{
      chart = document.getElementById(f.id);
      if(chart)echarts.init(chart).dispose();
    });


    ['cabin_discharge_chart_2','cabin_discharge_chart_1'].forEach(f=>{
      chart = document.getElementById(f);
      if(chart)echarts.init(chart).dispose();
    });

  }

}


export const  param_jinhua = [
  'mwsmart_main_soaking_s_vw206',//冷却水压力
  'mwsmart_main_soaking_s_vw200',//温度
  'mwsmart_main_soaking_s_vw202',//温度设定
  'mwsmart_main_soaking_s_vw208',//冷却水温度
  'mwsmart_main_soaking_s_v10',//新风系统
  'mwsmart_main_soaking_s_v00',//设备运行状态
]

export const param_ATEC = [
  'realtime_temp',//实时温度
  'temp_setpoint',//设定温度
  'realtime_humidity',//实时湿度
  'humidity_setpoint',//设定湿度
  'micro_pressure_sp',//微压差设定
  'micro_pressure_pv',//微压差值
  'status',//舱状态
  'ventilation_status',//新风状态
  'hc_concentration',//碳氢
  'co_concentration',//一氧化碳
]
