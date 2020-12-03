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
    
  }
  
  ngAfterViewInit(){
    console.log("myinput_placeholder", this.myinput_placeholder)
    $("#employeenumber").attr("placeholder", this.myinput_placeholder)
  }


  // 检测输入框值
  inputvalue = ""; 
  changeValue(value){
    console.log("----检测输入框值-----",value, "*********\n\n\n")
    console.log("----检测输入框值-inputvalue----",this.inputvalue, "*********\n\n\n")
  }

  // 得到输入的
  getinput(){
    return this.inputvalue
  }
  

}
