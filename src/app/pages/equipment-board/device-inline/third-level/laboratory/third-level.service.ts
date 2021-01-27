import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../../services/http/httpservice.service';
import { dateformat, library, rTime } from '../../../equipment-board';

@Injectable({
  providedIn: 'root'
})
export class ThirdLevelService {

  deviceid_to_name = {
    'device_mts_02':'整车耦合',//整车耦合
    'device_mts_01':'四立柱',//四立柱道路模拟试验台
    'device_mts_03':'六自由度',//六自由度振动台
    "device_mts_04":'液压伺服',//液压伺服
    'device_hpu_01':'油源1',//油源1
    'device_hpu_02':'油源2',//油源2
    'device_hpu_03':'油源3',//油源3
    'device_hpu_04':'油源4',//油源4
    'device_hpu_05':'油源5',//油源5

    'device_avldyno_01':'AVL耐久2驱-S1060',//AVL耐久2驱-S1060
    'device_avldyno_02':'AVL耐久2驱-S1060`',//AVL耐久2驱-S1060`
    'device_avldyno_03':'AVL排放2驱-S1070',//AVL排放2驱-S1070
    'device_avl4dyno_02':'AVL环模4驱-S1070',//AVL环模4驱-S1070
    'device_avl2dyno_01':'AVL排放2驱-S1074',//AVL排放2驱-S1074
    'device_avl4dyno_01':'AVL排放4驱-S1074',//AVL排放4驱-S1074
    'device_jinhua_cabin02':'锦华常温浸车舱',//锦华常温浸车舱
    'device_atec_05':'整车高低温试验舱',//整车高低温试验舱

    'device_avlmotor_01':'电机1',//电机1
    'device_avlmotor_02':'电机2',//电机2
    'device_avlmotor_03':'电机3',//电机3
    "device_avlmotor_04":'电机4',//电机4
    'device_boyang_01':'电机6',//电机6
    'device_boyang_02':'电机7',//电机7

    'device_auto_voc01':'整车voc',//整车voc环境仓
    'device_atlas_4000':'氙灯Ci4000',//氙灯集中监控Ci4000
    'device_atlas_4400':'氙灯Ci4400',//氙灯集中监控Ci4400

  }

  constructor(private http:HttpserviceService) { }


  //当前年安灯状态
  /**
   * 
   * @param param 请求参数
   * @param view 页面子组件
   */
  get_andon_status_year(param,view){
    let month = {};
    let chart_data = [];
    let now =  new Date();
    this.http.callRPC('get_device_andon_status_year_list','get_device_andon_status_year_list',{deviceid:param,"newyearsday":now.getFullYear()+"-01-01"}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      // console.log(f)
      if(now.getMonth() != 0){
        month  = this.calculation_andon_year(f.result.message[0].message,chart_data);
        view.initDeviceCircula(month[now.getMonth() ],'left_chart_2','上个月','安灯状态');
      }
      view.initDeviceCircula(month[now.getMonth()+1 ],'left_chart_1','当月','安灯状态');
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
      if(el.length == 0)return;
      recordtime = el[0].recordtime.split('-');
      mon = parseInt(([recordtime[recordtime.length-1]]).toString());
      // mon.running = el.running?el.running:0;
      // mon.stop = el.stop?el.stop:0;
      // mon.placeon = el.placeon?el.placeon:0;
      // mon.warning = el.warning?el.warning:0;
      el.forEach((g,j) => {
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
