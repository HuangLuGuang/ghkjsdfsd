import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, dateformat, rgb_del_red,painting_time,hydraulic_htmlstr, create_img_16_9 } from '../equipment-board';

// 引入jquery
declare var $:any;

@Component({
  selector: 'ngx-equipment-hydraulic-pressure',
  templateUrl: './equipment-hydraulic-pressure.component.html',
  styleUrls: ['./equipment-hydraulic-pressure.component.scss']
})
export class EquipmentHydraulicPressureComponent implements OnInit {

  xData = [];

  attrs_1:any = {
    'equipment.hydraulic.Passageway4':[{
      name: "4号缸位移",nameEn :'act410505481BDisplacement', unit: "mm",value: [],show:true
      ,color:["", ""]
    },{
        name: "4号缸力",nameEn :'Act410505481BForce', unit: "kN",value: [],show:true,
        color:["", ""]
    },{
      name: "4号缸循环次数",nameEn :'Act410505481BCount', unit: "segments",value: [],show:true,
      color:["", ""]
    }],
    'equipment.hydraulic.Passageway5':[{
      name: "5号缸位移",nameEn :'act510506594ADisplacement', unit: "mm",value: [],show:true
      ,color:["", ""]
    },{
      name: "5号缸力",nameEn :'Act510506594AForce', unit: "kN",value: [],show:true,
      color:["", ""]
    },{
      name: "5号缸循环次数",nameEn :'Act510506594ACount', unit: "segments",value: [],show:true,
      color:["", ""]
  },],'equipment.hydraulic.Passageway6':[{
    name: "6号缸位移",nameEn :'Act610506594BDisplacement', unit: "mm",value: [],show:true
    ,color:["", ""]
  },{
    name: "6号缸力",nameEn :'Act610506594BForce', unit: "kN",value: [],show:true,
    color:["", ""]
  },{
    name: "6号缸循环次数",nameEn :'Act610506594BCount', unit: "segments",value: [],show:true,
    color:["", ""]
},],
xData:[]
  };
  attrs_2:any = {
    'equipment.hydraulic.Passageway1':[{
      name: "1缸位移",nameEn :'Act110506588ADisplacement', unit: "mm",value: [],show:true
      ,color:["", ""]
    },{
        name: "1号缸力",nameEn :'Act110506588AForce', unit: "kN",value: [],show:true,
        color:["", ""]
    },{
      name: "1号缸循环次数",nameEn :'Act110506588ACount', unit: "segments",value: [],show:true,
      color:["", ""]
    }],
    'equipment.hydraulic.Passageway2':[{
      name: "2缸位移",nameEn :'Act210506588BDisplacement', unit: "mm",value: [],show:true
      ,color:["", ""]
    },{
        name: "2号缸力",nameEn :'Act210506588BForce', unit: "kN",value: [],show:true,
        color:["", ""]
    },{
      name: "2号缸循环次数",nameEn :'Act210506588BCount', unit: "V",value: [],show:true,
      color:["", ""]
    }], 'equipment.hydraulic.Passageway3':[{
      name: "3缸位移",nameEn :'act310505481ADisplacement', unit: "segments",value: [],show:true
      ,color:["", ""]
    },{
        name: "3号缸力",nameEn :'act310505481AForce', unit: "kN",value: [],show:true,
        color:["", ""]
    },{
      name: "3号缸循环次数",nameEn :'act310505481ACount', unit: "segments",value: [],show:true,
      color:["", ""]
    }],
xData:[]
  };

  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  //安灯状态
  andon = [
    {name:'4',color:'blue',status:1},
    {name:'3',color:'green',status:1},
    {name:'2',color:'yellow',status:0},
    {name:'1',color:'red',status:0},
  ];

  //实验实时状态
  switchStatus: any ={
    title:[`stationNameCGF`,'OnOff','InternalLock','Programlock'],
    // title:[`Station name（cfg）`,'开/关','内锁','程序内锁'],
    data:[
      ['',
      {value:1,id:'circle',color:''}
      ,{value:1,id:'strip',color:''},{value:1,id:'strip',color:''},],
      ['',
      {value:0,id:'circle',color:''}
      ,{value:0,id:'strip',color:''},{value:0,id:'strip',color:''},],
      ['',
      {value:1,id:'circle',color:''}
      ,{value:1,id:'strip',color:''},{value:1,id:'strip',color:''},],
      ['',
      {value:0,id:'circle',color:''}
      ,{value:0,id:'strip',color:''},{value:0,id:'strip',color:''},],
      ['',
      {value:0,id:'circle',color:''}
      ,{value:0,id:'strip',color:''},{value:0,id:'strip',color:''},]
    ]
  }

  //分油器 open 关0 开1  high低 0 高1
  real_list = [
    {name:'1',on:0,high:0},
    {name:'2',on:0,high:0},
    {name:'3',on:0,high:0},
    {name:'4',on:0,high:0},
    {name:'5',on:0,high:0},
    {name:'6',on:0,high:0},
  ];

  img = {
    url:'assets/eimdoard/equipment/images/yy.png',//中间图片
    name:''
  }

  // ngx-chart-curve-v3有哪些tag
  list_2 = ['equipment.hydraulic.Passageway1','equipment.hydraulic.Passageway2','equipment.hydraulic.Passageway3',];
  list_1 = ['equipment.hydraulic.Passageway4','equipment.hydraulic.Passageway5','equipment.hydraulic.Passageway6',];
  equipIntroduceList = [
    {htmlstr:hydraulic_htmlstr[0],title:'',type:'table_class'},
    {htmlstr:hydraulic_htmlstr[1],title:'',type:'table_class'},
  ]


  click_list = [];//当前选中的tag
  deviceid='device_mts_04';//设备编号


  timer:any;//定时器
  language = '';//语言 空为zh-CN中文

  subscribeList:any = {};
  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute,private http:HttpserviceService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;

    //路由参数  标题
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })

    //颜色赋值
    this.color();

    //记录默认进去选中的tag
    this.click_list = [this.list_1[0],this.list_2[0]]
    this.getData();
    setTimeout(() => {
      create_img_16_9();
    }, 1000);

  }


  getData(){
     // 定时添加数据
     let table,method = '';
    this.timer = setInterval(f =>{
      this.get_device_mts_status();//实时状态表
      this.get_device_mst_oilseparator();//开油器
      let param = this.create_param();
      if(param[1].length > 0){
        table = 'get_device_mts_realtimedata',method = 'device_monitor.get_device_mts_realtimedata';
        this.get_device_mts_realtimedata(table,method,param);
      }
      if(param[0].length > 0){
        table = 'get_device_mts_timerangedata',method = 'device_monitor.get_device_mts_timerangedata';
        this.get_device_mts_time(table,method,param);
      }

    },1000)

  }



   //重新画
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
    ['attrs_1','attrs_2'].forEach(element => {
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
  create_param(){
    let arr10s = [];
    let arr1s = [];
    this.click_list.forEach((f,i)=>{
      this[`attrs_${i+1}`][f].forEach(el => {
        if(el.value &&  el.value.length <= 0)
          if( arr10s.findIndex(g=> g==el.value) == -1)arr10s.push(el.nameEn.replace(".","").toLocaleLowerCase());
        if(el.value &&  el.value.length > 0)
          arr1s.push(el.nameEn.replace(".","").toLocaleLowerCase());
      });
    })
    return [arr10s,arr1s];
  }


  /**
   *        "interlock"="内锁"
            "programinterlock"="程序锁"
            "runstop"='起停状态
            "stationname"="台架试验"
            "hsmt9j28aon"="分油器开"
            "hsmt9j28ahigh"="分油器高"
   */
  get_device_mts_status(){
    this.subscribeList.status = this.http.callRPC('get_device_mts_status','device_monitor.get_device_mts_status',{device:this.deviceid}).subscribe((g:any) =>{
      this.switchStatus.data.forEach((f,i) => {
        if(i>=g.result.message[0].length)return;
        f[0] =  g.result.message[0][i].stationname;
        //起停状态
        f[1].value =  g.result.message[0][i].runstop;
        f[1].color =  f[1].value == 1?'green':'#C0C0C0';
        //内锁
        f[2].value =  g.result.message[0][i].interlock;
        f[2].color =  f[2].value == 1?'white':'orange';
        //程序锁
        f[3].value =  g.result.message[0][i].programinterlock;
        f[3].color =  f[3].value == 1?'white':'orange';
      });

    })
  }


/**
   * 获取一段时间
   * @param table
   * @param method
   * @param param
   */
  get_device_mts_time(table,method,param){
    // let datestr = dateformat(new Date(),'yyyy-MM-dd hh:mm');
    // let datestr_ = dateformat(new Date(),'yyyy-MM-dd hh:mm');
    let now = new Date();
    this.subscribeList.time = this.http.callRPC(table,method,{"start":dateformat(new Date(now.getTime()-10000),'yyyy-MM-dd hh:mm:ss'),"end": dateformat(now,'yyyy-MM-dd hh:mm:ss'),"device":this.deviceid,

    // this.http.callRPC(table,method,{"start":"2020-11-09 14:02:00","end":"2020-11-10 20:20:00","device":"device_mts_01",
    arr:param[0].join(',')}).subscribe((f:any) =>{
      if(f.result.error || f.result.message[0].code == 0)return;
      painting_time(f,10,this,['chart_1','chart_2']);

    })
  }

  /**
   * 分油器
   */
  get_device_mst_oilseparator(){
    this.subscribeList.oil = this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {'device':this.deviceid,arr:"hsmt9j28aon,hsmt9j28ahigh,hsmt9j28bon,hsmt9j28bhigh,hsmt8j28aon,hsmt8j28ahigh,hsmt8j28bon,hsmt8j28bhigh,hsmt7j28aon,hsmt7j28ahigh,hsmt7j28bon,hsmt7j28bhigh"}
    ).subscribe((f:any)=>{
      // console.log(f);
      let _key = "";//请求到的数据字段前面部分固定的
      let o = -1;//real_time数据的下标
      if(f.result.error || f.result.message[0].code == 0 || !f.result.message[0].message || f.result.message[0].message[0].error)return;
      f.result.message[0].message.forEach(el => {
        for(let key in el){
          switch(true){
            case key.includes('hsmt9j28a'):
                _key = 'hsmt9j28a';
                o = 0;
              break;
              case key.includes('hsmt9j28b'):
                _key = 'hsmt9j28b';
                o = 1;
              break;
              case key.includes('hsmt8j28a'):
                _key = 'hsmt8j28a';
                o = 2;
              break;
              case key.includes('hsmt8j28b'):
                _key = 'hsmt8j28b';
                o = 3;
              break;
              case key.includes('hsmt7j28a'):
                _key = 'hsmt7j28a';
                o = 4;
              break;
              case key.includes('hsmt7j28b'):
                _key = 'hsmt7j28b';
                o = 5;
              break;
          }
          // console.log(_key);
          this.real_list[o][key.split(_key)[1]] = el[key][0][0];
        }
      });

    })
  }

  /**
   * 获取一秒
   * @param table
   * @param method
   * @param param
   */
  get_device_mts_realtimedata(table,method,param){
    this.subscribeList.real = this.http.callRPC(table,method,{"device":this.deviceid,
    arr:param[1].join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      painting_time(g,1,this,['chart_1','chart_2']);
    })
  }




  // 分油器的按钮显示
  getbtnStatus(item,i){
    let j = -1;
    //如果开着 需要看高还是低
    let bol = false;
    j = item.on == 0 ?1:item.high == 1?3:2;
    if(i == j)return true;
    else return false;
  }

  //样式 逻辑方法
  get_td_width(num,i){
    if(i == 0)return '23%'
    return 77/num+'%'
  }
  get_height_real(){
    return 100/this.real_list.length +'%'
  }

  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}
