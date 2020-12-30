import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, rTime } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
@Component({
  selector: 'ngx-equipment-avl',
  templateUrl: './equipment-avl.component.html',
  styleUrls: ['./equipment-avl.component.scss']
})
export class EquipmentAvlComponent implements OnInit {


  avl_speed = [
    {
      id:'avl_gauge_1',
      dataLine:{
        value:50,name:'轮边力',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'N'
      }
    },{
      id:'avl_gauge_2',
      dataLine:{
        value:12,name:'速度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'km/h'
      }
    },{
      id:'avl_gauge_3',
      dataLine:{
        value:12,name:'加速度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'m/s^2'
      }
    },{
      id:'avl_gauge_4',
      dataLine:{
        value:12,name:'功率',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'Kw'
      }
    }
  ]
  avl_speed_chart = [
    { 
      name: "轮边力",nameEn :'轮边力', unit: "N",value: [],
      color:[colors[0], colors[0]]
    },
    { 
      name: "速度",nameEn :'速度', unit: "km/h",value: [],
      color:[colors[1], colors[1]]
    },
    { 
      name: "加速度",nameEn :'加速度', unit: "m/s^2",value: [],
      color:[colors[2], colors[2]]
    },
    { 
      name: "功率",nameEn :'功率', unit: "Kw",value: [],
      color:[colors[3], colors[4]]
    }
  ]
  avl_speed_xdata = []
  

  environmental = {
    ct_fun_hz_set:0,
    xf_fun_hz_set:0
  }
  environmental_real_data = {
    arr:[{name:'舱状态',nameEn:'CabinStatus',value:1},{name:'新风系统',nameEn:'NewSealSystem',value:1}
    ,{name:'转轮排湿',nameEn:'RunnerDehumidi',value:1},{name:'制冷除湿',nameEn:'RefrigeraDehumidifica',value:1}
    ,{name:'制冷机组1',nameEn:'RefrigerationUnit1',value:1},{name:'制冷机组2',nameEn:'RefrigerationUnit2',value:1},]
  }
  outRenturnWind = [
    {text:0,title:'新风温度',titleEn:'OutletTemperature'},
    {text:0,title:'新风湿度',titleEn:'OutletAirHumidity'},
    {text:0,title:'回风温度',titleEn:'ReturnTemperature'},
    {text:0,title:'回风湿度',titleEn:'ReturnAirHumidity'},
  ]
  // 温度 湿度 压强
  environmental_chart = [
    { 
      name: "温度",nameEn :'Temp', unit: "摄氏度",value: [],
      color:[colors[0], colors[0]]
    },
    { 
      name: "湿度",nameEn :'Hum', unit: "%RH",value: [],
      color:[colors[1], colors[1]]
    },
    { 
      name: "压强",nameEn :'Pressure', unit: "Pa",value: [],
      color:[colors[2], colors[2]]
    }
  ];
  environmental_xdata = [];

  //排放分析
  discharge = [
    {value:'4.6',name:'equipment.CO2'},
    {value:'12',name:'equipment.THC'},
    {value:'90',name:'equipment.CO'},
    {value:'4.6',name:'equipment.CH4'},
    {value:'12',name:'equipment.NOx'},
    {value:'90',name:'equipment.N2O'},
  ]
  discharge_charts = [
    { 
      name: "二氧化碳",nameEn :'CO2', unit: "",value: [],
      color:[colors[0], colors[0]]
    },
    { 
      name: "总碳氢",nameEn :'THC', unit: "",value: [],
      color:[colors[1], colors[1]]
    },
    { 
      name: "一氧化碳",nameEn :'CO', unit: "",value: [],
      color:[colors[2], colors[2]]
    },
    { 
      name: "甲烷",nameEn :'CH4', unit: "",value: [],
      color:[colors[3], colors[3]]
    },
    { 
      name: "氮氧化物",nameEn :'NOX', unit: "",value: [],
      color:[colors[4], colors[4]]
    },
    { 
      name: "氧化亚氮",nameEn :'N2O', unit: "",value: [],
      color:[colors[5], colors[5]]
    },
  ]
  discharge_xdata = [];
  

  img = {
    url:'assets/eimdoard/equipment/images/s.png',
    name:''
  }

  list = ['12','34','56'];

  @ViewChild('chart_1')chart_1:any;

  deviceid_environmental = 'device_jiuding_01';
  deviceid_discharge = 'device_avl_igem01';//排放分析deviceid
  deviceid_avl_speed = 'device_avldyno_03';//avl转速

  click_list = [];//当前选中的tag

  timer:any;//定时器
  language = '';//语言 空为zh-CN中文
  subscribeList:any = {};

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute,
    private http:HttpserviceService 
    ) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.resize();
    })

    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
    

    //赋值
    this.getData();
    setTimeout(() => {
      create_img_16_9();
    }, 1000);
    window.addEventListener('resize',this.resize);
    
  }

  obser = new Observable(f=>{
    this.outRenturnWind.forEach((f:any,i:number) => {
      if(!echarts.init(document.getElementById('electric_chart_'+i)))return;
      echarts.init(document.getElementById('electric_chart_'+i)).resize();
    })
    this.avl_speed.forEach(el=>{
      if(document.getElementById(el.id))
        echarts.init(document.getElementById(el.id)).resize();    
    })
    if(document.getElementById('discharge_chart'))
        echarts.init(document.getElementById('discharge_chart')).resize();
    if(document.getElementById('temp_humidity_pressure'))
        echarts.init(document.getElementById('temp_humidity_pressure')).resize();
    if(document.getElementById('discharge_chart_1'))
        echarts.init(document.getElementById('discharge_chart_1')).resize();
    if(document.getElementById('avl_speed_chart_1'))
        echarts.init(document.getElementById('avl_speed_chart_1')).resize();
        
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
  

  getData(){
    
    this.timer = setInterval(() =>{
      this.get_avl_discharge();
      this.get_avl_environmental_warehouse();
      this.get_avl_speed();
    },1000)
    
  }




  /**
   * 排放分析
   */
  get_avl_discharge(){
    let res,data:any = {};
    this.subscribeList.discharge = this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {"device":this.deviceid_discharge,
    arr:discharge_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      this.discharge[0].value = data.co2;
      this.discharge[1].value = data.thc;
      this.discharge[2].value = data.co1;
      this.discharge[3].value = data.ch4;
      this.discharge[4].value = data.nox;
      this.discharge[5].value = data.n2o;
      this.discharge_charts.forEach((f,i)=>{
        f.value.push( this.discharge[i].value);
      });
      this.discharge_xdata.push(rTime(res?res[0].co2[0][1]:''))
      if(this.discharge_xdata.length>10){
        this.discharge_xdata.splice(0,1);
        this.discharge_charts.forEach(el => {
          el.value.splice(0,1);
        });
      }
      //只有一个公共组件
      if(document.getElementById('discharge_chart')){
        let myChart_8 = echarts.init(document.getElementById('discharge_chart'));;
        equipment_four_road.create_real_discharge({attrs:this.discharge_charts,xData:this.discharge_xdata},myChart_8);
      }

    })
  }


  /**
   * 环境仓参数
   */
  get_avl_environmental_warehouse(){
    let res,data:any = {};
    this.subscribeList.warehouse = this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {"device":this.deviceid_environmental,
    arr:environmental_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });

      //温度 湿度 压强
      if(document.getElementById('temp_humidity_pressure'))
        equipment_four_road.create_temp_humidity_pressure_gauge({
          temp:{
              value:data.ct_temp,
              max:120,
              color:[
                  [0.4, '#203add'],
                  [1, '#0d1758']
              ]
          },
          humidity:{
              value:data.ct_hum,
              max:120,
              color:[
                  [0.4, '#203add'],
                  [1, '#0d1758']
              ]
          },
          pressure:{
              value:data.ct_pressure_set,
              max:120,
              color:[
                  [0.4, '#203add'],
                  [1, '#0d1758']
              ]
          }
      },echarts.init(document.getElementById('temp_humidity_pressure')))

      //曲线图
      this.environmental_chart[0].value.push(data.ct_temp);
      this.environmental_chart[1].value.push(data.ct_hum);
      this.environmental_chart[2].value.push(data.ct_pressure_set);
      this.environmental_xdata.push(rTime(res?res[0].ct_temp[0][1]:''));
      if(this.environmental_xdata.length >10){
        this.environmental_xdata.splice(0,1);
        this.environmental_chart.forEach(f=>{
          f.value.splice(0,1);
        })
      }
      if(document.getElementById('discharge_chart_1')){
        let myChart_9 = echarts.init(document.getElementById('discharge_chart_1'));;
        equipment_four_road.create_real_discharge(
          {attrs:this.environmental_chart,xData:this.environmental_xdata},myChart_9);
      }

      // 舱状态
      this.environmental_real_data.arr[0].value = data.start;
      // 新风系统
      this.environmental_real_data.arr[1].value = data.xf_start;
      // 转轮排湿
      this.environmental_real_data.arr[2].value = data.wd_status;
      // 制冷除湿
      this.environmental_real_data.arr[3].value = data.rd_status;
      // 制冷机组1
      this.environmental_real_data.arr[4].value = data.select_unit_1;
      // 制冷机组2
      this.environmental_real_data.arr[5].value = data.select_unit_2;

      //新风温度
      this.outRenturnWind[0].text = data.xf_out_temp;
      //新风湿度
      this.outRenturnWind[1].text = data.xf_out_hum;
      // 出风温度
      this.outRenturnWind[2].text = data.ct_back_temp;
      // 出风湿度
      this.outRenturnWind[3].text = data.ct_back_hum;
      this.outRenturnWind.forEach((f:any,i:number) => {
        if(!echarts.init(document.getElementById('electric_chart_'+i)))return;
        let c = echarts.init(document.getElementById('electric_chart_'+i));
        equipment_four_road.create_real_electric({text:f.text,title:this.language?f.titleEn:f.title},c);
      });

      //循环风机频率
      this.environmental.ct_fun_hz_set = data.ct_fun_hz_set;
      //新风风机频率
      this.environmental.xf_fun_hz_set = data.xf_fun_hz_set;
    })
  }

  /**
   * avl转速
   */
  get_avl_speed(){
    let res,data:any = {};
    this.subscribeList.speed = this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {"device":this.deviceid_avl_speed,
    arr:avl_speed_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      this.avl_speed[0].dataLine.value = data.f;
      this.avl_speed[1].dataLine.value = data.v;
      this.avl_speed[2].dataLine.value = data.a;
      this.avl_speed[3].dataLine.value = data.p;

      this.avl_speed.forEach(el=>{
        if(document.getElementById(el.id))
        equipment_four_road.create_temp_h_1_p_gauge(
          el.dataLine
          ,echarts.init(document.getElementById(el.id)));
      })
      this.avl_speed_chart[0].value.push(data.f);
      this.avl_speed_chart[1].value.push(data.v);
      this.avl_speed_chart[2].value.push(data.a);
      this.avl_speed_chart[3].value.push(data.p);
      this.avl_speed_xdata.push(rTime(res?res[0].v[0][1]:''));
      if(this.avl_speed_xdata.length>10){
        this.avl_speed_xdata.splice(0,1);
        this.avl_speed_chart.forEach(el => {
          el.value.splice(0,1);
        });
      }
      if(document.getElementById('avl_speed_chart_1'))
        equipment_four_road.create_real_discharge(
          {attrs:this.avl_speed_chart,xData:this.avl_speed_xdata}
          ,echarts.init(document.getElementById('avl_speed_chart_1')));
    })
  }



  getleft(item){
    return item > 40?item-20+'%':'20%';
  }


  get_td_width(num){
    return 100/num+'%'
  }

  


  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    window.addEventListener('resize',this.resize)
  }

}

export const discharge_param = [
  'co2',//二氧化碳
  'co1',//一氧化碳
  'nox',//氮氧化物
  'n2o',//氧化亚氮
  'thc',//总碳氢
  'ch4',//甲烷
]


export const environmental_param = [
  'ct_temp',//舱内温度
  'ct_hum',//舱内湿度
  'ct_pressure_set',//压强
  'start',//舱状态
  'xf_start',//新风状态
  'wd_status',//轮转排湿
  'rd_status',//制冷除湿

  'ct_fun_hz_set',//循环风机频率
  'xf_fun_hz_set',//新风风机频率
  'ct_back_hum',//回风湿度
  'ct_back_temp',//回风温度

  'xf_out_hum',//新风湿度
  'xf_out_temp',//新风温度
  'select_unit_2',//制冷机组2
  'select_unit_1',//制冷机组1
]

export const avl_speed_param = [
  'v',//速度
  'a',//加速度
  'p',//功率
  'f',//牵引力
]