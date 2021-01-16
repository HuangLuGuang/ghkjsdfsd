import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, copy, create_img_16_9 } from '../equipment-board';

let oilsrouce = require('../../../../assets/eimdoard/equipment/js/oilsrouce');
let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

declare var $

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
  radar_1 = {
    indicator:[
      { name: '蓄能器1-1', max: 3200},
      { name: '蓄能器8-1', max: 3200},
      { name: '蓄能器7-1', max: 3200},
      { name: '蓄能器6-1', max: 3200},
      { name: '蓄能器5-1', max: 3200},
      { name: '蓄能器4-1', max: 3200},
      { name: '蓄能器3-1', max: 3200},
      { name: '蓄能器2-1', max: 3200}
    ],
    value:[0, 0, 0, 0, 0, 0,0,0]
  }

  //雷达图
  radar_2 = {
    indicator:[
      { name: '蓄能器1-2', max: 500},
      { name: '蓄能器8-2', max: 500},
      { name: '蓄能器7-2', max: 500},
      { name: '蓄能器6-2', max: 500},
      { name: '蓄能器5-2', max: 500},
      { name: '蓄能器4-2', max: 500},
      { name: '蓄能器3-2', max: 500},
      { name: '蓄能器2-2', max: 500}
    ],
    value:[0, 0, 0, 0, 0, 0,0,0]
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
      id:'oil_dashboard_1',
      status:false,//当前HPU状态
      time:0,//以运行时间
      pumpList:[
        {name:1,s:false},{name:2,s:false},{name:3,s:false},
        {name:4,s:false},{name:5,s:false},{name:6,s:false}
      ],
      series:[],//仪表盘数据 3位
    },
    {
      name:'HPU2',
      id:'oil_dashboard_2',
      status:false,//当前HPU状态
      time:0,//以运行时间
      pumpList:[
        {name:1,s:false},{name:2,s:false},{name:3,s:false},
        {name:4,s:false},{name:5,s:false},{name:6,s:false}
      ],
      series:[],
    },
    {
      name:'HPU3',
      id:'oil_dashboard_3',
      status:false,//当前HPU状态
      time:0,//以运行时间
      pumpList:[
        {name:1,s:false},{name:2,s:false},{name:3,s:false},
        {name:4,s:false},{name:5,s:false},{name:6,s:false}
      ],
      series:[],
    },
    {
      name:'HPU4',
      id:'oil_dashboard_4',
      status:false,//当前HPU状态
      time:0,//以运行时间
      pumpList:[
        {name:1,s:false},{name:2,s:false},{name:3,s:false},
        {name:4,s:false},{name:5,s:false},{name:6,s:false}
      ],
      series:[],
    },
    {
      name:'HPU5',
      id:'oil_dashboard_5',
      status:false,//当前HPU状态
      time:0,//以运行时间
      pumpList:[
        {name:1,s:false},{name:2,s:false},{name:3,s:false},
        {name:4,s:false},{name:5,s:false},{name:6,s:false}
      ],
      series:[],
    },
  ];

  //HPU列表中一个hpu的三个表的参数
  HPUlist_series = [{
    data: {
        name: "油压",
        value: 0,
      },
      axisLine_color: [
          [3000/3200, "#00a65a"],
          [3100/3200, "#f39c11"],
          [1, "#fa4e4b"],
      ],
      center:["20%", "65%"],
      unit:'GPM',
      max:3200
    },{
    data: {
        name: "油流量",
        value: 0,
      },
      axisLine_color: [
          [120/180, "#00a65a"],
          [150/180, "#f39c11"],
          [1, "#fa4e4b"],
      ],
      center: ["50%", "65%"],
      unit:'GPM',
      max:180
    },{
      data: {
          name: "油温",
          value: 0,
      },
      axisLine_color: [
          [50/55, "#00a65a"],
          [53/55, "#f39c11"],
          [1, "#fa4e4b"],
      ],
      center: ["80%", "65%"],
      unit:'℃',
      max:55,
  }]

  HE_Water = {
    data:[
      {id:'HE_Water_1',dataLine:{
        value: 0 ,
        yname: 'HE 1出油温度',
        max: 100,
        unit:'℃'
      }},
      {id:'HE_Water_2',dataLine:{
        value: 0,
        yname: 'HE 2出油温度',
        max: 100,
        unit:'℃'
      }},
      {id:'HE_Water_3',dataLine:{
        value: 0,
        yname: 'HE1&2出油温度',
        max: 100,
        unit:'℃'
      }},
      {id:'HE_Water_4',dataLine:{
        value: 0,
        yname: 'HE1出油饱和度',
        max: 100,
        unit:'%'
      }},
      {id:'HE_Water_5',dataLine:{
        value: 0,
        yname: 'HE2出油饱和度',
        max: 100,
        unit:'%'
      }},
      {id:'HE_Water_6',dataLine:{
        value: 0,
        yname: 'HE1&2出油饱和度差',
        max: 100,
        unit:'%'
      }},
      {id:'HE_Water_7',dataLine:{
        value: 0,
        yname: 'HE回油温度',
        max: 100,
        unit:'℃'
      }},
      {id:'HE_Water_8',dataLine:{
        value: 0,
        yname: 'HE出油温度',
        max: 100,
        unit:'℃'
      }},
      {id:'HE_Water_9',dataLine:{
        value: 0,
        yname: 'HE出水温度',
        max: 100,
        unit:'℃'
      }},
      {id:'HE_Water_10',dataLine:{
        value: 0,
        yname: 'HE进水温度',
        max: 100,
        unit:'℃'
      }},
      {id:'HE_Water_11',dataLine:{
        value: 0,
        yname: 'HE回水出水温度差',
        max: 100,
        unit:'℃'
      }},
    ],
    attrs:[
        { 
          name: "HE 1出油温度",nameEn :'HE 1出油温度', unit: "℃",value: [],show:true
          ,color:[colors[0],colors[0]]
        },{ 
            name: "HE 2出油温度",nameEn :'HE 2出油温度', unit: "℃",value: [],show:true,
            color:[colors[1],colors[1]]
        },{ 
            name: "HE1&2出油温度",nameEn :'HE1&2出油温度', unit: "℃",value: [],show:true,
            color:[colors[2],colors[2]]
        },{ 
          name: "HE1出油饱和度",nameEn :'HE1出油饱和度', unit: "%",value: [],show:true,
          color:[colors[3],colors[3]]
        },{ 
          name: "HE2出油饱和度",nameEn :'HE2出油饱和度', unit: "%",value: [],show:true,
          color:[colors[4],colors[4]]
        },{ 
          name: "HE1&2出油饱和度差",nameEn :'HE1&2出油饱和度差', unit: "%",value: [],show:true,
          color:[colors[5],colors[5]]
        },{ 
          name: "HE回油温度",nameEn :'HE回油温度', unit: "%",value: [],show:true,
          color:[colors[6],colors[6]]
        },{ 
          name: "HE出油温度",nameEn :'HE出油温度', unit: "%",value: [],show:true,
          color:[colors[7],colors[7]]
        },{ 
          name: "HE出水温度",nameEn :'HE出水温度', unit: "%",value: [],show:true,
          color:[colors[8],colors[8]]
        },{ 
          name: "HE进水温度",nameEn :'HE进水温度', unit: "%",value: [],show:true,
          color:[colors[9],colors[9]]
        },{ 
          name: "HE回水出水温度差",nameEn :'HE回水出水温度差', unit: "%",value: [],show:true,
          color:[colors[10],colors[10]]
        }
    ],
    xData:[],
  }

  equip_alarm = [
    // {data:['HPU1','Cs Communication Erroe111111111111111111111111111111111111111111'],s:'',color:'white'},
    // {data:['HPU2','Oil Level High Alarm'],s:'warm',color:'yellow'},
    // {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
    // {data:['HPU3','Leak Detect 1111111111111111111232141231111111111'],s:'error',color:'red'},
    // {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
    // {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
    // {data:['HPU3','Leak Detect 1'],s:'error',color:'red'},
  ]

  cleanlinss = [
    {id:'cleanlinss_1',dataLine:{
      value: 0,
      yname: '粒子数 > 4u',
      max: 50,
      unit:'ISO Code'
    }},
    {id:'cleanlinss_2',dataLine:{
      value: 0,
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


  attrs_cleanliss = [
    { 
      name: "粒子数 > 4u",nameEn :'粒子数 > 4u', unit: "ISO Code",value: [],show:true
      ,color:[colors[0],colors[0]]
      },{ 
          name: "粒子数 > 6u",nameEn :'粒子数 > 4u', unit: "ISO Code",value: [],show:true,
          color:[colors[1],colors[1]]
      },{ 
          name: "粒子数 > 14u",nameEn :'粒子数 > 4u', unit: "ISO Code",value: [],show:true,
          color:[colors[2],colors[2]]
      },{ 
        name: "粒子数 > 21u",nameEn :'粒子数 > 4u', unit: "ISO Code",value: [],show:true,
        color:[colors[3],colors[3]]
    }
  ]
  xdata_cleanliss = [];



  subscribeList: any = {};
  timer:any;//定时器
  language = '';//语言 空为zh-CN中文
  deviceid:any;//设备id
  constructor(private activateInfo:ActivatedRoute,private layoutService:LayoutService,
    private http:HttpserviceService) { }

  ngOnInit(): void {
    //选中第一个
    this.HPUselect.value = this.HPUlist[0].name;
    this.HPUselect.HPUselectItem = this.HPUlist[0];
    this.HPUselect.show = false;

    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    
    //订阅左上角打开关闭
    this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.resize();
    })
    //订阅路由返回的标题
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
      this.deviceid = f.deviceid;
    })


    this.HPUlist.forEach(f=>{
      f.series = copy(this.HPUlist_series);
     
    })

    
    let i = 0;
    this.timer = setInterval(f=>{
      this.get_XNQ_HPU();
      this.get_Error_Message();
      this.get_cleanlinss();
      this.get_Water();
      this.get_Radar();
      if(i==2){
        create_img_16_9();
      }
      i++;
    },1000);
    window.addEventListener('resize',this.resize);

    // $('.scrollbar_l').bind("scroll",f=>{
    //   var line = $('.line_1');
    //   for(let i = 0;i<line.length;i++){
    //     $('#line_'+i).scrollLeft($('.scrollbar_l').scrollLeft())
    //   }
    // })
  }

  ngAfterViewInit(){
    // this.create_scrollbar();
  }

  obser = new Observable(f=>{
    
    let chart;
    this.HPUlist.forEach((f,i)=>{
      chart = document.getElementById(f.id);
      if(chart)
        echarts.init(chart).resize();
    });
    this.cleanlinss.forEach(f=>{
      chart = document.getElementById(f.id);
      if(chart)
        echarts.init(chart).resize();
    });
    this.HE_Water.data.forEach((f,i)=>{
      chart = document.getElementById(f.id);
      if(chart)
        echarts.init(chart).resize();
    });
    ['pumpClick','discharge_chart_1','discharge_chart_2','radar_1','radar_2'].forEach(f => {
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


  // create_scrollbar(){
  //   var line = $('.line_1');
  //   let max = 0;
  //   for(let i = 0;i<line.length;i++){
  //     if(max<line[i].clientWidth)max = line[i].clientWidth;
  //   }

  //   $('#s').width( max)
  // }
  
  
  //刷新表格
  // chartResize =()=>{
  //   this.resize('radar_1');
  //   this.resize('radar_2');
  //   // this.resize('discharge_chart_1');
  //   // this.resize('discharge_chart_2');
  //   // this.resize('pumpClick');
  //   // this.HPUlist.forEach(f=>{
  //   //   this.resize(f.id);
  //   // })
  //   // this.cleanlinss.forEach(f=>{
  //   //   this.resize(f.id);
  //   // })
  // }
  // resize(id){
  //   if(document.getElementById(id))
  //     echarts.init(document.getElementById(id)).resize();
  // }



  /**
   * 获取蓄能器数据
   * get_hpu函数返回
   * hh01 时间 单位小时
   * hs30 hpu状态
   * hs31 -hs36泵状态 0 1
   * hv01油压
   * hv02油流量
   * hv03油温
   * 
   */
  get_XNQ_HPU(){
    // get_hpu('{"deviceid":"device_hpu_01"}')
    //  hh01:'time',hs30:'status',hs1
    let res;
    this.subscribeList.xhq_hpu = this.http.callRPC('get_hpu','device_monitor.get_hpu',{"deviceid":""}).subscribe((f:any)=>{
      
      
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message;
      res.forEach(el => {
        if(el.length == 0)return;
        let i = parseInt(el[0].deviceid.split('_')[el[0].deviceid.split('_').length-1]);
        this.HPUlist[i-1].pumpList.forEach((f,j)=>{
          f.s = el[0][`hs3${j+1}`]?true:false;
        })
        this.HPUlist[i-1].status = el[0].status?true:false;
        //时间
        this.HPUlist[i-1].time = el[0].hh01;
        //油压
        this.HPUlist[i-1].series[0].data.value = el[0].hv01;
        //油流量
        this.HPUlist[i-1].series[1].data.value = el[0].hv02;
        //油温
        this.HPUlist[i-1].series[2].data.value = el[0].hv03;

        
      });

      let HPUlist_series = this.HPUlist.find(f => this.HPUselect.value == f.name);
      if(document.getElementById('pumpClick'))
          oilsrouce.create_gauge_3(HPUlist_series.series,echarts.init(document.getElementById('pumpClick')),'big');
      this.HPUlist.forEach(f=>{
        if(document.getElementById( f.id))
        oilsrouce.create_gauge_3( f.series,echarts.init(document.getElementById( f.id)));
      })
    })
  }


  /**
   * 获取设备报警信息
   */
  get_Error_Message(){
    // SELECT get_hpu_warninglog()
    this.subscribeList.error_message = this.http.callRPC('get_hpu_warninglog','device_monitor.get_hpu_warninglog',{}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let color = 'white';
      let s = '';
      this.equip_alarm = f.result.message[0].message.sort((h,c)=> c-h).map(g=>{
        
        if(g.level == 2)color = 'yellow',s ='warm';
        if(g.level == 3)color = '#f595ca',s ='error';//红
        return {data:[g.source.split(' ')[0],g.message],s:'',color:color};
      })
    })
  }

  /**
   * 获取清洁度
   * cs01: 10粒子数>4u
    * cs02: 8粒子数>6u
    * cs03: 0粒子数>14u
    * cs07: 0粒子数>21u
    * 
   */
  get_cleanlinss(){
    // SELECT get_particle('{"deviceid":"device_hpu_01"}')
    let i = this.HPUselect.value.match(/\d{1,}/g),res;
    this.subscribeList.cleanlinss = this.http.callRPC('get_particle','device_monitor.get_particle',{"deviceid":"device_hpu_0"+i[0]}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message[0];
      if(!res)res = {}
      // 粒子数 > 4u
      this.cleanlinss[0].dataLine.value = res.cs01 || 0;
      // 粒子数 > 6u
      this.cleanlinss[1].dataLine.value = res.cs02 || 0;
      // 粒子数 > 14u
      this.cleanlinss[2].dataLine.value = res.cs03 || 0;
      // 粒子数 > 21u
      this.cleanlinss[3].dataLine.value = res.cs07 || 0;
      this.cleanlinss.forEach(f=>{
        if(document.getElementById(f.id)){
          oilsrouce.create_bar_j(f.dataLine,echarts.init(document.getElementById(f.id)),'20%');
        }
      })
      this.attrs_cleanliss[0].value.push(res.cs01  || 0);
      this.attrs_cleanliss[1].value.push(res.cs02 || 0);
      this.attrs_cleanliss[2].value.push(res.cs03 || 0);
      this.attrs_cleanliss[3].value.push(res.cs07 || 0);
// dateformat(new Date(res.recordtime),' hh:mm:ss')
      this.xdata_cleanliss.push(res.recordtime  || 0);
      if(this.xdata_cleanliss.length> 10){
        this.xdata_cleanliss.splice(0,1);
        this.attrs_cleanliss[0].value.splice(0,1);
        this.attrs_cleanliss[1].value.splice(0,1);
        this.attrs_cleanliss[2].value.splice(0,1);
        this.attrs_cleanliss[3].value.splice(0,1);
      }

      if(document.getElementById('discharge_chart_1')){
        let myChart_9 = echarts.init(document.getElementById('discharge_chart_1'));;
        equipment_four_road.create_real_discharge({attrs:this.attrs_cleanliss,xData:this.xdata_cleanliss},myChart_9);
      }
    })
  }

  /**
   * 获取HE/Water
   * hw01: 24.32 HE 1出油温度
  * hw02: 25.7 HE 1出油水饱和度
  * hw03: 23.82 HE 2出油温度
  * hw04: 20.67 HE2出油水饱和度
  * hw05: 0.5 HE1&2出油温度差
  * hw06: 5.06 HE1&2水饱和度差
  * recordtime: "2020-12-02 17:00:00"
  * te01: 21.59 HE回水温度
  * te02: 24.28 HE出水温度
  * te03: 2.68 HE回水出水温度差
  * te04: 32.37 HE回油温度
  * te05: 33.67 HE出油温度
   */
  get_Water(){
    // SELECT get_water('{"deviceid":"device_hpu_02"}')
    let j = ['hw01','hw03','hw05','hw02','hw04','hw06','te04','te05','te02','te01','te03']
    let i = this.HPUselect.value.match(/\d{1,}/g),res;
    this.subscribeList.water = this.http.callRPC('get_water','device_monitor.get_water',{"deviceid":"device_hpu_0"+i[0]}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message[0];
      if(!res)res = {};
      
      this.HE_Water.data.forEach((f,i)=>{
        if(document.getElementById(f.id)){
          f.dataLine.value = res[j[i]] || 0;
          oilsrouce.create_bar_j(f.dataLine,echarts.init(document.getElementById(f.id)),'20%');
        }
      })
      this.HE_Water.attrs.forEach((f,i)=>{
        f.value.push(res[j[i]]|| 0);
      })
      this.HE_Water.xData.push(res.recordtime|| 0);
      if(this.HE_Water.xData.length>10){
        this.HE_Water.xData.splice(0,1);
        this.HE_Water.attrs.forEach(f=>{
          f.value.splice(0,1);
        })
      }
      if(document.getElementById('discharge_chart_2')){
        let myChart_9 = echarts.init(document.getElementById('discharge_chart_2'));;
        equipment_four_road.create_real_discharge({attrs:this.HE_Water.attrs,xData:this.HE_Water.xData},myChart_9);
      }
     
    })
  }


  /**
   * 获取蓄能器
   * ab11: 3012 蓄能器1-1
  ab12: 3021 蓄能器1-2
  ab21: 3014 蓄能器2-1
  ab22: 3012 蓄能器2-2
  ab31: 3001 蓄能器3-1
  ab32: 3021 
  ab41: 3026
  ab42: 3014
  ab51: 3018
  ab52: 3001
  ab61: 3019
  ab62: 3026
  ab71: 3023
  ab72: 3018
  ab81: 3011
  ab82: 3019
   */
  get_Radar(){
    // SELECT get_accumulator('{"deviceid":"device_hpu_02"}')
    let res;
    this.subscribeList.rader = this.http.callRPC('get_accumulator','device_monitor.get_accumulator',{"deviceid":""}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message[0];
      if(!res)res = {};
      this.radar_1.value = [
        res.ab11,res.ab81,res.ab71,res.ab61,res.ab51,res.ab51,res.ab31,res.ab21,
      ];
      this.radar_2.value = [
        res.ab12,res.ab82,res.ab72,res.ab62,res.ab52,res.ab52,res.ab32,res.ab22,
      ]
      let radar_1 = document.getElementById('radar_1')
      if(radar_1)oilsrouce.create_radar(this.radar_1,echarts.init(radar_1));
      let radar_2 = document.getElementById('radar_2')
      if(radar_2)oilsrouce.create_radar(this.radar_2,echarts.init(radar_2));

    })
  }

  timeAutomatic(){
    let t = this.HPUselect.HPUselectItem.time;
    if(t && t.h == 24 && t.m == 0 && t.s == 0  )return;
    // document.getElementById('d_1').setAttribute('style','animation: 1.2s frontFlipDown ease-in-out;')
    t.s++;
    if(t.s!=60)return;
    t.s=0;
    t.m++;
    if(t.m!=60)return;
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

  date_h_to_hms(hours){
    let hou = hours.toString().split('.');
    let s = hou[hou.length-1]*360
    return {
      h:hou[0],
      m:s/60,
      s:s%60
    } 
  }

  //组件销毁  
  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    window.removeEventListener('resize',this.resize)
  }

}

