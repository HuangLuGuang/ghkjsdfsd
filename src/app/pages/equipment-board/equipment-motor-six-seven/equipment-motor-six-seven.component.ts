import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
let oilsrouce = require('../../../../assets/eimdoard/equipment/js/oilsrouce');

@Component({
  selector: 'ngx-equipment-motor-six-seven',
  templateUrl: './equipment-motor-six-seven.component.html',
  styleUrls: ['./equipment-motor-six-seven.component.scss'],
  
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
    { 
        name: "实时湿度",nameEn: "实时湿度", unit: "%PH",value: [],
        color:[colors[1],colors[1]]
    }
  ]
  HealthParam_right_xdata = [];

  //机电实时数据
  threePhase_attrs = [
    { 
      name: "直线电压",nameEn :'直线电压', unit: "V",value: []
      ,color:[colors[0],colors[0]]
    },{ 
        name: "直线电流",nameEn :'直线电流', unit: "A",value: [],
        color:[colors[1],colors[1]]
    },{ 
        name: "直线功率",nameEn :'直线功率', unit: "kw",value: [],
        color:[colors[2],colors[2]]
    },
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
        yname: 'W相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_8_67',
      dataLine:{
        value: 0 ,
        yname: 'W相电流',
        max: 350,
        unit:'A'
      }
    }
  ]

  speedTorque_attrs = [
    {name:'扭矩',data:[],color:'green'},
    {name:'转速',data:[],color:'#FF66CC'},
    // {name:'功率',data:[],color:'green'},
  ];
  speedTorque_xData = [];

   //设备介绍
   introd_name = 'dj_';
   equipIntroduceList = [
     {title:''}
   ]
   

  motor:any = {};

  subscribeList:any = {};//订阅
  timer;//定时器
  language = '';//当前语言

  boyang_deviceid = '';
  ct_deviceid = '';
  th_deviceid = '';

  constructor(private activateInfo:ActivatedRoute,private http:HttpserviceService,
    private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
     //获取当前语言
     let language = localStorage.getItem('currentLanguage');
     if(language!='zh-CN')this.language = language;

     //订阅路由
     this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      //  console.log(f);
       if(document.getElementById('head_title'))
         document.getElementById('head_title').innerText = f.title;
          if(f.deviceid == 'six'){
            this.boyang_deviceid = 'device_boyang_01';
            this.ct_deviceid = 'device_thermostat_01';
            this.th_deviceid = 'device_motor_cabin01';
          }else if(f.deviceid == 'seven'){
            this.boyang_deviceid = 'device_boyang_02';
            this.ct_deviceid = 'device_thermostat_02';
            this.th_deviceid = 'device_motor_cabin02';
          }
          switch(this.boyang_deviceid){
            case 'device_boyang_01':
              this.img.url = 'assets/eimdoard/equipment/images/dj6_1011.jpeg';
              this.introd_name+='6';
              break;
            case 'device_boyang_02':
              this.img.url = 'assets/eimdoard/equipment/images/dj7_1012.jpeg';
              this.introd_name+='7';
              break;
          }
     })

     let i = 0;
    this.timer = self.setInterval(f=>{
        // this.initChart();

          this.get_motor_param();
          if(i%60 == 0){
            setTimeout(() => {
              this.get_left_data();
            }, 10);
            setTimeout(() => {
              this.get_Temp_Hum();
            }, 10);
            setTimeout(() => {
              this.get_line_speed_torque();
            }, 10);
            this.get_motor_list();
          }
          i++;
    },1000)
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

        let chart;
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
    }, 500);
  }



  get_motor_param(){
    let j = ['urmsa','irmsa','urms1','irms1','urms2','irms2','urms3','irms3']
    let res,data:any = {},chart;
    this.subscribeList.motor = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.boyang_deviceid,
    arr:boyang_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0] ||0;
          }
        });
      else data = {};
      this.motor = data;


      //系统效率 控制器效率  电机效率 控制器输出功率 直流功率
      // let arr = [data.eff_sys, data.eff_con, data.eff_mot, data.prmsa, data.prms4].forEach((f,i)=>{
      //   chart = document.getElementById('electric_'+(i+1)+'_67');
      //   if(chart)
      //     equipment_four_road.create_real_electric({text:f||0,title:'',unit:'%'},echarts.init(chart));
      // })

      chart = document.getElementById('dashboard_67');
      if(chart)
        equipment_four_road.create_real_dashboard([{
          name: '扭矩',unit: 'N/m',value:data.torque||0
        },{
          name: '转速',unit: 'rpm/m',value:data.speed||0
        },{
          name: '功率',unit: 'W',value:data.p||0
        }],echarts.init(chart));

      // chart = document.getElementById('line_chart_12_67');
      // this.speedTorque_attrs[0].data.push(data.torque||0);
      // this.speedTorque_attrs[1].data.push(data.speed||0);
      // // this.speedTorque_attrs[2].data.push(data.p||0);
      
      // this.speedTorque_xData.push(rTime(res?res[0].urms1[0][1]:''));
      // if(this.speedTorque_xData.length>10){
      //   this.speedTorque_attrs[0].data.splice(0,1);
      //   this.speedTorque_attrs[1].data.splice(0,1);
      //   // this.speedTorque_attrs[2].data.splice(0,1);
      //   this.speedTorque_xData.splice(0,1);
      // }

      // if(chart)
      //     equipment_four_road.create_motor_chart({
      //         xData:this.speedTorque_xData,data:this.speedTorque_attrs,title:'转速/扭矩曲线'},
      //         echarts.init(chart));
      this.threePhase.forEach((f,i)=>{
        if(document.getElementById(f.id)){
          f.dataLine.value = data[j[i]]||0;
          oilsrouce.create_bar_j(f.dataLine,echarts.init(document.getElementById(f.id)),'30%');
        }
      })
      
    })
  }

  //电机表
  get_motor_list(){
    // 直线电压 直线电流 直线功率
    // urms4,irms4,prms4
    let res,chart;
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {deviceid:this.boyang_deviceid,arr:'urms4,irms4,prms4'}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      chart = document.getElementById('threePhase_67');
      this.threePhase_attrs[0].value = res[0].urms4.map(m =>(m[0]));
      this.threePhase_attrs[1].value = res[1].irms4.map(m =>(m[0]));
      this.threePhase_attrs[2].value = res[2].prms4.map(m =>(m[0]));

      if(this.threePhase_attrs[0].value.length>this.threePhase_attrs[1].value.length){
        this.threePhase_xData = res[0].urms4.map(m =>(m[1]));
      }else if(this.threePhase_attrs[1].value.length>this.threePhase_attrs[2].value.length){
        this.threePhase_xData = res[1].irms4.map(m =>(m[1]));
      }else{
        this.threePhase_xData = res[2].prms4.map(m =>(m[1]));
      }
      
      if(chart)
        equipment_four_road.create_real_discharge({attrs:this.threePhase_attrs,xData:this.threePhase_xData,title:'三相电压电流(U/V/W)'},echarts.init(chart));
    })
  }


  //温湿度
  get_Temp_Hum(){
    let res,data:any = [],xdata = [];
    this.subscribeList.temp_hum = this.http.callRPC('device_realtime_list',library+'device_realtime_list'
    ,{deviceid:this.th_deviceid,arr:th_param.join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      // if(res)
      //   res.forEach(el => {
      //     for(let key in el){
      //       data[key] = el[key][0][0];
      //     }
      //   });
      // 'tempactual',//温度
      // 'humiactual',//湿度
      // 'tempset',//温度设定值
      // 'humiset',//湿度设定值
      setTimeout(() => {
        
        this.HealthParam_right_chart[0].value = res[0].tempactual.map(m =>m[0]);
        this.HealthParam_right_chart[1].value = res[1].humiactual.map(m =>m[0]);
        if(this.HealthParam_right_chart[0].value.length> this.HealthParam_right_chart[1].value.length){
          xdata = res[0].tempactual.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')))
        }else{
          xdata = res[1].humiactual.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')))
        }
        this.HealthParam_right_xdata = xdata;
  
        if(document.getElementById('motor_chart_2'))
          equipment_four_road.create_real_discharge(
            {attrs:this.HealthParam_right_chart,xData:this.HealthParam_right_xdata,title:''},
            echarts.init(document.getElementById('motor_chart_2')));
      }, 10);

      // 'tempactual',//温度
      // 'humiactual',//湿度
      // 'tempset',//温度设定值
      // 'humiset',//湿度设定值
      
      let dataLine =this.HealthParam_right[0].dataLine;
      let set = res[2].tempset.length > 0? res[2].tempset[res[2].tempset.length-1][0]:0;
      //仪表盘
      dataLine.value = res[0].tempactual.length > 0? res[1].tempset[res[0].tempactual.length-1][0]:0;
      dataLine.color[0] = [dataLine.max?(set/dataLine.max):0,'#203add'];
      if(document.getElementById(this.HealthParam_right[0].id))
        equipment_four_road.create_temp_h_1_p_gauge(
          this.HealthParam_right[0].dataLine
          ,echarts.init(document.getElementById(this.HealthParam_right[0].id)));

      dataLine = this.HealthParam_right[1].dataLine;
      set = res[3].humiset.length > 0? res[3].humiset[res[3].humiset.length-1][0]:0;
      //仪表盘
      dataLine.value = res[1].humiactual.length > 0? res[1].humiset[res[1].humiactual.length-1][0]:0;
      dataLine.color[0] = [dataLine.max?(set/dataLine.max):0,'#203add'];
      if(document.getElementById(this.HealthParam_right[1].id))
        equipment_four_road.create_temp_h_1_p_gauge(
          this.HealthParam_right[1].dataLine
          ,echarts.init(document.getElementById(this.HealthParam_right[1].id)));
    })
  }

  //冷却水
  get_left_data(){
    let res;
    this.subscribeList.left = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {"deviceid":this.ct_deviceid,
    arr:ct_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      // if(res)
      //   res.forEach(el => {
      //     for(let key in el){
      //       data[key] = el[key][0][0];
      //     }
      //   });
      //   //温度上 流量上  温度下 流量下
      //   [data.liquidsupplytemperaturetop,data.liquidsupplyflowtop,
      //     data.liquidsupplytemperaturedown,data.liquidsupplyflowdown].forEach((f:any,i:any)=>{
      //     this.HealthParam_left[i].dataLine.value =  f||0;
      //     this.HealthParam_left_chart[i].value.push(f);
      //     equipment_four_road.create_temp_h_1_p_gauge(
      //       this.HealthParam_left[i].dataLine
      //       ,echarts.init(document.getElementById(this.HealthParam_left[i].id)));
            
      //   })
      //   this.HealthParam_left_xdata.push(rTime(res?res[0].liquidsupplyflowtop[0][1]:''));
      //   if(this.HealthParam_left_xdata.length>10){
      //     this.HealthParam_left_xdata.splice(0,1);
      //     this.HealthParam_left_chart.forEach(f=>{
      //       f.value.splice(0,1);
      //     })
      //   }
      //   if(document.getElementById('motor_chart_1'))
      //     equipment_four_road.create_real_discharge(
      //       {attrs:this.HealthParam_left_chart,xData:this.HealthParam_left_xdata,title:'冷却水温度/流速'},
      //       echarts.init(document.getElementById('motor_chart_1')));
      // 'liquidsupplyflowtop',//冷却水流量上
      // 'liquidsupplytemperaturetop',//冷却水温度-上
      // 'liquidsupplyflowdown',//冷却水流量下
      // 'liquidsupplytemperaturedown',//冷却水温度下

      this.HealthParam_left_chart[0].value = res[0].liquidsupplytemperaturetop.map(m => (m[0]));
      this.HealthParam_left_chart[1].value = res[1].liquidsupplyflowtop.map(m => (m[0]));
      this.HealthParam_left_chart[2].value = res[2].liquidsupplytemperaturedown.map(m => (m[0]));
      this.HealthParam_left_chart[3].value = res[3].liquidsupplyflowdown.map(m => (m[0]));

      let max:any = res[0];
      for (let i = 0; i < res.length - 1; i++) {
          max = max < res[i+1] ? res[i+1] : max
      }
      max = Object.values(max)
      this.HealthParam_left_xdata = max[0].map(m => m[1]);

      if(document.getElementById('motor_chart_1'))
          equipment_four_road.create_real_discharge(
            {attrs:this.HealthParam_left_chart,xData:this.HealthParam_left_xdata,title:'冷却水温度/流速'},
            echarts.init(document.getElementById('motor_chart_1')));
      //仪表盘
      this.HealthParam_left.forEach((f:any,i)=>{
        let length = this.HealthParam_left_chart[i].value.length;
        //判断获取到的数据中心长度最长的
        f.dataLine.value = length>0? this.HealthParam_left_chart[i].value[length-1]:0;
        equipment_four_road.create_temp_h_1_p_gauge(
          f.dataLine
          ,echarts.init(document.getElementById(f.id)));
      });


    })
  }

  //右下角表转速扭矩
  get_line_speed_torque(){
    let chart;
    this.subscribeList.get_line_speed_torque = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {deviceid:this.boyang_deviceid,arr:'speed,torque'}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;
      setTimeout(() => {
        chart = document.getElementById('line_chart_12_67');
        this.speedTorque_attrs[0].data = res[1].torque.map(m => (m[0]));
        this.speedTorque_attrs[1].data = res[0].speed.map(m => (m[0]));
        let i= 0,c = 'speed';
        if(res[0].speed.length < res[1].torque.length){
          i= 1,c = 'torque';
        }
        this.speedTorque_xData = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
        if(chart)
        equipment_four_road.create_motor_chart({
            xData:this.speedTorque_xData,data:this.speedTorque_attrs,title:'转速/扭矩曲线'},
            echarts.init(chart));

      }, 10);

      // setTimeout(() => {
      //   chart = document.getElementById('threePhase_67');
      //   this.threePhase_attrs[0].value = res[3].pa_udc1.map(m => (m[0]||0));
      //   this.threePhase_attrs[1].value = res[4].pa_idc1.map(m => (m[0]||0));
      //   this.threePhase_attrs[2].value = res[5].pa_p1.map(m => (m[0]||0));

      //   let i= 3,c = 'pa_udc1';
      //   if(res[0].pa_udc1.length < res[1].pa_idc1.length){
      //     i= 4,c = 'pa_idc1';
      //   }else if(res[0].pa_udc1.length < res[2].pa_p1.length){
      //     i= 5,c = 'pa_p1';
      //   }
      //   this.threePhase_xData = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'MM-dd hh:mm:ss')));
      //   if(chart)
      //       equipment_four_road.create_real_discharge(
      //         {attrs:this.threePhase_attrs,xData:this.threePhase_xData,title:'母线电压电流/直流功率'},echarts.init(chart));
      // }, 20);
    });
  }
  


  ngOnDestroy(){
    clearInterval(this.timer)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }

    let chart;
      
      this.HealthParam_right.forEach(f=>{
        chart = document.getElementById(f.id);
        if(chart)echarts.init(chart).dispose();
      })
      this.HealthParam_left.forEach(f=>{
        chart = document.getElementById(f.id);
        if(chart)echarts.init(chart).dispose();
      })
      this.threePhase.forEach(f=>{
        chart = document.getElementById(f.id);
        if(chart)echarts.init(chart).dispose();
      });
      ['dashboard_67','line_chart_12_67','threePhase_67','motor_chart_2','motor_chart_1'].forEach(el => {
        chart = document.getElementById(el);
        if(chart)echarts.init(chart).dispose();
      });
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
  'liquidsupplytemperaturetop',//冷却水温度-上
  'liquidsupplyflowtop',//冷却水流量上
  'liquidsupplytemperaturedown',//冷却水温度下
  'liquidsupplyflowdown',//冷却水流量下
]

export const th_param = [
  'tempactual',//温度
  'humiactual',//湿度
  'tempset',//温度设定值
  'humiset',//湿度设定值
]
