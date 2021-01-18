import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, dateformat, rgb_del_red,painting_time,four_road_htmlstr, create_img_16_9 } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';


@Component({
  selector: 'ngx-equipment-four-road',
  templateUrl: './equipment-four-road.component.html',
  styleUrls: ['./equipment-four-road.component.scss']
})
export class EquipmentFourRoadComponent implements OnInit {



  xData:any = {};

  attrs_1:any = {
    'equipment.road.LeftRear.Params':[{ 
      name: "左后输出",nameEn :'LeftRearOutput', unit: "V",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "左后位移",nameEn :'LeftRearDisplacement', unit: "V",value: [],show:true,
        color:["", ""]
    },{ 
      name: "左后活动Fdbk",nameEn :'LeftRearActiveFdbk', unit: "V",value: [],show:true,
      color:["", ""]
    },{ 
      name: "左后指令频率",nameEn :'LeftRearCommandFrequency', unit: "V",value: [],
      color:["", ""]
  },{ 
    name: "左后位移绝对误差",nameEn :'LeftRearDisplacementAbs.Error', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "左后位移误差",nameEn :'LeftRearDisplacementError', unit: "V",value: [],
    color:["", ""]
  },{ 
    name: "左后DeltaP",nameEn :'LeftRearDeltaP', unit: "V",value: [],
    color:["", ""]
  }],
      'equipment.road.RightRear.Params':[{ 
        name: "右后输出",nameEn :'RightRearOutput', unit: "V",value: [],show:true
        ,color:["", ""]
      },{ 
          name: "右后位移",nameEn :'RightRearDisplacement', unit: "V",value: [],show:true,
          color:["", ""]
      },{ 
        name: "右后活动Fdbk",nameEn :'RightRearActiveFdbk', unit: "V",value: [],show:true,
        color:["", ""]
      },{ 
        name: "右后指令频率",nameEn :'RightRearCommandFrequency', unit: "V",value: [],
        color:["", ""]
    },{ 
      name: "右后位移绝对误差",nameEn :'RightRearDisplacementAbs.Error', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "右后位移误差",nameEn :'RightRearDisplacementError', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "右后DeltaP",nameEn :'RightRearDeltaP', unit: "V",value: [],
      color:["", ""]
  }],
  xData:[]
    };
  attrs_2:any = {
      'equipment.road.LeftFront.Params':[{ 
        name: "左前输出",nameEn :'LeftFrontOutput', unit: "V",value: [],show:true
        ,color:["", ""]
      },{ 
          name: "左前位移",nameEn :'LeftFrontDisplacement', unit: "V",value: [],show:true,
          color:["", ""]
      },{ 
        name: "左前活动Fdbk",nameEn :'LeftFrontActiveFdbk', unit: "V",value: [],show:true,
        color:["", ""]
      },{ 
        name: "左前指令频率",nameEn :'LeftFrontCommandFrequency', unit: "V",value: [],
        color:["", ""]
    },{ 
      name: "左前位移绝对误差",nameEn :'LeftFrontDisplacementAbs.Error', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "左前位移误差",nameEn :'LeftFrontDisplacementError', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "左前DeltaP",nameEn :'LeftFrontDeltaP', unit: "V",value: [],
      color:["", ""]
  }],
      'equipment.road.RightFront.Params':[{ 
        name: "右前输出",nameEn :'RightFrontOutput', unit: "V",value: [],show:true
        ,color:["", ""]
      },{ 
          name: "右前位移",nameEn :'RightFrontDisplacement', unit: "V",value: [],show:true,
          color:["", ""]
      },{ 
        name: "右前活动Fdbk",nameEn :'RightFrontActiveFdbk', unit: "V",value: [],show:true,
        color:["", ""]
      },{ 
        name: "右前指令频率",nameEn :'RightFrontCommandFrequency', unit: "V",value: [],
        color:["", ""]
    },{ 
      name: "右前位移绝对误差",nameEn :'RightFrontDisplacementAbs.Error', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "右前位移误差",nameEn :'RightFrontDisplacementError', unit: "V",value: [],
      color:["", ""]
    },{ 
      name: "右前DeltaP",nameEn :'RightFrontDeltaP', unit: "V",value: [],
      color:["", ""]
  }],
  xData:[]
    };
  attrs_3:any = {"equipment.road.centerbottom.SampleSurfaceTemp":[{ 
      name: "前方顶部温度",nameEn :'IrrFrametopFrontActual', unit: "",value: [],show:true
      ,color:["", ""]
    },
    { 
      name: "顶部温度",nameEn :'IrrFrametoProofActual', unit: "",value: [],show:true
      ,color:["", ""]
    },
    { 
      name: "顶部后方温度",nameEn :'IrrFrametoPrearActual', unit: "",value: [],show:true
      ,color:["", ""]
    },
    { 
      name: "前方温度",nameEn :'IrrFrameFrontActual', unit: "",value: [],show:false
      ,color:["", ""]
    },
    { 
      name: "后方温度",nameEn :'IrrFrameRearActual', unit: "",value: [],show:false
      ,color:["", ""]
    },
    { 
      name: "左1部位温度",nameEn :'IrrFrame1LeftActual', unit: "",value: [],show:false
      ,color:["", ""]
    },
    { 
      name: "左2部位温度",nameEn :'IrrFrame2LeftActual', unit: "",value: [],show:false
      ,color:["", ""]
    },
    { 
      name: "左3部位温度",nameEn :'IrrFrame3LeftActual', unit: "",value: [],show:false
      ,color:["", ""]
    },
    { 
      name: "右1部位温度",nameEn :'IrrFrame1RightActual', unit: "",value: [],show:false
      ,color:["", ""]
    },
    { 
      name: "右2部位温度",nameEn :'IrrFrame2RightActual', unit: "",value: [],show:false
      ,color:["", ""]
    },
    { 
      name: "右3部位温度",nameEn :'IrrFrame3RightActual', unit: "",value: [],show:false
      ,color:["", ""]
    }],
    xData:[]};

  //安灯状态
  andon = [
    {name:'4',color:'blue',status:1},
    {name:'3',color:'green',status:1},
    {name:'2',color:'yellow',status:0},
    {name:'1',color:'red',status:0},
  ];
 

  
  //实验实时数据
  switchStatus:any ={
    title:[`stationName`,'OnOff',`OilSeparatorOn`,`HighOilSeparator`,'InternalLock','Programlock'],
    data:[['',
    {value:1,color:'#C0C0C0',id:'circle'},{value:1,color:'#C0C0C0',id:'circle'},{value:1,color:'#C0C0C0',id:'circle'},
    {value:1,color:'',id:'strip'},{value:1,color:'',id:'strip'}]]
  }



  img = {
    url:'assets/eimdoard/equipment/images/slz.png',
    name:''
  }

  // ngx-chart-curve-v3对象
  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  // ngx-chart-curve-v3有哪些tag
  list_2 = ['equipment.road.LeftFront.Params','equipment.road.RightFront.Params'];
  list_1 = ['equipment.road.LeftRear.Params','equipment.road.RightRear.Params'];
  list_3 = ['equipment.road.centerbottom.SampleSurfaceTemp'];
  click_list = [];//当前选中的tag
  deviceid = 'device_mts_01';//设备信息


  timer:any;//定时器
  timer60s:any;//定时器60s
  language = '';//语言 空为zh-CN中文

  //设备介绍
  equipIntroduceList = [
    {htmlstr:four_road_htmlstr[0],title:''},
    {htmlstr:four_road_htmlstr[1],title:'四立柱参数'},
    {htmlstr:four_road_htmlstr[2],title:'环境仓及光照参数'},
    {htmlstr:four_road_htmlstr[3],title:'环境仓及光照参数'},
  ];
  //当前的页数
  eqIntShow = 0;


  subscribeList:any = {};

  constructor(private activateInfo:ActivatedRoute
    ,private http:HttpserviceService,private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    //记录初始化默认选中tag
    this.click_list = [this.list_1[0],this.list_2[0],this.list_3[0]];
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;

    //路由订阅
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
    //颜色的赋值
    this.color();
    
    //获取数据
    this.getData();
    
    setTimeout(f=>{
      create_img_16_9();
    },1000)
  }

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})
  }

  getData(){
    // 定时添加数据
    let table,method = '';
    this.timer = setInterval(f =>{
      let param = this.create_param([
        {value:this.click_list[0],index:1},{value:this.click_list[1],index:2}
        ]);
      this.get_device_mts_status();
      if(param[0].length > 0){
        table = 'get_device_mts_time',method = 'device_monitor.get_device_mts_timerangedata';
        this.get_device_mts_time(table,method,param,this.deviceid,['chart_1','chart_2']);
      }
      if(param[1].length > 0){
        table = 'get_device_mts_realtimedata',method = 'device_monitor.get_device_mts_realtimedata';
        this.get_device_mts_realtimedata(table,method,param,this.deviceid,['chart_1','chart_2']);
      }

      param = this.create_param([{value:[this.click_list[2]],index:3}]);
      if(param[0].length > 0){
        table = 'get_device_mts_time',method = 'device_monitor.get_device_mts_timerangedata';
        this.get_device_mts_time(table,method,param,'device_weiss_01',['chart_3']);
      }
      if(param[1].length > 0){
        table = 'get_device_mts_realtimedata',method = 'device_monitor.get_device_mts_realtimedata';
        this.get_device_mts_realtimedata(table,method,param,'device_weiss_01',['chart_3']);
      }
    },1000)
    
   
  }
  

  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;  
    this[`list_${i}`].forEach(f=>{
      if(e!=f)this[`attrs_${i}`][f].forEach(el => {
        el.value = [];
        this[`attrs_${i}`][f].xData = [];
      });
    })
  }


//颜色的赋值
  color(){
    let rgb = '';
    ['attrs_1','attrs_2','attrs_3'].forEach(element => {
      for(let item in this[element]){
        this[element][item].forEach((f,i)=>{
          if(i > colors.length-1)
            rgb =  rgb_del_red();
          else
            rgb =  colors[i];
          f.color = [rgb,rgb];
        })
      }
    });
  }


  //生成实时数据需要的参数
  create_param(arr){
    let arr10s = [];
    let arr1s = [];
    arr.forEach((f,i)=>{
      this[`attrs_${f.index}`][f.value].forEach(el => {
        if(el.value &&  el.value.length <= 0)
          if( arr10s.findIndex(g=> g==el.value) == -1)arr10s.push(el.nameEn.replace(".","").toLocaleLowerCase());
        if(el.value &&  el.value.length > 0)
          arr1s.push(el.nameEn.replace(".","").toLocaleLowerCase());
      });
    })
    return [arr10s,arr1s];

  }

  /**
   *   中间的表的数据 开关这些数据     
   */
  get_device_mts_status(){
      this.subscribeList.status = this.http.callRPC('get_device_mts_status','device_monitor.get_device_mts_status',{device:this.deviceid}).subscribe((f:any) =>{
        if(f.result.error || f.result.message[0].code == 0)return;
        // this.switchStatus.data[0][0] =  f.result.message[0][1].stationname;
        // //起停状态
        // this.switchStatus.data[0][1].value =  f.result.message[0][0].runstop;
        // this.switchStatus.data[0][1].color =  this.switchStatus.data[0][1].value == 1?'green':'#C0C0C0';
        // //分油器开
        // this.switchStatus.data[0][2].value =  f.result.message[0][0].hsmt9j28aon;
        // this.switchStatus.data[0][2].color =  this.switchStatus.data[0][1].value == 1?'green':'#C0C0C0';
        // //分油器高
        // this.switchStatus.data[0][3].value =  f.result.message[0][0].hsmt9j28ahigh;
        // this.switchStatus.data[0][3].color =  this.switchStatus.data[0][1].value == 1?'green':'#C0C0C0';
        // //内锁
        // this.switchStatus.data[0][4].value =  f.result.message[0][0].interlock;
        // this.switchStatus.data[0][4].color =  this.switchStatus.data[0][1].value == 1?'white':'orange';
        // //程序锁
        // this.switchStatus.data[0][5].value =  f.result.message[0][0].programinterlock;
        // this.switchStatus.data[0][5].color =  this.switchStatus.data[0][1].value == 1?'white':'orange';

        this.switchStatus.data = f.result.message[0].map(m =>(
          [
            m.stationname,
            {value:m.runstop,color:m.runstop == 1?'green':'#C0C0C0',id:'circle'},
            {value:m.hsmt9j28aon,color:m.hsmt9j28aon == 1?'green':'#C0C0C0',id:'circle'},
            {value:m.hsmt9j28ahigh,color:m.hsmt9j28ahigh == 1?'green':'#C0C0C0',id:'circle'},
            {value:m.interlock,color:m.interlock== 1?'white':'orange',id:'strip'},
            {value:m.programinterlock,color:m.programinterlock== 1?'white':'orange',id:'strip'}
          ] 
        ))
        this.subscribeList.status.unsubscribe();
      })
  }




  

  /**
   * 图表 获取一段时间
   * @param table 
   * @param method 
   * @param param 
   */
  get_device_mts_time(table,method,param,deviceid,arr){
    // let datestr = dateformat(new Date(),'yyyy-MM-dd hh:mm');
    // let datestr_ = dateformat(new Date(),'yyyy-MM-dd hh:mm');
    // dateformat(new Date(now.getTime()-10000)
    let now = new Date();
    this.subscribeList.time = this.http.callRPC(table,method,{"start":dateformat(new Date(now.getTime()-10000),'yyyy-MM-dd hh:mm:ss'),"end": dateformat(now,'yyyy-MM-dd hh:mm:ss'),"device":deviceid,
    arr:param[0].join(',')}).subscribe((f:any) =>{
      if(f.result.error || f.result.message[0].code == 0)return;
      painting_time(f,10,this,arr);
      this.subscribeList.time.unsubscribe();
      
    })
  }

  /**
   *  图表  获取一秒
   * @param table 
   * @param method 
   * @param param 
   */
  get_device_mts_realtimedata(table,method,param,deviceid,arr){
    this.subscribeList.real = this.http.callRPC(table,method,{"device":deviceid,
    arr:param[1].join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      painting_time(g,1,this,arr);
      this.subscribeList.real.unsubscribe();

    })
  }

  



  //样式 逻辑方法
  
  get_td_width(num){
    return 100/num+'%'
  }
  
  //组件销毁  
  ngOnDestroy(){
    clearInterval(this.timer)
    clearInterval(this.timer60s);
    
    // clearInterval(this.timer1)
    // clearInterval(this.timer2)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    
  }



}
