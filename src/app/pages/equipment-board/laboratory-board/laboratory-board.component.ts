import { Component, OnInit, ViewChild } from '@angular/core';
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
    'demo5':{
      id:'demo5',
      type:'Fan',
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
  @ViewChild('div')dic;

  constructor() { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '实验室布局';
    setTimeout(() => {
      this.initChart();
    }, 1000);
    this.timer = setInterval(f =>{
      this.initChart();
    },1000)
  }

  ngAfterViewInit(){
    console.log(this.dic)
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
        menubar: 'file edit insert view format table help export',// 工具栏分类 
        plugins: "table",
        toolbar: "table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
        menu: {
          file: { title: 'File', items: 'newdocument undo redo | preview | print ' },
          edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
          view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | fullscreen codesample' },
          insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
          format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
          tools: { title: 'Tools', items: 'spellcheckerlanguage | code wordcount' },
          table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
          help: { title: 'Help', items: 'help' },
          // 自定义菜单
          export: { title: '导出', items: 'word pdf' }
          },
    });

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
