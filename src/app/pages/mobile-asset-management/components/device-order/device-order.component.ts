import { Component, OnInit,Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';

declare let $;

declare let layui;

@Component({
  selector: 'ngx-device-order',
  templateUrl: './device-order.component.html',
  styleUrls: ['./device-order.component.scss']
})
export class DeviceOrderComponent implements OnInit {
  @Input() text: any;
  constructor(private dialogRef: NbDialogRef<DeviceOrderComponent>,private http: HttpserviceService,
    private   publicservice: PublicmethodService,
  ) { }

  // 设备指令---指令说明
  device_order_info = {
    '0': '锁住车辆，不让启动',
    '1': 'SOS号码xxxxxx',
    '2': '解锁锁住车辆，让启动',
    '3': '单次定位808等xxxxx',
    '4': '查询终端属性',
  }


  ngOnInit(): void {
    console.log("text*******************", this.text);
    var devicetitle = "设备(" + this.text["it"] + ")指令";
    $(".devicetitle").text(devicetitle);
  }

  ngAfterViewInit(){
    this.layuiform();
  }


  // × 关闭diallog   及关闭弹框
  closedialog(){
    this.dialogRef.close(false);
  }
  
  // 取消
  cancel(){
    this.dialogRef.close(false);
  }

  


  // 表单 form
  layuiform(){
    var that = this;
    layui.use('form', function(){
      var form = layui.form,
      layer = layui.layer;
      // 表单验证
      form.verify();

      // 刷新select选择框渲染
      form.render('select');

      // 表单赋值
      form.val('gpsdeviceorder', {});

      // 监听表单中的select
      form.on('select(deviceorder)', function(data){
        console.log("得到被选中的值", data.value); //得到被选中的值
        var deviceorder_info = that.device_order_info[data.value];
        $(".deviceorderinfo").text(deviceorder_info);
      });

      // 监听提交
      form.on('submit(gpsdeviceorder)', function(data){
        layer.alert(JSON.stringify(data.field), {
          title: '最终的提交信息'
        })

        return false;
      })


    })
  }

}
