import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, rgb_del_red,shock_htmlStr, create_img_16_9, dateformat, painting_time } from '../equipment-board';


@Component({
  selector: 'ngx-equipment-shock',
  templateUrl: './equipment-shock.component.html',
  styleUrls: ['./equipment-shock.component.scss']
})
export class EquipmentShockComponent implements OnInit {

  xData = [];
  attrs_1 = 
    {'equipment.shock.4_5_6Cylinder':[{ 
      name: "4号缸位移",nameEn :'DofAct4Dis', unit: "mm",value: [],show:true
      ,color:["", ""]
      },{ 
          name: "5号缸位移",nameEn :'DofAct5Dis', unit: "mm",value: [],show:true,
          color:["", ""]
      },{ 
        name: "6号缸位移",nameEn :'DofAct6Dis', unit: "mm",value: [],show:true,
        color:["", ""]
      }],
      'equipment.shock.FlipPitchYaw':[{ 
        name: "翻转角度",nameEn :'RollAng', unit: "°",value: [],show:true
        ,color:["", ""]
        },{ 
            name: "翻转加速度",nameEn :'RollAcc', unit: "°/s²",value: [],show:true,
            color:["", ""]
        },{ 
          name: "翻转循环次数",nameEn :'RollCount', unit: "segments",value: [],show:true,
          color:["", ""]
        },{ 
          name: "俯仰角度",nameEn :'PitchAng', unit: "°",value: [],
          color:["", ""]
          },{ 
              name: "俯仰加速度",nameEn :'PitchAcc', unit: "°/s²",value: [],
              color:["", ""]
          },{ 
            name: "俯仰循环次数",nameEn :'PitchCount', unit: "segments",value: [],
            color:["", ""]
          },{ 
            name: "偏航角度",nameEn :'YawAng', unit: "°",value: [],
            color:["", ""]
            },{ 
                name: "偏航加速度",nameEn :'YawAcc', unit: "°/s²",value: [],
                color:["", ""]
            },{ 
              name: "偏航循环次数",nameEn :'YawCount', unit: "segments",value: [],
              color:["", ""]
            }],
      'equipment.shock.LeftFrontRightFront':[{ 
        name: "右前扭矩加载机构输出",nameEn :'RF_TIF1output', unit: "V",value: [],show:true
        ,color:["", ""]
        },{ 
            name: "右前TIF位移",nameEn :'RF_TIF1displacement', unit: "mm",value: [],show:true,
            color:["", ""]
        },{ 
          name: "右前TIF力",nameEn :'RF_TIF1force', unit: "kN",value: [],show:true,
          color:["", ""]
        },{ 
        name: "右前TIF力矩",nameEn :'RF_TIF1torque', unit: "kN-m",value: [],
        color:["", ""]
        },{ 
            name: "右前TIF角度",nameEn :'RF_TIF1angle', unit: "°",value: [],
            color:["", ""]
        },{ 
          name: "右前TIF循环次数",nameEn :'RF_TIF1count', unit: "segments",value: [],
          color:["", ""]
        },{ 
        name: "左前TIF输出",nameEn :'LF_TIF2output', unit: "V",value: []
        ,color:["", ""]
        },{ 
            name: "左前TIF位移",nameEn :'LF_TIF2displacement', unit: "mm",value: [],
            color:["", ""]
        },{ 
          name: "左前TIF力",nameEn :'LF_TIF2force', unit: "kN",value: [],
          color:["", ""]
        },{ 
        name: "左前TIF力矩",nameEn :'LF_TIF2torque', unit: "kN·m",value: []
        ,color:["", ""]
        },{ 
            name: "左前TIF角度",nameEn :'LF_TIF2angle', unit: "°",value: [],
            color:["", ""]
        },{ 
          name: "左前TIF循环次数",nameEn :'LF_TIF2count', unit: "segments",value: [],
          color:["", ""]
        }]};
  attrs_2 = 
    {'equipment.shock.1_2_3Cylinder':[{ 
      name: "1号缸位移",nameEn :'DofAct1Dis', unit: "mm",value: [],show:true
      ,color:["", ""]
      },{ 
          name: "2号缸位移",nameEn :'DofAct2Dis', unit: "mm",value: [],show:true,
          color:["", ""]
      },{ 
        name: "3号缸位移",nameEn :'DofAct3Dis', unit: "mm",value: [],show:true,
        color:["", ""]
      }],
      'equipment.shock.Horn1_2_3':[{ 
        name: "1号角x向加速度",nameEn :'DofXAccc1', unit: "g",value: [],show:true
        ,color:["", ""]
        },{ 
            name: "1号角y向加速度",nameEn :'DofYAccc1', unit: "g",value: [],show:true,
            color:["", ""]
        },{ 
          name: "1号角z向加速度",nameEn :'DofZAccc1', unit: "g",value: [],show:true,
          color:["", ""]
        },{ 
          name: "2号角x向加速度",nameEn :'DofXAccc2', unit: "g",value: []
          ,color:["", ""]
          },{ 
              name: "2号角y向加速度",nameEn :'DofYAccc2', unit: "g",value: [],
              color:["", ""]
          },{ 
            name: "2号角z向加速度",nameEn :'DofZAccc2', unit: "g",value: [],
            color:["", ""]
          },{ 
            name: "3号角x向加速度",nameEn :'DofXAccc3', unit: "g",value: []
            ,color:["", ""]
            },{ 
                name: "3号角y向加速度",nameEn :'DofYAccc3', unit: "g",value: [],
                color:["", ""]
            },{ 
              name: "3号角z向加速度",nameEn :'DofZAccc3', unit: "g",value: [],
              color:["", ""]
            }],
  'equipment.shock.VerticalAndHorizontal':[{ 
    name: "纵向位移",nameEn :'LongDis', unit: "mm",value: [],show:true
    ,color:["", ""]
    },{ 
        name: "纵向加速度",nameEn :'LongAcc', unit: "g",value: [],show:true,
        color:["", ""]
    },{ 
      name: "纵向循环次数",nameEn :'LongCount', unit: "segments",value: [],show:true,
      color:["", ""]
    },{ 
      name: "横向位移",nameEn :'LatDis', unit: "mm",value: []
      ,color:["", ""]
      },{ 
          name: "横向加速度",nameEn :'LatAcc', unit: "g",value: [],
          color:["", ""]
      },{ 
        name: "横向循环次数",nameEn :'LatCount', unit: "segments",value: [],
        color:["", ""]
      },{ 
        name: "垂向位移",nameEn :'VertDis', unit: "mm",value: []
        ,color:["", ""]
        },{ 
            name: "垂向加速度",nameEn :'VertAcc', unit: "g",value: [],
            color:["", ""]
        },{ 
          name: "垂向循环次数",nameEn :'VertCount', unit: "segments",value: [],
          color:["", ""]
        }]};
  attrs_3 = 
    {'equipment.shock.4_5_6Cylinder':[{ 
      name: "4号缸位移",nameEn :'DofAct4Dis', unit: "",value: [],show:true
      ,color:["", ""]}
      ,{ 
          name: "5号缸位移",nameEn :'DofAct5Dis', unit: "",value: [],show:true,
          color:["", ""]
      },{ 
        name: "6号缸位移",nameEn :'DofAct6Dis', unit: "",value: [],show:true,
        color:["", ""]
      }]};

  //ngx-chart-curve-v3对象
  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

 

  // 实验实时状态表的实时数据
  switchStatus:any ={
    title:[`stationName`,'OnOff','InternalLock','Programlock'],
    width:['25.5%','16.5%','16.5%','16.5%'],
    data:[['',
      {value:0,id:'circle',color:''},
      {value:0,id:'strip',color:''},
      {value:0,id:'strip',color:''},]]
  }


  //图片
  img = {
    url:'assets/eimdoard/equipment/images/lzyd.png',//中间的图片
    name:''
  }

  // 实验实时状态表的实时数据
  real_list = [
    {name:'MAST',value:'关',color:'red'},
    {name:'TIF 1',value:'关',color:'red'},
    {name:'TIF 2',value:'关',color:'red'},
  ]

  //每一个ngx-chart-curve-v3 中有哪些tag
  list_1 = ['equipment.shock.4_5_6Cylinder','equipment.shock.FlipPitchYaw','equipment.shock.LeftFrontRightFront'];
  list_2 = ['equipment.shock.1_2_3Cylinder','equipment.shock.Horn1_2_3','equipment.shock.VerticalAndHorizontal']
  list_3 = ['equipment.shock.4_5_6Cylinder']
  click_list = [];//当前选中的tag

  timer:any;//定时器
  language = '';//语言 空为zh-CN中文

   //设备介绍                                                    
  equipIntroduceList = [
    {htmlstr:shock_htmlStr[0],title:'',type:'span_class'},
    {htmlstr:shock_htmlStr[1],title:'设备构成及参数',type:'table_class'},
    {htmlstr:shock_htmlStr[2],title:'设备构成及参数',type:'table_class'}
  ];
  //当前的页数
  eqIntShow = 0;

  deviceid = 'device_mts_03';//设备编号


  subscribeList:any = {};

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute,
    private http:HttpserviceService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    //订阅左上角打开关闭
    // this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
    //   this.initChart();
    // })
    //订阅路由返回的标题
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })


    // ngx-chart-curve-v3进来默认的选中中记录
    this.click_list = [this.list_1[0],this.list_2[0],this.list_3[0]]

    this.color();

    //获取数据
    let g = 1,table,method;
    this.timer = setInterval(f =>{
      this.get_equip_real();

      let param = this.create_param();
      if(param[0].length > 0){
        table = 'get_device_mts_time',method = 'device_monitor.get_device_mts_timerangedata';
        this.get_device_mts_time(table,method,param);
      }
      if(param[1].length > 0){
        table = 'get_device_mts_realtimedata',method = 'device_monitor.get_device_mts_realtimedata';
        this.get_device_mts_realtimedata(table,method,param);
      }
      // this.xData.push(g);
      // if(this.xData.length >10)this.xData.splice(0,1)
      // g++;
      // list_jion(this.list_1,'attrs_1',this);
      // list_jion(this.list_2,'attrs_2',this);
      // list_jion(this.list_3,'attrs_3',this);
      // let array = ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
      //   this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:this.xData,index:1});
      // })
    },1000)

    setTimeout(f=>{
      create_img_16_9();
    },1000)
  }


 

  

  /**
   * 实验实时表
   * interlock: 1 互锁
    masthigh: 1 MAST分油器高/低
    maston: 1 MAST分油器开/关
    programinterlock: 1 程序联锁
    recordtime: "2020-12-11 09:25:00"
    stationname: "6freedom.cfg" 试验名称
    stationstatus: 0 开关
    tif1high: 1 TIF1分油器高/低
    tif1on: 1 TIF1分油器开/关
    tif2high: 1 TIF2分油器高/低
    tif2on: 1 TIF2分油器开/关
   */
  get_equip_real(){
    // SELECT get_mts_lock('{"deviceid":"device_mts_03"}')
    let res;
    this.subscribeList.equip = this.http.callRPC('get_mts_lock','device_monitor.get_mts_lock',{"deviceid":this.deviceid}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message[0];
      //实验名
      this.switchStatus.data[0][0] = res.stationname;
      //开关
      this.switchStatus.data[0][1].value = res.stationstatus ;
      this.switchStatus.data[0][1].color = res.stationstatus ==1?'green':'#C0C0C0' ;
      // 互锁
      this.switchStatus.data[0][2].value = res.interlock;
      this.switchStatus.data[0][2].color = res.interlock == 1?'#7fee1d':'white';
      // 程序内锁
      this.switchStatus.data[0][3].value = res.programinterlock;
      this.switchStatus.data[0][3].color = res.programinterlock== 1?'#7fee1d':'white';

      // MAST分油器
      this.real_list[0].value = res.maston == 1?(res.masthigh==1?'高':'低'):'关';
      this.real_list[0].color = res.maston == 0?'red':(res.masthigh == 0?'white':'yellow');

      //TIF 1
      this.real_list[1].value = res.tif1on == 1?(res.tif1high==1?'高':'低'):'关';
      this.real_list[1].color = res.tif1on == 0?'red':(res.tif1high == 0?'white':'yellow');

      // TIF 2
      this.real_list[2].value = res.tif2on == 1?(res.tif2high==1?'高':'低'):'关';
      this.real_list[2].color = res.tif2on == 0?'red':(res.tif2high == 0?'white':'yellow');
    
    })
  }


   /**
   * 图表 获取一段时间
   * @param table 
   * @param method 
   * @param param 
   */
  get_device_mts_time(table,method,param){
    // let datestr = dateformat(new Date(),'yyyy-MM-dd hh:mm');
    // let datestr_ = dateformat(new Date(),'yyyy-MM-dd hh:mm');
    // dateformat(new Date(now.getTime()-10000)
    let now = new Date();
    this.subscribeList.time = this.http.callRPC(table,method,
      {"start":dateformat(new Date(now.getTime()-10000),'yyyy-MM-dd hh:mm:ss'),
      "end": dateformat(now,'yyyy-MM-dd hh:mm:ss'),"device":this.deviceid,
    arr:param[0].join(',')}).subscribe((f:any) =>{
      if(f.result.error || f.result.message[0].code == 0)return;
      painting_time(f,10,this,['chart_1','chart_2','chart_3']);
    })
  }

  /**
   *  图表  获取一秒
   * @param table 
   * @param method 
   * @param param 
   */
  get_device_mts_realtimedata(table,method,param){
    this.subscribeList.real = this.http.callRPC(table,method,{"device":this.deviceid,
    arr:param[1].join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      painting_time(g,1,this,['chart_1','chart_2','chart_3']);
    })
  }


  //计算宽度
  get_td_width(num){
    return 66/num+'%'
  }


  // 颜色的赋值
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


  //选中改变重新画表格
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

  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}
