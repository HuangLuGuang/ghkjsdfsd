import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { colors, create_img_16_9, dateformat, library, rTime } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';
var equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-jinhua4d2c',
  templateUrl: './equipment-jinhua4d2c.component.html',
  styleUrls: ['./equipment-jinhua4d2c.component.scss']
})
export class EquipmentJinhua4d2cComponent implements OnInit {

  device_4d2c = '';
  device_atec = '';

  atec = {
    tempid:'atec_pie_5',
    humid:'atec_pie_6',
    lineid:'atec_line_3',
    status:0,
    tempSet:0,
    rhSet:0,
    tempReal:0,
    rhReal:0,
    attrs:[
      { 
        name: "温度",nameEn :'Temp', unit: "℃",value: [],
        color:[colors[0], colors[0]]
      },
      { 
        name: "湿度",nameEn :'RH', unit: "RH",value: [],
        color:[colors[1], colors[1]]
      },
    ],
    xdata:[]
  };


  //四门粮改实验数据
  list = [
    {
      position:'前盖',
      open_status:0,//开故障
      close_status:0,//关故障
      plan:0,//计划
      now:0,//现在
      rate:0,//进度
    },{
      position:'前门',
      open_status:0,//开故障
      close_status:0,//关故障
      plan:0,//计划
      now:0,//现在
      rate:0,//进度
    },{
      position:'后盖',
      open_status:0,//开故障
      close_status:0,//关故障
      plan:0,//计划
      now:0,//现在
      rate:0,//进度
    },{
      position:'后门',
      open_status:0,//开故障
      close_status:0,//关故障
      plan:0,//计划
      now:0,//现在
      rate:0,//进度
    }
  ]

  img = {
    url:'assets/eimdoard/equipment/images/slz.png',
    car:'assets/eimdoard/equipment/images/car.png',
  }

  subscribeList:any = {};
  language;
  timer;
  constructor(private activateInfo:ActivatedRoute,
    private boardservice:EquipmentBoardService,
    private http:HttpserviceService) { }

  ngOnInit(): void {
     //获取当前语言
     let language = localStorage.getItem('currentLanguage');
     if(language!='zh-CN')this.language = language;
 
     this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
       // console.log(f);
       if(document.getElementById('head_title'))
         document.getElementById('head_title').innerText = f.title;
        let arr = decodeURIComponent(window.location.pathname).split('/');
        if(arr[arr.length-1] == 'one'){
          this.device_4d2c = 'device_4d2c_02';
          this.device_atec = 'device_jinhua_cabin01';
        }else{

        }

     })
     
 
     //赋值
     this.getData();
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

  getData(){
    let i =0;
    this.timer = setInterval(()=>{
      this.get_4d2c();
      this.get_atec();
      if(i%60 == 0){
        this.get_atec_list();
      }
      i++;
    },1000)
  }

  get_atec(){
    let res,data:any = {};
    this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',{
      device:this.device_atec,arr:atec.join(',')
    }).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res){
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      };

      this.atec.tempReal = data.mwsmart_main_emission_vw200 ||0;
      this.atec.rhReal = data.mwsmart_main_emission_vw206 ||0;
      this.atec.tempSet = data.mwsmart_main_emission_vw202 ||0;
      this.atec.rhSet = data.mwsmart_main_emission_vw208 ||0;
      this.atec.status = data.mwsmart_main_emission_v00 || 0;

      if(document.getElementById(this.atec.tempid))
        equipment_four_road.create_motor_temperature( {value:this.atec.tempReal,title:'温度',unit:'℃'},
        echarts.init(document.getElementById(this.atec.tempid)));
      if(document.getElementById(this.atec.humid))
        equipment_four_road.create_motor_temperature( {value:this.atec.rhReal,title:'湿度',unit:'%RH'},
          echarts.init(document.getElementById(this.atec.humid)));

    });
  }

  get_atec_list(){
    let res,xdata;
    this.http.callRPC('device_realtime_list',library+'device_realtime_list',{
      deviceid:this.device_atec,arr:'mwsmart_main_emission_vw200,mwsmart_main_emission_vw206'
    }).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      this.atec.attrs[0].value = res[0].mwsmart_main_emission_vw200.map(m =>(m[0]));
      this.atec.attrs[1].value = res[1].mwsmart_main_emission_vw206.map(m =>(m[0]));

      if(this.atec.attrs[0].value.length > this.atec.attrs[1].value.length){
        xdata = res[0].mwsmart_main_emission_vw200.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }else{
        xdata = res[1].mwsmart_main_emission_vw206.map(m =>(dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
      }
      this.atec.xdata = xdata;
      if(document.getElementById('atec_line_3')){
        let myChart_9 = echarts.init(document.getElementById('atec_line_3'));;
        equipment_four_road.create_real_discharge({attrs:this.atec.attrs,xData:this.atec.xdata},myChart_9);
      }
    });
  }


  get_4d2c(){
    let res,data:any = {};
    this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {device:this.device_4d2c,arr:_4d2c.join(',')}
    ).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res){
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
      };

      //前盖
      this.list[0].close_status = data.mwsmart_1_equipment_lg_close_warning ||0;
      this.list[0].open_status = data.mwsmart_1_equipment_lg_open_warning ||0;
      this.list[0].plan = data.mwsmart_1_equipment_lg_total_cycle ||0;
      this.list[0].now = data.mwsmart_1_equipment_lg_current_cycle ||0;
      this.list[0].rate = this.list[0].plan ?parseFloat((this.list[0].now/this.list[0].plan).toFixed(2)) :0;
      // this.list[0].rate = 20;

      // 前门
      this.list[1].close_status = data.mwsmart_1_equipment_fd_close_warning ||0;
      this.list[1].open_status = data.mwsmart_1_equipment_fd_open_warning ||0;
      this.list[1].plan = data.mwsmart_1_equipment_fd_total_cycle ||0;
      this.list[1].now = data.mwsmart_1_equipment_fd_current_cycle ||0;
      this.list[1].rate = this.list[1].plan ?parseFloat((this.list[1].now/this.list[1].plan).toFixed(2)) :0;

      // 后盖
      this.list[2].close_status = data.mwsmart_1_equipment_h_close_warning ||0;
      this.list[2].open_status = data.mwsmart_1_equipment_h_open_warning ||0;
      this.list[2].plan = data.mwsmart_1_equipment_h_total_cycle ||0;
      this.list[2].now = data.mwsmart_1_equipment_h_current_cycle ||0;
      this.list[2].rate = this.list[2].plan ?parseFloat((this.list[2].now/this.list[2].plan).toFixed(2)) :0;

      // 后门
      this.list[3].close_status = data.mwsmart_1_equipment_rd_close_warning ||0;
      this.list[3].open_status = data.mwsmart_1_equipment_rd_current_cycle ||0;
      this.list[3].plan = data.mwsmart_1_equipment_rd_total_cycle ||0;
      this.list[3].now = data.mwsmart_1_equipment_rd_current_cycle ||0;
      this.list[3].rate = this.list[3].plan ?parseFloat((this.list[3].now/this.list[3].plan).toFixed(2)) :0;
      
      this.list.forEach((f,i)=>{
        if(document.getElementById(`progress_${i+1}`))
        equipment_four_road.progress({plan:100,now:f.rate},echarts.init(document.getElementById(`progress_${i+1}`)));
      })


    })
  }

  resize= ()=>{
    setTimeout(() => {
      ['atec_line_3','atec_pie_5','atec_pie_6'].forEach(f=>{
        let dom = document.getElementById(f);
        if(dom){
          echarts.init(dom).resize();
        }
      })
    }, 10);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }

  }

}
export const atec = [
  'mwsmart_main_emission_vw200',//实时温度
  'mwsmart_main_emission_vw206',//实时湿度
  'mwsmart_main_emission_vw202',//温度设定
  'mwsmart_main_emission_vw208',//湿度设定
  'mwsmart_main_emission_v00',//开启状态
]

export const _4d2c =[
  'mwsmart_1_equipment_h_total_cycle',//后盖总次数
  'mwsmart_1_equipment_h_current_cycle',//后盖当前次数
  'mwsmart_1_equipment_h_open_warning',//后盖开故障
  'mwsmart_1_equipment_h_close_warning',//后盖开故障
  
  'mwsmart_1_equipment_rd_total_cycle',//后门总次数
  'mwsmart_1_equipment_rd_current_cycle',//后门当前次数
  'mwsmart_1_equipment_rd_close_warning',//后门关故障
  'mwsmart_1_equipment_rd_open_warning',//后门开故障

  'mwsmart_1_equipment_lg_total_cycle',//前盖总次数
  'mwsmart_1_equipment_lg_current_cycle',//前盖当前次数
  'mwsmart_1_equipment_lg_close_warning',//前盖关故障
  'mwsmart_1_equipment_lg_open_warning',//前盖开故障
  
  'mwsmart_1_equipment_fd_total_cycle',//前门总次数
  'mwsmart_1_equipment_fd_current_cycle',//前门当前次数
  'mwsmart_1_equipment_fd_open_warning',//前门开故障
  'mwsmart_1_equipment_fd_close_warning',//前门关故障
]
