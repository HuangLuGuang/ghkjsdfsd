import { Component, OnInit } from '@angular/core';

declare let $;

declare let layui;

@Component({
  selector: 'ngx-my-date-range',
  templateUrl: './my-date-range.component.html',
  styleUrls: ['./my-date-range.component.scss']
})
export class MyDateRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // 初始化 日期范围！
    this.initdate();
  }
  ngAfterViewInit(){
  }

  ngOnDestroy(){
    $(".datacenter_report_date").remove();
  }

  init_value = "2019-12-01 - 2020-12-21" // 默认日期

  // 初始化日期范围
  initdate(){
    var init_value = this.init_value;
    // console.log("初始化日期范围" , init_value)
    var that = this;
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      //日期范围 2010-10-01 2020-11-21
      laydate.render({
        elem: '.datacenter_report_date'
        ,range: true
        // 初始化日期范围 
        ,value: init_value
        ,trigger: 'click' //采用click弹出
        ,done: function(value, date, endDate){
          console.log(value); //得到日期生成的值，如：2017-08-18
          that.init_value = value;
          console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
          console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
        
      });


    })
  }

  // 得到日期
  getselect(){
    var date_range = this.init_value;
    var date = date_range.split(' - ');
    // console.log("date--->", date)
    var date_list = date[0]===""?[]:date;
    return date_list
  }

}
