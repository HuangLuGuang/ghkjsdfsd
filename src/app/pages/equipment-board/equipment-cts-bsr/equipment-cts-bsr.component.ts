import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-cts-bsr',
  templateUrl: './equipment-cts-bsr.component.html',
  styleUrls: ['./equipment-cts-bsr.component.scss']
})
export class EquipmentCtsBsrComponent implements OnInit {

  device_cts = 'device_cts_01';
  device_bsr = 'device_auto_bsr01';

  cts_chart = [
    {
      name: "温度",nameEn :'Temp', unit: "℃",value: [],
      color:[colors[0], colors[0]]
    },
    {
      name: "湿度",nameEn :'Hum', unit: "RH",value: [],
      color:[colors[1], colors[1]]
    },
    {
      name: "温度设定值",nameEn :'TempSet', unit: "℃",value: [],
      color:[colors[2], colors[2]]
    },
    {
      name: "湿度设定值",nameEn :'HumSet', unit: "RH",value: [],
      color:[colors[3], colors[3]]
    },
  ]
  cts_cang ={
    temp_set:0,
    hum_set:0
  }

  bsr_temp = {
    data:[
      {
        name: "左前温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[0], colors[0]]
      },
      {
        name: "左后温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[1], colors[1]]
      },
      {
        name: "右前温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[2], colors[2]]
      },
      {
        name: "右后温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[3], colors[4]]
      },
      
      
    ],
    xdata:[]
  };
  bsr_displacement = {
    data:[
      {
        name: "右前位移",nameEn :'Displacement', unit: "mm",value: [],
        color:[colors[0], colors[0]]
      },
      {
        name: "右后位移",nameEn :'Displacement', unit: "mm",value: [],
        color:[colors[1], colors[1]]
      },
      {
        name: "左前位移",nameEn :'Displacement', unit: "mm",value: [],
        color:[colors[0], colors[0]]
      },
      {
        name: "左后位移",nameEn :'Displacement', unit: "mm",value: [],
        color:[colors[1], colors[1]]
      },
    ],
    xdata_left:[],
    xdata_right:[],
  };

  //实验实时数据
  switchStatus:any ={
    title:[`stationName`,'OnOff'
    ,'InternalLock','Programlock'],
    data:[
      ['',
      {value:1,color:'#C0C0C0',id:'circle'},
      {value:1,color:'',id:'strip'},{value:1,color:'',id:'strip'}]
    ]
  }

//设备介绍
  introd_name = 'ccts-bsr';
  equipIntroduceList = [
    {title:''},
    {title:''},
  ]

  img = {
    url:'assets/eimdoard/equipment/images/ccts-bsr.jpg',
    name:''
  }


  timer;
  language;
  subscribeList:any = {};
  constructor(private activateInfo:ActivatedRoute,
    private boardservice:EquipmentBoardService,
    private http:HttpserviceService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    
    //订阅路由返回的标题
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    });

    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.resize();
    });
  }


  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false});
    this.getData();
    setTimeout(() => {
      create_img_16_9();
    }, 500);
  }

  resize=()=>{
    setTimeout(() => {
      ['cang_chart_1','cang_pie_6','cang_pie_5',
      'bsr_chart_g_1','bsr_chart_g_2','bsr_chart_g_3','bsr_chart_g_4',
      'bsr_chart_g_5','bsr_chart_g_6','bsr_chart_g_7','bsr_chart_g_8',
      'bsr_chart_1','bsr_chart_2','bsr_chart_3'].forEach(f=>{
        let dom = document.getElementById(f);
        if(dom){
          echarts.init(dom).resize();
        }
      })
    }, 200);
  }


  getData(){
    let o = 0;
    this.timer = setInterval(()=>{
      if(o%60 == 0){
        this.get_cts();
        this.get_bsr_station_list_data();
      }
      this.get_bsr_station();
      this.get_bsr_station_real_data();
      o++;
    },1000)
  }


  get_cts(){
    let arr = this.cts_chart;
    this.subscribeList.get_line_coolingWater = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {
      deviceid:this.device_cts,
      arr:cts.join(',')
    }).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let xAxisData = [],index = 0,key = 'cts_plc_1_pv_db_temperature_deg_c',length = 0;
      let res = f.result.message[0].message;
      arr[0].value = res[0].cts_plc_1_pv_db_temperature_deg_c.map(m => (m[0]));//温度
      arr[1].value = res[1].cts_plc_1_pv_humidity_percent_rh.map(m => (m[0]));;//湿度度
      arr[2].value = res[2].cts_plc_1_pid_setpoints_in_use_x_pid_setpoints_in_use_01.map(m => (m[0]));;//湿度度
      arr[3].value = res[3].cts_plc_1_pid_setpoints_in_use_x_pid_setpoints_in_use_00.map(m => (m[0]));;//湿度度

      setTimeout(() => {
        this.cts_cang.temp_set = arr[2].value.length > 0 ?arr[2].value[arr.length -1]:0;
        this.cts_cang.hum_set = arr[3].value.length > 0 ?arr[3].value[arr.length -1]:0;

        if(document.getElementById('cang_pie_5'))
          equipment_four_road.create_motor_temperature( {value:arr[0].value.length > 0 ?arr[0].value[arr.length -1]:0,title:'温度',unit:'℃'},
          echarts.init(document.getElementById('cang_pie_5')));
        if(document.getElementById('cang_pie_6'))
          equipment_four_road.create_motor_temperature( {value:arr[1].value.length > 0 ?arr[1].value[arr.length -1]:0,title:'湿度',unit:'RH'},
          echarts.init(document.getElementById('cang_pie_6')));
      }, 10);

      res.forEach((el,i) => {
        for(let k in el){
          if(length < el[k].length){
            key = k,index = i;
          }
          length = el[k].length
        }
      });
      xAxisData = res[index][key].map(m => (dateformat(new Date(m[1]),'hh:mm:ss')))

      if(document.getElementById('cang_chart_1'))
        equipment_four_road.create_real_discharge({attrs:this.cts_chart,xData:xAxisData},
        echarts.init(document.getElementById('cang_chart_1')));
    });
  }

  get_bsr_station(){
    let res,data = [];
    this.subscribeList.real = this.http.callRPC('get_device_mts_status',library+'get_device_mts_status'
    ,{"device":this.device_bsr,arr:bsr.join(',')}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0];
      
      res.forEach(el => {
        data.push([el.stationname,
        {value:el.stationstatus,color:el.stationstatus == 1?'green':'#3b3838',id:'circle'},
        {value:el.interlock,color:el.interlock== 1?'green':'#3b3838',id:'strip'},
        {value:el.programinterlock,color:el.programinterlock== 1?'green':'#3b3838',id:'strip'}]);
      });
      this.switchStatus.data = data;
      this.subscribeList.real.unsubscribe();
    })
  }

  get_bsr_station_real_data(){
    let res,data:any= {};
    
    this.subscribeList._4400 = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.device_bsr,arr:bsr_chart.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res){
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
       
      }
      let o = 0;
      this.bsr_temp.data.forEach(el => {
        this.create_gagao(`bsr_chart_g_${o+1}`,{
          value:(data[bsr_chart[o]]||0),name:el.name,max:100,color:[
            [0, '#203add'],
            [1, '#0d1758']],unit:el.unit
        });
        o++;
      });
      
      this.bsr_displacement.data.forEach((el,c) => {
        this.create_gagao(`bsr_chart_g_${o+1}`,{
          value:(data[bsr_chart[o]]||0),name:el.name,max:100,color:[
            [0, '#203add'],
            [1, '#0d1758']],unit:el.unit
        });
        o++;
      });

    });
  }
  get_bsr_station_list_data(){
    let dom,res;
    let left = 0;
    let right = 0;
    let arr = this.bsr_displacement;
    this.subscribeList.get_line_coolingWater = this.http.callRPC('device_realtime_list',library+'device_realtime_list',
    {
      deviceid:this.device_bsr,
      arr:bsr_chart.join(',')
    }).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      console.log(f.result.message[0].message);
      res = f.result.message[0].message;
    //   time = dateformat(rTime(Object.values(g.result.message[0].message[0])[0][0][1]),'hh:mm:ss');
    //   this.bsr_temp.xdata.push(time);
      

  //     'leftfronttemperaturea',//左前温度
  // 'leftreartemperaturea',//左后温度
  // 'rightfronttemperaturea',//右前温度
  // 'rightreartemperaturea',//右后温度

  // 'rightfrontdisplacement',//右前位移
  // 'rightreardisplacement',//右后位移
  // 'leftfrontdisplacement',//左前位移
  // 'leftreardisplacement',//左后位移
    setTimeout(() => {
      
      this.bsr_temp.data[0].value = res[0].leftfronttemperaturea.map(m => (m[0]||0));
      this.bsr_temp.data[1].value = res[1].leftreartemperaturea.map(m => (m[0]||0));
      this.bsr_temp.data[2].value = res[2].rightfronttemperaturea.map(m => (m[0]||0));
      this.bsr_temp.data[3].value = res[3].rightreartemperaturea.map(m => (m[0]||0));
      dom = document.getElementById('bsr_chart_1');
      let i= 0,c = 'leftfronttemperaturea';
      if(res[0].leftfronttemperaturea.length < res[1].leftreartemperaturea.length){
        i= 1,c = 'leftreartemperaturea';
      }else if(res[1].leftreartemperaturea.length < res[2].rightfronttemperaturea.length){
        i= 2,c = 'rightfronttemperaturea';
      }else {
        i= 3,c = 'rightreartemperaturea';
      }
      this.bsr_temp.xdata = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));

      if(dom){
        equipment_four_road.create_real_discharge({attrs:this.bsr_temp.data,xData:this.bsr_temp.xdata,title:'左前/左后/右前/右后温度'},echarts.init(dom));
      }
    }, 10);
    setTimeout(() => {

      arr.data[0].value = res[4].rightfrontdisplacement.map(m => (m[0]||0));
      arr.data[1].value = res[5].rightreardisplacement.map(m => (m[0]||0));
      let i= 4,c = 'rightfrontdisplacement';
      if(res[4].rightfrontdisplacement.length < res[5].rightreardisplacement.length){
        i= 5,c = 'rightreardisplacement';
      }
      arr.xdata_right = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      dom = document.getElementById('bsr_chart_2');
      if(dom){
        equipment_four_road.create_real_discharge({attrs:arr.data.filter((m,i) => i<2),xData:arr.xdata_right,title:'右前/右后位移'},echarts.init(dom));
      }
    }, 10);
    
      dom = document.getElementById('bsr_chart_3');
      arr.data[2].value = res[6].leftfrontdisplacement.map(m => (m[0]||0));
      arr.data[3].value = res[7].leftreardisplacement.map(m => (m[0]||0));
      left = arr.data[2].value.length > 0? arr.data[2].value[arr.data[2].value.length -1]:0;
      right = arr.data[3].value.length> 0?arr.data[2].value[arr.data[3].value.length -1] :0;
      let i= 6,c = 'leftfrontdisplacement';
      if(res[6].leftfrontdisplacement.length < res[7].leftreardisplacement.length){
        i= 7,c = 'leftreardisplacement';
      }
      arr.xdata_left = res[i][c].map(m => (dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      if(dom){
        equipment_four_road.create_real_discharge({
          attrs:arr.data.filter((m,i) => i>1),xData:arr.xdata_left,
          // title:`左前位移：${left}mm  左后位移:${right}mm`
          title:'左前/左后位移'
        },echarts.init(dom));
      }
    });
  }

  //生成仪表盘
  create_gagao(id,dataLine){
    if(document.getElementById(id))
      equipment_four_road.create_temp_h_1_p_gauge(
        dataLine
        ,echarts.init(document.getElementById(id)));
  }

  /**
   * 表 中数据过多 最开头删除
   */
  chart_long_clear(d){
    if(d.xdata.length > 10){
      d.xdata.shift();
      d.data.forEach(el => {
        el.value.shift();
      });
    }
  }

  

  //样式 逻辑方法
  
  get_td_width(num){
    return 100/num+'%'
  }

  ngOnDestroy(){
    clearInterval(this.timer);
    ['cang_chart_1','cang_pie_6','cang_pie_5',
      'bsr_chart_g_1','bsr_chart_g_2','bsr_chart_g_3','bsr_chart_g_4',
      'bsr_chart_g_5','bsr_chart_g_6','bsr_chart_g_7','bsr_chart_g_8',
      'bsr_chart_1','bsr_chart_2','bsr_chart_3'].forEach(f=>{
      let dom = document.getElementById(f);
      if(dom){
        echarts.init(dom).dispose();
      }
    })
  }
}


export const cts = [
  'cts_plc_1_pv_db_temperature_deg_c',//温度
  'cts_plc_1_pv_humidity_percent_rh',//湿度
  'cts_plc_1_pid_setpoints_in_use_x_pid_setpoints_in_use_01',//温度设定值
  'cts_plc_1_pid_setpoints_in_use_x_pid_setpoints_in_use_00',//湿度设定值
];

export const bsr=[
  'stationname',//实验名称
  'stationstatus',//实验启停
  'programinterlock',//程序内锁
  'interlock',//内锁
]
export const bsr_chart=[
  'leftfronttemperaturea',//左前温度
  'leftreartemperaturea',//左后温度
  'rightfronttemperaturea',//右前温度
  'rightreartemperaturea',//右后温度

  'rightfrontdisplacement',//右前位移
  'rightreardisplacement',//右后位移
  'leftfrontdisplacement',//左前位移
  'leftreardisplacement',//左后位移
]
