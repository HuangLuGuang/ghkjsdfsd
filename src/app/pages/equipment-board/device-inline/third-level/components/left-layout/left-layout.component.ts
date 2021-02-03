import { Component, OnInit } from '@angular/core';
import { EquipmentBoardService } from '../../../../serivice/equipment-board.service';
let equipment_four_road = require('../../../../../../../assets/eimdoard/equipment/js/equipment-four-road');

declare var $;
@Component({
  selector: 'ngx-left-layout',
  templateUrl: './left-layout.component.html',
  styleUrls: ['./left-layout.component.scss'],
})
export class LeftLayoutComponent implements OnInit {

  obejct = Object;
  tableHeader = {time:'时间',device:'设备',log:'日志'};
  tableBody = [
    // {time:'2020-10-11',device:'四立柱',log:'Not ready1111111111111111111111111111111111111111'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
    // {time:'2020-10-11',device:'四立柱',log:'Not ready'},
  ]

  fixed = ['log'];
  subscribeList:any = {};
  timer;
  top;//用来判断是否达到底部
  constructor(private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.resize();
    })
  }

  ngAfterViewInit(){
    this.timer = setInterval(this.scroll,100);
  }

  scroll=()=>{
    if($('#scroll').height() - $('#left_table').height()< 50){
      return;
    }
    let top = $('#left_table').scrollTop();
    if(this.top > top)top = 0;
    top++;
    $('#left_table').scrollTop(top);
    this.top = top;
  }
  
  // create_scrollbar(){
  //   $('#s').width( $('#table_body_2').width())
  // }

  resize=()=>{
    setTimeout(() => {
      ['left_chart_1','left_chart_2','left_chart_3'].forEach(f=>{
        if(document.getElementById(f))
          echarts.init(document.getElementById(f)).resize();
      })
      if(document.getElementById('left_chart_hour_year'))
        echarts.init(document.getElementById('left_chart_hour_year')).resize();
    }, 500);
    // this.create_scrollbar();
  }

   //  running运行 placeon占位 stop等待 warning维护 
   initDeviceCircula(data,id,title,message){
    if(document.getElementById(id)){
      let status = [{value: 0}, {value: 0}, {value: 0}, {value: 0}];
      if(data)
          status = [
            {value: data.running?data.running:0}, 
            {value: data.stop?data.stop:0}, 
            {value:  data.placeon?data.placeon:0},
             {value: data.warning?data.warning:0}
            ];
      let myChart = echarts.init(document.getElementById(id));
      if(myChart)equipment_four_road.create_device_circular(
        {title:title,message:message,value:status},myChart);
    }
  }


  //渲染年表格
  initDeviceStatus(data,month){
    // let xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    // if(this.language)xData = ['Jan','Feb','Mar','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    if(!document.getElementById('left_chart_hour_year'))return;
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
    let myChart = echarts.init(document.getElementById('left_chart_hour_year'));
    if(myChart)equipment_four_road.create_device_status(data_1,myChart,null,'工时年度统计');
    // equipment_four_road.create_device_status(data_1,myChart,null,this.language?"AnnualReportOfSafetyLamp":'安灯年度表');

  }

  ngOnDestroy(){
    clearInterval(this.timer);
    let chart;
    ['left_chart_1','left_chart_2','left_chart_3','left_chart_hour_year'].forEach(f=>{ 
      chart =document.getElementById(f)
      if(chart)echarts.init(chart).dispose();
    })

    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}
