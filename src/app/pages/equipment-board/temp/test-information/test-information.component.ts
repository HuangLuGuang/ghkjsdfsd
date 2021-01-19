import { Component, Input, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import {dateformat, rTime} from '../../equipment-board';

@Component({
  selector: 'ngx-test-information',
  templateUrl: './test-information.component.html',
  styleUrls: ['./test-information.component.scss']
})
export class TestInformationComponent implements OnInit {
  @Input()device;
  experiment ={
    user:'新工',
    phone:'13499998888',
    nexttest:'001',
    nextdate:'20/11/01-20/11/30',
    // '实验名称','开始时间','计划时长','计划轮次','进度'
    // title:['stationName','StartTime','PLanDuration','PlannedRound','schedule'],
    // '实验编号','开始时间','结束时间','已进行时长','进度'
    title:['ExperimentNum','StartTime','endTime','CarriedOutTime','schedule'],
    data:[
      // [1,'2020-10-11','2020-10-11',1,1],
      // [1,'2020-10-11','2020-10-11',1,1],
      // [1,'2020-10-11','2020-10-11',1,1],
      // [1,'2020-10-11','2020-10-11',1,1],
      // [1,'2020-10-11','2020-10-11',1,1],
      // [1,'2020-10-11','2020-10-11',1,1],
      // [1,'2020-10-11','2020-10-11',1,1],
      // [1,'2020-10-11','2020-10-11',1,1],
    ],
    data_next:[]
  }
  timer60s;
  subscribeList:any = {};

  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
    this.timer60s = self.setInterval(f =>{
      if(this.device)this.get_device_mst_progress();
    },60000)
    if(this.device)this.get_device_mst_progress();
  }

    /**
   * 获取进度
   */
  get_device_mst_progress(){
    let now = new Date();
    now = new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDay()} 24:00:00`);
    let data = [];
    let data_next = [];
    this.subscribeList.mts_p = this.http.callRPC('get_device_taskinfo','get_device_taskinfo',{"deviceid":this.device}).subscribe((f:any)=>{
      // console.log(f)
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(el => {
        if(new Date(rTime(el.taskstart)).getTime() < now.getTime())
          data.push(this.return_data(el));
        else
          data_next.push(this.return_data(el));
      });
      this.experiment.data = data;
      this.experiment.data_next = data_next;

      this.subscribeList.mts_p.unsubscribe();

      // this.experiment.data = f.result.message[0].message.map(m =>
      //       ([m.taskchildnum,dateformat(new Date(m.taskstart),'yy/MM/dd'),dateformat(new Date(m.taskend),'yy/MM/dd'),m.numberstime+'h',parseInt((m.rate).toString())])
      // );
      // f.result.message[0].message
      // this.experiment.data_next = f.result.message[0].message.map(m =>
      //   ([m.taskchildnum,dateformat(new Date(m.taskstart),'yy/MM/dd'),dateformat(new Date(m.taskend),'yy/MM/dd'),m.numberstime+'h',parseInt((m.rate).toString())])
      // );
    })
    // this.http.callRPC('get_device_mts_progress','device_monitor.get_device_mts_progress',{
    //   "device":this.device,"arr":"status"
    // }).subscribe((f:any) =>{
    // console.log(f);
    // if(f.result.error || f.result.message[0].code == 0)return;
    //   this.experiment.data = f.result.message[0].message.map(m =>
    //     ([m[1],'——',dateformat(new Date(m[0]),'yy/mm/dd'),'——',parseInt((m[2]*100).toString())])
    //     );
    // })
  }

  return_data(m){
    return [m.taskchildnum,dateformat(new Date(m.taskstart),'yy/MM/dd'),dateformat(new Date(m.taskend),'yy/MM/dd'),m.numberstime+'h',parseInt((m.rate).toString())]
  }

  get_height(){
    return this.experiment.data.length <= 1?'auto':'64%';
  }

  getleft(item){
    return item > 40 && item<90?item-20+'%':'20%';
  }

   //组件销毁  
   ngOnDestroy(){
    clearInterval(this.timer60s)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}
