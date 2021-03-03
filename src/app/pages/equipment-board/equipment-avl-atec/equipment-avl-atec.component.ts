import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors,  create_img_16_9, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-avl-atec',
  templateUrl: './equipment-avl-atec.component.html',
  styleUrls: ['./equipment-avl-atec.component.scss'],
  
})
export class EquipmentAvlAtecComponent implements OnInit {
  avl_chart = [
    {value:[],name:'速度',unit:'km/h',color:[colors[0],colors[0]]},
    {value:[],name:'加速度',unit:'m/s^2',color:[colors[1],colors[1]]},
  ];
  avl_xdata = [];

  light_chart = [
    {value:[],name:'温度',unit:'℃',color:[colors[1],colors[1]]},
    {value:[],name:'湿度',unit:'%RH',color:[colors[2],colors[2]]},
    {value:[],name:'微压差',unit:'Pa',color:[colors[3],colors[3]]},
  ]
  light_xdata = [];


  dischargeList = [
    [
      {value:0,name:'CxHy',unit:'ppm'},
      {value:0,name:'CH4',unit:'ppm'},
      {value:0,name:'NOx',unit:'ppm'},
      {value:0,name:'CO2',unit:'ppm'},
      {value:0,name:'CO',unit:'ppm'},
      {value:'2.3',name:'YHYD',unit:'ppm'},
    ],
    [
      {value:0,name:'CxHy',unit:'ppm'},
      {value:0,name:'CH4',unit:'ppm'},
      {value:0,name:'NOx',unit:'ppm'},
      {value:0,name:'CO2',unit:'ppm'},
      {value:0,name:'CO',unit:'ppm'},
    ]

  ]


  avl_paramlist = [
    // {value:0,name:'drumDragCoeff_F0D',unit:'N'},
    // {value:0,name:'drumDragCoeff_F1D',unit:'N/km/h'},
    // {value:0,name:'drumDragCoeff_F2D',unit:'N/(km/h)^2'},
    {value:'12',name:'drumDragCoeff_F0D',unit:'N'},
    {value:'12',name:'drumDragCoeff_F1D',unit:'N/km/h'},
    {value:'12',name:'drumDragCoeff_F2D',unit:'N/(km/h)^2'},
  ]


  gauge =[
    {
      id:'gauge_1',
      dataLine:{
        value:0,name:'轮速力',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'N'
      }
    },{
      id:'gauge_2',
      dataLine:{
        value:0,name:'速度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'km/h'
      }
    },{
      id:'gauge_3',
      dataLine:{
        value:0,name:'加速度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'m/s^2'
      }
    },{
      id:'gauge_4',
      dataLine:{
        value:0,name:'轮边功率',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'Kw'
      }
    }
    ,{
      id:'real_temperature_4',
      dataLine:{
        value:0,name:'实时温度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'℃',un:'常温'
      }
    }
    ,{
      id:'real_temperature_5',
      dataLine:{
        value:0,name:'实时湿度',max:100,color:[
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
    }
  ]; 

  mileage = [
    {value:0,name:'mileage1',unit:'km'},
    {value:0,name:'mileage2',unit:'km'},
    {value:0,name:'mileage3',unit:'km'},
    {value:0,name:'mileage4',unit:'km'},
  ]

  img = {
    url:'',
    name:''
  }

  inertia  = '';//惯量


  light_deviceid = '';//轻型燃油车排放分析系统;
  avl_deviceid = '';//两驱底盘测功机;
  aetc_deviceid = '';//


  light_data:any = {};

  timer:any;//定时器
  language = '';//语言 空为zh-CN中文
  subscribeList:any = {};

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
        if(f.deviceid == 'two'){
          this.light_deviceid = 'device_avl_igem02';
          this.aetc_deviceid = 'device_atec_03';
          this.avl_deviceid = 'device_avl2dyno_01';
          this.img.url = 'assets/eimdoard/equipment/images/liangqu.jpg';
        }else if(f.deviceid == 'four'){
          this.light_deviceid = 'device_avl_igem03';
          this.aetc_deviceid = 'device_atec_04';
          this.avl_deviceid = 'device_avl4dyno_01';
          this.img.url = 'assets/eimdoard/equipment/images/siqu.jpg';
        }
        
    })



    this.getData();
   


    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.resize();
    })

  }

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false});
    setTimeout(() => {
      create_img_16_9();
    }, 1000);
  }


  resize = () =>{
    setTimeout(() => {
      this.gauge.forEach(el => {
        if(document.getElementById(el.id))
          echarts.init(document.getElementById(el.id)).resize();
      });
      if(document.getElementById('avl_param_chart_2'))
          echarts.init(document.getElementById('avl_param_chart_2')).resize();
      if(document.getElementById('avl_discharge_chart_1'))
          echarts.init(document.getElementById('avl_discharge_chart_1')).resize();
    }, 500);
  }


  getData(){
    let i = 0;
    this.timer = self.setInterval(() =>{
      this.get_avl_igem();
      this.get_light();
      this.get_avl_d();
      if(i%60 == 0){
        setTimeout(() => {
          this.get_light_list();
        }, 10);
        this.get_avl_d_list();
      }
      i++;
    },1000)
  }


  //排放分析仪
  get_avl_igem(){
    let res,data:any = {};
    this.subscribeList.igem = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.light_deviceid,
    arr:avl_igem_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
        res = g.result.message[0].message || []; 
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
        [
          ['bag_thc','bag_ch4','bag_nox','bag_co2','bag_col','bag_n2o'],
          ['modal_thc','modal_ch4','modal_nox','modal_co2','modal_col']
        ].forEach((f:any,i:any)=>{
          f.forEach((el:any,j:any) => {
            this.dischargeList[i][j].value = data[el];
          });
          
        })

    })
  }

  //环境仓参数
  get_light(){
    let res,data:any = {};
    this.subscribeList.light = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.aetc_deviceid,
    arr:light_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      this.light_data = data;
      this.gauge[4].dataLine.value = data.realtime_temp || 0;
      this.gauge[4].dataLine.color[0] = [(data.temp_setpoint||0)/this.gauge[4].dataLine.max, '#203add'];
      this.gauge[5].dataLine.value = data.realtime_humidity || 0;
      this.gauge[5].dataLine.color[0] = [(data.humidity_setpoint||0)/this.gauge[5].dataLine.max, '#203add'];
      this.gauge[6].dataLine.value = data.micro_pressure_pv || 0;
      this.gauge[6].dataLine.color[0] = [(data.micro_pressure_sp||0)/this.gauge[6].dataLine.max, '#203add'];
      [this.gauge[4],this.gauge[5],this.gauge[6]].forEach(el => {
        if(document.getElementById(el.id))
          equipment_four_road.create_temp_h_1_p_gauge(
            el.dataLine
            ,echarts.init(document.getElementById(el.id)));
      });
      
    })
  }

  //环境仓 曲线
  get_light_list(){
    let res,xdata = [],data = this.light_chart;
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',{
      deviceid:this.aetc_deviceid,arr:'realtime_temp,realtime_humidity,micro_pressure_pv'
    }).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      data[0].value = res[0].realtime_temp.map(m =>(m[0]));
      data[1].value = res[1].realtime_humidity.map(m =>(m[0]));
      data[2].value = res[2].micro_pressure_pv.map(m =>(m[0]));

      if(data[0].value.length > data[1].value.length){
        xdata = res[0].realtime_temp.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }else if(data[1].value.length > data[2].value.length){
        xdata = res[1].realtime_humidity.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }else{
        xdata = res[2].micro_pressure_pv.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      };
      this.light_xdata = xdata
      if(document.getElementById('avl_discharge_chart_1')){
        let myChart_9 = echarts.init(document.getElementById('avl_discharge_chart_1'));;
        equipment_four_road.create_broken_line({
          title:'温湿度曲线',
          series:data,
          xData:this.light_xdata,
        },myChart_9);
      }
    });
  }

  //avl转速
  get_avl_d(){
    let res,data:any = {};
    this.subscribeList.avl_d = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.avl_deviceid,
    arr:avl_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      
      
      this.gauge[0].dataLine.value = data.f ||0;
      this.gauge[1].dataLine.value = data.v||0;
      this.gauge[2].dataLine.value = data.a||0;
      this.gauge[3].dataLine.value = data.p||0;
      [this.gauge[0],this.gauge[1],this.gauge[2],this.gauge[3]].forEach(f=>{
        if(document.getElementById(f.id))
          equipment_four_road.create_temp_h_1_p_gauge(
            f.dataLine
            ,echarts.init(document.getElementById(f.id)));
      })
      // this.avl_paramlist[0].value = data.f0r;
      // this.avl_paramlist[1].value = data.f1r;
      // this.avl_paramlist[2].value = data.f2r;
      this.avl_paramlist[0].value = data.f0d ||0;
      this.avl_paramlist[1].value = data.f1d ||0;
      this.avl_paramlist[2].value = data.f2d ||0;


      this.mileage[0].value = data.distance1 ||0;
      this.mileage[1].value = data.distance2 ||0;
      this.mileage[2].value = data.distance3 ||0;
      this.mileage[3].value = data.distance4 ||0;

      
      this.inertia = data.rw||0;

    })
  }

  get_avl_d_list(){
    let res,xdata:any = [];
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',{
      deviceid:this.avl_deviceid,arr:'v,a'
    }).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      this.avl_chart[0].value = res[0].v.map(m =>(m[0]));
      this.avl_chart[1].value = res[1].a.map(m =>(m[0]));
      if(this.avl_chart[0].value.length > this.avl_chart[1].value.length){
        xdata  = res[0].v.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }else{
        xdata  = res[1].a.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }
      this.avl_xdata = xdata;
      if(document.getElementById('avl_param_chart_2'))
          equipment_four_road.create_broken_line({
            title:'速度/加速度曲线',
            series:this.avl_chart,
            xData:this.avl_xdata,
          },echarts.init(document.getElementById('avl_param_chart_2')));
    });
  }


  getleft(item){
    return item > 40?item-20+'%':'20%';
  }


  get_td_width(num){
    return 100/num+'%'
  }

  

  ngOnDestroy(){
    clearInterval(this.timer);
    // clearInterval(this.timer1)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }

    let chart;
    this.gauge.forEach(el => {
      chart = document.getElementById(el.id)
      if(chart)echarts.init(chart).dispose();
    });
    chart = document.getElementById('avl_param_chart_2');
    if(chart)echarts.init(chart).dispose(chart);
    chart = document.getElementById('avl_discharge_chart_1');
    if(chart)echarts.init(chart).dispose();
  }

}

export const avl_igem_param = [
  //L1
  'bag_thc',//碳氢化合物
  'bag_ch4',//甲烷
  'bag_nox',//氮氧化合物
  'bag_co2',//二氧化碳
  'bag_col',//一氧化碳
  'bag_n2o',//氧化亚氮
  //L2
  'modal_thc',//碳氢化合物
  'modal_ch4',//甲烷
  'modal_nox',//氮氧化合物
  'modal_co2',//二氧化碳
  'modal_col',//氧化亚氮
]

export const light_param = [
  'status',//状态
  'temp_setpoint',//设定温度
  'humidity_setpoint',//设定湿度
  'realtime_temp',//实时温度
  'realtime_humidity',//实时湿度
  'micro_pressure_sp',//微压差设定
  'micro_pressure_pv',//微压差值
  'ventilation_status',//新风状态
  'co_concentration',//一氧化碳
  'hc_concentration',//碳氢化合物
]

export const avl_param = [
  'v',//速度
  'f',//轮速力
  'p',//功率
  'a',//加速度
  // 'f0r',//道路模拟器阻力系数F0R
  // 'f1r',//道路模拟器阻力系数F1R
  // 'f2r',//道路模拟器阻力系数F2R
  'f0d',//转鼓阻力系数F0D
  'f1d',//转鼓阻力系数F1D
  'f2d',//转鼓阻力系数F2D
  'distance1',//里程1
  'distance2',//里程2
  'distance3',//里程3
  'distance4',//里程4
  'rw',//惯量
]
