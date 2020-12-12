import { Component, Input, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import {dateformat} from '../../equipment-board';

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
    nexttest:'Geely001',
    nextdate:'20/11/01-20/11/30',
    // '实验名称','开始时间','计划时长','计划轮次','进度'
    // title:['stationName','StartTime','PLanDuration','PlannedRound','schedule'],
    // '实验编号','开始时间','结束时间','已进行时长','进度'
    title:['ExperimentNum','StartTime','endTime','CarriedOutTime','schedule'],
    data:[
    ]
  }
  timer60s;

  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
    this.timer60s = setInterval(f =>{
      if(this.device)this.get_device_mst_progress();
    },60000)
    if(this.device)this.get_device_mst_progress();
  }

    /**
   * 获取进度
   */
  get_device_mst_progress(){
    this.http.callRPC('get_device_taskinfo','get_device_taskinfo',{"deviceid":this.device}).subscribe((f:any)=>{
      console.log(f)
      if(f.result.error || f.result.message[0].code == 0)return;
      this.experiment.data = f.result.message[0].message.map(m =>
            ([m.taskchildnum,dateformat(new Date(m.taskstart),'yy/MM/dd'),dateformat(new Date(m.taskend),'yy/MM/dd'),m.numberstime+'h',parseInt((m.rate).toString())])
      );
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

  get_height(){
    return this.experiment.data.length <= 2?'75px':'120px';
  }

  getleft(item){
    return item > 40 && item<90?item-20+'%':'20%';
  }

   //组件销毁  
   ngOnDestroy(){
    clearInterval(this.timer60s)
  }

}
