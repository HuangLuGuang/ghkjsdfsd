import { Component, OnInit,Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';

declare let $;

declare let layui;
@Component({
  selector: 'ngx-device-detail-info',
  templateUrl: './device-detail-info.component.html',
  styleUrls: ['./device-detail-info.component.scss']
})
export class DeviceDetailInfoComponent implements OnInit {
  @Input() text: any;
  constructor(private dialogRef: NbDialogRef<DeviceDetailInfoComponent>,private http: HttpserviceService,
    private   publicservice: PublicmethodService,
    ) { }

  ngOnInit(): void {
    console.log("text*******************", this.text);
    var devicetitle = "设备(" + this.text["it"] + ")详情";
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

      // 表单赋值
      form.val('gpsdevicedetailinfo', {});

      // 监听提交
      form.on('submit(gpsdevicedetailinfo)', function(data){
        layer.alert(JSON.stringify(data.field), {
          title: '最终的提交信息'
        })

        return false;
      })


    })
  }



}
