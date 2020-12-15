import { Component, OnInit } from '@angular/core';

declare let $;

// animation
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'ngx-my-message',
  templateUrl: './my-message.component.html',
  styleUrls: ['./my-message.component.scss'],
  // 添加动画元数据属性
  animations:[
    trigger('myMessage0', [
      transition(':enter', [
        style({opacity: 0,}), // backgroundColor: 'green',transform:"translateY(46px)" transform:"rotateY(360deg)",
        animate('2s', style({opacity:1,}))
      ]),
      transition(':leave', [
        animate('0.5s', style({opacity:0,}))
      ]),
    ]),

    
    trigger('myMessage2', [
      state('open', style({
        opacity: 1,
        backgroundColor: 'green'
      })),
      state('closed', style({
        // height: '46',
        // transform:"translateY(92px)",
        opacity: 0.5,
        backgroundColor: 'yellow'
      })),
      transition('open => closed', [
        animate('1.5s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),

  ],
})
export class MyMessageComponent implements OnInit {

  constructor() { }
  current_time;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    // 定时器
    this.current_time = setInterval(() =>{
      this.change_my_message();
    }, 3000);
  }

  ngOnDestroy(){
    clearInterval(this.current_time); // 销毁组件时，取消定时任务
  };

  isOpen = true;
  isEnter = false;

  // 模拟我的消息
  my_message = [
    {title: "Cras justo odio", id: 0},
    {title: "Dapibus ac facilisis in", id: 1},
    // {title: "Morbi leo risus", id: 2},
    // {title: "Porta ac consectetur ac", id: 3},
    // {title: "Vestibulum at eros", id: 4},
  ]

  // 定时任务！
  
  change_my_message(){
    var dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var yymm = y + '-' + mt + '-' + day + '  ' + h + ':' + m + ':' + s;

    console.log("^^^^^^^^^^^^^^^",this.my_message, yymm)
    this.my_message.unshift({title: "Zuo xiao xian" + yymm,id:9});
    this.my_message.pop();
  }
}
