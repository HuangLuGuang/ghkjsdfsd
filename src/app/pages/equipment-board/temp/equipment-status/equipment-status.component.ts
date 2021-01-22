import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { dateformat } from '../../equipment-board';
import { EquipmentBoardService } from '../../serivice/equipment-board.service';
let equipment_four_road = require('../../../../../assets/eimdoard/equipment/js/equipment-four-road');
// echart
let rtm3 = require('../../../../../assets/eimdoard/rtm3/js/rtm3');



/**
 * 设备状态
 */
@Component({
  selector: 'ngx-equipment-status',
  templateUrl: './equipment-status.component.html',
  styleUrls: ['./equipment-status.component.scss']
})
export class EquipmentStatusComponent implements OnInit {
  @Input() andon_status_font = 'SafetyLampStatus';
  @Input()device
  @Input()TempNum = 1;
  @Input() chart_1_type = 'type_1';//天数据 表格 type_1 安灯当日状态 type_2 启停时序
  flipped = false;
   //安灯状态
   andon = [
     {name:'运行',color:'green',t:1},
     {name:'空闲',color:'blue',t:3},
     {name:'占位',color:'yellow',t:2},
    {name:'维修',color:'red',t:4},
  ];
  andon_now = -1;
  language;
  subscribeList: any = {};
  interval:any;

  obser = new Observable(f=>{
    
    f.next('equipment-status刷新');
  })

  constructor(private boardservice:EquipmentBoardService,private http:HttpserviceService) { }


  ngOnInit(): void {
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;



    let now ;//当前时间
    this.interval= self.setInterval(f=>{
      this.get_andon_status();

      now = new Date();
      //一小时更新一次
      if( now.getMinutes() == 2 && now.getSeconds() == 0){
        // console.log('--------------------开始请求当天设备运行情况---------------------')
          this.get_andon_data();
      }
      //一天更新一次
      if(now.getHours()== 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
        // console.log('--------------------开始请求年度设备运行情况---------------------')
        this.get_andon_data_year();
      }
    },1000)

    
    setTimeout(() => {
      this.initChart();
      this.get_andon_data();
      this.get_andon_data_year();
    }, 1000);

    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.chartResize();
    })

  }


  ngAfterViewChecked(){
    // console.log('-------------------------------')

    
  }


  

  chartResize=()=>{
    setTimeout(() => {
      if(document.getElementById('device_status'+this.TempNum))echarts.init(document.getElementById('device_status'+this.TempNum)).resize();
      if(document.getElementById('operatingRate'+this.TempNum))echarts.init(document.getElementById('operatingRate'+this.TempNum)).resize();
      if(document.getElementById('device_circular_3'+this.TempNum))echarts.init(document.getElementById('device_circular_3'+this.TempNum)).resize();
      if(document.getElementById('device_circular_2'+this.TempNum))echarts.init(document.getElementById('device_circular_2'+this.TempNum)).resize();
      if(document.getElementById('device_circular_1'+this.TempNum))echarts.init(document.getElementById('device_circular_1'+this.TempNum)).resize();
    }, 500);
    
  }

  initChart(){
    let dom;
    this.initOperatingRate(undefined);
    dom = document.getElementById('device_status'+this.TempNum);
    if(dom){
      equipment_four_road.create_device_status(undefined,echarts.init(dom),undefined,'安灯年度表');
    }
    // equipment_four_road.create_device_status(undefined,myChart,undefined,this.language?"AnnualReportOfSafetyLamp":'安灯年度表');


  }
  
  get_andon_status(){
    this.subscribeList.andon_status = this.http.callRPC('get_andon_status','get_andon_status',{"deviceid":this.device})
    .subscribe((f:any)=>{
      // console.log(f)
      if(f.result.error || f.result.message[0].code == 0)return;
      if( f.result.message[0].message && f.result.message[0].message[0])
          this.andon_now = s_role[f.result.message[0].message[0].status];
      
      this.subscribeList.andon_status.unsubscribe();
    })
  }

  //获取该天安灯数据
  get_andon_data(){
    // //当表样子改变
    // if(this.chart_1_type == 'type_2'){
    //   this.initOperatingRate({
    //     // 月份-倒序
    //     xData: [0],
    //     SeriesData: [0]
    //   });
    //   return;
    // }
    // let arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let arr = [];
    let unit = '时';
    if(this.language )unit = "H";
    // let xAxisData = ['00时','01时','02时','03时','04时',
    // '05时','06时','07时','08时','09时','10时','11时',
    // '12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','23时'];
    let xAxisData = [];
    let nowStr = dateformat(new Date(),'yyyy-MM-dd');
    this.subscribeList.andon_data = this.http.callRPC('dev_get_device_andon_status_daily'
        ,'dev_get_device_status_kpi',{"deviceid":this.device}).subscribe((f:any)=>{
          if(f.result.error || f.result.message[0].code == 0)return;
          console.log(f.result.message[0])
          // f.result.message[0].message.forEach((el,i) => {
          //   // xAxisData.push(el.recordtime+unit);
          //   // arr.push(el.running?el.running:0);
          //   arr[parseInt(el.recordtime)] = el.running?el.running:0;
          // });
          // this.initOperatingRate({
          //         xAxisData:xAxisData,
          //         seriesData:arr,
          // })
          f.result.message[0].message.forEach((el,i) => {
            xAxisData.push(el.dates);
            arr.push(el.status);
          });
          let dom = document.getElementById('operatingRate'+this.TempNum);
          if(!dom)return;
          let operatingRate = echarts.init(dom);
          equipment_four_road.create_line_start_stop( { 
            xData: xAxisData,
            SeriesData: arr},operatingRate);
          this.subscribeList.andon_data.unsubscribe();

    })

  }

  //获取年度统计
  get_andon_data_year(){
    let arr = [[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]];
    let percentage:any[] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    let j = 0;
    let month = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    let recordtime;
    //  running运行 placeon占位 stop等待 warning维护 
    this.subscribeList.andon_data_year = this.http.callRPC('device_andon_status_year','get_device_andon_status_year',{"deviceid":this.device,"newyearsday":new Date().getFullYear()+"-01-01"}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach((el,i) => {
        recordtime = el.recordtime.split('-');
        j = recordtime[recordtime.length-1]-1;
        arr[0][j]=el.running; 
        arr[2][j]=el.stop; 
        arr[1][j]=el.placeon; 
        arr[3][j]=el.warning; 
        percentage[j] = ((el.running/(el.running+el.placeon+el.stop+el.warning))*100).toFixed(2);
        
        // month.push(recordtime[recordtime.length-1]+'月')
      });
      this.initDeviceStatus([arr[0],arr[1],arr[2],arr[3],percentage],month);

      //找到当月运行情况
      let i = new Date().getMonth()+1;//本月月份
      let ret;
      let nowMonthData = f.result.message[0].message.find(g =>  {
        ret=g.recordtime.split('-');
        return parseInt(ret[ret.length-1]) == i
      });
      this.initDeviceCircula({title:'安灯状态',message:'本月',value:[]},'device_circular_2',nowMonthData);
      // this.initDeviceCircula({title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'ThisMonth':'本月',value:[]},'device_circular_2',nowMonthData);

      // console.log(nowMonthData)
      //获取上月运行情况
      if( new Date().getMonth() != 0 ){
        let ListMonthData = f.result.message[0].message.find(g =>  {
          ret=g.recordtime.split('-');
          return  parseInt(ret[ret.length-1]) == i-1
        });
        this.initDeviceCircula({title:'安灯状态',message:'上个月',value:status},'device_circular_1',ListMonthData);
      }
      // this.initDeviceCircula({title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'LastMonth':'上个月',value:status},'device_circular_1',ListMonthData);
      this.subscribeList.andon_data_year.unsubscribe();
      
      // console.log(ListMonthData)
    });



    
    // this.subscribeList.andon_data_year = this.http.callRPC('get_device_andon_anual_status','device_monitor.get_device_andon_anual_status',{"device":this.device,"newyearsday":new Date().getFullYear()+"-01-01"}).subscribe((f:any)=>{
    //   console.log(f)
    //   if(f.result.error || f.result.message[0].code == 0)return;
    //   f.result.message[0].message.forEach(ele => {
    //     arr[ele.status-1] = this._conversion(ele);
    //   });
    //   let s = 0;
    //   percentage = arr[0].map((m,i) =>{
    //      s= m+arr[1][i]+arr[2][i]+arr[3][i];
    //      if(s == 0)return 0;
    //      return ((m/s)*100).toFixed(2);
    //   });
    //   this.initDeviceStatus([arr[0],arr[1],arr[2],arr[3],percentage]);
    //   let i = new Date().getMonth();//本月月份
    //   let  sum = arr[0][i]+arr[1][i]+arr[2][i]+arr[3][i];//总和
    //   let status = [{
    //         value: arr[0][i]
    //     }, {
    //         value: arr[1][i]
    //     }, {
    //         value: arr[2][i]
    //     }, {
    //         value: arr[3][i]
    //     }];
    //   this.initDeviceCircula({title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'ThisMonth':'本月',value:status},'device_circular_1');
    //   status[0].value = arr[0][i-1],status[1].value = arr[1][i-1],status[2].value = arr[2][i-1],status[3].value = arr[3][i-1];
    //   this.initDeviceCircula({title:this.language?'SafetyLampStatus':'安灯状态',message:this.language?'LastMonth':'上个月',value:status},'device_circular_2');
    //   //在渲染完前两个之后再请求防止异步请求导致同时调用
      this.get_andon_data_lastyear();
    // })
  }
//获取上一年度统计
  get_andon_data_lastyear(){
    let status = [{
      value: 0
    }, {
        value: 0
    }, {
        value: 0
    }, {
        value: 0
    }];
    let ret;
    this.subscribeList.andon_data_last_year = this.http.callRPC('device_andon_status_year','get_device_andon_status_year',{"deviceid":this.device,"newyearsday":new Date().getFullYear()-1+"-01-01"}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      // console.log(f.result.message[0].message)
      f.result.message[0].message.forEach(el => {
        status[0].value += el.running?el.running:0; 
        status[1].value += el.placeon?el.placeon:0; 
        status[2].value += el.stop?el.stop:0; 
        status[3].value += el.warning?el.warning:0; 
      });
      if(document.getElementById('device_circular_3'+this.TempNum)){
        let myChart_3 = echarts.init(document.getElementById('device_circular_3'+this.TempNum));
        equipment_four_road.create_device_circular(
          {title:'上年均值',message:'',value:status},myChart_3);
        // equipment_four_road.create_device_circular(
        //   {title:this.language?'LastYearAverage':'上年均值',message:'',value:status},myChart_3);
      }

      if(new Date().getMonth() == 0){
        let ListMonthData = f.result.message[0].message.find(g =>  {
          ret=g.recordtime.split('-');
          return  parseInt(ret[ret.length-1]) == 12
        });
        this.initDeviceCircula({title:'安灯状态',message:'上个月',value:status},'device_circular_1',ListMonthData);
      }

      this.subscribeList.andon_data_last_year.unsubscribe();
    })
  }



  //组件销毁
  ngOnDestroy(){
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    clearInterval(this.interval);

    let chart;
    ['device_status','operatingRate','device_circular_3','device_circular_2','device_circular_1'].forEach(f=>{
      chart = document.getElementById('device_status'+this.TempNum);
      if(chart)echarts.init(chart).dispose();
    })
    
    
  }




  //初始化二十四小时表格
  initOperatingRate(gauge_data_4){
    let dom = document.getElementById('operatingRate'+this.TempNum);
    if(!dom)return;
    let operatingRate = echarts.init(dom);
    if(this.chart_1_type == 'type_1'){
      rtm3.create_right_buttom(gauge_data_4,operatingRate);
    }else{
      equipment_four_road.create_line_start_stop({ 
        xData: [0],
        SeriesData: [0]} ,operatingRate);
    }
  }
  //渲染年表格
  initDeviceStatus(data,month){
    // let xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    // if(this.language)xData = ['Jan','Feb','Mar','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    if(!document.getElementById('device_status'+this.TempNum))return;
    let data_1 = {
      d_arr:[[],[],[],[],[]],
      title_arr:["运行","等待" ,"占位", "维护","运行比例"],
      color_arr:[{
        start: "rgb(74, 181, 107)",
        end: "rgb(74, 181, 107)"
      },
      {
        start: "#006ced",
        end: "#006ced"
    },
      {
          start: "#faa755",
          end: "#faa755"
      },
     
      {
        start: "#d71345",
        end: "#d71345"
      },
      {
          color: " rgb(74, 181, 107)"
      }
    ],
    xData:month
    };
    data_1.d_arr = data;
    let myChart = echarts.init(document.getElementById('device_status'+this.TempNum));
    if(myChart)equipment_four_road.create_device_status(data_1,myChart,null,'安灯年度表');
    // equipment_four_road.create_device_status(data_1,myChart,null,this.language?"AnnualReportOfSafetyLamp":'安灯年度表');

  }
  //渲染圆盘
   //  running运行 placeon占位 stop等待 warning维护 
  initDeviceCircula(data,id,monthdata){
    if(document.getElementById(id+this.TempNum)){
      let status = [{value: 0}, {value: 0}, {value: 0}, {value: 0}];
      if(monthdata)
          status = [
            {value: monthdata.running?monthdata.running:0}, 
            {value: monthdata.stop?monthdata.stop:0}, 
            {value:  monthdata.placeon?monthdata.placeon:0},
             {value: monthdata.warning?monthdata.warning:0}
            ];
      data.value = status;
      let myChart = echarts.init(document.getElementById(id+this.TempNum));
      if(myChart)equipment_four_road.create_device_circular(data,myChart);
    }
  }

}
// running运行 placeon占位 stop等待 warning维护 
export const s_role = {
  running:1,
  placeon:2,
  stop:3,
  warning:4
}