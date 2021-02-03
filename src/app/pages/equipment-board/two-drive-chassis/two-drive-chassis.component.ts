import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9,dateformat,library,rTime, t_h_deviceid } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-two-drive-chassis',
  templateUrl: './two-drive-chassis.component.html',
  styleUrls: ['./two-drive-chassis.component.scss']
})
export class TwoDriveChassisComponent implements OnInit {
  temp_hum_attrs = [{ 
      name: "温度",nameEn :'param1', unit: "V",value: [],show:true
      ,color:[colors[0], colors[0]]
    },{ 
        name: "湿度",nameEn :'param2', unit: "V",value: [],show:true,
        color:[colors[1], colors[1]]
      }]
  temp_hum_xData = [];



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
  ]
  discharge_xdata = [];

  avl_paramlist = [
    // {value:'0',name:'roadAnalogyDragCoeff_F0R',unit:'N'},
    // {value:'0',name:'roadAnalogyDragCoeff_F1R',unit:'N/km/h'},
    // {value:'0',name:'roadAnalogyDragCoeff_F2R',unit:'N/(km/h)^2'},
    {value:'0',name:'drumDragCoeff_F0D',unit:'N'},
    {value:'0',name:'drumDragCoeff_F1D',unit:'N/km/h'},
    {value:'0',name:'drumDragCoeff_F2D',unit:'N/(km/h)^2'},
  ]

  gauge =[
    {
      id:'gauge_1',
      dataLine:{
        value:0,name:'轮边力',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'N'
      }
    },{
      id:'gauge_2',
      dataLine:{
        value:0,name:'速度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'km/h'
      }
    },{
      id:'gauge_3',
      dataLine:{
        value:0,name:'加速度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'m/s^2'
      }
    },{
      id:'gauge_4',
      dataLine:{
        value:0,name:'功率',max:100,color:[
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

  img = {
    url:'assets/eimdoard/equipment/images/lqdp.png',
    name:''
  }

  deviceid = '';

  rw = 0;//惯量
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
      this.deviceid = f.deviceid
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
      let chart;
      this.gauge.forEach((f,i)=>{
        chart = document.getElementById(f.id);
        if(chart)
          echarts.init(chart).resize();
      });
      ['discharge_chart','avl_param_chart_1','avl_param_chart_2',
      't_real_temperature_5','t_real_temperature_4','two_discharge_chart_1'].forEach(f => {
        chart = document.getElementById(f);
        if(chart)
          echarts.init(chart).resize();
      });
    }, 500);
  }

  getData(){
    let i = 0;
    this.timer = self.setInterval(() =>{

      this.get_real_time();
      this.get_device_Temp_hum();
      if(i%5==0)this.get_his_temp_hum();
      if(i%60==0){
        this.get_real_time_list();
      }
      i++;
      // now = new Date();
      // if(now.getDay() == 15)this.get_his_temp_hum();
    },1000)
    // this.get_his_temp_hum();
    
    
  }




  get_real_time(){
    let res,data:any = {};
    this.subscribeList.real = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',{"device":this.deviceid,
    arr:param.join(',')}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });

      //里程
      this.discharge[0].value = data.distance1;
      this.discharge[1].value = data.distance2;
      this.discharge[2].value = data.distance3;
      this.discharge[3].value = data.distance4;
      // 风扇转动系数
      this.discharge[4].value = data.n0;
      this.discharge[5].value = data.n1;
      this.discharge[6].value = data.n2;

      // this.discharge_chart[0].value.push(data.distance1);
      // this.discharge_chart[1].value.push(data.distance2);
      // this.discharge_chart[2].value.push(data.distance3);
      // this.discharge_chart[3].value.push(data.distance4);
      // this.discharge_chart[4].value.push(data.n0);
      // this.discharge_chart[5].value.push(data.n1);
      // this.discharge_chart[6].value.push(data.n2);
      

      // 道路模拟阻力系数
      // this.avl_paramlist[0].value = data.f0r;
      // this.avl_paramlist[1].value = data.f1r;
      // this.avl_paramlist[2].value = data.f2r;
      //转鼓阻力系数
      this.avl_paramlist[0].value = data.f0d;
      this.avl_paramlist[1].value = data.f1d;
      this.avl_paramlist[2].value = data.f2d;



      //惯量
      this.rw =  data.rw;
      //轮边力  -- 牵引力
      this.gauge[0].dataLine.value = data.f;
      //速度
      this.gauge[1].dataLine.value = data.v;
      //加速度
      this.gauge[2].dataLine.value = data.a;
      //功率
      this.gauge[3].dataLine.value = data.p;
      this.gauge.forEach(el => {
        if(document.getElementById(el.id))
        equipment_four_road.create_temp_h_1_p_gauge(
          el.dataLine
          ,echarts.init(document.getElementById(el.id)));
      });
    })
  }

  get_real_time_list(){
    let res;
    this.subscribeList.left = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {"deviceid":this.deviceid,
    arr:'p,v,a,f'}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;

      let value = [],xdata = [];
      setTimeout(() => {
        // 功率曲线
        res[0].p.forEach(el => {
          value.push(el[0]|| 0);
          xdata.push(dateformat(new Date(rTime(el[1])),'hh:mm:ss'));
        });
        this.discharge_chart[0].value = value;
        this.discharge_xdata = xdata;
        if(document.getElementById('discharge_chart')){
          let myChart_8 = echarts.init(document.getElementById('discharge_chart'));;
          equipment_four_road.create_broken_line(
            {
              series:this.discharge_chart,
              xData:this.discharge_xdata,
              title:'功率曲线'
            },myChart_8);
        }
      }, 10);

      setTimeout(() => {
        // this.gauge_chart[0].value.push(data.f);
        this.gauge_chart[0].value = res[1].v.map(m => (m[0]|| 0));
        this.gauge_chart[1].value = res[2].a.map(m => (m[0]|| 0));
        if(this.gauge_chart[0].value.length>this.gauge_chart[1].value.length){
          this.gauge_xData = res[1].v.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
        }else{
          this.gauge_xData = res[2].a.map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
        }
        if(document.getElementById('avl_param_chart_1'))
          equipment_four_road.create_broken_line({
          series:this.gauge_chart,
          xData:this.gauge_xData,
          title:'速度/加速度曲线'
          },echarts.init(document.getElementById('avl_param_chart_1')));

      },20);

      value = [],xdata = [];
      res[3].f.forEach(el => {
        value.push(el[0]|| 0);
        xdata.push(dateformat(new Date(rTime(el[1])),'hh:mm:ss'));
      });

      this.gauge_chart_1[0].value = value;
      if(document.getElementById('avl_param_chart_2'))equipment_four_road.create_broken_line({
        series:this.gauge_chart_1,
        xData:xdata,
        title:'轮边力曲线'
        },echarts.init(document.getElementById('avl_param_chart_2')));

    })
  }


  //获取实时温湿度
  get_device_Temp_hum(){
    let res;
    this.subscribeList.temp_hum = this.http.callRPC('get_temperature',library+'get_temperature'
    ,{deviceid:this.deviceid}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message[0]?g.result.message[0].message[0]:{
        humidity:0,
        temperature:0
      };
      // console.log(res)

      if(document.getElementById('t_real_temperature_5'))
        equipment_four_road.create_real_disk({value:res.temperature,text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
        echarts.init(document.getElementById('t_real_temperature_5')));
      if(document.getElementById('t_real_temperature_4'))
        equipment_four_road.create_real_disk({value:res.humidity,text:this.language?'RealRH':'实时湿度',unit:'℃'},
        echarts.init(document.getElementById('t_real_temperature_4')));
      // this.temp_hum_attrs[0].value.push(res.temperature);//温度
      // this.temp_hum_attrs[1].value.push(res.humidity);//温度 
      // this.temp_hum_xData.push(rTime(res.recordtime?res.recordtime:' ')); 
      // if(this.temp_hum_xData.length>10){
      //   this.temp_hum_xData.splice(0,1);
      //   this.temp_hum_attrs.forEach(f=>{
      //     f.value.splice(0,1);
      //   })
      // }

      // if(document.getElementById('two_discharge_chart_1')){
      //   let myChart_9 = echarts.init(document.getElementById('two_discharge_chart_1'));;
      //   equipment_four_road.create_real_discharge({attrs:this.temp_hum_attrs,xData:this.temp_hum_xData},myChart_9);
      // }
    })
  }

  get_his_temp_hum(){
    let res;
    this.subscribeList.his_temp_hum = this.http.callRPC('get_temperature',library+'get_temperature_numbers'
    ,{deviceid:t_h_deviceid||this.deviceid}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      this.temp_hum_attrs[0].value = res.map(f => f.temperature);
      this.temp_hum_attrs[1].value = res.map(f => f.humidity);
      this.temp_hum_xData = res.map(f => rTime(f.recordtime));
      if(document.getElementById('two_discharge_chart_1')){
        let myChart_9 = echarts.init(document.getElementById('two_discharge_chart_1'));;
        equipment_four_road.create_real_discharge({attrs:this.temp_hum_attrs,xData:this.temp_hum_xData},myChart_9);
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
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    let chart;
    this.gauge.forEach((f,i)=>{
      chart = document.getElementById(f.id);
      if(chart)echarts.init(chart).dispose();
    });
    ['discharge_chart','avl_param_chart_1','avl_param_chart_2',
    't_real_temperature_5','t_real_temperature_4','two_discharge_chart_1'].forEach(f => {
      chart = document.getElementById(f);
      if(chart)echarts.init(chart).dispose();
    });
  }

}


export const param = [
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
