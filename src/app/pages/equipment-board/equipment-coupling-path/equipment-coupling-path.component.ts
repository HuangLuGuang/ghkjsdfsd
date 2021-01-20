import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, rgb_del_red, create_img_16_9, painting_time, dateformat, coupling } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';


@Component({
  selector: 'ngx-equipment-coupling-path',
  templateUrl: './equipment-coupling-path.component.html',
  styleUrls: ['./equipment-coupling-path.component.scss']
})
export class EquipmentCouplingPathComponent implements OnInit {


  attrs_1:any = {
    'equipment.road.LeftRear.Params':[{ 
      name: "左后轴头x向位移",nameEn :'LRspindleDx', unit: "mm",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "左后轴头x向力",nameEn :'LRspindleFx', unit: "kN",value: [],show:true,
        color:["", ""]
    },{ 
        name: "左后轴头y向位移",nameEn :'LRspindleDy', unit: "mm",value: [],show:true,
        color:["", ""]
    },{ 
      name: "左后轴头y向力",nameEn :'LRspindleFy', unit: "kN",value: [],
      color:["", ""]
  },{ 
    name: "左后轴头z向位移",nameEn :'LRspindleDz', unit: "mm",value: [],
    color:["", ""]
  },{ 
    name: "左后轴头z向力",nameEn :'LRspindleFz', unit: "kN",value: [],
    color:["", ""]
  },{ 
    name: "左后轴头x向角度",nameEn :'LRspindlex', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "左后轴头x向力矩",nameEn :'LRspindleMx', unit: "kN·m",value: [],
    color:["", ""]
  },{ 
    name: "左后轴头y向角度",nameEn :'LRspindley', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "左后轴头y向力矩",nameEn :'LRspindleMy', unit: "kN-m",value: [],
    color:["", ""]
  },{ 
    name: "左后轴头z向角度",nameEn :'LRspindlez', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "左后轴头z向力矩",nameEn :'LRspindleMz', unit: "kN-m",value: [],
    color:["", ""]
  }],
    'equipment.road.RightRear.Params':[{ 
      name: "右后轴头x向位移",nameEn :'RRspindleDx', unit: "mm",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "右后轴头x向力",nameEn :'RRspindleFx', unit: "kN",value: [],show:true,
        color:["", ""]
    },{ 
        name: "右后轴头y向位移",nameEn :'RRspindleDy', unit: "mm",value: [],show:true,
        color:["", ""]
    },{ 
      name: "右后轴头y向力",nameEn :'RRspindleFy', unit: "kN",value: [],
      color:["", ""]
  },{ 
    name: "右后轴头z向位移",nameEn :'RRspindleDz', unit: "mm",value: [],
    color:["", ""]
  },{ 
    name: "右后轴头z向力",nameEn :'RRspindleFz', unit: "kN",value: [],
    color:["", ""]
  },{ 
    name: "右后轴头x向角度",nameEn :'RRspindlex', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "右后轴头x向力矩",nameEn :'RRspindleMx', unit: "kN·m",value: [],
    color:["", ""]
  },{ 
    name: "右后轴头y向角度",nameEn :'RRspindley', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "右后轴头y向力矩",nameEn :'RRspindleMy', unit: "kN-m",value: [],
    color:["", ""]
  },{ 
    name: "右后轴头z向角度",nameEn :'RRspindlez', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "右后轴头z向力矩",nameEn :'RRspindleMz', unit: "kN-m",value: [],
    color:["", ""]
  }]
  };
  attrs_2:any = {
    'equipment.road.LeftFront.Params':[{ 
      name: "左前轴头x向位移",nameEn :'LFspindleDx', unit: "mm",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "左前轴头x向力",nameEn :'LFspindleFx', unit: "kN",value: [],show:true,
        color:["", ""]
    },{ 
        name: "左前轴头y向位移",nameEn :'LFspindleDy', unit: "mm",value: [],show:true,
        color:["", ""]
    },{ 
      name: "左前轴头y向力",nameEn :'LFspindleFy', unit: "kN",value: [],
      color:["", ""]
  },{ 
    name: "左前轴头z向位移",nameEn :'LFspindleDz', unit: "mm",value: [],
    color:["", ""]
  },{ 
    name: "左前轴头z向力",nameEn :'LFspindleFz', unit: "kN",value: [],
    color:["", ""]
  },{ 
    name: "左前轴头x向角度",nameEn :'LFspindlex', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "左前轴头x向力矩",nameEn :'LFspindleMx', unit: "kN·m",value: [],
    color:["", ""]
  },{ 
    name: "左前轴头y向角度",nameEn :'LFspindley', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "左前轴头y向力矩",nameEn :'LFspindleMy', unit: "kN-m",value: [],
    color:["", ""]
  },{ 
    name: "左前轴头z向角度",nameEn :'LFspindlez', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "左前轴头z向力矩",nameEn :'LFspindleMz', unit: "kN-m",value: [],
    color:["", ""]
  }],
    'equipment.road.RightFront.Params':[{ 
      name: "右前轴头x向位移",nameEn :'RFspindleDx', unit: "mm",value: [],show:true
      ,color:["", ""]
    },{ 
        name: "右前轴头x向力",nameEn :'RFspindleFx', unit: "kN",value: [],show:true,
        color:["", ""]
    },{ 
        name: "右前轴头y向位移",nameEn :'RFspindleDy', unit: "mm",value: [],show:true,
        color:["", ""]
    },{ 
      name: "右前轴头y向力",nameEn :'RFspindleFy', unit: "kN",value: [],
      color:["", ""]
  },{ 
    name: "右前轴头z向位移",nameEn :'RFspindleDz', unit: "mm",value: [],
    color:["", ""]
  },{ 
    name: "右前轴头z向力",nameEn :'RFspindleFz', unit: "kN",value: [],
    color:["", ""]
  },{ 
    name: "右前轴头x向角度",nameEn :'RFspindlex', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "右前轴头x向力矩",nameEn :'RFspindleMx', unit: "kN·m",value: [],
    color:["", ""]
  },{ 
    name: "右前轴头y向角度",nameEn :'RFspindley', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "右前轴头y向力矩",nameEn :'RFspindleMy', unit: "kN-m",value: [],
    color:["", ""]
  },{ 
    name: "右前轴头z向角度",nameEn :'RFspindlez', unit: "°",value: [],
    color:["", ""]
  },{ 
    name: "右前轴头z向力矩",nameEn :'RFspindleMz', unit: "kN-m",value: [],
    color:["", ""]
  }]
  };
  attrs_3:any = {"equipment.AdditionalChannels":[{ 
    name: "左后轮心x向力",nameEn :'LRWftFx', unit: "",value: [],show:true
    ,color:["", ""]
  },{ 
    name: "左后轮心y向力",nameEn :'LRWftFy', unit: "",value: [],show:true
    ,color:["", ""]
  },{ 
    name: "左后轮心z向力",nameEn :'LRWftFz', unit: "",value: [],show:true
    ,color:["", ""]
  },{ 
    name: "左后轮心x向力矩",nameEn :'LRWftMx', unit: "",value: []
    ,color:["", ""]
  },{ 
    name: "左后轮心y向力矩",nameEn :'LRWftMy', unit: "",value: []
    ,color:["", ""]
  },{ 
    name: "左后轮心z向力矩",nameEn :'LRWftMz', unit: "",value: []
    ,color:["", ""]
  },{ 
    name: "右后轮心x向力",nameEn :'RRWftFx', unit: "",value: []
    ,color:["", ""]
  },{ 
    name: "右后轮心y向力",nameEn :'RRWftFy', unit: "",value: []
    ,color:["", ""]
  },{ 
    name: "右后轮心z向力",nameEn :'RRWftFz', unit: "",value: []
    ,color:["", ""]
  },{ 
    name: "右后轮心x向力矩",nameEn :'RRWftMx', unit: "",value: []
    ,color:["", ""]
  },{ 
    name: "右后轮心y向力矩",nameEn :'RRWftMy', unit: "",value: []
    ,color:["", ""]
  },{ 
    name: "右后轮心z向力矩",nameEn :'RRWftMz', unit: "",value: []
    ,color:["", ""]
  }]};

  switchStatus:any ={
    title:[`stationName`,'OnOff','InternalLock','Programlock'],
    width:['25.5%','16.5%','16.5%','16.5%'],
    data:[
    //   ['111',
    //   {value:0,color:'#C0C0C0',id:'circle'},{value:0,color:'white',id:'strip'},{value:0,color:'white',id:'strip'},],
    //   ['11',
    //   {value:0,color:'#C0C0C0',id:'circle'},{value:0,color:'yellow',id:'strip'},{value:0,color:'white',id:'strip'},], ['',
    //   {value:0,color:'#C0C0C0',id:'circle'},{value:0,color:'yellow',id:'strip'},{value:0,color:'white',id:'strip'},], ['',
    //   {value:0,color:'#C0C0C0',id:'circle'},{value:0,color:'yellow',id:'strip'},{value:0,color:'white',id:'strip'},], ['',
    //   {value:0,color:'#C0C0C0',id:'circle'},{value:0,color:'yellow',id:'strip'},{value:0,color:'white',id:'strip'},], ['',
    //   {value:0,color:'#C0C0C0',id:'circle'},{value:0,color:'yellow',id:'strip'},{value:0,color:'white',id:'strip'},], ['',
    //   {value:0,color:'#C0C0C0',id:'circle'},{value:0,color:'yellow',id:'strip'},{value:0,color:'white',id:'strip'},], ['',
    //   {value:0,color:'#C0C0C0',id:'circle'},{value:0,color:'yellow',id:'strip'},{value:0,color:'white',id:'strip'},],

    ]
  }



  img = {
    url:'assets/eimdoard/equipment/images/zcdz.png',
    name:''
  }

  real_list = [
    {name:'LF',value:'关',color:'red'},
    {name:'LR',value:'关',color:'red'},
    {name:'RR',value:'关',color:'red'},
    {name:'RF',value:'关',color:'red'},
  ]

  str =`试验原理：底盘结构件台架试验如：副车架、摆臂、稳定杆、后桥等<br>
  设备构成：-------，-------，-------，--------<br>
  试验能力：------------------------------------------------<br>
   标准试验：-------------------------------------------------<br>
                    -----------------------------------------------<br>
                    --------------------------------------------<br>
   非标试验：---------------------------------------<br>`;

  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  list_2 = ['equipment.road.LeftFront.Params','equipment.road.RightFront.Params'];
  list_1 = ['equipment.road.LeftRear.Params','equipment.road.RightRear.Params'];
  list_3 = ['equipment.AdditionalChannels'];

  click_list = [];//当前选中的tag
  deviceid = 'device_mts_02';


  timer:any;//定时器
  language = '';//语言 空为zh-CN中文

  subscribeList:any = {};

  equipIntroduceList = [
    {htmlstr:coupling[0],title:''},
    {htmlstr:coupling[1],title:''}
  ]


  constructor(private activateInfo:ActivatedRoute,
    private http:HttpserviceService,private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language !='zh-CN')this.language = language;
    //左上按钮点击后宽度变化
    // this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
    //   this.initChart();
    // })
    //路由订阅
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })

    //颜色的赋值
    this.color();

    //记录初始化的时候默认选中的第一个tag
    this.click_list = [this.list_1[0],this.list_2[0],this.list_3[0]];


    // this.list.forEach((f,i)=>{
    //   this[`attrs_1`][f] = JSON.parse(JSON.stringify(this.attrs));
    //   this[`attrs_2`][f] = JSON.parse(JSON.stringify(this.attrs));
    //   this[`attrs_3`][f] = JSON.parse(JSON.stringify(this.attrs));
    // })
    let table,method;
    this.timer = self.setInterval(f =>{
      this.get_device_status();
      this.get_device_mst_oilseparator();
      let param = this.create_param();
      if(param[0].length > 0){
        table = 'get_device_mts_time',method = 'device_monitor.get_device_mts_timerangedata';
        this.get_device_mts_time(table,method,param);
      }
      if(param[1].length > 0){
        table = 'get_device_mts_realtimedata',method = 'device_monitor.get_device_mts_realtimedata';
        this.get_device_mts_realtimedata(table,method,param);
      }
    },1000)


    setTimeout(() => {
      create_img_16_9();
    }, 1000);


  }

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})
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
   * 图表 获取一段时间
   * param table 
   * param method 
   * param param 
   */
  get_device_mts_time(table,method,param){
    // let datestr = dateformat(new Date(new Date().getTime()-10000),'yyyy-MM-dd hh:mm:ss');
    // let datestr_ = dateformat(new Date(),'yyyy-MM-dd hh:mm:ss');
    // dateformat(new Date(now.getTime()-10000)
    let now = new Date();
    this.subscribeList.time = this.http.callRPC(table,method,{"start":dateformat(new Date(now.getTime()-10000),'yyyy-MM-dd  hh:mm:ss'),"end": dateformat(now,'yyyy-MM-dd hh:mm:ss'),"device":this.deviceid,
    arr:param[0].join(',')}).subscribe((f:any) =>{
      if(f.result.error || f.result.message[0].code == 0)return;
      painting_time(f,10,this,['chart_1','chart_2','chart_3']);
      
    })
  }

  /**
   *  图表  获取一秒
   * param table 
   * param method 
   * param param 
   */
  get_device_mts_realtimedata(table,method,param){
    this.subscribeList.real = this.http.callRPC(table,method,{"device":this.deviceid,
    arr:param[1].join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      painting_time(g,1,this,['chart_1','chart_2','chart_3']);
    })
  }


  /**
   *   中间的表的数据 开关这些数据     
   */
  get_device_status(){
    let res;
    this.subscribeList.stauts = this.http.callRPC('get_device_mts_status','device_monitor.get_device_mts_status',{device:this.deviceid}).subscribe((f:any) =>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0];
      // console.log(f)
//       this.switchStatus.data.forEach((el,i) => {
//         //实验名
//         el[0] = res[i].stationname;
//         //开关
//         el[1].value = res[i].stationstatus;
//         el[1].color = res[i].stationstatus == 1?'green':'#C0C0C0';
//         //内锁
//         el[2].value = res[i].interlock;
//         el[2].color = res[i].interlock == 1?'green':'#C0C0C0';
//         //程序内锁
//         el[3].value = res[i].programinterlock;
//         el[3].color = res[i].programinterlock == 1?'white':'orange';
// //         interlock: 0
// // programinterlock: 0
// // recordtime: "2020-12-11T09:00:23.000Z"
// // stationname: "Direct_rear_1120.cfg"
// // stationrunningcount: 2
// // stationstatus: 1
//       });
      this.switchStatus.data = res.map(m =>(
        [
          m.stationname,{value:m.stationstatus,color:m.stationstatus == 1?'green':'#C0C0C0',id:'circle'},
          {value:m.interlock,color:m.interlock== 1?'white':'orange',id:'strip'},
          {value:m.programinterlock,color:m.programinterlock== 1?'white':'orange',id:'strip'}
        ] 
      ))
      // console.log(this.switchStatus.data)

    })
  }


  /**
   * 分油器
   * HSM 1 LF On
HSM 1 LF High
HSM 2 RF On
HSM 2 RF High
HSM 3 LR On
HSM 3 LR High
HSM 4 RR On
HSM 4 RR High

   */
  get_device_mst_oilseparator(){
    let res,data:any={};
    this.subscribeList.oil = this.http.callRPC('get_device_mts_realtimedata','device_monitor.get_device_mts_realtimedata',
    {'device':this.deviceid,arr:"hsm1lfon,hsm1lfhigh,hsm2rfon,hsm2rfhigh,hsm3lron,hsm3lrhigh,hsm4rron,hsm4rrhigh"}
    ).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0];
      res.message.forEach(el => {
        for(let key in el) data[key] = el[key][0][0];
      });
      // console.log(f)
      this.real_list[0].value = data.hsm1lfon == 0?'关':(data.hsm1lfhigh == 1?'高':'低');
      this.real_list[0].color = data.hsm1lfon == 0?'red':(data.hsm1lfhigh == 0?'white':'yellow');

      this.real_list[1].value = data.hsm2rfon == 0?'关':(data.hsm2rfhigh == 1?'高':'低');
      this.real_list[1].color = data.hsm2rfon == 0?'red':(data.hsm2rfhigh == 0?'white':'yellow');

      this.real_list[2].value = data.hsm3lron == 0?'关':(data.hsm3lrhigh == 1?'高':'低');
      this.real_list[2].color = data.hsm3lron == 0?'red':(data.hsm3lrhigh == 0?'white':'yellow');

      this.real_list[3].value = data.hsm4rron == 0?'关':(data.hsm4rrhigh == 1?'高':'低');
      this.real_list[3].color = data.hsm4rron == 0?'red':(data.hsm4rrhigh == 0?'white':'yellow');
    })
  }


  


  get_td_width(num){
    return 66/num+'%'
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
  color() {
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

  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}
