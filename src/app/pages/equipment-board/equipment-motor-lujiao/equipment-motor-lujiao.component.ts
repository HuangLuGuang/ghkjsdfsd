import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime, t_h_deviceid } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')

let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');


@Component({
  selector: 'ngx-equipment-motor-lujiao',
  templateUrl: './equipment-motor-lujiao.component.html',
  styleUrls: ['./equipment-motor-lujiao.component.scss']
})
export class EquipmentMotorLujiaoComponent implements OnInit {
  deviceid = '';
  t_h_deviceid = 'sensor_temp_humi_01';


  experiment_attrs = [
    { 
      name: "线圈1",nameEn: "线圈1", unit: "℃",value: [],show:true
      ,color:[colors[0], colors[0]]
    },{ 
        name: "线圈2",nameEn: "线圈2", unit: "℃",value: [],
        color:[colors[1], colors[1]],show:true
    },{ 
        name: "线圈3",nameEn: "线圈3", unit: "℃",value: [],
        color:[colors[2], colors[2]],show:true
    }
  ]
  experiment_xdata = [];

  speedTorque_attrs = [
    {name:'扭矩',data:[],color:'green'},
    {name:'转速',data:[],color:'#FF66CC'},
  ];
  speedTorque_xData = [];


  bearing_attrs = [
    { 
      name: "轴承温度_In_DE",nameEn: "轴承温度_In_DE", unit: "℃",value: [],show:true
      ,color:[colors[0], colors[0]]
    },{ 
        name: "轴承温度_In_Nde",nameEn: "轴承温度_In_Nde", unit: "℃",value: [],
        color:[colors[1], colors[1]],show:true
    },{ 
        name: "轴承温度_Out_DE",nameEn: "轴承温度_Out_DE", unit: "℃",value: [],
        color:[colors[2], colors[2]],show:true
    },{ 
      name: "轴承温度_Out_Nde",nameEn: "轴承温度_Out_Nde", unit: "℃",value: [],
      color:[colors[3], colors[3]],show:true
    }
  ];
  bearing_xData = [];

  temp = 0;
  hum = 0;
  //设备介绍
  introd_name = 'dj_5';
  equipIntroduceList = [
    {title:''}
  ]
  subscribeList:any = {};
  language;
  timer;
  //图片
  img = {
    url:'assets/eimdoard/equipment/images/dj5_1008.jpeg',//中间图片
    name:'',
    electric_url:'assets/eimdoard/equipment/images/electric.png',//电机图片
  }
  constructor(private boardservice:EquipmentBoardService,
    private activateInfo:ActivatedRoute,
    private http:HttpserviceService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅路由
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
      this.deviceid = f.deviceid;
    })
    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.resize();
    })
    
  }


  ngAfterViewInit(){
    this.getData();
    this.boardservice.sendLoad({close:false});
    setTimeout(() => {
      create_img_16_9();
    }, 1000);
  }

  getData(){
    let o = 0;
    this.timer = setInterval(()=>{
      this.get_real_data();
      if(o%60 == 0){
        this.get_device_mts_timerangedata();
        this.get_list();
      }
      o++;
    },1000);
  }

  resize =()=>{
    ['coolingWater','AxleBoxTemperature1','AxleBoxTemperature2','circularD_chart'
    ,'pre_1','pre_2','pre_3','pre_4','pre_5','pre_6','chart_line1','chart_line2'].forEach(f=>{
      let dom = document.getElementById(f);
      if(dom){
        echarts.init(dom).resize();
      }
    })
  }

  get_real_data(){
    let res,data:any = {};
    this.subscribeList.real = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.deviceid,arr:real.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res){
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });

      }

      setTimeout(() => {
        
        let chart = document.getElementById('coolingWater');
        if(chart){
          equipment_four_road.create_motor_temperature( {value:data.dynowinding1||0,unit:'℃'},echarts.init(chart));
        }
        chart = document.getElementById('AxleBoxTemperature1');
        if(chart){
          equipment_four_road.create_motor_temperature( {value:data.dynowinding2||0,unit:'℃'},echarts.init(chart));
        }
        chart = document.getElementById('AxleBoxTemperature2');
        if(chart){
          equipment_four_road.create_motor_temperature( {value:data.dynowinding3||0,unit:'℃'},echarts.init(chart));
        }
      }, 10);


      setTimeout(() => {
        let chart = document.getElementById('pre_1');
        if(chart){
          equipment_four_road.create_temp_h_1_p_gauge({
            value:data.spddyno1 ||0,name:'转速1',max:100,color:[
              [0.4, '#203add'],
              [1, '#0d1758']],unit:'rpm'
          },echarts.init(chart));
        }
        chart = document.getElementById('pre_2');
        if(chart){
          equipment_four_road.create_temp_h_1_p_gauge({
            value:data.tqdyno1||0,name:'扭矩1',max:100,color:[
              [0.4, '#203add'],
              [1, '#0d1758']],unit:'N/m'
          },echarts.init(chart));
        }
      }, 15);

      let chart = document.getElementById('pre_3');
        if(chart){
          equipment_four_road.create_temp_h_1_p_gauge({
            value:data.bearing_in_de ||0,name:'轴承温度_In_DE',max:100,color:[
              [0.4, '#203add'],
              [1, '#0d1758']],unit:'℃'
          },echarts.init(chart));
        }
        chart = document.getElementById('pre_4');
        if(chart){
          equipment_four_road.create_temp_h_1_p_gauge({
            value:data.bearing_in_nde||0,name:'轴承温度_In_Nde',max:100,color:[
              [0.4, '#203add'],
              [1, '#0d1758']],unit:'℃'
          },echarts.init(chart));
        }
        chart = document.getElementById('pre_5');
        if(chart){
          equipment_four_road.create_temp_h_1_p_gauge({
            value:data.bearing_out_de||0,name:'轴承温度_Out_DE',max:100,color:[
              [0.4, '#203add'],
              [1, '#0d1758']],unit:'℃'
          },echarts.init(chart));
        }
        chart = document.getElementById('pre_6');
        if(chart){
          equipment_four_road.create_temp_h_1_p_gauge({
            value:data.bearing_out_nde||0,name:'轴承温度_Out_Nde',max:100,color:[
              [0.4, '#203add'],
              [1, '#0d1758']],unit:'℃'
          },echarts.init(chart));
        }

      
    });
  }

  get_list(){
    this.subscribeList.list = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {"deviceid":this.deviceid,arr:list.join(',')}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message,chart;
      setTimeout(() => {
        
        this.experiment_attrs[0].value = res[0].dynowinding1.map(m => (m[0]||0));
        this.experiment_attrs[1].value = res[1].dynowinding2.map(m => (m[0]||0));
        this.experiment_attrs[2].value = res[2].dynowinding3.map(m => (m[0]||0));
        let i= 0,c = 'dynowinding1';
        if(res[0].dynowinding1.length < res[1].dynowinding2.length){
          i= 1,c = 'dynowinding2';
        }else if(res[1].dynowinding2.length < res[2].dynowinding3.length){
          i= 2,c = 'dynowinding3';
        }
        this.experiment_xdata = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
  
        chart = document.getElementById('circularD_chart');
        if(chart)
            equipment_four_road.create_real_discharge({attrs:this.experiment_attrs,xData:this.experiment_xdata,title:'线圈温度'},echarts.init(chart));
      }, 10);


      setTimeout(() => {
          chart = document.getElementById('chart_line1');
          this.speedTorque_attrs[0].data = res[4].tqdyno1.map(m => (m[0]));
          this.speedTorque_attrs[1].data = res[3].spddyno1.map(m => (m[0]));
          let i= 4,c = 'tqdyno1';
          if(res[4].tqdyno1.length < res[3].spddyno1.length){
            i= 1,c = 'spddyno1';
          }
          this.speedTorque_xData = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));

          if(chart){
            equipment_four_road.create_motor_chart({
                xData:this.speedTorque_xData,data:this.speedTorque_attrs,title:'转速/扭矩曲线'},
                echarts.init(chart));
          }
      }, 15);


      chart = document.getElementById('chart_line2');
      this.bearing_attrs[0].value = res[5].bearing_in_de.map(m => (m[0]));
      this.bearing_attrs[1].value = res[6].bearing_in_nde.map(m => (m[0]));
      this.bearing_attrs[2].value = res[7].bearing_out_de.map(m => (m[0]));
      this.bearing_attrs[3].value = res[8].bearing_out_nde.map(m => (m[0]));
      let max_index = 0,max = [];
      for (let i = 0; i < this.bearing_attrs.length - 1; i++) {
        if(max.length < this.bearing_attrs[i].value.length){
          max_index = i;
          max = this.bearing_attrs[i].value;
        }
      };
      let xarr:any = Object.values(res[max_index+4])[0];
      this.bearing_xData = xarr.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));

      if(chart){
        equipment_four_road.create_real_discharge({
            xData:this.bearing_xData,attrs:this.bearing_attrs,title:'转速/扭矩曲线'},
            echarts.init(chart));
      }
    });
  }


  //环境历史信息
  get_device_mts_timerangedata(){
    let chart;
    let yearPlanData = [],yearOrderData= [],differenceData=[],visibityData=[],xAxisData=[];
    this.subscribeList.h_t_h = this.http.callRPC('get_temperature',library+'get_temperature_numbers'
    ,{deviceid:t_h_deviceid || this.t_h_deviceid}).subscribe((g:any) =>{
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
      }, 'motor_chart');
      this.temp = yearPlanData.length>0?yearPlanData[yearPlanData.length-1]:0;
      this.hum = yearOrderData.length>0?yearOrderData[yearOrderData.length-1]:0;
      chart = document.getElementById('temperature');
      if(chart)
        equipment_four_road.create_motor_temperature( {value:this.temp,unit:'℃',title:'温度'},echarts.init(chart));
      chart = document.getElementById('humidity');
      if(chart)
        equipment_four_road.create_motor_temperature( {value:this.hum,unit:'RH' ,title:'湿度'},echarts.init(chart));

      this.subscribeList.h_t_h.unsubscribe();
    })

  }


  ngOnDestroy(){
    clearInterval(this.timer)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    ['coolingWater','AxleBoxTemperature1','AxleBoxTemperature2','circularD_chart'
    ,'pre_1','pre_2','pre_3','pre_4','pre_5','pre_6','chart_line1','chart_line2'].forEach(f=>{
      let dom = document.getElementById(f);
      if(dom){
        echarts.init(dom).dispose();
      }
    })
  }

}


export const real = [
  'dynowinding1',//线圈温度1
  'dynowinding2',//线圈温度2
  'dynowinding3',//线圈温度3
  'spddyno1',//转速1
  'tqdyno1',//扭矩1
  'bearing_in_de',//轴承温度_In_DE
  'bearing_in_nde',//轴承温度_In_nde
  'bearing_out_de',//轴承温度_out_DE
  'bearing_out_nde',//轴承温度_out_nde
]


export const list = [
  'dynowinding1',//线圈温度1
  'dynowinding2',//线圈温度2
  'dynowinding3',//线圈温度3
  'spddyno1',//转速1
  'tqdyno1',//扭矩
  'bearing_in_de',//轴承温度_In_DE
  'bearing_in_nde',//轴承温度_In_nde
  'bearing_out_de',//轴承温度_out_DE
  'bearing_out_nde',//轴承温度_out_nde
]
