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

  selectedItem = '四月'
  constructor() {
  }
  ngOnInit(): void {
    var that = this;
    $("#target_month").on("click",function (e) {
      // 关闭科室/功能组
      if (that.xialaicon === "arrow-ios-upward-outline"){
        that.xialaicon = "arrow-ios-downward-outline"
      }else{
        that.xialaicon = "arrow-ios-upward-outline";
      }
    });
  }
  
  ngAfterViewInit(){
    // this.change_icon();
    // <nb-option class="month_option"  value="一月">1月</nb-option>
    var month_list = [
      { value: "一月", title: "1月"},
      { value: "二月", title: "2月"},
      { value: "三月", title: "3月"},
      { value: "四月", title: "4月"},
      { value: "五月", title: "5月"},
      { value: "六月", title: "6月"},
      { value: "七月", title: "7月"},
      { value: "八月", title: "8月"},
      { value: "九月", title: "9月"},
      { value: "十月", title: "10月"},
      { value: "十一月", title: "11月"},
      { value: "十二月", title: "12月"},
    ]
    var target_month = $("#target_month");
    month_list.forEach(item => {
      var month_option = `<option class="month_option"  value="${item.value}">${item.title}</option>`
      target_month.append(month_option);
    })
  }

  // target_month
  ngOnDestroy(){
    $("#target_month").remove()
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
    var month = $("#target_month").val()
    // var month = this.selectedItem
    return month;
  }
  // 重置为默认的
  reset_month(){
    // this.selectedItem = '一月'
    $("#target_month").val('一月')
    // $("#month option:first").prop("selected", "selected");
  }

}
