import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, rgb_del_red,list_jion,list_copy, colorRgb, create_img_16_9, rTime } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-avl-atec',
  templateUrl: './equipment-avl-atec.component.html',
  styleUrls: ['./equipment-avl-atec.component.scss']
})
export class EquipmentAvlAtecComponent implements OnInit {
  attrs = [{ 
    name: "参数1",nameEn :'param1', unit: "V",value: [],show:true
    ,color:["#ff2400", "#e47833"]
  },{ 
      name: "参数2",nameEn :'param2', unit: "V",value: [],show:true,
      color:["#ff00ff", "#ff00ff"]
  },{ 
      name: "参数3",nameEn :'param3', unit: "V",value: [],show:true,
      color:["#d9d919", "#d9d919"]
  },{ 
    name: "参数4",nameEn :'param4', unit: "V",value: [],show:true,
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5",nameEn :'param5', unit: "V",value: [],show:true,
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6",nameEn :'param6', unit: "V",value: [],show:true,
  color:["#d9d919", "#d9d919"]
}]
  xData = [];

  attrs_1 = {};
  attrs_2 = [];
  attrs_3 = [];

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
    {value:'12',name:'drumDragCoeff_F0D',unit:'N'},
    {value:'12',name:'drumDragCoeff_F1D',unit:'N/km/h'},
    {value:'12',name:'drumDragCoeff_F2D',unit:'N/(km/h)^2'},
  ]


  gauge =[
    {
      id:'gauge_1',
      dataLine:{
        value:50,name:'轮速力',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'N'
      }
    },{
      id:'gauge_2',
      dataLine:{
        value:12,name:'速度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'km/h'
      }
    },{
      id:'gauge_3',
      dataLine:{
        value:12,name:'加速度',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'m/s^2'
      }
    },{
      id:'gauge_4',
      dataLine:{
        value:0,name:'功率',max:100,color:[
        [0, '#203add'],
        [1, '#0d1758']],unit:'Kw'
      }
    }
    ,{
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
    }
  ]; 

  mileage = [
    {value:0,name:'mileage1',unit:'km'},
    {value:0,name:'mileage2',unit:'km'},
    {value:0,name:'mileage3',unit:'km'},
    {value:0,name:'mileage4',unit:'km'},
  ]

  img = {
    url:'assets/eimdoard/equipment/images/sqdp.png',
    name:''
  }

  @ViewChild('chart_1')chart_1:any;

  light_deviceid = '';//轻型燃油车排放分析系统;
  t_deviceid = '';//两驱底盘测功机;
  aetc_deviceid = '';//


  light_data:any = {};

  timer:any;//定时器
  language = '';//语言 空为zh-CN中文
  subscribeList:any = {};

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute,
    private http:HttpserviceService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
      
      // if(document){

      // }
      // 'avl_param_chart_1','avl_param_chart_2'
    })

    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
        if(f.deviceid == 'two'){
          this.light_deviceid = 'device_avl_igem02';
          this.aetc_deviceid = 'device_atec_03';

        }else if(f.deviceid == 'four'){
          this.light_deviceid = 'device_avl_igem03';
          this.aetc_deviceid = 'device_atec_04';

        }
        
    })
    let rgb = '';
    this.attrs.forEach((f,i)=>{
      if(i > colors.length-1)
        rgb =  rgb_del_red();
      else
        rgb =  colors[i];
      f.color = [rgb,rgb];
    })


    //赋值
    this.attrs_2 = JSON.parse(JSON.stringify(this.attrs));
    this.attrs_3 = JSON.parse(JSON.stringify(this.attrs));
    this.getData();
    setTimeout(() => {
      this.initChart();
      // this.in();
      create_img_16_9();
    }, 1000);

    window.addEventListener('reszie',this.resize);

  }

  ngAfterViewInit(){
    

  }
  
  resize=()=>{
    
    let obs = new Observable(f=>{
     
      let id = [
        'electric_chart_0', 'electric_chart_1', 'electric_chart_2', 'electric_chart_3',
        'real_temperature_4','real_temperature_5','real_temperature_6',
        'discharge_chart_1',
        'gauge_1','gauge_2','gauge_3','gauge_4','avl_param_chart_1',
        // 'temp_humidity_pressure'
      ];
      id.forEach(f=>{
        if(document.getElementById(f))
          echarts.init(document.getElementById(f)).resize();
      })
      
      f.next('异步执行完成')
    })
    
    obs.subscribe(f=>{
      console.log(f);
     
    })
  }

  getData(){
    let g = 1;
    this.timer = setInterval(() =>{
      this.get_avl_igem();
      this.get_light();
      this.xData.push(g);
      if(this.xData.length>10)this.xData.splice(0,1);
      g++;

      [2,3].forEach(f=>{
        this[`attrs_${f}`].forEach(m =>{
          m.value.push(parseInt((Math.random()*100).toString()));
          if(m.value.length >10 )m.value.splice(0,1);
        })
      })

      let data = this.attrs.filter(f=> f.show);
      let data_1 = {
          series:[],
          xData: [],
          title:''
      };
      data.forEach(f=>{
          if(f.value.length>10)f.value.splice(0,1)
          f.color.forEach((element,i) => {
              element = colorRgb(element,i == 0?'0.3':0.7) 
          });
          f.value.push((Math.random()*100).toFixed(0))
          data_1.series.push({
              name:f.name,
              color:f.color,
              value:f.value
          });
      })

      data_1.xData = this.xData;
      data_1.title = '速度/加速度曲线';
      if(document.getElementById('avl_param_chart_2'))equipment_four_road.create_broken_line(data_1,echarts.init(document.getElementById('avl_param_chart_2')));


    },2000)

    
    
  }


  initChart(){
        this.gauge.forEach(el => {
      if(document.getElementById(el.id))
      equipment_four_road.create_temp_h_1_p_gauge(
        el.dataLine
        ,echarts.init(document.getElementById(el.id)));
    });


  }

  //排放分析仪
  get_avl_igem(){
    let res,data:any = {};
    this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {"device":this.aetc_deviceid,
    arr:avl_igem_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
        res = g.result.message[0].message;
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
    this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {"device":this.aetc_deviceid,
    arr:light_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      res.forEach(el => {
        for(let key in el){
          data[key] = el[key][0][0];
        }
      });
      this.light_data = data;
      this.gauge[4].dataLine.value = data.realtime_temp;
      this.gauge[4].dataLine.color[0] = [data.temp_setpoint/this.gauge[4].dataLine.max, '#203add'];
      this.gauge[5].dataLine.value = data.realtime_humidity;
      this.gauge[5].dataLine.color[0] = [data.humidity_setpoint/this.gauge[5].dataLine.max, '#203add'];
      this.gauge[6].dataLine.value = data.micro_pressure_pv;
      this.gauge[6].dataLine.color[0] = [data.micro_pressure_sp/this.gauge[6].dataLine.max, '#203add'];
      this.light_chart[0].value.push(data.realtime_temp);
      this.light_chart[1].value.push(data.realtime_humidity);
      this.light_chart[2].value.push(data.micro_pressure_pv);
      this.light_xdata.push(rTime(res[0].status[0][1]));
      if(this.light_xdata.length > 10){
        this.light_xdata.splice(0,1);
        this.light_chart.forEach(f=>{
          f.value.splice(0,1);
        })
      }

      if(document.getElementById('discharge_chart_1')){
        let myChart_9 = echarts.init(document.getElementById('discharge_chart_1'));;
        equipment_four_road.create_broken_line({
          title:'温湿度曲线',
          series:this.light_chart,
          xData:this.light_xdata,
        },myChart_9);
      }
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
    // clearInterval(this.timer1)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    window.removeEventListener('resize',this.resize)
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
