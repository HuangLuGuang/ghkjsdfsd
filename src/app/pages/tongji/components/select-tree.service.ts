import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SelectTreeService {

  constructor() { }

  // -------select-tree-type为 发布方，select-tree为接受方
  // 订阅的属性：用来给订阅方存储数据 是否关闭 select tree
  public currentMessage = new BehaviorSubject<boolean>(false);

  // 订阅的方法：用来接收发布方的数据
  changeMessage(message: boolean): void {
    this.currentMessage.next(message);
  } 

}
