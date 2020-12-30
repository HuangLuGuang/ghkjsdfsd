import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, rTime } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
let oilsrouce = require('../../../../assets/eimdoard/equipment/js/oilsrouce');

@Component({
  selector: 'ngx-equipment-motor-six-seven',
  templateUrl: './equipment-motor-six-seven.component.html',
  styleUrls: ['./equipment-motor-six-seven.component.scss']
})
export class EquipmentMotorSixSevenComponent implements OnInit {

   //图片
  img = {
    url:'assets/eimdoard/equipment/images/dj.png',//中间图片
    name:'',
    electric_url:'assets/eimdoard/equipment/images/electric.png',//电机图片
  }

  HealthParam_left = [
    {
      id:'motor_chart_g_1',
      dataLine:{
        value:0,name:'冷却水温度-上',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'℃',un:'常温'
      }
    },
    {
      id:'motor_chart_g_2',
      dataLine:{
        value:0,name:'冷却水流量-上',max:100,color:[
          [0, '#203add'],
          [1, '#0d1758']],unit:'L/min'
      }
    },
    {
      id:'motor_chart_g_5',
      dataLine:{
        value:0,name:'冷却水温度-下',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'℃',un:'常温'
      }
    },
    {
      id:'motor_chart_g_6',
      dataLine:{
        value:0,name:'冷却水流量-下',max:100,color:[
          [0, '#203add'],
          [1, '#0d1758']],unit:'L/min'
      }
    }
  ];
  HealthParam_left_chart = [
    { 
      name: "冷却水温度-上",nameEn: "冷却水温度-上", unit: "℃",value: []
      ,color:[colors[0],colors[0]]
    },{ 
        name: "冷却水流量-上",nameEn: "冷却水流量-上", unit: "L/min",value: [],
        color:[colors[1],colors[1]]
    },
    { 
      name: "冷却水温度-下",nameEn: "冷却水温度-下", unit: "℃",value: []
      ,color:[colors[2],colors[2]]
    },{ 
        name: "冷却水流量-下",nameEn: "冷却水流量-下", unit: "L/min",value: [],
        color:[colors[3],colors[3]]
    }
  ]
  HealthParam_left_xdata = [];

  //右
  HealthParam_right = [
    {
      id:'motor_chart_g_3',
      dataLine:{
        value:12,name:'实时温度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'℃',un:'常温'
      }
    },
    {
      id:'motor_chart_g_4',
      dataLine:{
        value:12,name:'实时湿度',max:100,color:[
          [0, '#203add'],
          [1, '#0d1758']],unit:'%PH'
      }
    }
  ];
  HealthParam_right_chart = [
    { 
      name: "实时温度",nameEn: "实时温度", unit: "℃",value: []
      ,color:[colors[0],colors[0]]
    },
    // { 
    //     name: "实时湿度",nameEn: "实时湿度", unit: "%PH",value: [],
    //     color:[colors[1],colors[1]]
    // }
  ]
  HealthParam_right_xdata = [];

  //机电实时数据
  threePhase_attrs = [
    { 
      name: "平均电压",nameEn :'平均电压', unit: "V",value: []
      ,color:[colors[0],colors[0]]
    },{ 
        name: "平均电流",nameEn :'平均电流', unit: "A",value: [],
        color:[colors[1],colors[1]]
    },{ 
        name: "U相电压",nameEn :'U相电压', unit: "V",value: [],
        color:[colors[2],colors[2]]
    },{ 
      name: "U相电流",nameEn :'U相电流', unit: "A",value: [],
      color:[colors[3],colors[3]]
    },{ 
      name: "U相电压",nameEn :'U相电压', unit: "V",value: [],
      color:[colors[4],colors[4]]
    },{ 
      name: "U相电流",nameEn :'U相电流', unit: "A",value: [],
      color:[colors[5],colors[5]]
    },{ 
      name: "W相电压",nameEn :'W相电压', unit: "V",value: [],
      color:[colors[6],colors[6]]
    },{ 
      name: "W相电流",nameEn :'W相电流', unit: "A",value: [],
      color:[colors[7],colors[7]]
    }
  ];
  threePhase_xData = [];
  threePhase = [
    {
      id:'threePhase_1_67',
      dataLine:{
        value: 0 ,
        yname: '平均电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_2_67',
      dataLine:{
        value: 0 ,
        yname: '平均电流',
        max: 350,
        unit:'A'
      }
    },
    {
      id:'threePhase_3_67',
      dataLine:{
        value: 0 ,
        yname: 'U相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_4_67',
      dataLine:{
        value: 0 ,
        yname: 'U相电流',
        max: 350,
        unit:'A'
      }
    },
    {
      id:'threePhase_5_67',
      dataLine:{
        value: 0 ,
        yname: 'V相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_6_67',
      dataLine:{
        value: 0 ,
        yname: 'v相电流',
        max: 350,
        unit:'A'
      }
    },
    {
      id:'threePhase_7_67',
      dataLine:{
        value: 0 ,
        yname: 'M相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_8_67',
      dataLine:{
        value: 0 ,
        yname: 'M相电流',
        max: 350,
        unit:'A'
      }
    }
  ]

  speedTorque_attrs = [
    {name:'扭矩',data:[],color:'blue'},
    {name:'转速',data:[],color:'#FF66CC'},
    {name:'功率',data:[],color:'green'},
  ];
  speedTorque_xData = [];


  motor:any = {};

  subscribeList:any = {};//订阅
  timer;//定时器
  language = '';//当前语言

  boyang_deviceid = '';
  ct_deviceid = '';
  th_deviceid = '';

  constructor(private activateInfo:ActivatedRoute,private http:HttpserviceService,private layoutService:LayoutService) { }

  ngOnInit(): void {
     //获取当前语言
     let language = localStorage.getItem('currentLanguage');
     if(language!='zh-CN')this.language = language;
     //订阅左上角点击宽度改变
     this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.resize();
    })
     //订阅路由
     this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      //  console.log(f);
       if(document.getElementById('head_title'))
         document.getElementById('head_title').innerText = f.title;
          if(f.deviceid == 'six'){
            this.boyang_deviceid = 'device_boyang_01';
            this.ct_deviceid = 'device_ct_01';
            this.th_deviceid = 'device_thbox_01';
          }else if(f.deviceid == 'seven'){
            this.boyang_deviceid = 'device_boyang_02';
            this.ct_deviceid = 'device_ct_01';
            this.th_deviceid = 'device_thbox_01';
          }
     })

    this.timer = setInterval(f=>{
        // this.initChart();
        this.get_motor_param();
        this.get_left_data();
        this.get_Temp_Hum();
    },1000)
    setTimeout(() => {
      create_img_16_9();
    }, 1000);
    window.addEventListener('resize',this.resize)
  }

  obser = new Observable(f=>{
    let chart;
    [1, 1, 1, 1, 1].forEach((f,i)=>{
      chart = document.getElementById('electric_'+(i+1)+'_67');
      if(chart)
        echarts.init(chart).resize();
    })
    this.HealthParam_right.forEach(f=>{
      chart = document.getElementById(f.id);
      if(chart)
        echarts.init(chart).resize();
    })
    this.threePhase.forEach(f=>{
      chart = document.getElementById(f.id);
      if(chart)
        echarts.init(chart).resize();
    })
    if(document.getElementById('dashboard_67'))
        echarts.init(document.getElementById('dashboard_67')).resize();
    if(document.getElementById('line_chart_12_67'))
        echarts.init(document.getElementById('line_chart_12_67')).resize();
    if(document.getElementById('threePhase_67'))
        echarts.init(document.getElementById('threePhase_67')).resize();
    if(document.getElementById('motor_chart_2'))
        echarts.init(document.getElementById('motor_chart_2')).resize();
    if(document.getElementById('motor_chart_1'))
        echarts.init(document.getElementById('motor_chart_1')).resize();
        
    f.next('chart刷新');
  })

  resize = () =>{
    setTimeout(() => {
      if(this.subscribeList.resize)this.subscribeList.resize.unsubscribe();
      this.subscribeList.resize = this.obser.subscribe(f=>{
          console.log(f)
      })
    }, 500);
  }



  get_motor_param(){


    let j = ['urmsa','irmsa','urms1','irms1','urms2','irms2','urms3','irms3']
    let res,data:any = {},chart;
    this.subscribeList.motor = this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {"device":this.boyang_deviceid,
    arr:boyang_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      this.motor = data;


      //系统效率 控制器效率  电机效率 控制器输出功率 直流功率
      let arr = [data.eff_sys, data.eff_con, data.eff_mot, data.prmsa, data.prms4].forEach((f,i)=>{
        chart = document.getElementById('electric_'+(i+1)+'_67');
        if(chart)
          equipment_four_road.create_real_electric({text:f,title:''},echarts.init(chart));
      })

      chart = document.getElementById('dashboard_67');
      if(chart)
        equipment_four_road.create_real_dashboard([{
          name: '扭矩',unit: 'N/m',value:data.torque
        },{
          name: '转速',unit: 'km/h',value:data.speed
        },{
          name: '功率',unit: 'W',value:data.p
        }],echarts.init(chart));

      chart = document.getElementById('line_chart_12_67');
      this.speedTorque_attrs[0].data.push(data.torque);
      this.speedTorque_attrs[1].data.push(data.speed);
      this.speedTorque_attrs[2].data.push(data.p);
      
      this.speedTorque_xData.push(rTime(res?res[0].urms1[0][1]:''));
      if(this.speedTorque_xData.length>10){
        this.speedTorque_attrs[0].data.splice(0,1);
        this.speedTorque_attrs[1].data.splice(0,1);
        this.speedTorque_attrs[2].data.splice(0,1);
        this.speedTorque_xData.splice(0,1);
      }

      if(chart)
          equipment_four_road.create_motor_chart({
              xData:this.speedTorque_xData,data:this.speedTorque_attrs,title:'转速/扭矩曲线'},
              echarts.init(chart));

      this.threePhase.forEach((f,i)=>{
        this.threePhase_attrs[i].value.push(data[j[i]]);//表格插入线条的值插入
        if(document.getElementById(f.id)){
          f.dataLine.value = data[j[i]];
          oilsrouce.create_bar_j(f.dataLine,echarts.init(document.getElementById(f.id)),'30%');
        }
      })

      chart = document.getElementById('threePhase_67');
      this.threePhase_xData.push(rTime(res?res[0].urms1[0][1]:''));
      if(this.threePhase_xData.length>10){
        this.threePhase_attrs.forEach(f=>{ f.value.splice(0,1)})
        this.threePhase_xData.splice(0,1);
      }
      if(chart)
        equipment_four_road.create_real_discharge({attrs:this.threePhase_attrs,xData:this.threePhase_xData,title:'三相电压电流(U/V/W)'},echarts.init(chart));
    })
  }


  //温湿度
  get_Temp_Hum(){
    let res,data:any = {};
    this.subscribeList.temp_hum = this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata'
    ,{device:this.th_deviceid,arr:th_param.join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      this.HealthParam_right[0].dataLine.value = data.temperaturereal;
      this.HealthParam_right[0].dataLine.color[0] = [data.temperatureset/this.HealthParam_right[0].dataLine.max,'#203add'];
      if(document.getElementById(this.HealthParam_right[0].id))
        equipment_four_road.create_temp_h_1_p_gauge(
          this.HealthParam_right[0].dataLine
          ,echarts.init(document.getElementById(this.HealthParam_right[0].id)));
          
      this.HealthParam_right_chart[0].value.push(data.temperaturereal);
      this.HealthParam_right_xdata.push(rTime(res?res[0].temperaturereal[0][1]:''));
      if(this.HealthParam_right_xdata.length>10){
        this.HealthParam_right_xdata.splice(0,1);
        this.HealthParam_right_chart.forEach(f=>{
          f.value.splice(0,1);
        })
      }
      if(document.getElementById('motor_chart_2'))
        equipment_four_road.create_real_discharge(
          {attrs:this.HealthParam_right_chart,xData:this.HealthParam_right_xdata,title:''},
          echarts.init(document.getElementById('motor_chart_2')));
    })
  }


  get_left_data(){
    let res,data:any = {};
    this.subscribeList.left = this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {"device":this.ct_deviceid,
    arr:ct_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
        //温度上 流量上  温度下 流量下
        [data.liquidsupplytemperaturetop,data.liquidsupplyflowtop,
          data.liquidsupplytemperaturedown,data.liquidsupplyflowdown].forEach((f:any,i:any)=>{
          this.HealthParam_left[i].dataLine.value =  f;
          this.HealthParam_left_chart[i].value.push(f);
          equipment_four_road.create_temp_h_1_p_gauge(
            this.HealthParam_left[i].dataLine
            ,echarts.init(document.getElementById(this.HealthParam_left[i].id)));
            
        })
        this.HealthParam_left_xdata.push(rTime(res?res[0].liquidsupplyflowtop[0][1]:''));
        if(this.HealthParam_left_xdata.length>10){
          this.HealthParam_left_xdata.splice(0,1);
          this.HealthParam_left_chart.forEach(f=>{
            f.value.splice(0,1);
          })
        }
        if(document.getElementById('motor_chart_1'))
          equipment_four_road.create_real_discharge(
            {attrs:this.HealthParam_left_chart,xData:this.HealthParam_left_xdata,title:'冷却水温度/流速'},
            echarts.init(document.getElementById('motor_chart_1')));
    })
  }
  


  ngOnDestroy(){
    clearInterval(this.timer)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    window.removeEventListener('resize',this.resize)
  }

}
export const boyang_param = [
  'urms1',//u向电压
  'irms1',//u向电流
  'urms2',//v向电压
  'irms2',//v向电流
  'urms3',//W相电压
  'irms3',//平均电流
  'urms4',//平均电压
  'irms4',//W相电流
  'prmsa',//平均功率
  'prms4',//直流功率
  'speed',//转速
  'torque',//扭矩
  'p',//功率
  'eff_sys',//系统效率
  'eff_con',//控制器效率
  'eff_mot',//电机效率
  'urmsa',//平均电压
  'irmsa',//平均电流
]

export const ct_param = [
  'liquidsupplyflowtop',//冷却水流量上
  'liquidsupplytemperaturetop',//冷却水温度-上
  'liquidsupplyflowdown',//冷却水流量下
  'liquidsupplytemperaturedown',//冷却水温度下
]

export const th_param = [
  'temperaturereal',//温度
  'temperatureset'//温度设定值
]
