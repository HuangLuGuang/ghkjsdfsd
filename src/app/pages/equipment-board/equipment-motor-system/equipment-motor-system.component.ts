import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red,list_jion,list_copy,create_third_chart_line,list_copy_new,list_jion_new, create_img_16_9 } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road')

let oilsrouce = require('../../../../assets/eimdoard/equipment/js/oilsrouce');



@Component({
  selector: 'ngx-equipment-motor-system',
  templateUrl: './equipment-motor-system.component.html',
  styleUrls: ['./equipment-motor-system.component.scss']
})
export class EquipmentMotorSystemComponent implements OnInit {
  attrs =[{ 
    name: "扭矩",nameEn: "param1", unit: "V",value: [1,2,3,4,5,6],show:true,dashboardShow:true
    ,color:["#00FF00", "#00FF00"]
  },{ 
      name: "转速",nameEn: "param2", unit: "V",value: [2,3,5,6,7,8,2],
      color:["#ff00ff", "#ff00ff"],dashboardShow:true
  },{ 
      name: "功率",nameEn: "param3", unit: "V",value: [23,5,1,8,2,2,4,4],
      color:["#d9d919", "#d9d919"],dashboardShow:true
  },{ 
    name: "参数4",nameEn: "param4", unit: "V",value: [],
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5",nameEn: "param5", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6",nameEn: "param6", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数7",nameEn: "param7", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
}]
  xData = [];

  attrs_1 = {'equipment.motor.coolingWater':[{ 
    name: "扭矩",nameEn: "param1", unit: "V",value: [],show:true,dashboardShow:true
    ,color:["#00FF00", "#00FF00"]
  },{ 
      name: "转速",nameEn: "param2", unit: "V",value: [],
      color:["#ff00ff", "#ff00ff"],dashboardShow:true
  },{ 
      name: "功率",nameEn: "param3", unit: "V",value: [],
      color:["#d9d919", "#d9d919"],dashboardShow:true
  },{ 
    name: "参数4",nameEn: "param4", unit: "V",value: [],
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5",nameEn: "param5", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6",nameEn: "param6", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数7",nameEn: "param7", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
}],
'equipment.motor.AxleBoxTemp':[{ 
  name: "扭矩",nameEn: "param1", unit: "V",value: [],show:true,dashboardShow:true
  ,color:["#00FF00", "#00FF00"]
},{ 
    name: "转速",nameEn: "param2", unit: "V",value: [],
    color:["#ff00ff", "#ff00ff"],dashboardShow:true
},{ 
    name: "功率",nameEn: "param3", unit: "V",value: [],
    color:["#d9d919", "#d9d919"],dashboardShow:true
},{ 
  name: "参数4",nameEn: "param4", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
name: "参数5",nameEn: "param5", unit: "V",value: [],
color:["#d9d919", "#d9d919"]
},{ 
name: "参数6",nameEn: "param6", unit: "V",value: [],
color:["#d9d919", "#d9d919"]
},{ 
name: "参数7",nameEn: "param7", unit: "V",value: [],
color:["#d9d919", "#d9d919"]
}]};
  attrs_2 = {};
  attrs_3 = {};

  //设备介绍
  str = ` 主要测试电机低速及控制系统性能，如：电机标定、转矩-转速特性、<br> 效率、温升、堵转试验、转矩控制精度、转速控制精度、峰值转矩、
  <br> 峰值功率`;

  
  //图片
  img = {
    url:'assets/eimdoard/equipment/images/car_2.png',//中间图片
    name:'',
    electric_url:'assets/eimdoard/equipment/images/electric.png',//电机图片
  }

  //实验实时状态
  real_list = [
    {name:'LF分油器',value:'关',color:'red'},
    {name:'LR分油器',value:'低',color:'green'},
    {name:'RR分油器',value:'高',color:'green'},
    {name:'RF分油器',value:'高',color:'green'},
  ]


  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  //每一个ngx-chart-curve-v3 中有哪些tag
  // list_2 = ['equipment.motor.Voltage','equipment.motor.electricCurrent'];
  // list_1 = ['equipment.motor.MotorParam','equipment.motor.MotorEfficiency'];
  // list_3 = ['equipment.motor.coolingWater','equipment.motor.AxleBoxTemp'];
  click_list = [];//当前选中的tag

  threePhase = [
    {
      id:'threePhase_1',
      dataLine:{
        value: 220 ,
        yname: '平均电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_2',
      dataLine:{
        value: 112 ,
        yname: '平均电流',
        max: 350,
        unit:'A'
      }
    },
    {
      id:'threePhase_3',
      dataLine:{
        value: 220 ,
        yname: 'U相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_4',
      dataLine:{
        value: 220 ,
        yname: 'U相电流',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_5',
      dataLine:{
        value: 220 ,
        yname: 'V相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_6',
      dataLine:{
        value: 220 ,
        yname: 'v相电流',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_7',
      dataLine:{
        value: 220 ,
        yname: 'M相电压',
        max: 350,
        unit:'V'
      }
    },
    {
      id:'threePhase_8',
      dataLine:{
        value: 220 ,
        yname: 'M相电流',
        max: 350,
        unit:'V'
      }
    }
  ]

  timer:any;//定时器
  language = '';//语言 空为zh-CN中文

  deviceid = '';


  subscribeList:any = {};


  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅左上角点击宽度改变
    this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })
    //订阅路由
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
      this.deviceid = f.deviceid;
    })
    //颜色赋值
    let rgb = '';
    this.attrs.forEach((f,i)=>{
      if(i > colors.length-1)
        rgb =  rgb_del_red();
      else
        rgb =  colors[i];
      f.color = [rgb,rgb];
    })


    this.getData();
    setTimeout(() => {
      this.initChart();
    }, 1000);
    window.addEventListener('resize',this.resize);
    setTimeout(f=>{
      create_img_16_9();
    },1000)
  }

  //图表刷新
  resize=()=>{
    let obs = new Observable(f=>{
      let id = [
        'coolingWater','AxleBoxTemperature1','AxleBoxTemperature2',
        'circularD_chart','temperature','humidity','electric_1',
        'electric_2','electric_3','electric_4','electric_5','dashboard',
        'line_chart_12','threePhase',
        'threePhase_1','threePhase_2',
        'threePhase_3','threePhase_4','threePhase_5','threePhase_6',
        'threePhase_7','threePhase_8',
      ];
      id.forEach(f=>{
        if(document.getElementById(f))
          echarts.init(document.getElementById(f)).resize();
      })
      f.next('异步执行完成')
    })
    obs.subscribe(f=>{
      console.log(f)
    })
    
  }
  

  getData(){
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":this.deviceid}).subscribe((f:any) =>{

    //   })
    

  }

  ngAfterViewInit(){
  }
  

  initChart(){
    let chart = document.getElementById('coolingWater');
    if(chart)
      equipment_four_road.create_real_temperature( {value:12,unit:'℃'},echarts.init(chart));
    chart = document.getElementById('AxleBoxTemperature1');
    if(chart)
      equipment_four_road.create_real_temperature( {value:12,unit:'℃'},echarts.init(chart));
    chart = document.getElementById('AxleBoxTemperature2');
    if(chart)
      equipment_four_road.create_real_temperature( {value:12,unit:'℃'},echarts.init(chart));
    chart = document.getElementById('circularD_chart')
    if(chart)
        equipment_four_road.create_real_discharge({attrs:this.attrs,xData:[1,1,1,1,1,1,1,1,1],title:'冷却水、轴箱温度'},echarts.init(chart));
        
    chart = document.getElementById('temperature');
    if(chart)
      equipment_four_road.create_real_temperature( {value:12,unit:'℃'},echarts.init(chart));
    chart = document.getElementById('humidity');
    if(chart)
      equipment_four_road.create_real_temperature( {value:12,unit:'RH' },echarts.init(chart));
    [1,2,3,4,5].forEach(f=>{
      chart = document.getElementById('electric_'+f);
      if(chart)
        equipment_four_road.create_real_electric({text:12,title:''},echarts.init(chart));
    })
    
    chart = document.getElementById('dashboard');
    if(chart)
      equipment_four_road.create_real_dashboard([{
        name: '扭矩',unit: 'N/m',value:0
      },{
        name: '转速',unit: 'km/h',value:0
      },{
        name: '功率',unit: 'W',value:0
      }],echarts.init(chart));

    chart = document.getElementById('line_chart_12');
    if(chart)
        equipment_four_road.create_motor_chart({xData:[1,1,1,1,1,1,1,1],data:[
          {name:'123',data:[1,1,2,3,4,6,8,9],color:'blue'},
          {name:'12333',data:[8,7,6,5,4,3,2,9],color:'#FF66CC'},
          {name:'12322',data:[2,7,4,7,4,3,2,9],color:'green'},
        ],title:'转速/扭矩曲线'},echarts.init(chart));


    chart = document.getElementById('threePhase');
    if(chart)
      equipment_four_road.create_real_discharge({attrs:this.attrs,xData:[1,1,1,1,1,1,1,1,1],title:'三相电压电流(U/V/W)'},echarts.init(chart));
    this.threePhase.forEach(f=>{
      if(document.getElementById(f.id))
         oilsrouce.create_bar_j(f.dataLine,echarts.init(document.getElementById(f.id)),'30%');
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
    window.removeEventListener('resize',this.resize);
  }
}
