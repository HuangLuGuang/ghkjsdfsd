import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../../services/http/httpservice.service';
import { dateformat, DEVICEID_TO_NAME, library, rTime } from '../../../equipment-board';

@Injectable({
  providedIn: 'root'
})
export class ThirdLevelService {

  deviceid_to_name = DEVICEID_TO_NAME;

  constructor(private http:HttpserviceService) { }


  //当前年安灯状态
  /**
   * 
   * @param param 请求参数
   * @param view 页面子组件
   */
  get_andon_status_year(param,view){
    let month ={};
    let chart_data = [[],[],[],[],[]];
    let now =  new Date();
    this.http.callRPC('get_device_andon_status_year_list','get_device_andon_status_year_list',{deviceid:param,"newyearsday":now.getFullYear()+"-01-01"}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      // console.log(f)
      month  = this.calculation_andon_year(f.result.message[0].message,chart_data);
      if(now.getMonth() != 0){
        view.initDeviceCircula(month[now.getMonth() ],'left_chart_2','上个月','安灯状态');
      }
      view.initDeviceCircula(month[now.getMonth()+1 ],'left_chart_1','当月','安灯状态');
      Object.values(month).forEach((el:any) => {
        chart_data[0].push(el.running);
        chart_data[1].push(el.placeon);
        chart_data[2].push(el.stop);
        chart_data[3].push(el.warning);
        let sum = el.running+el.placeon+el.stop+el.warning;
        chart_data[4].push(el.running && sum?((el.running/(el.running+el.placeon+el.stop+el.warning))*100).toFixed(2):0);
//         0: "运行"
// 1: "等待"
// 2: "占位"
// 3: "维护"
// 4: "运行比例"
// placeon: 36.86
// running: 108.07
// stop: 65.73
// warning: 23.35
      });
      view.initDeviceStatus( chart_data,['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']);
    })
  }


  
  get_andon_status_last_year(param,view){
    let month = {
      sum:{running:0,stop:0,placeon:0,warning:0},
      12:{running:0,stop:0,placeon:0,warning:0},
    };
    let mon:any = {};
    let recordtime;
    let now =  new Date();
    this.http.callRPC('get_device_andon_status_year_list','get_device_andon_status_year_list',{deviceid:param,"newyearsday":(now.getFullYear()-1)+"-01-01"}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      // console.log(f)
      f.result.message[0].message.forEach(el => {
        if(el.length == 0)return;
        recordtime = el[0].recordtime.split('-');
        mon = [recordtime[recordtime.length-1]];
        el.forEach((g,j) => {
          month.sum.running += g.running?g.running:0;
          month.sum.stop += g.stop?g.stop:0;
          month.sum.placeon += g.placeon?g.placeon:0;
          month.sum.warning += g.warning?g.warning:0;
          if(mon == 12)
            month[12].running = g.running?g.running:0,month[12].stop = g.stop?g.stop:0,
            month[12].placeon = g.placeon?g.placeon:0,month[12].warning = g.warning?g.warning:0;
        });
      });
      if(now.getMonth() == 0){
        view.initDeviceCircula(month[12],'left_chart_2','上个月','安灯状态');
      }
      view.initDeviceCircula(month.sum,'left_chart_3','上年均值','');
    })
  }

  //获取试验进度
  get_device_taskinfo_list(param,view){
    let tableBody = [];
    let deviceList = {};
    return new Observable(s =>{
      this.http.callRPC('get_device_taskinfo_list','get_device_taskinfo_list',{deviceid:param}).subscribe((f:any)=>{
        if(f.result.error || f.result.message[0].code == 0)return;
        tableBody = f.result.message[0].message.map(m=>(
          {device:m.devicetaskname,experiment:m.taskchildnum,speed:m.rate,deviceid:m.deviceid}
        ));
        view.tableBody = tableBody;
        //生成
        tableBody.forEach(f=>{
          if(!deviceList[f.deviceid])
            deviceList[f.deviceid] = [];
            
          deviceList[f.deviceid].push(f)
        })
        
        s.next( deviceList);
      })
    })
  }

  //获取日志
  get_log_list(param,view){
    let aee;
    this.http.callRPC('get_log_list',library+'get_log_list',{deviceid:param}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      
      view.tableBody = f.result.message[0].message.filter(g=> g[0] 
        // && g[0].level == 3
        ).map(m=>(
        aee = m[0].message.split("\""),
        {
          device:this.deviceid_to_name[m[0].deviceid],
          time:dateformat(new Date(rTime(m[0].recordtime)),'yyyy-MM-dd')
          ,log:aee[aee.length-1]?aee[aee.length-1]:aee[aee.length-2],
        }
      ));
      // view.create_scrollbar();
    })
  }



  //计算今年安灯状态
  calculation_andon_year(arr,chart_data){
    chart_data = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
    let month = {
      1:{running:0,stop:0,placeon:0,warning:0},
      2:{running:0,stop:0,placeon:0,warning:0},
      3:{running:0,stop:0,placeon:0,warning:0},
      4:{running:0,stop:0,placeon:0,warning:0},
      5:{running:0,stop:0,placeon:0,warning:0},
      6:{running:0,stop:0,placeon:0,warning:0},
      7:{running:0,stop:0,placeon:0,warning:0},
      8:{running:0,stop:0,placeon:0,warning:0},
      9:{running:0,stop:0,placeon:0,warning:0},
      10:{running:0,stop:0,placeon:0,warning:0},
      11:{running:0,stop:0,placeon:0,warning:0},
      12:{running:0,stop:0,placeon:0,warning:0},
    };
    let recordtime;
    let mon:any = {};
    arr.forEach((el,i) => {
      
      // mon.running = el.running?el.running:0;
      // mon.stop = el.stop?el.stop:0;
      // mon.placeon = el.placeon?el.placeon:0;
      // mon.warning = el.warning?el.warning:0;
      el.forEach((g,j) => {
        recordtime = g.recordtime.split('-');
        mon = parseInt(([recordtime[recordtime.length-1]]).toString());
        month[mon].running += g.running?g.running:0;
        month[mon].stop += g.stop?g.stop:0;
        month[mon].placeon += g.placeon?g.placeon:0;
        month[mon].warning += g.warning?g.warning:0;
      });
    });
    
    let key_num;
    for(let key in month){
      key_num = parseInt(key);
      chart_data[0][key_num] = month[key_num].running;
      chart_data[1][key_num] = month[key_num].stop;
      chart_data[2][key_num] = month[key_num].placeon;
      chart_data[3][key_num] = month[key_num].warning;
      chart_data[4][key_num] = ((month[key_num].running/(month[key_num].running+month[key_num].placeon+month[key_num].stop+month[key_num].warning))*100).toFixed(2);
    }
    return month;
  }
  
}
