import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { EquipmentBoardService } from '../serivice/equipment-board.service';
let rtm3a = require('../../../../assets/eimdoard/rtm3/js/rtm3a');
declare var $:any;

/**
 * TODO 布局demo
 **/
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
      type:'message',
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
      type:'message',
      style:{
        height:'200px',
        width:'200px',
        top:'50%',
        left:'50%'
      }
    },
    'demo5':{
      id:'demo5',
      type:'message',
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
  @ViewChild('Fan')Fan:any;

  constructor(private ngzone:NgZone,private b:EquipmentBoardService) { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '实验室布局';
    // setTimeout(() => {
    //   this.initChart();
    // }, 1000);
    // this.timer = setInterval(f =>{
    //   this.initChart();
    // },1000)
    
  }

  ngAfterViewInit(){
    // 初始化富文本框
      tinymce.init({
        selector: '#tinydemo',
        // language:'zh_CN',
        skin_url: '/assets/skins/lightgray',
        branding: false,
        elementpath: false,
        schema: 'html5',
        keep_styles: true,//换行保持样式
        resize: false,//宽高是否可以改变
        min_height: 300,
        plugins: 'link  table ',
        toolbar: 'undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline striketough link  | alignleft aligncenter alignright alignjustify outdent indent | \
        styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
        table  |  | lineheight  ',
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    });
;
  }

  getContent(){
    var cnt = tinymce.editors['tinydemo'].getContent();
    console.log(cnt);
  }

  initChart(){
    let mychart;
    let l = this.list
    for(let key in l){
      mychart = document.getElementById(l[key].id);
      if(!mychart)continue;
      this.create_chart(mychart);
      
    }
  }

  create_chart(mychart){
    this.ngzone.runOutsideAngular(()=>{
      if(echarts.init(mychart)){
        mychart = echarts.init(mychart)
      }else{
  
        mychart = echarts.init(mychart)
      }
    })
    mychart = echarts.init(mychart)
    rtm3a.create_semicircle(parseInt((Math.random()*100).toString()),mychart);
  }


  getTemp(type){
    return this[type]
  }


  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer)
  
  }

}
