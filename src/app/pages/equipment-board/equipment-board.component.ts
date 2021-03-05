import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router,Event } from '@angular/router';
import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';
import {  SYSMENU } from '../../appconfig';
import { create_img_16_9 } from './equipment-board';
import { EquipmentBoardService } from './serivice/equipment-board.service';

declare var $:any;
@Component({
  selector: 'ngx-equipment-board',
  templateUrl: './equipment-board.component.html',
  styleUrls: ['./equipment-board.component.scss']
})
export class EquipmentBoardComponent implements OnInit {
  is_not_fullscreen = true; // 是否处于全屏

  loading = false;

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

  //看板路由下所有菜单配置
  menu;
  // 按钮的显影
  b_show = {
    back:false,//返回按钮
    home:false,//主页按钮
  }

  subscribeList:any = {};
  

  constructor(private router:Router,private activateInfo:ActivatedRoute,
    private boradservice:EquipmentBoardService,) { }

  ngOnInit(): void {
    this.creatDateInterval();
    this.activateInfo.queryParams.subscribe(f =>{
      console.log(f);
    })
    this.subscribeList.resize = this.boradservice.chartResize().subscribe(f=>{
      this.resize();
    })
    var menu:any = localStorage.getItem(SYSMENU);
    if(menu){
      menu = JSON.parse(menu);
      this.menu = menu.filter(f =>f.link && f.link.includes('equipment'));
      this.b_show.home = menu.find(f => f.link && f.link== '/pages/home')?true:false;//是否有主页权限
    }
    
    
    this.subscribeList.load = this.boradservice.get_Load_Observable().subscribe(f=>{
      if(f.close){
        this.loading = f.close;
      }else{
        setTimeout(() => {
          this.loading = f.close;
        }, 500);
      }
    })
    
    //监听推出全屏
    document.addEventListener('fullscreenchange', this.fullscreenchange);
  }

  
  
  ngAfterViewInit(){ 
    let url = decodeURIComponent(window.location.pathname);
    setTimeout(() => {
      if (url.includes('first-level')){
        this.b_show.back = false;//最上级看板的影藏返回按钮
      }else{
        this.b_show.back = true;
      }
      $('ngx-equipment-board').height('100%');
      // $('ngx-equipment-board').width('99%');
    },100);

    // 监听路由
    this.isFirstLevel =  this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        url = event.url.split("/").pop();
        console.log(url)
          if (['first-level','equipment'].includes(url)){
            this.b_show.back = false;//最上级看板的影藏返回按钮
          }else{
            this.b_show.back = true;
          }
      }
    });

    // window.addEventListener('keydown',this.keydown);
    
  }

  //按钮事件
  // keydown= (event)=> {
  //   if (event.keyCode == 122) {
  //     // event.returnValue = false
  //     console.log('f11');
  //     //刷新表格
  //     this.boradservice.sendChartResize();
  //   }
  // }


  resize=()=>{
    setTimeout(() => {
      create_img_16_9();
    }, 1000)

  }

  fullscreenchange=(event) => {
    if(!document.fullscreenElement){
      this.is_not_fullscreen = true;
    }
  }



  //点击返回按钮
  return_btn_click(){
    //获取看板路由下所有菜单配置
    
    this.loading = true;
    console.log('返回上一级')
    let router_str = this.boradservice.back_router_str(this.menu)
    this.router.navigate([router_str]);
    //当为最上级看板时
  }

  //点击菜单
  menu_btn_click(){
    console.log('点击菜单');
    this.router.navigate(['/pages']);
  }

  //创建时间 定时
  creatDateInterval(){
    this.dateInterval = self.setInterval(f=>{
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
    document.removeEventListener('fullscreenchange', this.fullscreenchange);

    clearInterval(this.dateInterval);
    this.isFirstLevel.unsubscribe();
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

   // 全屏切换
   showAllTemplate(){
    var board = document.getElementsByTagName('ngx-equipment-board')[0];
    var sf = <Screenfull>screenfull;
    if (sf.isEnabled){ // sf.isEnabled 布尔值，判断是否允许进入全屏！
      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board);
      //刷新表格
      this.boradservice.sendChartResize();
      console.log('-------------按钮全屏功能-----------')

    }
  };

}
