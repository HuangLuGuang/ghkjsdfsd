import { Injectable, NgZone, OnInit, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LayoutService } from '../../../@core/utils';


@Injectable({
  providedIn: 'root'
})
export class EquipmentBoardService {
  //加载
  load_subject=  new Subject<LoadBean>();

  //图表刷新
  chart_subject=  new Subject<string>();

  constructor(private layoutService:LayoutService,private ngzone:NgZone) {
    window.addEventListener('resize',this.resize);

    this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.chart_subject.next('resize');
    })

    
  }

  

  public chartResize(){
    return this.chart_subject.asObservable();
  }

  //默认打开加载锁屏
  public sendLoad(data:LoadBean ){
    this.load_subject.next(data);
  }

  //获取订阅
  public get_Load_Observable(): Observable<LoadBean> {
    return this.load_subject.asObservable();
  }

  back_router_str(menus){
    if(!menus)return;
    let item;
    // console.log(window.location.pathname);//当前路由
    // console.log(menu);
    let path = decodeURIComponent(window.location.pathname);
    item = menus.find(f => f.link === path);
    if(item && item.parentid)
      item = menus.find(f=> item.parentid === f.id );
    
    return item && item.link?item.link:'/pages/equipment/first-level'
  }

  // i = 0;
  // run = false;
  timeout;
  resize=()=>{
    // if(this.timeout)clearTimeout(this.timeout);
    console.log(111111111111111111111111)
    this.timeout = setTimeout(() => {
      this.chart_subject.next('resize');
    },10);
    // var sf = <Screenfull>screenfull;

    // if(sf.isFullscreen){
    //   setTimeout(() => {
    //     console.log('-------------全屏------------------')
    //     this.chart_subject.next('resize');
    //   },10);
    // }else{
    //   setTimeout(() => {
    //     console.log(this.run)
    //     this.run = !this.run;
    //   },10);
    //   if(this.run){
    //     console.log('-------------退出全屏------------------')
    //     this.chart_subject.next('resize');
    //   }
    // }
  }

}

export interface LoadBean{
  close:boolean;//是否开启
}
