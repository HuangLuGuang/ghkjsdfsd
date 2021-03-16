import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime,t_h_deviceid } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';
var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');

/**
 * 台架2  4d2c_01 atec_02  四门两盖气动设备2
 * 台架3  4d2c_02 jinhua_cabin03 四门两盖气动设备3
 * 台架4  4d2c_06  四门两盖气动设备4
 * 台架5  4d2c_07 ------四门两盖气动设备5
 */
@Component({
  selector: 'ngx-equipment-jinhua4d2c',
  templateUrl: './equipment-jinhua4d2c.component.html',
  styleUrls: ['./equipment-jinhua4d2c.component.scss']
})
export class EquipmentJinhua4d2cComponent implements OnInit {

  device_4d2c = '';
  device_atec = '';
  th_deviceid = '';

  atec = {
    tempid:'atec_pie_5',
    humid:'atec_pie_6',
    lineid:'atec_line_3',
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


  //四门粮改实验数据
  list = [
    {
      position:'前盖',
      open_status:0,//开故障
      close_status:0,//关故障
      plan:0,//计划
      now:0,//现在
      rate:0,//进度
    },{
      position:'前门',
      open_status:0,//开故障
      close_status:0,//关故障
      plan:0,//计划
      now:0,//现在
      rate:0,//进度
    },{
      position:'后盖',
      open_status:0,//开故障
      close_status:0,//关故障
      plan:0,//计划
      now:0,//现在
      rate:0,//进度
    },{
      position:'后门',
      open_status:0,//开故障
      close_status:0,//关故障
      plan:0,//计划
      now:0,//现在
      rate:0,//进度
    }
  ]

  img = {
    url:'assets/eimdoard/equipment/images/slz.png',
    car:'assets/eimdoard/equipment/images/car.png',
  }

  subscribeList:any = {};
  language;
  timer;

  //请求参数
  cang_arr:any = {};
  cang_arr_list:any = {};
  constructor(private activateInfo:ActivatedRoute,
    private boardservice:EquipmentBoardService,
    private http:HttpserviceService) { }

  ngOnInit(): void {
     //获取当前语言
     let language = localStorage.getItem('currentLanguage');
     if(language!='zh-CN')this.language = language;
 
     this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
       // console.log(f);
       if(document.getElementById('head_title'))
         document.getElementById('head_title').innerText = f.title;
        let arr = decodeURIComponent(window.location.pathname).split('/');
        // if(arr[arr.length-1] == 'one'){
        //   this.device_4d2c = 'device_4d2c_05';//四门两盖气动设备1
        //   this.device_atec = 'device_jinhua_cabin01';
        // }
//         台架2  4d2c_01 atec_02  四门两盖气动设备2
//  * 台架3  4d2c_02 jinhua_cabin03 四门两盖气动设备3
//  * 台架4  4d2c_06  四门两盖气动设备4
//  * 台架5  4d2c_07 ------四门两盖气动设备5
      this.select_find(arr[arr.length-1]);
     })
 
     //赋值
     this.getData();
     this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
       this.resize();
     })
  }


  

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})
    setTimeout(() => {
      create_img_16_9();
    }, 1000);
  }

  getData(){

    let i =0;
    if(this.device_atec){
      this.timer = setInterval(()=>{
        this.get_4d2c();
        this.get_atec();
        if(i%60 == 0){
          this.get_atec_list();
        }
        i++;
      },1000);
    }else{
      this.timer = setInterval(()=>{
        this.get_4d2c();
        if(i%60 == 0){
          this.get_Temp_Hum();
        }
        i++;
      },1000);
    }
  }

  get_atec(){
    let res,data:any = {};
    this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',{
      device:this.device_atec,arr:Object.values(this.cang_arr).join(',')
    }).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res){
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      };

      this.atec.tempReal = data[this.cang_arr.tempReal] ||0;
      this.atec.rhReal = data[this.cang_arr.rhReal] ||0;
      this.atec.tempSet = data[this.cang_arr.tempSet] ||0;
      this.atec.rhSet = data[this.cang_arr.rhSet] ||0;
      this.atec.status = data[this.cang_arr.status] || 0;

      if(document.getElementById(this.atec.tempid))
        equipment_four_road.create_motor_temperature( {value:this.atec.tempReal,title:'温度',unit:'℃'},
        echarts.init(document.getElementById(this.atec.tempid)));
      if(document.getElementById(this.atec.humid))
        equipment_four_road.create_motor_temperature( {value:this.atec.rhReal,title:'湿度',unit:'%RH'},
          echarts.init(document.getElementById(this.atec.humid)));

    });
  }

  get_atec_list(){
    let res,xdata;
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',{
      deviceid:this.device_atec,arr:Object.values(this.cang_arr_list).join(',')
    }).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      this.atec.attrs[0].value = res[0][this.cang_arr_list.temp].map(m =>(m[0]));
      this.atec.attrs[1].value = res[1][this.cang_arr_list.rh].map(m =>(m[0]));

      if(this.atec.attrs[0].value.length > this.atec.attrs[1].value.length){
        xdata = res[0][this.cang_arr_list.temp].map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }else{
        xdata = res[1][this.cang_arr_list.rh].map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }
      this.atec.xdata = xdata;
      if(document.getElementById('atec_line_3')){
        let myChart_9 = echarts.init(document.getElementById('atec_line_3'));;
        equipment_four_road.create_real_discharge({attrs:this.atec.attrs,xData:this.atec.xdata},myChart_9);
      }
    });
  }


  get_4d2c(){
    let res,data:any = {};
    this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {device:this.device_4d2c,arr:_4d2c.join(',')}
    ).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res){
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      };

      //前盖
      this.list[0].close_status = data.mwsmart_1_equipment_lg_close_warning ||0;
      this.list[0].open_status = data.mwsmart_1_equipment_lg_open_warning ||0;
      this.list[0].plan = data.mwsmart_1_equipment_lg_total_cycle ||0;
      this.list[0].now = data.mwsmart_1_equipment_lg_current_cycle ||0;
      this.list[0].rate = this.list[0].plan ?parseFloat((this.list[0].now/this.list[0].plan).toFixed(2)) :0;
      // this.list[0].rate = 20;

      // 前门
      this.list[1].close_status = data.mwsmart_1_equipment_fd_close_warning ||0;
      this.list[1].open_status = data.mwsmart_1_equipment_fd_open_warning ||0;
      this.list[1].plan = data.mwsmart_1_equipment_fd_total_cycle ||0;
      this.list[1].now = data.mwsmart_1_equipment_fd_current_cycle ||0;
      this.list[1].rate = this.list[1].plan ?parseFloat((this.list[1].now/this.list[1].plan).toFixed(2)) :0;

      // 后盖
      this.list[2].close_status = data.mwsmart_1_equipment_h_close_warning ||0;
      this.list[2].open_status = data.mwsmart_1_equipment_h_open_warning ||0;
      this.list[2].plan = data.mwsmart_1_equipment_h_total_cycle ||0;
      this.list[2].now = data.mwsmart_1_equipment_h_current_cycle ||0;
      this.list[2].rate = this.list[2].plan ?parseFloat((this.list[2].now/this.list[2].plan).toFixed(2)) :0;

      // 后门
      this.list[3].close_status = data.mwsmart_1_equipment_rd_close_warning ||0;
      this.list[3].open_status = data.mwsmart_1_equipment_rd_current_cycle ||0;
      this.list[3].plan = data.mwsmart_1_equipment_rd_total_cycle ||0;
      this.list[3].now = data.mwsmart_1_equipment_rd_current_cycle ||0;
      this.list[3].rate = this.list[3].plan ?parseFloat((this.list[3].now/this.list[3].plan).toFixed(2)) :0;
      
      this.list.forEach((f,i)=>{
        if(document.getElementById(`progress_${i+1}`))
        equipment_four_road.progress({plan:100,now:f.rate},echarts.init(document.getElementById(`progress_${i+1}`)));
      })


    })
  }


  //环境历史信息
  get_Temp_Hum(){
    let chart;
    let yearPlanData = [],yearOrderData= [],differenceData=[],visibityData=[],xAxisData=[];
    this.subscribeList.h_t_h = this.http.callRPC('get_temperature',library+'get_temperature_numbers'
    ,{deviceid:t_h_deviceid || this.th_deviceid}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      g.result.message[0].message.forEach(el => {
        yearPlanData.push(el.temperature);//温度
        yearOrderData.push(el.humidity);//湿度
        xAxisData.push(rTime(el.recordtime));
      });

      rtm3a.create_third_chart_line({
        yearPlanData:yearPlanData.length > 0?yearPlanData:[0],
        yearOrderData:yearOrderData.length>0?yearOrderData:[0],
        differenceData:differenceData.length>0?differenceData:[0],
        visibityData:visibityData.length>0?visibityData:[0],
        xAxisData:xAxisData.length>0?xAxisData:[0],
        title:''
      }, 'atec_line_3');
      let temp = yearPlanData.length>0?yearPlanData[yearPlanData.length-1]:0;
      let hum = yearOrderData.length>0?yearOrderData[yearOrderData.length-1]:0;
      chart = document.getElementById('atec_pie_5');
      if(chart)
        equipment_four_road.create_motor_temperature( {value:temp,unit:'℃',title:'温度'},echarts.init(chart));
      chart = document.getElementById('atec_pie_6');
      if(chart)
        equipment_four_road.create_motor_temperature( {value:hum,unit:'RH' ,title:'湿度'},echarts.init(chart));
        

      this.subscribeList.h_t_h.unsubscribe();
    })

   }

  resize= ()=>{
    setTimeout(() => {
      ['atec_line_3','atec_pie_5','atec_pie_6','progress_1','progress_2','progress_3','progress_4'].forEach(f=>{
        let dom = document.getElementById(f);
        if(dom){
          echarts.init(dom).resize();
        }
      })
    }, 10);
  }


  //根据路由分辨当前请求参数和deviceid
  select_find(str){
    switch(str){
      case 'one':
        this.device_4d2c = 'device_4d2c_05';//四门两盖气动设备1
        this.device_atec = 'device_jinhua_cabin01';
        this.cang_arr = {
          tempReal:atec[0],
          rhReal:atec[1],
          tempSet:atec[2],
          rhSet:atec[3],
          status:atec[4],
        };
        this.cang_arr_list = {
          temp:'mwsmart_main_emission_vw200',
          rh:'mwsmart_main_emission_vw206'
        };
        break;
      case 'two':
        this.device_4d2c = 'device_4d2c_01';//四门两盖气动设备2
        this.device_atec = 'device_atec_02';
        this.cang_arr = {
          tempReal:'realtime_temp',
          rhReal:'realtime_humidity',
          tempSet:'temp_setpoint',
          rhSet:'humidity_setpoint',
          status:'status',
        };
        this.cang_arr_list = {
          temp:'realtime_temp',
          rh:'realtime_humidity'
        };
        break;
      case 'three':
        this.device_4d2c = 'device_4d2c_02';//四门两盖气动设备3
        this.device_atec = 'device_jinhua_cabin03';
        this.cang_arr = {
          tempReal:'mwsmart_1_chamber_temp_pv',
          rhReal:'mwsmart_1_chamber_humidity_pv',
          tempSet:'mwsmart_1_chamber_temp_sv',
          rhSet:'mwsmart_1_chamber_humidity_sv',
          status:'status',
        };
        this.cang_arr_list = {
          temp:'mwsmart_1_chamber_temp_pv',
          rh:'mwsmart_1_chamber_humidity_pv'
        };
        break;
      case 'four':
        this.device_4d2c = 'device_4d2c_06';//四门两盖气动设备4
        this.th_deviceid = '';
        break;
      case 'five':
        this.device_4d2c = 'device_4d2c_07';//四门两盖气动设备5
        this.th_deviceid = '';
        break;
    }
  }

  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    ['atec_line_3','atec_pie_5','atec_pie_6','progress_1','progress_2','progress_3','progress_4'].forEach(f=>{
      let dom = document.getElementById(f);
      if(dom){
        echarts.init(dom).dispose();
      }
    });

  }

}
export const atec = [
  'mwsmart_main_emission_vw200',//实时温度
  'mwsmart_main_emission_vw206',//实时湿度
  'mwsmart_main_emission_vw202',//温度设定
  'mwsmart_main_emission_vw208',//湿度设定
  'mwsmart_main_emission_v00',//开启状态
]

export const _4d2c =[
  'mwsmart_1_equipment_h_total_cycle',//后盖总次数
  'mwsmart_1_equipment_h_current_cycle',//后盖当前次数
  'mwsmart_1_equipment_h_open_warning',//后盖开故障
  'mwsmart_1_equipment_h_close_warning',//后盖开故障
  
  'mwsmart_1_equipment_rd_total_cycle',//后门总次数
  'mwsmart_1_equipment_rd_current_cycle',//后门当前次数
  'mwsmart_1_equipment_rd_close_warning',//后门关故障
  'mwsmart_1_equipment_rd_open_warning',//后门开故障

  'mwsmart_1_equipment_lg_total_cycle',//前盖总次数
  'mwsmart_1_equipment_lg_current_cycle',//前盖当前次数
  'mwsmart_1_equipment_lg_close_warning',//前盖关故障
  'mwsmart_1_equipment_lg_open_warning',//前盖开故障
  
  'mwsmart_1_equipment_fd_total_cycle',//前门总次数
  'mwsmart_1_equipment_fd_current_cycle',//前门当前次数
  'mwsmart_1_equipment_fd_open_warning',//前门开故障
  'mwsmart_1_equipment_fd_close_warning',//前门关故障
]
