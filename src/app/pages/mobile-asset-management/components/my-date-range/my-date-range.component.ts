import { Component, OnInit } from '@angular/core';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';

declare let $;

declare let layui;

@Component({
  selector: 'ngx-my-date-range',
  templateUrl: './my-date-range.component.html',
  styleUrls: ['./my-date-range.component.scss']
})
export class MyDateRangeComponent implements OnInit {

  constructor(private publicservice:PublicmethodService) { }

  ngOnInit(): void {
    // 初始化 日期范围！
    this.initdate();

    // 得到默认的日期
    var get_curr_mounth_one = this.publicservice.get_curr_mounth_one();
    var default_date = get_curr_mounth_one[0] + ' - ' + get_curr_mounth_one[1]
    console.log("得到默认的日期:>>",default_date); // 2020-12-01 - 2020-12-15
  }

  init_value = "2019-12-01 - 2020-12-21" // 默认日期

  // 初始化日期范围
  initdate(){
    var init_value = this.init_value;
    var that = this;
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      //日期范围 2010-10-01 2020-11-21
      laydate.render({
        elem: '#divice_kpi_report_date'
        ,range: true
        // 初始化日期范围 
        ,value: init_value
        // ,trigger: 'click'//呼出事件改成click  控件选择完毕回调
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
    console.log("date--->", date)
    var date_list = date[0]===""?[]:date;
    return date_list
  }

}
