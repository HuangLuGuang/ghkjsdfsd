import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DatePipe } from '@angular/common';
declare let layui;
declare let $;


// const flatpickr = require("flatpickr");
declare let flatpickr;
let Mandarin = require('../../../../assets/pages/tongji/flatpickr/zh.js').default.zh;

@Component({
  selector: 'ngx-target-hour-config',
  templateUrl: './target-hour-config.component.html',
  styleUrls: ['./target-hour-config.component.scss']
})
export class TargetHourConfigComponent implements OnInit {
  @Input() data: any;
  @Input() deveiceids: number[];


  constructor(private dialogRef: NbDialogRef<TargetHourConfigComponent>, private datepipe: DatePipe) { }

  ngOnInit(): void {
    console.log("data:", this.data);
    console.log("deveiceids:", this.deveiceids);
    flatpickr.localize(Mandarin);
    // 参考时间
  }

  ngAfterViewInit(){
    flatpickr("#target_startdate",{
      mode: "multiple",
      dateFormat: "Y-m-d",
      inline: true, // 使用inline选项以始终打开状态显示日历。
      onClose:function(selectedDates, dateStr, instance){
        console.log("selectedDates, dateStr, instance",selectedDates, dateStr, instance)
      }
    })
    this.init_form();
  }

  // ngOnDestroy(){
  //   $("#target_startdate").remove();
  // }


  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
  }
  
  // 取消
  cancel(){
    this.dialogRef.close(false);
  }

  // 初始化表单
  init_form(){
    var that = this;
    // this.get_stand_date();
    // layui.use(['form', 'laydate'], function(){
    //   var laydate = layui.laydate
    //   ,form = layui.form
    //   // 开始时间，得到时间为：that.data["year"] + that.data["month"] 是否范围是：
    //   laydate.render({
    //     elem:"#target_startdate"
    //     ,trigger: 'click' //采用click弹出
    //   })
    // })

    
  }

  // 得到参考时间
  get_stand_date(){
    var year = this.data["year"];
    var month = this.data["month"];
    var day = 15;
    // ===============最小时间的范围，上个月的15号---本月底
    // 最小值,上个月的 15号
    var min_date = new Date();
    if (month - 1 < 1){ // month 为1月
      min_date.setFullYear(min_date.getFullYear() - 1); // 前一年的
      min_date.setMonth(11); // 前一年的 12月
    }else{
      min_date.setMonth(month - 1); // 前一个月的
    }
    var min_date_value = min_date.getFullYear() + "-" + (Number(min_date.getMonth()) + 1) + "-" + 15;
    min_date_value = this.datepipe.transform(min_date_value, 'yyyy-MM-dd');
    // 最大值：本月的最后一天
    var max_date = new Date(Number(year), month, 0);
    var max_date_value = max_date.getFullYear() + '-' + (Number(max_date.getMonth()) + 1) + '-' + max_date.getDate();
    max_date_value = this.datepipe.transform(max_date_value, 'yyyy-MM-dd');
    console.log("得到参考时间", this.data)
    console.log("得到参考时间 最小时间", min_date_value)
    console.log("得到参考时间 最大时间", max_date_value)
    // ===============最大时间的范围，本月15号---下个月底
    return {
      min: min_date_value,
      max: max_date_value
    }
  }

}
