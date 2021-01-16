import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../../@core/utils';
let equipment_four_road = require('../../../../../../../assets/eimdoard/equipment/js/equipment-four-road');

declare var $;
@Component({
  selector: 'ngx-left-layout',
  templateUrl: './left-layout.component.html',
  styleUrls: ['./left-layout.component.scss']
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

  constructor(private layoutService:LayoutService) { }

  ngOnInit(): void {
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.resize();
      // this.create_scrollbar();
    })
    window.addEventListener('resize',this.resize);

    // $('.scrollbar_l').bind("scroll",f=>{
    //   $('.table_body_th_2').scrollLeft($('.scrollbar_l').scrollLeft())
    // })

    // this.create_scrollbar();
  }

  
  // create_scrollbar(){
  //   $('#s').width( $('#table_body_2').width())
  // }

  resize=()=>{
    ['left_chart_1','left_chart_2','left_chart_3'].forEach(f=>{
      if(document.getElementById(f))
        echarts.init(document.getElementById(f)).resize();
    })
    if(document.getElementById('left_chart_hour_year'))
      echarts.init(document.getElementById('left_chart_hour_year')).resize();
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
    window.removeEventListener('resize',this.resize)
  }

}
