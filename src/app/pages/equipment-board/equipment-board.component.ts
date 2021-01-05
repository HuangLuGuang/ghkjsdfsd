import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router,Event } from '@angular/router';
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';
import { LayoutService } from '../../@core/utils';
import { create_img_16_9 } from './equipment-board';

declare var $:any;
@Component({
  selector: 'ngx-equipment-board',
  templateUrl: './equipment-board.component.html',
  styleUrls: ['./equipment-board.component.scss']
})
export class EquipmentBoardComponent implements OnInit {
  is_not_fullscreen = true; // 是否处于全屏

  title = '智慧实验室(G-iLAB)';//标题
  isFirstLevel;
  date = {
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minute: 0,
    second: 0,
  };//时间
  dateInterval:any;//定时器

  constructor(private router:Router,private activateInfo:ActivatedRoute,private layoutService:LayoutService) { }

  ngOnInit(): void {
    this.creatDateInterval();
    this.activateInfo.queryParams.subscribe(f =>{
      console.log(f);
    })
    window.addEventListener('resize',this.resize)
    this.layoutService.onInitLayoutSize().subscribe(f=>{
      create_img_16_9();
    })

    // this.router.events.subscribe((e:any) => {
    //   if(e instanceof NavigationEnd){
    //     console.log(e.url);
    //     let arr = e.url.split('/');
    //     //判断哪些看板需要哪些功能
    //     console.log("判断哪些看板需要哪些功能",e.url)
        
            
    //   }
    // })
  }
  
  ngAfterViewInit(){
    // 监听路由
    this.isFirstLevel =  this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        var url = event.url.split("/").pop();
        if (url === 'first-level'){
          $("#head_title").text("智慧实验室(G-iLAB)")
        }
      }
    });
  }



  resize=()=>{
    setTimeout(() => {
      create_img_16_9();
    }, 1000)

  }


  //点击返回按钮
  return_btn_click(){
    // this.router.
    console.log('返回上一级')
    window.history.back();
  }

  //点击菜单
  menu_btn_click(){
    console.log('点击菜单');
    this.router.navigate(['/pages']);
  }

  //创建时间 定时
  creatDateInterval(){
    this.dateInterval = setInterval(f=>{
      this.date = this.getDate();
    },1000)
  }
  
	//获取当前时间字符串
  get_now_date_str(){
	  let d = this.date;
	  return d.year+'-'+(d.month<10?'0'+d.month:d.month)+'-'+(d.day<10?'0'+d.day:d.day)+' '+(d.hours<10?'0'+d.hours:d.hours)+':'
	  +(d.minute<10?'0'+d.minute:d.minute)+':'+(d.second<10?'0'+d.second:d.second);
  }
  
  //获取当前时间对象
  getDate(){
    var date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDate(),
      hours: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    }
  }

  //组件销毁
  ngOnDestroy(){
    clearInterval(this.dateInterval);
    window.removeEventListener('resize',this.resize);
    this.isFirstLevel.unsubscribe();
  }

   // 全屏切换
   showAllTemplate(){
    // var board = document.getElementById('equipment')
    var board = document.getElementsByTagName('ngx-equipment-board')[0];
    var sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board)
    }
  };

}
