import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentBoardService {
  //加载
  load_subject=  new Subject<LoadBean>();

  constructor() { }

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
    
    return item.link?item.link:'/pages/equipment/second-level'
  }

}

export interface LoadBean{
  close:boolean;//是否开启
}
