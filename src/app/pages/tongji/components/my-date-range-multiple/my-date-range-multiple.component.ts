import { Component, OnInit } from '@angular/core';
declare let layui;

@Component({
  selector: 'ngx-my-date-range-multiple',
  templateUrl: './my-date-range-multiple.component.html',
  styleUrls: ['./my-date-range-multiple.component.scss']
})
export class MyDateRangeMultipleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.test_mul_date();
  }

  ngAfterViewInit(){
  }

  // 测试日期多选
  test_mul_date(){
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      //执行一个laydate实例
      laydate.render({
        elem: '.laydate-test-area' //指定元素
        ,type: 'date' // 选择器类型
        ,value: '2020-01-01, 2020-02-02,2020-03-03,  2020-04-04,2020-05-05,2020-06-06'
        ,multiple:','
        ,circleMark: true
        ,trigger: 'click' //采用click弹出
        ,format:'yyyy-MM-dd'// 日期格式
      });
    });
  }

}
