import { Component, Input, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import {dateformat, DEVICEID_TO_NAME, rTime} from '../../equipment-board';

declare var $;
@Component({
  selector: 'ngx-test-information',
  templateUrl: './test-information.component.html',
  styleUrls: ['./test-information.component.scss'],
  
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
      // ['12321312','2020-10-11','2020-10-11',1,1,'13'],
      // [1,'2020-10-11','2020-10-11',1,1,'13'],
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
  timer;
  subscribeList:any = {};
  ROULE = DEVICEID_TO_NAME;
  top = 0;

  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
    this.timer60s = self.setInterval(f =>{
      if(this.device)this.get_device_mst_progress();
    },60000)
    if(this.device)this.get_device_mst_progress();
  }

  ngAfterViewInit(){
    this.timer = setInterval(this.scroll,100);
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
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(el => {
          data.push(this.return_data(el));
      });

      this.experiment.data = data;
      this.experiment.data_next = data_next;

      this.subscribeList.mts_p.unsubscribe();

    })
  }

  return_data(m){
    return [
      m.taskchildnum,dateformat(new Date(m.taskstart),'yy/MM/dd'),//实验编号
      dateformat(new Date(m.taskend),'yy/MM/dd'),
      m.numberstime+'h',
      parseInt((m.rate).toString()),
      this.device.includes(',')?this.ROULE[m.deviceid]:''
    ]
  }

  //表格过长滚动
  scroll=()=>{
    if($('#table_body').height() - $('#scroll').height()< $('#tr').height()/4*3){
      return;
    }
    let top = $('#scroll').scrollTop();
    if(this.top > top)top = 0;
    top++;
    $('#scroll').scrollTop(top);
    this.top = top;
  }

  mouseenter(){
    clearInterval(this.timer);
  }

  mouseleave(){
    this.timer = setInterval(this.scroll,100);
  }

  get_height(){
    return this.experiment.data.length <= 1?'auto':'64%';
  }

  getleft(item){
    return item > 40 && item<90?item-20+'%':'20%';
  }

   //组件销毁  
   ngOnDestroy(){
    clearInterval(this.timer60s);
    clearInterval(this.timer);
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}
