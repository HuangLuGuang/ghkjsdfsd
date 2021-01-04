import { Component, OnInit } from '@angular/core';

declare let layui;
declare let $;

@Component({
  selector: 'ngx-year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.scss']
})
export class YearSelectComponent implements OnInit {

  constructor() { }
  default_year;

  ngOnInit(): void {
    // 得到默认年
    var date = new Date();
    this.default_year = date.getFullYear() + '年';
  }
  ngAfterViewInit(){
    this.init_year_select();
  }

  ngOnDestroy(){
    $("#year").remove();
  }

  // 初始化
  init_year_select(){
    var that = this;
    layui.use(['laydate'], function(){
      var laydate = layui.laydate
       //年选择器
      laydate.render({
        elem: '#year'
        ,type: 'year'
        ,btns: ['confirm']
        ,format: 'yyyy年'
        ,value: that.default_year

        ,done(value, date, endDate){
          that.default_year = value;
        }
      });
    })
  }

  // 得到年
  getselect(){
    return this.default_year;
  }

  // 重置日期，默认当前年份
  reset_year(){
    var date = new Date();
    this.default_year = date.getFullYear() + '年';
    this.init_year_select();
  }

  // 清空


}
