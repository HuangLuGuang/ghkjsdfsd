import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../@core/utils';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { dateformat, library, rTime, t_h_deviceid } from '../../equipment-board';
import { EquipmentBoardService } from '../../serivice/equipment-board.service';
let equipment_four_road = require('../../../../../assets/eimdoard/equipment/js/equipment-four-road');
let rtm3a = require('../../../../../assets/eimdoard/rtm3/js/rtm3a');

@Component({
  selector: 'ngx-experiment-params',
  templateUrl: './experiment-params.component.html',
  styleUrls: ['./experiment-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperimentParamsComponent implements OnInit {
  @Input()device:string = '';
  timer;
  language ='';
  subscribeList:any = {};
  // obser = new Observable(f=>{
  //   if(document.getElementById('third_second'))echarts.init(document.getElementById('third_second')).resize();
  //   f.next('experiment-params刷新')
  // })
  constructor(private http:HttpserviceService,private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {

    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
   
    // setTimeout(() => {
    if(this.device.includes('weiss'))
      this.get_device_mts_timerangedata();
    else
      this.get_device_his_Temp_hum();
    // }, 1000);
    let i = 0;
    this.timer = self.setInterval(f =>{
      if(this.device.includes('weiss')){
        this.get_device_mts_weiss();
        if(i == 5){
          this.get_device_mts_timerangedata();
          i = 0;
        }
      }
      else
      {
        this.get_device_Temp_hum();
        if(i == 5){
          this.get_device_his_Temp_hum();
          i = 0;
        }
      }
      i++;
    },1000)
    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.chartResize();
    })
  }


  chartResize=()=>{
    let chart;
    setTimeout(() => {
      if(document.getElementById('third_second')){
        echarts.init(document.getElementById('third_second')).resize();
      }
      chart = document.getElementById('real_temperature_1');
      if(chart)echarts.init(chart).resize();

      chart = document.getElementById('real_temperature_2');
      if(chart)echarts.init(chart).resize();
    }, 500);

  }


  //环境实时信息
  get_device_mts_weiss(){
    // temp温度
    //  humi湿度
   this.subscribeList.device_mts_weiss = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata'
    ,{device:this.device,arr:"temperatureactual,temperatureset,humidityactual,humidityset"}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      let obj = this.temp_humi_change(g.result.message[0].message);
      //渲染温度
      if(document.getElementById('real_temperature_1'))
        equipment_four_road.create_real_temperature_v2(
          {value:obj.temperatureactual[0]?obj.temperatureactual[0][0]:0,title:'温度',max:70,setValue:obj.temperatureset[0]?obj.temperatureset[0][0]:0},
          echarts.init(document.getElementById('real_temperature_1')));
      //渲染湿度
      if(document.getElementById('real_temperature_2'))
        equipment_four_road.create_real_temperature_v2(
          {value:obj.humidityactual[0]?obj.humidityactual[0][0]:0,title:'湿度',max:100,setValue:obj.humidityset[0]?obj.humidityset[0][0]:0},
          echarts.init(document.getElementById('real_temperature_2')));

      this.subscribeList.device_mts_weiss.unsubscribe();

    })
  }

  //环境历史信息
  get_device_mts_timerangedata(){
   let startStr = (dateformat(new Date(new Date().getTime()-3600000),'yyyy-MM-dd hh:mm:ss'))
    this.subscribeList.device_mts_timerangedata = this.http.callRPC('get_device_mts_timerangedata',library+'get_device_mts_timerangedata'
    ,{start:startStr,end:dateformat(new Date(),'yyyy-MM-dd hh:mm:ss'),device:this.device,arr:"temperatureactual,humidityactual"}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      // console.log(this.temp_humi_change(g.result.message[0].message));
      let arrj = this.temp_humi_change(g.result.message[0].message)
      let yearPlanData,yearOrderData,differenceData=[],visibityData=[],xAxisData=[];
      yearPlanData = arrj.temperatureactual.map(m => (m[0]));//温度
      yearOrderData = arrj.humidityactual.map(m => (m[0]));;//湿度度
      xAxisData = arrj.humidityactual.map(m => (dateformat(new Date(m[1]),'hh:mm:ss')))
      // create_third_chart_line(rtm3a,this);
      rtm3a.create_third_chart_line({
        yearPlanData:yearPlanData,
        yearOrderData:yearOrderData,
        differenceData:differenceData,
        visibityData:visibityData,
        xAxisData:xAxisData,
        title:''
      }, 'third_second');

      this.subscribeList.device_mts_timerangedata.unsubscribe();

    })
  }

  //获取实时温湿度
  get_device_Temp_hum(){
    let res;
    this.subscribeList.t_h = this.http.callRPC('get_temperature',library+'get_temperature'
    ,{deviceid:this.device}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message[0]?g.result.message[0].message[0]:{};
      // console.log(res)
      //渲染温度
      if(document.getElementById('real_temperature_1'))
        equipment_four_road.create_real_temperature_v2(
          {value:res.temperature?res.temperature:0,title:'温度',max:70,setValue:res.temperatureset?res.temperatureset:0},
          echarts.init(document.getElementById('real_temperature_1')));
      //渲染湿度
      if(document.getElementById('real_temperature_2'))
        equipment_four_road.create_real_temperature_v2(
          {value:res.humidity?res.humidity:0,title:'湿度',max:100,setValue:res.humidityset?res.humidityset:0},
          echarts.init(document.getElementById('real_temperature_2')));

      this.subscribeList.t_h.unsubscribe();

    })
  }

  get_device_his_Temp_hum(){
    let yearPlanData = [],yearOrderData= [],differenceData=[],visibityData=[],xAxisData=[];
    this.subscribeList.h_t_h = this.http.callRPC('get_temperature',library+'get_temperature_numbers'
    ,{deviceid:t_h_deviceid || this.device}).subscribe((g:any) =>{
      if(g.result.error || g.result.message[0].code == 0)return;
      g.result.message[0].message.forEach(el => {
        yearPlanData.push(el.temperature);//温度
        yearOrderData.push(el.humidity);//湿度
        xAxisData.push(rTime(el.recordtime));
      });
      rtm3a.create_third_chart_line({
        yearPlanData:yearPlanData.length > 0?yearPlanData:[0],
        yearOrderData:yearOrderData.length>0?yearOrderData:[0],
        differenceData:differenceData.length>0?differenceData:[0],
        visibityData:visibityData.length>0?visibityData:[0],
        xAxisData:xAxisData.length>0?xAxisData:[0],
        title:''
      }, 'third_second');

      this.subscribeList.h_t_h.unsubscribe();
    })
  }

  //环境转换
  temp_humi_change(data){
    let obj = {
      // tempset:[],//温度设定值
      // tempreal:[],// 温度
      // humiset:[],//湿度设定值
      // humireal:[],// 湿度
      temperatureactual:[],
      temperatureset:[],
      humidityactual:[],
      humidityset:[],
    }
    if(data)
      data.forEach(el => {
        for(let key in el)obj[key] =  el[key];
      });


    return obj
  }


  /**
   * 获取上一个月
   *
   * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
   */
  getPreMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days:any = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2:any = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2:any = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
  }

  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    window.removeEventListener('resize',this.chartResize);
    let chart = document.getElementById('third_second');
    if(chart)echarts.init(chart).dispose();

    chart = document.getElementById('real_temperature_1');
    if(chart)echarts.init(chart).dispose();

    chart = document.getElementById('real_temperature_2');
    if(chart)echarts.init(chart).dispose();

  }

}
