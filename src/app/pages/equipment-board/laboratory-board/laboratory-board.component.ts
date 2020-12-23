import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');
declare var $:any;

@Component({
  selector: 'ngx-laboratory-board',
  templateUrl: './laboratory-board.component.html',
  styleUrls: ['./laboratory-board.component.scss']
})
export class LaboratoryBoardComponent implements OnInit {
  
  timer;
  objectKeys = Object.keys;//用来转换json的key成数组 进行ngfor
  list = {
    'demo':{
      id:'demo',
      type:'message',
      style:{
        height:'200px',
        width:'200px',
        bottom:'0%',
        left:'0%'
      }
    },
    'demo2':{
      id:'demo2',
      type:'category',
      style:{
        height:'200px',
        width:'200px',
        top:0,
        left:'50%'
      }
    },
    'demo3':{
      id:'demo3',
      type:'message',
      style:{
        height:'200px',
        width:'200px',
        bottom:'0%',
        left:'30%'
      }
    },
    'demo4':{
      id:'demo4',
      type:'category',
      style:{
        height:'200px',
        width:'200px',
        top:'50%',
        left:'50%'
      }
    },
  }


  type = ['message','category'];

  @ViewChild('message')message:any;
  @ViewChild('category')category:any;

  constructor() { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '实验室布局';
    setTimeout(() => {
      // this.initChart();
    }, 1000);
    this.timer = setInterval(f =>{
      this.initChart();
    },1000)
  }

  ngAfterViewInit(){
  }

  initChart(){
    let mychart;
    let l = this.list
    for(let key in l){
      mychart = document.getElementById(l[key].id);
      if(!mychart)continue;
      mychart = echarts.init(mychart)
      rtm3a.create_semicircle(parseInt((Math.random()*100).toString()),mychart);
    }
  }


  getTemp(type){
    return this[type]
  }


  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer)
  
  }

}
