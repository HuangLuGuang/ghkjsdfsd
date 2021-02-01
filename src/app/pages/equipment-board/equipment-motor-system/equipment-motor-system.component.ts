import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime, t_h_deviceid } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')

let oilsrouce = require('../../../../assets/eimdoard/equipment/js/oilsrouce');
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');



@Component({
  selector: 'ngx-equipment-motor-system',
  templateUrl: './equipment-motor-system.component.html',
  styleUrls: ['./equipment-motor-system.component.scss'],
  
})
export class EquipmentMotorSystemComponent implements OnInit {


  //实验参数 冷却水 轴箱温度1 轴箱温度2
  experiment_attrs = [
    { 
      name: "样件注入水温",nameEn: "样件注入水温", unit: "℃",value: [],show:true
      ,color:[colors[0], colors[0]]
    },{ 
        name: "轴箱温度1",nameEn: "轴箱温度1", unit: "℃",value: [],
        color:[colors[1], colors[1]],show:true
    },{ 
        name: "轴箱温度2",nameEn: "轴箱温度2", unit: "℃",value: [],
        color:[colors[2], colors[2]],show:true
    }
  ]
  experiment_xData = [];

  speedTorque_attrs = [
    {name:'扭矩',data:[],color:'green'},
    {name:'转速',data:[],color:'#FF66CC'},
    // {name:'功率',data:[],color:'green'},
  ];
  speedTorque_xData = [];

  threePhase_attrs = [
    { 
      name: "母线电压",nameEn :'母线电压', unit: "V",value: [],show:true
      ,color:[colors[0], colors[0]]
    },{ 
        name: "母线电流",nameEn :'母线电流', unit: "A",value: [],show:true,
        color:[colors[1], colors[1]]
    },{ 
      name: "直流功率",nameEn :'直流功率', unit: "kw",value: [],show:true,
      color:[colors[2], colors[2]]
    } 
    // { 
    //   name: "平均电压",nameEn :'平均电压', unit: "V",value: [],show:true
    //   ,color:[colors[0], colors[0]]
    // },{ 
    //     name: "平均电流",nameEn :'平均电流', unit: "A",value: [],show:true,
    //     color:[colors[1], colors[1]]
    // },{ 
    //     name: "U相电压",nameEn :'U相电压', unit: "V",value: [],show:true,
    //     color:[colors[2], colors[2]]
    // },{ 
    //   name: "U相电流",nameEn :'U相电流', unit: "A",value: [],show:true,
    //   color:[colors[3], colors[3]]
    // },{ 
    //   name: "U相电压",nameEn :'U相电压', unit: "V",value: [],show:true,
    //   color:[colors[4], colors[4]]
    // },{ 
    //   name: "U相电流",nameEn :'U相电流', unit: "A",value: [],show:true,
    //   color:[colors[5], colors[5]]
    // },{ 
    //   name: "W相电压",nameEn :'W相电压', unit: "V",value: [],show:true,
    //   color:[colors[6], colors[6]]
    // },{ 
    //   name: "W相电流",nameEn :'W相电流', unit: "A",value: [],show:true,
    //   color:[colors[7], colors[7]]
    // }
  ];
  threePhase_xData = [];



  //设备介绍
  str = ` 主要测试电机低速及控制系统性能，如：电机标定、转矩-转速特性、<br> 效率、温升、堵转试验、转矩控制精度、转速控制精度、峰值转矩、
  <br> 峰值功率`;

  
  //图片
  img = {
    url:'assets/eimdoard/equipment/images/dj.png',//中间图片
    name:'',
    electric_url:'assets/eimdoard/equipment/images/electric.png',//电机图片
  }
  temp = 0;
  hum = 0;

  motor:any = {};

  threePhase = [
    {
      id:'threePhase_1',
      dataLine:{
        value: 0 ,
        yname: '平均电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_2',
      dataLine:{
        value: 0 ,
        yname: '平均电流',
        max: 350,
        unit:'A'
      }
    },
    {
      id:'threePhase_3',
      dataLine:{
        value: 0 ,
        yname: 'U相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_4',
      dataLine:{
        value: 0 ,
        yname: 'U相电流',
        max: 350,
        unit:'A'
      }
    },
    {
      id:'threePhase_5',
      dataLine:{
        value: 0 ,
        yname: 'V相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_6',
      dataLine:{
        value: 0 ,
        yname: 'v相电流',
        max: 350,
        unit:'A'
      }
    },
    {
      id:'threePhase_7',
      dataLine:{
        value: 0 ,
        yname: 'M相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_8',
      dataLine:{
        value: 0 ,
        yname: 'M相电流',
        max: 350,
        unit:'A'
      }
    }
  ]

  timer:any;//定时器
  language = '';//语言 空为zh-CN中文

  deviceid = '';


  subscribeList:any = {};


  constructor(private activateInfo:ActivatedRoute,
    private http:HttpserviceService,private boardservice:EquipmentBoardService) { }

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

    let i = 0;
    this.timer = self.setInterval(f=>{
      this.get_experimentParams();
      this.get_right();
      // this.get_device_Temp_hum();
      if(i%60==0){
        this.get_line_coolingWater();
      }
      if(i%600==0){
        this.get_device_mts_timerangedata();
      }
      if(i%10==0){
        this.get_line_speed_torque();
      }
      if(i%20 == 0){
        setTimeout(() => {
          this.get_line_busbar();
        }, 100);
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
      [1, 1, 1, 1, 1].forEach((f,i)=>{
        chart = document.getElementById('electric_'+(i+1));
        if(chart)
          echarts.init(chart).resize();
      });
      this.threePhase.forEach((f,i)=>{
        chart = document.getElementById(f.id);
        if(chart){
          echarts.init(chart).resize();
        }
      });
      ['coolingWater','AxleBoxTemperature1','AxleBoxTemperature2','circularD_chart',
      'dashboard','line_chart_12','threePhase','temperature','humidity','motor_chart'].forEach(f => {
        chart = document.getElementById(f);
        if(chart)
          echarts.init(chart).resize();
      });
    }, 500);
  }
  



  /**
   * 获取实验参数 
   * "cc_t_act":22.46, 冷却水温度
     "imb_t_1":22.75, 轴箱温度1
      "imb_t_2":22.63,、 轴箱温度2
   */
  get_experimentParams(){
    // SELECT get_avl_temperature('{"deviceid":"device_avlmotor_01"}')
    let res;
    this.subscribeList.exp = this.http.callRPC('get_avl_temperature',library+'get_avl_temperature',
    {"deviceid":this.deviceid}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message[0] || {};

      let chart = document.getElementById('coolingWater');
      if(chart)
        equipment_four_road.create_motor_temperature( {value:res.cc_t_act,unit:'℃'},echarts.init(chart));
      chart = document.getElementById('AxleBoxTemperature1');
      if(chart)
        equipment_four_road.create_motor_temperature( {value:res.imb_t_1,unit:'℃'},echarts.init(chart));
      chart = document.getElementById('AxleBoxTemperature2');
      if(chart)
        equipment_four_road.create_motor_temperature( {value:res.imb_t_2,unit:'℃'},echarts.init(chart));

          })
  }

  /**
   * 获取右边一列
   * cal_eff_inv: 0 控制器效率
cal_eff_mot: 0 电机效率
cal_eff_sys: 0 系统效率
deviceid: "device_avlmotor_01"
p: 0 功率
pa_idc1: 0.001 母线电流
pa_irms2: 0.028 U相电流
pa_irms3: 0.034 V相电流
pa_irms4: 0.02 W相电流
pa_irmsa: 0.027 平均电流
pa_p1: 0 直流功率
pa_pa: 0 控制器输出平均功率
pa_udc1: 0.001 母线电压
pa_urms2: 0 U相电压
pa_urms3: 0 V相电压
pa_urms4:0 W相电压
pa_urmsa: 0 平均电压
recordtime: "2020-12-12 16:58:17"
speed: 0 转速
torque: 0.151 扭矩
   */
  get_right(){
    // get_avl_parameter('{"deviceid":"device_avlmotor_01"}'
    let j = ['pa_urmsa','pa_irmsa','pa_urms2','pa_irms2','pa_urms3','pa_irms3','pa_urms4','pa_irms4']
    let res,chart;
    this.subscribeList.right = this.http.callRPC('get_avl_parameter',library+'get_avl_parameter',{"deviceid":this.deviceid}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message[0] || {};
      this.motor = res;
      //系统效率 控制器效率  电机效率 控制器输出功率
      // let arr = [res.cal_eff_sys, res.cal_eff_inv, res.cal_eff_mot, res.pa_pa, res.pa_p1].forEach((c,i)=>{
      //   chart = document.getElementById('electric_'+(i+1));
      //   if(chart)
      //     equipment_four_road.create_real_electric({text:c|| 0,title:'',unit:'%'},echarts.init(chart));
      // })
      setTimeout(() => {
        chart = document.getElementById('dashboard');
        if(chart)
          equipment_four_road.create_real_dashboard([{
            name: '扭矩',unit: 'N/m',value:res.torque||0
          },{
            name: '转速',unit: 'rpm',value:res.speed||0
          },{
            name: '功率',unit: 'kw',value:res.p||0
          }],echarts.init(chart));
      }, 10);

      setTimeout(() => {
        
        this.threePhase.forEach((f,i)=>{
          if(document.getElementById(f.id)){
            f.dataLine.value = res[j[i]]||0;
            oilsrouce.create_bar_j(f.dataLine||0,echarts.init(document.getElementById(f.id)),'30%');
          }
        })
      }, 10);
     
    })
  }

  //右下角表转速扭矩
  get_line_speed_torque(){
    let chart;
    this.subscribeList.get_line_speed_torque = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {deviceid:this.deviceid,arr:'speed,torque'}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;
      chart = document.getElementById('line_chart_12');
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
    });
  }

  //母线电压电流直流功率表
  get_line_busbar(){
// pa_udc1 pa_idc1  pa_p1
    let chart;
    this.subscribeList.get_line_busbar = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {deviceid:this.deviceid,arr:'pa_udc1,pa_idc1,pa_p1'}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;
      chart = document.getElementById('threePhase');
      this.threePhase_attrs[0].value = res[0].pa_udc1.map(m => (m[0]||0));
      this.threePhase_attrs[1].value = res[1].pa_idc1.map(m => (m[0]||0));
      this.threePhase_attrs[2].value = res[2].pa_p1.map(m => (m[0]||0));

      let i= 0,c = 'pa_udc1';
      if(res[0].pa_udc1.length < res[1].pa_idc1.length){
        i= 1,c = 'pa_idc1';
      }else if(res[0].pa_udc1.length < res[2].pa_p1.length){
        i= 2,c = 'pa_p1';
      }
      this.threePhase_xData = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      

      if(chart)
          equipment_four_road.create_real_discharge(
            {attrs:this.threePhase_attrs,xData:this.threePhase_xData,title:'母线电压电流/直流功率'},echarts.init(chart));

    });
  }

  //中间最下面的表单
  get_line_coolingWater(){
    let chart;
    this.subscribeList.get_line_coolingWater = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {deviceid:this.deviceid,arr:'cc_t_act,imb_t_1,imb_t_2'}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0].message;
      this.experiment_attrs[0].value = res[0].cc_t_act.map(m => (m[0]||0));
      this.experiment_attrs[1].value = res[1].imb_t_1.map(m => (m[0]||0));
      this.experiment_attrs[2].value = res[2].imb_t_2.map(m => (m[0]||0));
      let i= 0,c = 'cc_t_act';
      if(res[0].cc_t_act.length < res[1].imb_t_1.length){
        i= 1,c = 'imb_t_1';
      }else if(res[0].cc_t_act.length < res[2].imb_t_2.length){
        i= 2,c = 'imb_t_2';
      }
      this.experiment_xData = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'MM-dd hh:mm:ss')));

      chart = document.getElementById('circularD_chart');
      if(chart)
          equipment_four_road.create_real_discharge({attrs:this.experiment_attrs,xData:this.experiment_xData,title:'样件注入水温、轴箱温度'},echarts.init(chart));

    });
  }


  //获取实时温湿度 弃用
  // get_device_Temp_hum(){
  //     let chart;
  //     let res;
  //   this.subscribeList.temp_hum = this.http.callRPC('get_temperature',library+'get_temperature'
  //   ,{deviceid:this.deviceid}).subscribe((g:any) =>{
  //     if(g.result.error || g.result.message[0].code == 0)return;
  //     res = g.result.message[0].message[0]?g.result.message[0].message[0]:{};
  //     // console.log(res)
        
  //     chart = document.getElementById('temperature');
  //     if(chart)
  //       equipment_four_road.create_motor_temperature( {value:res.temperature,unit:'℃',title:'温度'},echarts.init(chart));
  //     chart = document.getElementById('humidity');
  //     if(chart)
  //       equipment_four_road.create_motor_temperature( {value:res.humidity,unit:'RH' ,title:'湿度'},echarts.init(chart));
  //   })
  // }


  //环境历史信息
  get_device_mts_timerangedata(){
    let chart;
    let yearPlanData = [],yearOrderData= [],differenceData=[],visibityData=[],xAxisData=[];
    this.subscribeList.h_t_h = this.http.callRPC('get_temperature',library+'get_temperature_numbers'
    ,{deviceid:t_h_deviceid || this.deviceid}).subscribe((g:any) =>{
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

 

  get_td_width(num){
    return 66/num+'%'
  }


  ngOnDestroy(){
    clearInterval(this.timer)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }

    let chart;
    // [1, 1, 1, 1, 1].forEach((f,i)=>{
    //   chart = document.getElementById('electric_'+(i+1));
    //   if(chart)echarts.init(chart).dispose();
    // });
    this.threePhase.forEach(f=>{
      chart = document.getElementById(f.id);
      if(chart)echarts.init(chart).dispose();
    });
    ['coolingWater','AxleBoxTemperature1','AxleBoxTemperature2','circularD_chart',
    'dashboard','line_chart_12','threePhase','temperature','humidity','motor_chart'].forEach(f => {
      chart = document.getElementById(f);
      if(chart)echarts.init(chart).dispose();
    });
  }
}
