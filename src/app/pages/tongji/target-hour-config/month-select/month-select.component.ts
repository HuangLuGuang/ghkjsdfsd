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
  xialaicon = "arrow-ios-downward-outline";

  selectedItem = '一月'

  constructor() {
    
  }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    // this.change_icon();

  }

  // 点击事件
  change_icon(){
    var that = this;
    $(".month_select").on("click", function() {
      if (that.xialaicon === "arrow-ios-upward-outline"){
        that.xialaicon = "arrow-ios-downward-outline"
      }else{
        that.xialaicon = "arrow-ios-upward-outline";
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
    // $("#month option:first").prop("selected", "selected");
  }

}
