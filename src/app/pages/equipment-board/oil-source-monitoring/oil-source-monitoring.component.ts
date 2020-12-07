import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils';


let oilsrouce = require('../../../../assets/eimdoard/equipment/js/oilsrouce');
let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');
/**
 * 油源健康监控系统
 */
@Component({
  selector: 'ngx-oil-source-monitoring',
  templateUrl: './oil-source-monitoring.component.html',
  styleUrls: ['./oil-source-monitoring.component.scss']
})
export class OilSourceMonitoringComponent implements OnInit {
  equipIntroduceList = [
    {htmlstr:'',title:'',type:'span_class'},
  ]

  img = {
    url:'assets/eimdoard/equipment/images/oilsrouce_1.png',//中间图片
    name:'',
  };

  //雷达图
  radar = {
    indicator:[
      { name: '蓄能器1-1', max: 6500},
      { name: '蓄能器8-1', max: 16000},
      { name: '蓄能器7-1', max: 30000},
      { name: '蓄能器6-1', max: 38000},
      { name: '蓄能器5-1', max: 52000},
      { name: '蓄能器4-1', max: 25000},
      { name: '蓄能器3-1', max: 25000},
      { name: '蓄能器2-1', max: 25000}
    ],
    value:[4300, 10000, 28000, 35000, 50000, 19000,2000,2000]
  }

  HPUselect:any  = {
    value:'',//当前选中
    show:true,//下拉是否显示
    class:'',//下拉按钮动画class
    drop_class:'',// 下拉出来列表动画class
    HPUselectItem:{},//当前选中的数据
  }


  //HPU列表
  HPUlist = [
    {
      name:'HPU1',
      id:'dashboard_1',
      status:true,//当前HPU状态
      time:{//以运行时间
        h:10,
        m:50,
        s:50,
      },
      pumpList:[
        {name:1,s:true},{name:2,s:false},{name:3,s:true},
        {name:4,s:true},{name:5,s:false},{name:6,s:true}
      ],
      series:[],//仪表盘数据 3位
    },
    {
      name:'HPU2',
      id:'dashboard_2',
      status:true,//当前HPU状态
      time:{
        h:0,
        m:0,
        s:0,
      },
      pumpList:[
        {name:1,s:true},{name:2,s:false},{name:3,s:true},
        {name:4,s:true},{name:5,s:false},{name:6,s:true}
      ],
      series:[],
    },
    {
      name:'HPU3',
      id:'dashboard_3',
      status:false,//当前HPU状态
      time:{
        h:0,
        m:0,
        s:0,
      },
      pumpList:[
        {name:1,s:true},{name:2,s:false},{name:3,s:true},
        {name:4,s:true},{name:5,s:false},{name:6,s:true}
      ],
      series:[],
    },
    {
      name:'HPU4',
      id:'dashboard_4',
      status:false,//当前HPU状态
      time:{
        h:0,
        m:0,
        s:0,
      },
      pumpList:[
        {name:1,s:true},{name:2,s:false},{name:3,s:true},
        {name:4,s:true},{name:5,s:false},{name:6,s:true}
      ],
      series:[],
    },
    {
      name:'HPU5',
      id:'dashboard_5',
      status:false,//当前HPU状态
      time:{
        h:0,
        m:0,
        s:0,
      },
      pumpList:[
        {name:1,s:false},{name:2,s:true},{name:3,s:true},
        {name:4,s:true},{name:5,s:true},{name:6,s:false}
      ],
      series:[],
    },
  ];

  HE_Water = {
    data:[
      {id:'HE_Water_1',dataLine:{
        value: 28.1 ,
        yname: 'HE 1出油温度',
        max: 50,
        unit:'℃'
      }},
      {id:'HE_Water_2',dataLine:{
        value: 27.9,
        yname: 'HE 2出油温度',
        max: 50,
        unit:'℃'
      }},
      {id:'HE_Water_3',dataLine:{
        value: 0.2,
        yname: 'HE1&2出油温度',
        max: 50,
        unit:'℃'
      }},
      {id:'HE_Water_4',dataLine:{
        value: 30.5,
        yname: 'HE1出油饱和度',
        max: 50,
        unit:'%'
      }},
      {id:'HE_Water_5',dataLine:{
        value: 25.5,
        yname: 'HE2出油饱和度',
        max: 50,
        unit:'%'
      }},
      {id:'HE_Water_6',dataLine:{
        value: 5.1,
        yname: 'HE1&2出油饱和度差',
        max: 50,
        unit:'%'
      }},
      {id:'HE_Water_7',dataLine:{
        value: 35.9,
        yname: 'HE回油温度',
        max: 50,
        unit:'℃'
      }},
      {id:'HE_Water_8',dataLine:{
        value: 36.2,
        yname: 'HE出油温度',
        max: 50,
        unit:'℃'
      }},
      {id:'HE_Water_9',dataLine:{
        value: 25.5,
        yname: 'HE出水温度',
        max: 50,
        unit:'℃'
      }},
      {id:'HE_Water_10',dataLine:{
        value: 26.5,
        yname: 'HE进水温度',
        max: 50,
        unit:'℃'
      }},
      {id:'HE_Water_11',dataLine:{
        value: 2.3,
        yname: 'HE回水出水温度差',
        max: 50,
        unit:'℃'
      }},
    ],
    attrs:[]
  }

  equip_alarm = [
    {data:['HPU1','Cs Communication Erroe'],s:'',color:'white'},
    {data:['HPU2','Oil Level High Alarm'],s:'warm',color:'yellow'},
    {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
    {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
    {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
    {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
    {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
  ]

  cleanlinss = [
    {id:'cleanlinss_1',dataLine:{
      value: 10,
      yname: '粒子数 > 4u',
      max: 50,
      unit:'ISO Code'
    }},
    {id:'cleanlinss_2',dataLine:{
      value: 8,
      yname: '粒子数 > 6u',
      max: 50,
      unit:'ISO Code'
    }},
    {id:'cleanlinss_3',dataLine:{
      value: 0,
      yname: '粒子数 > 14u',
      max: 50,
      unit:'ISO Code'
    }},
    {id:'cleanlinss_4',dataLine:{
      value: 0,
      yname: '粒子数 > 21u',
      max: 50,
      unit:'ISO Code'
    }},
  ]


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



  subscribeList: any = {};
  timer:any;//定时器
  language = '';//语言 空为zh-CN中文
  constructor(private activateInfo:ActivatedRoute,private layoutService:LayoutService) { }

  ngOnInit(): void {
    //选中第一个
    this.HPUselect.value = this.HPUlist[0].name;
    this.HPUselect.HPUselectItem = this.HPUlist[0];
    this.HPUselect.show = false;
    this.attrs.forEach(f=>{
      f.value = [0,0,0,0,0,0,0,0,0,0,0].map(m=>(Math.random()*100).toFixed(0)); 
    })
    this.HE_Water.attrs = JSON.parse(JSON.stringify(this.attrs));

    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅左上角打开关闭
    this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
    })
    this.initChart();
    //订阅路由返回的标题
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })

    this.timer = setInterval(f=>{
      this.timeAutomatic();
    },1000);
    
  }

  ngAfterViewInit(){
    window.addEventListener('resize',this.chartResize)
  }
  chartResize =()=>{
    this.resize('radar_1');
    this.resize('radar_2');
    this.resize('discharge_chart_1');
    this.resize('discharge_chart_2');
    this.resize('pumpClick');
    this.HPUlist.forEach(f=>{
      this.resize(f.id);
    })
    this.cleanlinss.forEach(f=>{
      this.resize(f.id);
    })
    this.HE_Water.data.forEach(f=>{
      this.resize(f.id);
    })
  }


  resize(id){
    if(document.getElementById(id))
      echarts.init(document.getElementById(id)).resize();
  }

  initChart(){
    let radar_1 = document.getElementById('radar_1')
    if(radar_1)oilsrouce.create_radar(this.radar,echarts.init(radar_1));
    let radar_2 = document.getElementById('radar_2')
    if(radar_2)oilsrouce.create_radar(this.radar,echarts.init(radar_2));

    let series_old = [{
      data: {
          name: "油压",
          value: 11,
      },
      axisLine_color: [
          [0.2, "#00a65a"],
          [0.4, "#2b64fc"],
          [0.6, "#f39c11"],
          [1, "#fa4e4b"],
      ],
      center:["20%", "65%"],
      unit:'GPM'
  },{
      data: {
          name: "油流量",
          value: 11,
      },
      axisLine_color: [
          [0.2, "#00a65a"],
          [0.4, "#2b64fc"],
          [0.6, "#f39c11"],
          [1, "#fa4e4b"],
      ],
      center: ["50%", "65%"],
      unit:'GPM'
  },{
      data: {
          name: "油温",
          value: 11,
      },
      axisLine_color: [
          [0.2, "#00a65a"],
          [0.4, "#2b64fc"],
          [0.6, "#f39c11"],
          [1, "#fa4e4b"],
      ],
      center: ["80%", "65%"],
      unit:'℃'
    }]
    this.HPUlist.forEach(f=>{
      f.series = series_old;
      if(document.getElementById(f.id))
        oilsrouce.create_gauge_3(f.series,echarts.init(document.getElementById(f.id)));
    })

    this.cleanlinss.forEach(f=>{
      if(document.getElementById(f.id))
          oilsrouce.create_bar_j(f.dataLine,echarts.init(document.getElementById(f.id)),'30%');
    })

    if(document.getElementById('discharge_chart_1')){
      let myChart_9 = echarts.init(document.getElementById('discharge_chart_1'));;
      equipment_four_road.create_real_discharge({attrs:this.attrs,xData:[1,2,3,4,4,5,6,7,8,9,10]},myChart_9);
    }

    if(document.getElementById('pumpClick'))
        oilsrouce.create_gauge_3(series_old,echarts.init(document.getElementById('pumpClick')),'big');

    this.HE_Water.data.forEach(f=>{
      if(document.getElementById(f.id))
          oilsrouce.create_bar_j(f.dataLine,echarts.init(document.getElementById(f.id)),'20%');
    })

    if(document.getElementById('discharge_chart_2')){
      let myChart_9 = echarts.init(document.getElementById('discharge_chart_2'));;
      equipment_four_road.create_real_discharge({attrs:this.HE_Water.attrs,xData:[1,2,3,4,4,5,6,7,8,9,10]},myChart_9);
    }
  }


  timeAutomatic(){
    let t = this.HPUselect.HPUselectItem.time;
    if(t && t.h == 24 && t.m == 0 && t.s == 0  )return;
    // document.getElementById('d_1').setAttribute('style','animation: 1.2s frontFlipDown ease-in-out;')
    t.s++;
    if(t.s!=60)return;
    t.s=0;
    t.m++;
    if(t.s!=60)return;
    t.m=0;
    t.h++;
  }

  //打开下拉或收起下拉
  select_show_or_close(){
    let s = this.HPUselect;
    s.show = !s.show;
    s.class = s.show?'turn_l':'turn_r';
    s.drop_class = s.show?'opacity_s':'opacity_d';
  }
  //下拉选择
  select_click(item){
    let s = this.HPUselect;
    s.value = item.name;
    s.HPUselectItem = item;
    this.select_show_or_close();
  }

  //组件销毁  
  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    window.removeEventListener('resize',this.chartResize)
  }

}
