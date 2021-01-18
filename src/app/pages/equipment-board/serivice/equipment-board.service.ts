import { Injectable } from '@angular/core';
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

}

export interface LoadBean{
  close:boolean;//是否开启
}
