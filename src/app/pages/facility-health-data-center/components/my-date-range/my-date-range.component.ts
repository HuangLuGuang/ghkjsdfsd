import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../@core/utils';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';

declare let $;

declare let layui;

@Component({
  selector: 'ngx-my-date-range',
  templateUrl: './my-date-range.component.html',
  styleUrls: ['./my-date-range.component.scss']
})
export class MyDateRangeComponent implements OnInit {

  constructor(private publicservice: PublicmethodService, private layoutService: LayoutService, private datepip: DatePipe) { 
    var start_end = this.get_start_end();
    // "2019-12-01 - 2020-12-21"
    this.init_value = start_end.start + ' - ' + start_end.end
  }

  ngOnInit(): void {

    this.layoutService.onInitLayoutSize().subscribe(f=>{
      let key_index = document.querySelector('.key-index');
      if(key_index) echarts.init(key_index).resize();
      let device_rate = document.querySelector('.device-rate');
      if(device_rate) echarts.init(device_rate).resize();
      let nibo_map = document.querySelector('.nibo_map');
      if(nibo_map) echarts.init(nibo_map).resize();

      let geely_info = document.querySelector('.geely-info');
      if(geely_info) echarts.init(geely_info).resize();
    })
    

    // 初始化 日期范围！
    this.initdate();

    // 得到默认的日期
    var get_curr_mounth_one = this.publicservice.get_curr_mounth_one();
    var default_date = get_curr_mounth_one[0] + ' - ' + get_curr_mounth_one[1]
    // console.log("得到默认的日期:>>",default_date); // 2020-12-01 - 2020-12-15

    
  }
  ngAfterViewInit(){
    
  }

  ngOnDestroy(){
    $(".datacenter_report_date").remove();
  }
  // init_value = "2019-12-01 - 2020-12-21" // 默认日期
  init_value; // 默认日期

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
        ,format: "yyyy-MM-dd"
        ,btns: ['confirm']
        // 初始化日期范围 
        ,value: that.init_value
        ,trigger: 'click' //采用click弹出
        ,done: function(value, date, endDate){
          console.log(value); //得到日期生成的值，如：2017-08-18
          that.init_value = value;
          if (value === ""){
            // console.log("得到初始的日期时间对象  已经清空了:",that.init_value , "value", this.value  ); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            this.value = that.init_value
          }
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

  // 重置日期范围 到默认的日期！
  reset_mydate(){
    var start_end = this.get_start_end();
    // "2019-12-01 - 2020-12-21"
    this.init_value = start_end.start + ' - ' + start_end.end;
    this.initdate()
  }

  // 得到 日期范围： 本月1号-到现在
  get_start_end(){
    var curr_date = new Date();
    var curr_year = curr_date.getFullYear();
    var curr_month = curr_date.getMonth() + 1;

    var start = this.datepip.transform(new Date(curr_year, curr_month-1, 1), 'yyyy-MM-dd'); // start
    var end = this.datepip.transform(new Date(curr_year, curr_month, 0), 'yyyy-MM-dd');   // end
    return {
      start: start,
      end: end
    }
  }

}
