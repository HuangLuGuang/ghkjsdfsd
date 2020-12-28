import { Component, OnInit } from '@angular/core';
declare let $;
declare let layui;
@Component({
  selector: 'ngx-month-select',
  templateUrl: './month-select.component.html',
  styleUrls: ['./month-select.component.scss']
})
export class MonthSelectComponent implements OnInit {

  // 下拉 icon
  xialaicon_month = "arrow-ios-downward-outline"

  selectedItem = '一月'

  constructor() {
    
  }
  
  ngOnInit(): void {
    // this.change_icon();
  }
  
  ngAfterViewInit(){
    

  }

  // 点击事件
  change_icon(){
    var that = this;
    $("#month").on("click", function() {
      if (that.xialaicon_month == "arrow-ios-downward-outline"){
        that.xialaicon_month = "arrow-ios-upward-outline"
      }else{
        that.xialaicon_month = "arrow-ios-downward-outline";
      }
    })
  }

  // 得到选择的月份
  getselect(){
    // var month = $("#month").val()
    var month = this.selectedItem
    return month;
  }

  // 重置为默认的
  reset_month(){
    this.selectedItem = '一月'
    // $("#month option:first").prop("selected", "selected")
  }

}
