import { Component, Input, OnInit } from '@angular/core';
import { DEVICEID_TO_NAME } from '../../../../equipment-board';
import { EquipmentBoardService } from '../../../../serivice/equipment-board.service';
import { ThirdLevelService } from '../../laboratory/third-level.service';

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
  @Input() set list(data){
    if(data){
      this._list = Object.keys(data)
    }
  };
  
  _list;
  task_num = 0;
  timer;
  constructor(private boardservice:EquipmentBoardService,private thirdLevelService:ThirdLevelService) { }

  ngOnInit(): void {
    this.subscribeList.resize =this.boardservice.chartResize().subscribe(f=>{
      this.resize();
    })
    let o = 0;
    this.timer = setInterval(()=>{
      if(o%4 == 0){
        this.thirdLevelService.get_task_num(this._list).subscribe((f:any)=>{
          this.initChart(f);
          this.task_num = f.sum.reduce((total,cur)=>total+cur,0);
        })
      }
      o++;
    },1000)

  }

  resize = ()=>{
    setTimeout(() => {
      if(document.getElementById('right_chart_1'))
        echarts.init(document.getElementById('right_chart_1')).resize();
    }, 500);
  }

  initChart(f){
    // sum:[],//总数
    // carryOut:[],//完成个数
    // undone:[],//未完成
    if(!document.getElementById('right_chart_1'))return;
    let xdata = this._list.map(m =>(DEVICEID_TO_NAME[m]));
    let completed = this._list.map((m,i) =>(
      {
        value:f.carryOut[i],
        itemStyle:{
            color:'#5D920D'
        }
      }
    ));
    
    let plan = this._list.map((m,i) =>({
      value:f.sum[i],
      itemStyle:{
          color:'#DBB70D'
      }
    }));
    
    let chart = echarts.init(document.getElementById('right_chart_1'));
    let option = {
      tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      grid: {
          left: 50,
          right: '4%',
          height:'76%',
          top:'10%',
          containLabel:true,
      },
      xAxis: {
          type: 'category',
          data: xdata,
          axisLine: {
            lineStyle: {
                color: "rgb(220, 220, 220)",
            }
          },
          splitLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
            rotate: 30,
            align: 'right', 
            textStyle: { 
              fontSize: '90%', 
              color: "rgb(220, 220, 220)" 
            }
          },
      },
      yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
                color: "rgb(220, 220, 220)",
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
    clearInterval(this.timer);
    let chart = document.getElementById('right_chart_1');
    if(chart)echarts.init(chart).dispose();
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}

