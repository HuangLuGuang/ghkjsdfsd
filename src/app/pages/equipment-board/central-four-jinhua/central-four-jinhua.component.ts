import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-central-four-jinhua',
  templateUrl: './central-four-jinhua.component.html',
  styleUrls: ['./central-four-jinhua.component.scss']
})
export class CentralFourJinhuaComponent implements OnInit {




  discharge = [
    {value:'0',name:'mileage1',unit:'Km'},
    {value:'0',name:'mileage2',unit:'Km'},
    {value:'0',name:'mileage3',unit:'Km'},
    {value:'0',name:'mileage4',nameEn:'',unit:'Km'},
    {value:'0',name:'FanSpeedCoefficient_n0',unit:'%'},
    {value:'0',name:'FanSpeedCoefficient_n1',unit:'%/km/h'},
    {value:'0',name:'FanSpeedCoefficient_n2',unit:'%/(km/h)^2'},
  ]
  discharge_chart = [
    {value:[],name:'功率',unit:'Kw',color:[colors[3],colors[3]]},
    // {value:[],name:'里程1',unit:'Km',color:[colors[0],]},
    // {value:[],name:'里程2',unit:'Km',color:[colors[1],colors[1]]},
    // {value:[],name:'里程3',unit:'Km',color:[colors[2],colors[2]]},
    // {value:[],name:'里程4',nameEn:'',unit:'Km',color:[colors[3],colors[3]]},
    // {value:[],name:'风扇转动系数n0',unit:'%',color:[colors[4],colors[4]]},
    // {value:[],name:'风扇转动系数n1',unit:'%/km/h',color:[colors[5],colors[5]]},
    // {value:[],name:'风扇转动系数n2',unit:'%/(km/h)^2',color:[colors[6],colors[6]]},
  ];
  discharge_xdata = [];

  avl_paramlist = [
    // {value:'12',name:'roadAnalogyDragCoeff_F0R',unit:'N'},
    // {value:'12',name:'roadAnalogyDragCoeff_F1R',unit:'N/km/h'},
    // {value:'12',name:'roadAnalogyDragCoeff_F2R',unit:'N/(km/h)^2'},
    // {value:'12',name:'drumDragCoeff_F0D',unit:'N'},
    // {value:'12',name:'drumDragCoeff_F1D',unit:'N/km/h'},
    // {value:'12',name:'drumDragCoeff_F2D',unit:'N/(km/h)^2'},
  ]

  gauge =[
    {
      id:'gauge_1',
      dataLine:{
        value:50,name:'轮速力',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'N'
      }
    },{
      id:'gauge_2',
      dataLine:{
        value:12,name:'速度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'km/h'
      }
    },{
      id:'gauge_3',
      dataLine:{
        value:12,name:'加速度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'m/s^2'
      }
    },{
      id:'gauge_4',
      dataLine:{
        value:12,name:'功率',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'Kw'
      }
    }
  ]; 
  //速度/加速度曲线
  gauge_chart = [
    {value:[],name:'速度',unit:'km/h',color:[colors[1],colors[1]]},
    {value:[],name:'加速度',unit:'m/s^2',color:[colors[2],colors[2]]},
  ]
  //轮转力曲线
  gauge_chart_1 = [
    {value:[],name:'轮边力',unit:'N',color:[colors[0],colors[0]]},
  ]
  gauge_xData = [];


  jinhua:any = {};
  //环境仓
  EnvironBin = [
    {
      id:'en_gauge_1',
      dataLine:{
        value:0,name:'实时温度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'℃',un:'常温'
      }
    },
    {
      id:'en_gauge_2',
      dataLine:{
        value:0,name:'实时湿度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'%RH',un:'常湿'
      }
    },
    {
      id:'en_gauge_3',
      dataLine:{
        value:0,name:'阳光辐照',max:1000,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'w/m^2'
      }
    },
    {
      id:'en_gauge_5',
      dataLine:{
        value:0,name:'舱内压力',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'Pa'
      }
    },
    {
      id:'en_gauge_6',
      dataLine:{
        value:0,name:'排费压力',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'Pa'
      }
    },
  ]

  EnvironBinParam = [
    // {value:'0',name:'CxHy',unit:'ppm'},
    // {value:'0',name:'WasteDisPressDiff',unit:'Pa'},
    // {value:'0',name:'CabinTemp',unit:'℃'},
    // {value:'0',name:'CO',unit:'LEL'},
    {value:'0',name:'WasteDisOutput',unit:'%'},
    {value:'0',name:'effluentTemp',unit:'℃'},
    {value:'0',name:'effluentPressure',unit:'Pa'},

    // {value:'0',name:'CabinHumidity',unit:'%RH'},
  ]

  img = {
    url:'assets/eimdoard/equipment/images/lqdp.png',
    name:''
  }

  deviceid_four = 'device_avl4dyno_02';//四驱底盘
  deviceid_jinhua = 'device_jinhua_cabin01';//锦华
  rw = 0;
   
  timer:any;//定时器
  language = '';//语言 空为zh-CN中文
  subscribeList:any = {};

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute,
    private http:HttpserviceService,private boardservice:EquipmentBoardService) { }

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



    this.getData();
    setTimeout(() => {
      create_img_16_9();
    }, 1000);
    window.addEventListener('resize',this.resize)

  }

  
  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})
  }

  obser = new Observable(f=>{
    this.EnvironBin.forEach(f=>{
      if(document.getElementById(f.id))
        echarts.init(document.getElementById(f.id)).resize();
    })
    this.gauge.forEach(f=>{
      if(document.getElementById(f.id))
        echarts.init(document.getElementById(f.id)).resize();
    })
    if(document.getElementById('avl_discharge_chart'))
        echarts.init(document.getElementById('avl_discharge_chart')).resize();
    if(document.getElementById('avl_param_chart_1'))
        echarts.init(document.getElementById('avl_param_chart_1')).resize();
    if(document.getElementById('avl_param_chart_2'))
        echarts.init(document.getElementById('avl_param_chart_2')).resize();
    // ['sensor_t_h_01','sensor_t_h_02','sensor_t_h_03'].forEach(f=>{
    //   if(document.getElementById(f))
    //       echarts.init(document.getElementById(f)).resize();
    // })
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
      this.get_four();
      this.get_jinhua();
    },1000)
    
    
  }



  /**
   * 中置式四驱底盘测功
   */
  get_four(){
    let res,data:any = {};
    this.subscribeList.four = this.http.callRPC('device_monitor.get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',{"device":this.deviceid_four,
    arr:four_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message || [];
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      //里程
      this.discharge[0].value = data.distance1 ||0;
      this.discharge[1].value = data.distance2||0;
      this.discharge[2].value = data.distance3||0;
      this.discharge[3].value = data.distance4||0;
      // 风扇转动系数
      this.discharge[4].value = data.n0||0;
      this.discharge[5].value = data.n1||0;
      this.discharge[6].value = data.n2||0;
      this.discharge_chart[0].value.push(data.p||0);

      // this.discharge_chart[0].value.push(data.distance1);
      // this.discharge_chart[1].value.push(data.distance2);
      // this.discharge_chart[2].value.push(data.distance3);
      // this.discharge_chart[3].value.push(data.distance4);
      // this.discharge_chart[4].value.push(data.n0);
      // this.discharge_chart[5].value.push(data.n1);
      // this.discharge_chart[6].value.push(data.n2);
      this.discharge_xdata.push(rTime(res && res[0]?res[0].v[0][1]:''));//x轴时间
      if(this.discharge_xdata.length>10){
        this.discharge_xdata.splice(0,1);
        this.discharge_chart.forEach(g=>{
          g.value.splice(0,1);
        })
      }

      if(document.getElementById('avl_discharge_chart')){
        let myChart_8 = echarts.init(document.getElementById('avl_discharge_chart'));;
        equipment_four_road.create_broken_line(
          {
            series:this.discharge_chart,
            xData:this.discharge_xdata,
            title:'功率曲线'
          },myChart_8);
      }

      // 道路模拟阻力系数
      // this.avl_paramlist[0].value = data.f0r ||0;
      // this.avl_paramlist[1].value = data.f1r||0;
      // this.avl_paramlist[2].value = data.f2r||0;
      //转鼓阻力系数
      // this.avl_paramlist[3].value = data.f0d;
      // this.avl_paramlist[4].value = data.f1d;
      // this.avl_paramlist[5].value = data.f2d;



      //惯量
      this.rw =  data.rw||0;
      //轮边力  -- 牵引力
      this.gauge[0].dataLine.value = data.f||0;
      //速度
      this.gauge[1].dataLine.value = data.v||0;
      //加速度
      this.gauge[2].dataLine.value = data.a||0;
      //功率
      this.gauge[3].dataLine.value = data.p||0;
      this.gauge.forEach(el => {
        if(document.getElementById(el.id))
        equipment_four_road.create_temp_h_1_p_gauge(
          el.dataLine
          ,echarts.init(document.getElementById(el.id)));
      });

      // this.gauge_chart[0].value.push(data.f);
      this.gauge_chart[0].value.push(data.v||0);
      this.gauge_chart[1].value.push(data.a||0);
      // this.gauge_chart[0].value.push(data.p);
      this.gauge_xData.push(rTime(res && res[0]?res[0].v[0][1]:''));
      if(this.gauge_xData.length>10){
        this.gauge_xData.splice(0,1);
        this.gauge_chart.forEach(g=>{
          g.value.splice(0,1);
        })
      }
      if(document.getElementById('avl_param_chart_1'))
        equipment_four_road.create_broken_line({
        series:this.gauge_chart,
        xData:this.gauge_xData,
        title:'速度/加速度曲线'
        },echarts.init(document.getElementById('avl_param_chart_1')));

      this.gauge_chart_1[0].value.push(data.f);
      if(document.getElementById('avl_param_chart_2'))equipment_four_road.create_broken_line({
        series:this.gauge_chart_1,
        xData:this.gauge_xData,
        title:'轮边力曲线'
        },echarts.init(document.getElementById('avl_param_chart_2')));
  
      // console.log(data)
      // console.log(res)
    })
  }

  get_jinhua(){
    let res,data:any = {};
    this.subscribeList.jinhua = this.http.callRPC('device_monitor.get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',{"device":this.deviceid_jinhua,
    arr:jinhua_param.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message || [];
      res.forEach(el => {
        for(let key in el){
          data[key] = el[key][0][0];
        }
      });
      //温度
      this.EnvironBin[0].dataLine.value =  data.mwsmart_main_emission_vw200 ||0;
      this.EnvironBin[0].dataLine.color[0] =  [data.mwsmart_main_emission_vw202/this.EnvironBin[0].dataLine.max,'#203add'];

      //湿度
      this.EnvironBin[1].dataLine.value =  data.mwsmart_main_emission_vw206 ||0;
      this.EnvironBin[1].dataLine.color[0] =  [data.mwsmart_main_emission_vw208/this.EnvironBin[1].dataLine.max,'#203add'];
      
      //阳光辐射
      this.EnvironBin[2].dataLine.value =  data.mwsmart_main_emission_vw212 ||0;
      this.EnvironBin[2].dataLine.color[0] =  [data.mwsmart_main_emission_vw214/this.EnvironBin[2].dataLine.max,'#203add'];

      //舱内压力
      this.EnvironBin[3].dataLine.value =  data.mwsmart_main_emission_vw218 ||0;
      this.EnvironBin[3].dataLine.color[0] =  [data.mwsmart_main_emission_vw220/this.EnvironBin[3].dataLine.max,'#203add'];

      //排费压力
      this.EnvironBin[4].dataLine.value =  data.mwsmart_main_emission_vw224 ||0;
      this.EnvironBin[4].dataLine.color[0] =  [data.mwsmart_main_emission_vw226/this.EnvironBin[4].dataLine.max,'#203add'];

      this.EnvironBinParam[0].value = data.mwsmart_main_emission_vw228 ||0;
      this.EnvironBinParam[1].value = data.mwsmart_main_emission_v322 ||0;
      this.EnvironBinParam[2].value = data.mwsmart_main_emission_v320 ||0;

      
      this.EnvironBin.forEach(el=>{
        if(document.getElementById(el.id))
        equipment_four_road.create_temp_h_1_p_gauge(
          el.dataLine
          ,echarts.init(document.getElementById(el.id)));
      })
      
      if(document.getElementById('en_gauge_7'))
        equipment_four_road.create_gauge_jinhua(
          {
            value:data.mwsmart_main_emission_vw246||0,title:'冷却水进水温度',max:100,unit:'℃'
          }
          ,echarts.init(document.getElementById('en_gauge_7')));
    
      if(document.getElementById('en_gauge_8'))
        equipment_four_road.create_gauge_jinhua(
          {
            value:data.mwsmart_main_emission_vw244||0,title:'冷却水进水压力',max:100,unit:'Pa'
          }
          ,echarts.init(document.getElementById('en_gauge_8')));


      this.jinhua = data;
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
    window.removeEventListener('resize',this.resize)
  }
}
export const four_param = [
  // 'recordtime',//记录时间
  'v',//速度
  'f',//牵引力
  'p',//功率
  'a',//加速度
  // 'f0r',//道路模拟阻力系数F0R
  // 'f1r',//道路模拟阻力系数F1R
  // 'f2r',//道路模拟阻力系数F2R
  'n0',//风扇转动系数n0
  'n1',//风扇转动系数n1
  'n2',//风扇转动系数n2
  'f0d',//转鼓阻力系数F0D
  'f1d',//转鼓阻力系数F1D
  'f2d',//转鼓阻力系数F2D
  'distance1',//里程1
  'distance2',//里程2
  'distance3',//里程3
  'distance4',//里程4
  'rw',//惯量
]
export const jinhua_param = [
  'mwsmart_main_emission_vw200',//温度
  'mwsmart_main_emission_vw202',//温度设定值
  'mwsmart_main_emission_vw206',//湿度
  'mwsmart_main_emission_vw208',//湿度设定值
  'mwsmart_main_emission_vw212',//阳光辐射
  'mwsmart_main_emission_vw214',//阳光辐射设定值
  'mwsmart_main_emission_vw218',//舱内压力
  'mwsmart_main_emission_vw220',//舱内压力设定值
  'mwsmart_main_emission_vw224',//排废压力
  'mwsmart_main_emission_vw226',//排废压力设定值
  'mwsmart_main_emission_vw228',//排废输出
  'mwsmart_main_emission_vw322',//出水温度
  'mwsmart_main_emission_vw320',//出水压力

  'mwsmart_main_emission_vw246',//冷金水温度
  'mwsmart_main_emission_vw244',//冷金水压力
  'mwsmart_main_emission_v03',//制冷机组A状态
  'mwsmart_main_emission_v04',//制冷机组B状态
  'mwsmart_main_emission_v00',//舱状态
]