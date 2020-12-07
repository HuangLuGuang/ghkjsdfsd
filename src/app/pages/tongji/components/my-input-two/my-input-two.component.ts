import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';

declare let $;

@Component({
  selector: 'ngx-my-input-two',
  templateUrl: './my-input-two.component.html',
  styleUrls: ['./my-input-two.component.scss']
})
export class MyInputTwoComponent implements OnInit {

  @Input('placeholder') myinput_placeholder:string;
  @Output() private inpuvalue2 = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    $(".delet_input_value2").hide()
    console.log("--------myinput_placeholder-----", this.myinput_placeholder)
  }
  
  ngAfterViewInit(){
    $("#employeenumber2").attr("placeholder", this.myinput_placeholder)
  }


  // 检测输入框值
  inputvalue = ""; 
  changeValue(value){
    if (this.inputvalue != ""){
      $(".delet_input_value2").show()
    }else{
      $(".delet_input_value2").hide()
    }
    // this.listen_shubiao();
  }

  // 点击图标删除数据
  del_input_value(){
    this.inputvalue = "";
    $(".delet_input_value2").hide();
    this.inpuvalue2.emit("");
  }

  // 重置 input
  reset_myinput(){
    this.del_input_value();
  }

  // 监听鼠标移入！移入创建、移出删除
  listen_shubiao(){
    // input
    var that = this;
    $("div").mouseenter(function (e) {
      if (that.inputvalue != ""){
        // 说明有值，这就需要在inpu中添加 图标！
        $(".delet_input_value2").show()
      }
    }).mouseout(function () {
      $(".delet_input_value2").hide();
      
    })
  }

  // 得到输入的
  getinput(){
    return this.inputvalue
  }

  // 监听enter
  onCodeup(event){
    var keycode = event.keyCode?event.keyCode: 0;
    switch (keycode) {
      case 13:
        // enter, 得到输入值，调用父组件函数搜索
        var inpuvalue2 = this.getinput();
        this.inpuvalue2.emit(inpuvalue2);
        break;
      case 27:
        break;
      default:
        break;
    }
  }

}
