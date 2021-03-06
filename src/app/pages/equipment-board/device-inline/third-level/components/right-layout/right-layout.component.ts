import { Component, OnInit } from '@angular/core';
import { EquipmentBoardService } from '../../../../serivice/equipment-board.service';

@Component({
  selector: 'ngx-right-layout',
  templateUrl: './right-layout.component.html',
  styleUrls: ['./right-layout.component.scss'],
})
export class RightLayoutComponent implements OnInit {
  obejct = Object;
  tableHeader = {device:'设备编号',experiment:'实验编号',speed:'实验进度'};
  tableBody = [
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
    // {device:'四立柱',experiment:'WT0001-202011',speed:20},
  ]
  subscribeList:any = {};
  constructor(private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.resize();
    })
  }

  resize = ()=>{
    setTimeout(() => {
      if(document.getElementById('right_chart_1'))
        echarts.init(document.getElementById('right_chart_1')).resize();
    }, 500);
  }

  initChart(){
    if(!document.getElementById('right_chart_1'))return;
    let xdata = ['1111','2222','3333'];
    let completed  = [{
      value:100,
      itemStyle:{
          color:'#33FF99'
      }
    },{
      value:100,
      itemStyle:{
          color:'#FFFF99'
      }
    },
    {
      value:100,
      itemStyle:{
          color:'#CCFFFF'
      }
    }]
    let plan = [{
      value:200,
      itemStyle:{
          color:'rgb(124,126,136)'
      }
    },
    {
      value:150,
      itemStyle:{
          color:'rgb(124,126,136)'
      }
    },{
      value:100,
      itemStyle:{
          color:'rgb(124,126,136)'
      }
    }]
    let chart = echarts.init(document.getElementById('right_chart_1'));
    let option = {
      tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      grid: {
          left: 20,
          right: '4%',
          height:'76%',
          top:'10%'
      },
      xAxis: {
          type: 'category',
          data: xdata,
          axisLine: {
            lineStyle: {
                color: "rgba(204,187,225,0.5)",
            }
          },
          splitLine: {
              show: false
          },
          axisTick: {
              show: false
          },
      },
      yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
                color: "rgba(204,187,225,0.5)",
            }
          },
          splitLine: {
              show: false
          },
          axisTick: {
              show: false
          },
      },
      series: [
          {
              name: '已完成实验数',
              type: 'bar',
              data: completed,
              z:3
          },
          {
              name: '计划实验数',
              type: 'bar',
              barGap:'-100%',
              data: plan
          },
          
      ]
    };
    chart.setOption(option);
  }

  setTableBody(tableBody){
    this.tableBody = tableBody;
  }

  ngOnDestroy(){
    let chart = document.getElementById('right_chart_1');
    if(chart)echarts.init(chart).dispose();
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}

