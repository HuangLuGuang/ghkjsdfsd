import { Component, OnInit, Input } from '@angular/core';

declare let $;

@Component({
  selector: 'ngx-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss']
})
export class MyInputComponent implements OnInit {
  @Input('placeholder') myinput_placeholder:string;
  constructor() { }

  ngOnInit(): void {
    $(".delet_input_value").hide()
    
  }
  
  ngAfterViewInit(){
    console.log("myinput_placeholder", this.myinput_placeholder)
    $("#employeenumber").attr("placeholder", this.myinput_placeholder)
  }


  // 检测输入框值
  inputvalue = ""; 
  changeValue(value){
    console.log("----检测输入框值-----",value, "*********\n\n\n");
    console.log("----检测输入框值-inputvalue----",this.inputvalue, "*********\n\n\n");
    if (this.inputvalue != ""){
      $(".delet_input_value").show()
    }else{
      $(".delet_input_value").hide()
    }
    // this.listen_shubiao();
  }

  // 监听鼠标移入！移入创建、移出删除
  listen_shubiao(){
    // input
    var that = this;
    $("#employeenumber").mouseenter(function (e) {
      console.log("******inputvalue", that.inputvalue)
      if (that.inputvalue != ""){
        // 说明有值，这就需要在inpu中添加 图标！
        $(".delet_input_value").show()
      }
    }).mouseout(function () {
      $(".delet_input_value").hide();
      
    })
  }

  // 得到输入的
  getinput(){
    return this.inputvalue
  }
  

}
