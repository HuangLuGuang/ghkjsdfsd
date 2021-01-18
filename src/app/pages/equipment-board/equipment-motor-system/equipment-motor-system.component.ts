import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9 } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')

let oilsrouce = require('../../../../assets/eimdoard/equipment/js/oilsrouce');



@Component({
  selector: 'ngx-equipment-motor-system',
  templateUrl: './equipment-motor-system.component.html',
  styleUrls: ['./equipment-motor-system.component.scss']
})
export class EquipmentMotorSystemComponent implements OnInit {


  //实验参数 冷却水 轴箱温度1 轴箱温度2
  experiment_attrs = [
    { 
      name: "冷却水",nameEn: "冷却水", unit: "℃",value: [],show:true
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
    {name:'扭矩',data:[],color:'blue'},
    {name:'转速',data:[],color:'#FF66CC'},
    {name:'功率',data:[],color:'green'},
  ];
  speedTorque_xData = [];

  threePhase_attrs = [
    { 
      name: "平均电压",nameEn :'平均电压', unit: "V",value: [],show:true
      ,color:[colors[0], colors[0]]
    },{ 
        name: "平均电流",nameEn :'平均电流', unit: "A",value: [],show:true,
        color:[colors[1], colors[1]]
    },{ 
        name: "U相电压",nameEn :'U相电压', unit: "V",value: [],show:true,
        color:[colors[2], colors[2]]
    },{ 
      name: "U相电流",nameEn :'U相电流', unit: "A",value: [],show:true,
      color:[colors[3], colors[3]]
    },{ 
      name: "U相电压",nameEn :'U相电压', unit: "V",value: [],show:true,
      color:[colors[4], colors[4]]
    },{ 
      name: "U相电流",nameEn :'U相电流', unit: "A",value: [],show:true,
      color:[colors[5], colors[5]]
    },{ 
      name: "W相电压",nameEn :'W相电压', unit: "V",value: [],show:true,
      color:[colors[6], colors[6]]
    },{ 
      name: "W相电流",nameEn :'W相电流', unit: "A",value: [],show:true,
      color:[colors[7], colors[7]]
    }
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


  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute,
    private http:HttpserviceService,private boardservice:EquipmentBoardService) { }

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
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
      this.deviceid = f.deviceid;
    })


    this.timer = setInterval(f=>{
      this.get_experimentParams();
      this.get_right();
      this.get_device_Temp_hum();
    },1000)

    setTimeout(() => {
      create_img_16_9();

    }, 1000);
    window.addEventListener('resize',this.resize)
    
  }


  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})
  }

  obser = new Observable(f=>{
    let chart;
    [1, 1, 1, 1, 1].forEach((f,i)=>{
      chart = document.getElementById('electric_'+(i+1));
      if(chart)
        echarts.init(chart).resize();
    });
    ['coolingWater','AxleBoxTemperature1','AxleBoxTemperature2','circularD_chart',
    'dashboard','line_chart_12','threePhase','temperature','humidity'].forEach(f => {
      chart = document.getElementById(f);
      if(chart)
        echarts.init(chart).resize();
    });
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
  



  /**
   * 获取实验参数 
   * "cc_t_act":22.46, 冷却水温度
     "imb_t_1":22.75, 轴箱温度1
      "imb_t_2":22.63,、 轴箱温度2
   */
  get_experimentParams(){
    // SELECT get_avl_temperature('{"deviceid":"device_avlmotor_01"}')
    let res;
    this.subscribeList.exp = this.http.callRPC('get_avl_temperature','device_monitor.get_avl_temperature',
    {"deviceid":this.deviceid}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message[0] || {};

      let chart = document.getElementById('coolingWater');
      if(chart)
        equipment_four_road.create_real_temperature( {value:res.cc_t_act,unit:'℃'},echarts.init(chart));
      chart = document.getElementById('AxleBoxTemperature1');
      if(chart)
        equipment_four_road.create_real_temperature( {value:res.imb_t_1,unit:'℃'},echarts.init(chart));
      chart = document.getElementById('AxleBoxTemperature2');
      if(chart)
        equipment_four_road.create_real_temperature( {value:res.imb_t_2,unit:'℃'},echarts.init(chart));

      this.experiment_attrs[0].value.push(res.cc_t_act ||0);
      this.experiment_attrs[1].value.push(res.imb_t_1||0);
      this.experiment_attrs[2].value.push(res.imb_t_2||0);
      this.experiment_xData.push(res.recordtime||0);
      if(this.experiment_xData.length>10){
        this.experiment_xData.splice(0,1);
        this.experiment_attrs[0].value.splice(0,1);
        this.experiment_attrs[1].value.splice(0,1);
        this.experiment_attrs[2].value.splice(0,1);
      }
      chart = document.getElementById('circularD_chart');
      if(chart)
          equipment_four_road.create_real_discharge({attrs:this.experiment_attrs,xData:this.experiment_xData,title:'冷却水、轴箱温度'},echarts.init(chart));
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
    let res,chart;;
    this.subscribeList.right = this.http.callRPC('get_avl_parameter','device_monitor.get_avl_parameter',{"deviceid":this.deviceid}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message[0] || {};
      this.motor = res;
      //系统效率 控制器效率  电机效率 控制器输出功率
      let arr = [res.cal_eff_sys, res.cal_eff_inv, res.cal_eff_mot, res.pa_pa, res.pa_p1].forEach((c,i)=>{
        chart = document.getElementById('electric_'+(i+1));
        if(chart)
          equipment_four_road.create_real_electric({text:c|| 0,title:''},echarts.init(chart));
      })

      chart = document.getElementById('dashboard');
      if(chart)
        equipment_four_road.create_real_dashboard([{
          name: '扭矩',unit: 'N/m',value:res.torque||0
        },{
          name: '转速',unit: 'km/h',value:res.speed||0
        },{
          name: '功率',unit: 'W',value:res.p||0
        }],echarts.init(chart));

      chart = document.getElementById('line_chart_12');
      this.speedTorque_attrs[0].data.push(res.torque||0);
      this.speedTorque_attrs[1].data.push(res.speed||0);
      this.speedTorque_attrs[2].data.push(res.p||0);
      this.speedTorque_xData.push(res.recordtime||0);
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
        this.threePhase_attrs[i].value.push(res[j[i]]);//表格插入线条的值插入
        if(document.getElementById(f.id)){
          f.dataLine.value = res[j[i]]||0;
          oilsrouce.create_bar_j(f.dataLine||0,echarts.init(document.getElementById(f.id)),'30%');
        }
      })

      chart = document.getElementById('threePhase');
      this.threePhase_xData.push(res.recordtime||0);
      if(this.threePhase_xData.length>10){
        this.threePhase_attrs.forEach(f=>{ f.value.splice(0,1)})
        this.threePhase_xData.splice(0,1);
      }
      if(chart)
        equipment_four_road.create_real_discharge({attrs:this.threePhase_attrs,xData:this.threePhase_xData,title:'三相电压电流(U/V/W)'},echarts.init(chart));
      })
  }


  //获取实时温湿度
  get_device_Temp_hum(){
      let chart;
      let res;
    this.subscribeList.temp_hum = this.http.callRPC('get_temperature','device_monitor.get_temperature'
    ,{deviceid:this.deviceid}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message[0]?g.result.message[0].message[0]:{};
      // console.log(res)
        
      chart = document.getElementById('temperature');
      if(chart)
        equipment_four_road.create_real_temperature( {value:res.temperature,unit:'℃'},echarts.init(chart));
      chart = document.getElementById('humidity');
      if(chart)
        equipment_four_road.create_real_temperature( {value:res.humidity,unit:'RH' },echarts.init(chart));
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
    window.removeEventListener('resize',this.resize)
  }
}
