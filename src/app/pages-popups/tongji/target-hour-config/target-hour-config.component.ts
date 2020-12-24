import { Component, OnInit, Input, } from '@angular/core';
import { NbDialogRef, } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
declare let layui;
declare let $;

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

  selectedDates: any[];

  myinput_placeholder = "每日目标时长(h)";

  TABLE = "device";
  METHOD = "dev_get_target_time_update"; // 批量修改工时！

  lastupdatedby = this.userinfo.getLoginName(); // 域账号
  employeeid = this.userinfo.getEmployeeID(); // 用户id


  constructor(private dialogRef: NbDialogRef<TargetHourConfigComponent>, private datepipe: DatePipe,
    private userinfo:UserInfoService, private http: HttpserviceService, private publicservice: PublicmethodService
  ) { }

  ngOnInit(): void {
    $(".delet_input_value").hide()

    console.log("data:", this.data);
    console.log("deveiceids:", this.deveiceids);// 选择的行的数据
    flatpickr.localize(Mandarin);
    // 参考时间
  }

  ngAfterViewInit(){
    var that = this;
    flatpickr("#target_startdate",{
      mode: "multiple",
      dateFormat: "Y-m-d",
      inline: true, // 使用inline选项以始终打开状态显示日历。
      showMonths:1, // 在显示日历时，同时显示月数
      onClose:function(selectedDates, dateStr, instance){
        console.log("selectedDates, dateStr, instance",selectedDates, dateStr, instance)
      },
      onChange:function(selectedDates, dateStr, instance){
        // console.log("onChange>>>selectedDates, dateStr, instance",selectedDates, dateStr, instance);
        console.log("选择的日期》》》",selectedDates);
        that.selectedDates = selectedDates;
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


   // 检测输入框值
   inputvalue = ""; 
   changeValue(value){
     if (this.inputvalue != ""){
       $(".delet_input_value").show()
     }else{
       $(".delet_input_value").hide()
     }
   }

  // 点击图标删除数据
  del_input_value(){
    $(".delet_input_value").hide();
    $(".target_time").val("")
  }

  // 确定
  confirm(){
    console.log("确定，得到选择的数据", this.selectedDates);
    console.log("确定，每日目标时长", $(".target_time").val());
    if (this.selectedDates !== undefined && $(".target_time").val() !== ""){
      var numberdaily = this.selectedDates.length; // 计入的天数
      var targettime = Number($(".target_time").val());   // 每日目标时长
      var devicelist = Object.assign([],this.deveiceids);
      devicelist.forEach(item=>{
        item["numberdaily"] = numberdaily;
        item["targettime"] = targettime;
        item["lastupdatedby"] = this.lastupdatedby;
      })
      console.log("---要修改的数据：", devicelist);
      // 修改数据！
      var table = this.TABLE;
      var method = this.METHOD;
      this.http.callRPC(table, method, devicelist).subscribe(result=>{
        var tabledata = result["result"]["message"][0];
        if (tabledata["code"] === 1){
          this.dialogRef.close(true);
          this.RecordOperation('修改', 1,  "目标工时");
          this.success();
        }else{
          this.RecordOperation('修改', 0,  "目标工时");
          var info = tabledata["message"];
          this.danger(info)
        }
      })
    }else{// 必填
      console.log("null");
      this.not_null();
    }
  }

  // 弹出提示，不为空！
  not_null(){
    layui.use('layer',function() {
      var layer = layui.layer
      layer.open({
        // type: 1,
        title: ["提示","padding: 1rem 1.5rem;border-bottom: 1px solid #edf1f7;border-top-left-radius: 0.25rem;border-top-right-radius: 0.25rem;color: #222b45;font-family: Open Sans, sans-serif;font-size: 0.9375rem;font-weight: 600;line-height: 0.5rem;background: #fff;"]
        // ,closeBtn: false
        // ,area: '300px;'
        // ,shade: 0.8
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['关闭']
        ,btnAlign: 'r'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: "每日目标时长或实际工作日不能为空！"
        ,yes:function () {
          layer.closeAll();
        }

      })
    })
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

  // 删除
  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"修改成功"});
  }
  danger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"修改失败：" + data});
  }

  // option_record
  RecordOperation(option, result,infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.employeeid;
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }
  }

}
