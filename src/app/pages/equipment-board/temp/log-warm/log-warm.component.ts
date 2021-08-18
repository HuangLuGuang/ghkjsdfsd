import { Component, Input, NgZone, OnInit } from '@angular/core';
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { dateformat, DEVICEID_TO_NAME, library } from '../../equipment-board';
import { EquipmentBoardService } from '../../serivice/equipment-board.service';
let equipment_four_road = require('../../../../../assets/eimdoard/equipment/js/equipment-four-road');

declare var $

@Component({
  selector: 'ngx-log-warm',
  templateUrl: './log-warm.component.html',
  styleUrls: ['./log-warm.component.scss']
})
export class LogWarmComponent implements OnInit {
  @Input()device

  @Input() chartid = 'warning';
  log_warm = {
    // '时间','日志等级','日志信息'
    title:['time','Loglevel','logInfor'],
    data:[
      // [1,1,'111111111111111111111111111111111111111111111111111111111111',1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,1,1],
      // [1,1,'111111111111111111111111111111111111111111111111111111111111',1],
    ]
  }
  timer;
  time_w;
  language = '';
  errorC = false;//是否报警
  subscribeList:any = {};
  RULE = DEVICEID_TO_NAME;
  str = '';//报警源字符
  
  
  constructor(private http:HttpserviceService,private boardservice:EquipmentBoardService,private ngzone:NgZone) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    let date;
    let o = 0;
    this.timer = self.setInterval(f=>{
      if(this.device && o%13 ==0)this.get_device_mts_log();
      date = new Date();
      if(date.getDay() == 1)this.get_device_mts_log_his();
      o++;
    },1000)

    this.get_device_mts_log_his();
    $('.scrollbar_l').bind("scroll",f=>{
      $('.scrollbar').scrollLeft($('.scrollbar_l').scrollLeft())
    })

    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.chartResize();
    })
  }



  ngAfterViewInit(){
  }


  chartResize=()=>{
    this.ngzone.runOutsideAngular(()=>{
      setTimeout(() => {
        if(document.getElementById(this.chartid))echarts.init(document.getElementById(this.chartid)).resize();
      }, 500);

    })

  }

  /**
   * 获取日志数据
   * @param table
   * @param method
   */
  get_device_mts_log(){
    // this.subscribeList.device_mts_log = this.http.callRPC('get_log','get_log',{"device":this.device}).subscribe((g:any) =>{
    //   console.log(g)
    // })
    // device_mts_01
    // this.subscribeList.device_mts_log = this.http.callRPC('get_device_mts_log',library+'get_device_mts_log',{"device":this.device}).subscribe((g:any) =>{
    //   console.log(g)
    //     if(g.result.error || g.result.message[0].code == 0)return;
    //     getMessage(g,this.log_warm.data);
    // })
    //SELECT get_log('{"deviceid":"device_mts_01"}')
    let status=false,res,arr=[],logs,str = '';
    this.subscribeList.device_mts_log = this.http.callRPC('get_log',library+'get_logs',{"deviceid":this.device}).subscribe((g:any) =>{
      // console.log(g)
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      res.forEach((c:any) => {
        logs = Object.values(c);
        if(logs.length>0 && logs[logs.length-1].level == 3 
          // && logs[logs.length-1].recordtime.includes(dateformat(new Date(),'yyyy-MM-dd'))
          ){
          status = true;
          if(this.device.includes(',')){
            if(str) str += ',';
            str += this.RULE[logs[0].deviceid];
          }
        };
        c.forEach(el => {
          arr.push(el);
        });
      });
      this.errorC = status;//当前是都有设备三级报警
      this.str = str;//多个deviceid时需要区分是哪个进行了三级报警
      this.log_warm.data = this.getMessage(arr);
      var showContent = $(".overflow_height_75");
      if(showContent[0])showContent[0].scrollTop = showContent[0].scrollHeight;
      // this.create_scrollbar();
      this.subscribeList.device_mts_log.unsubscribe();
    })
  }



  /**
   * 日志历史记录
   */
  get_device_mts_log_his(){
    //SELECT get_log_warning('{"deviceid":"device_mts_01","recordtime":"2020-11-3"}')
    let data:any = {};
    this.device.split(',').forEach(el => {
      data[el] = {};
      data[el].LV1Warn = [0,0,0,0,0,0,0];
      data[el].LV2Warn = [0,0,0,0,0,0,0];
    });
    this.subscribeList.his_log = this.http.callRPC('get_log_warning',library+'get_log_warnings',{"deviceid":this.device,"recordtime":this.getFirstDayOfWeek()}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      let arr = g.result.message[0].message;
      arr.forEach(el => {
        for(let i = 0;i<el.length;i++){
          let j = new Date(el[i].recordtime).getDay();
          if(el[i].level == 1)data[el[i].deviceid].LV1Warn[j == 0?6:j-1] += el[i].numbers;
          if(el[i].level == 2)data[el[i].deviceid].LV2Warn[j == 0?6:j-1] += el[i].numbers;
        }
      });
      this.ngzone.runOutsideAngular(()=>{
        this.initLogChart(data);
      })
      this.subscribeList.his_log.unsubscribe();

    });
  }


  //日志历史记录图表
  initLogChart(data_1){
    for(let key in data_1){
      data_1[key].name = this.RULE[key];
    }
    let xory = ''
    let data = {
      // title:['一级警告','二级警告'],
      num:0,//多deviceid 总共有几个deviceid
      yAxis:['周一','周二','周三','周四','周五','周六','周日'],
      xAxis:['周一','周二','周三','周四','周五','周六','周日'],
      service:data_1
    }
    if(this.device.includes(',')){
      xory = 'xAxis';
      data.num = this.device.includes(',').length;
      data.yAxis = null;
    }else{
      data.xAxis = null;
      data.num = 1;
    }
    
    if(this.language){
      // data.title = ['LV1Warn','LV2Warn'];
      data['xory'] = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    }
    if(document.getElementById(this.chartid)){
      let myChart_3 = echarts.init(document.getElementById(this.chartid));
      equipment_four_road.create_warning_chart(data,myChart_3);
    }
  }

  getFirstDayOfWeek () {
    var date = new Date();
    var day = date.getDay() || 7;
    return dateformat(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day),'yyyy-MM-dd');
  };

  /**
   * 获取报警状态
   */
  // get_device_mts_log_daily(){

  //   this.http.callRPC('get_device_log_daily_error_status',library+'get_device_log_daily_error_status',
  //   {"device":this.device,"today":dateformat(new Date(),'yyyy-MM-dd'),"thishour":"hour"+new Date().getHours(),"level":1}).subscribe((g:any) =>{
  //     // console.log(g)
  //     if(g.result.error || g.result.message[0].code == 0)return;
  //     let arr = g.result.message[0].message[0];
  //     if(arr && arr.errorcount == 1)this.errorC = true;

  //   })
  // }

  getWin_H(){
    var sf = <Screenfull>screenfull;
    return sf.isFullscreen?'150px':'120px';
  }


  getwarmStr(){
    return this.log_warm.data.length > 0 ?"equipment.LV"+this.log_warm.data[this.log_warm.data.length-1][3]+"Warm" :'';
  }


  getMessage(f){
    let arr:any = [];
    var aee = [];
    var i = 0;
    f.forEach(m => {
      aee = m.message.split("\"");
      i = aee.findIndex(f => f && f !=' ');
      arr.push([
          m.recordtime,
          m.level==3?'Error':m.level == 1?'Informatio':'Warning',
          m.message,
          // aee[aee.length-1].length > aee[aee.length-2].length?aee[aee.length-1]:aee[aee.length-2],
          m.level,
          this.device.includes(',')?this.RULE[m.deviceid]:'',
        ]);
    });
    return arr;
  }




  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer);
    clearInterval(this.time_w);

    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    // document.getElementById('warning').removeEventListener('resize',this.chartResize)
    let dom = document.getElementById(this.chartid);
    if(dom)echarts.init(dom).dispose();
  }


}
