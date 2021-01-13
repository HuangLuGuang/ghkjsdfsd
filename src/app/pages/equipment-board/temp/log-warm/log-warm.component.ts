import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';
import { LayoutService } from '../../../../@core/utils';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { dateformat, getMessage } from '../../equipment-board';
let equipment_four_road = require('../../../../../assets/eimdoard/equipment/js/equipment-four-road');

declare var $

@Component({
  selector: 'ngx-log-warm',
  templateUrl: './log-warm.component.html',
  styleUrls: ['./log-warm.component.scss']
})
export class LogWarmComponent implements OnInit {
  @Input()device
 
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
      // [1,1,1,1],
    ]
  }
  timer;
  time_w;
  language = '';
  errorC = true;
  subscribeList:any = {};
  
  
  constructor(private http:HttpserviceService,private layoutService:LayoutService) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
      if(document.getElementById('warning'))
        echarts.init(document.getElementById('warning')).resize();
    })
    let date;
    this.timer = setInterval(f=>{
      if(this.device)this.get_device_mts_log();
      date = new Date();
      if(date.getDay() == 1)this.get_device_mts_log_his();
    },1000)
    
    this.get_device_mts_log_his();
    this.get_device_mts_log_daily();
    
  }


  ngAfterViewInit(){
    window.addEventListener('resize',this.chartResize)
  }

  obser = new Observable(f=>{
    if(document.getElementById('warning'))echarts.init(document.getElementById('warning')).resize();
    f.next('log-warm刷新')
  }).pipe(take(1));
  
  chartResize=()=>{
    // if(document.getElementById('warning'))echarts.init(document.getElementById('warning')).resize();
    this.obser.subscribe(f=>{
      console.log(f)
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
    // this.subscribeList.device_mts_log = this.http.callRPC('get_device_mts_log','device_monitor.get_device_mts_log',{"device":this.device}).subscribe((g:any) =>{
    //   console.log(g)
    //     if(g.result.error || g.result.message[0].code == 0)return;
    //     getMessage(g,this.log_warm.data);
    // })
    //SELECT get_log('{"deviceid":"device_mts_01"}')
    this.subscribeList.device_mts_log = this.http.callRPC('get_log','device_monitor.get_log',{"deviceid":"device_mts_01"}).subscribe((g:any) =>{
      // console.log(g)
      if(g.result.error || g.result.message[0].code == 0)return;
      getMessage(g,this.log_warm.data);
    })
  }


  /**
   * 日志历史记录
   */
  get_device_mts_log_his(){
    //SELECT get_log_warning('{"deviceid":"device_mts_01","recordtime":"2020-11-3"}')
    this.subscribeList.his_log = this.http.callRPC('get_log_warning','device_monitor.get_log_warning',{"deviceid":this.device,"recordtime":this.getFirstDayOfWeek()}).subscribe((g:any) =>{
      // console.log(g)
      if(g.result.error || g.result.message[0].code == 0)return;
      let arr = g.result.message[0].message;
      var LV1Warn = [0,0,0,0,0,0,0];
      var LV2Warn = [0,0,0,0,0,0,0];
      for(let i = 0;i<arr.length;i++){
          let j = new Date(arr[i].recordtime).getDay();
          if(arr[i].level == 1)LV1Warn[j == 0?6:j-1] = arr[i].numbers;
          if(arr[i].level == 2)LV2Warn[j == 0?6:j-1] = arr[i].numbers;
      }
      this.initLogChart(LV1Warn,LV2Warn);
    })
    // this.subscribeList.device_mts_log_his = this.http.callRPC('get_device_log_daily_count','device_monitor.get_device_log_daily_count',{"device":this.device,"monday":this.getFirstDayOfWeek()}).subscribe((g:any) =>{
    //     console.log(g)
    //     if(g.result.error || g.result.message[0].code == 0)return;
    //     let arr = g.result.message[0].message;
    //     var LV1Warn = [];
    //     var LV2Warn = [];
    //     for(let i = 0;i<arr.length;i++){
    //       if(arr[i].level == 1)LV1Warn.push(arr[i].sumresult);
    //       if(arr[i].level == 2)LV2Warn.push(arr[i].sumresult);
    //     }
    //     this.initLogChart(LV1Warn,LV2Warn);
    // })
  }
  //日志历史记录图表
  initLogChart(firstData,secondData){
    let data = {
      title:['一级警告','二级警告'],
      yAxis:['周一','周二','周三','周四','周五','周六','周日'],
      firstData:firstData,
      secondData:secondData
    }
    if(this.language){
      data.title = ['LV1Warn','LV2Warn'];
      data.yAxis = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    }
    if(document.getElementById('warning')){
      let myChart_3 = echarts.init(document.getElementById('warning'));
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
  get_device_mts_log_daily(){

    this.http.callRPC('get_device_log_daily_error_status','device_monitor.get_device_log_daily_error_status',
    {"device":this.device,"today":dateformat(new Date(),'yyyy-MM-dd'),"thishour":"hour"+new Date().getHours(),"level":1}).subscribe((g:any) =>{
      // console.log(g)
      if(g.result.error || g.result.message[0].code == 0)return;
      let arr = g.result.message[0].message[0];
      if(arr && arr.errorcount == 1)this.errorC = true;

    })
    // device_monitor.get_device_log_daily_error_status('{"device":"device_mts_01","today":"2020-11-23","thishour":"hour14","level":1}');
  }
  
  getWin_H(){
    var sf = <Screenfull>screenfull;
    return sf.isFullscreen?'150px':'120px';
  }

  getwarmStr(){
    return this.log_warm.data.length > 0 ?this.log_warm.data[this.log_warm.data.length-1][3]:'';
  }

  getwarm(){
    return this.log_warm.data.length > 0 ?"equipment.LV"+this.log_warm.data[this.log_warm.data.length-1][3]+"Warm" :'';
  }


  //组件销毁  
  ngOnDestroy(){
    clearInterval(this.timer);
    clearInterval(this.time_w);
    
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    window.removeEventListener('resize',this.chartResize)
    // document.getElementById('warning').removeEventListener('resize',this.chartResize)

  }


}
