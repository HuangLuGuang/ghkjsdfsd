import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Device } from '../../../../pages-popups/tongji/form_verification';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { BottomType, REG } from '../border-getway';

declare var layui;
declare var $;

@Component({
  selector: 'app-border-geteway-dialog-edit',
  templateUrl: './border-geteway-dialog-edit.component.html',
  styleUrls: ['./border-geteway-dialog-edit.component.scss']
})
export class BorderGetewayDialogEditComponent implements OnInit {
  @Input()title = '';
  @Input()set content(data){
    // 判断是否为json字符串
    if(data && this.isJSON(data)){
      this._content = JSON.parse(data);
    }else{
      this._content = data;
    }
  };
  @Input()type = '';

  btType = BottomType; 
  
  _content:any = {
    "location":"testlocation",//存放地点
    "groups":"testgroups",//科室
    "belonged":"zs",//归属人
    "edgeno":"no0001",//边缘网关编号
    "macaddress1":"ac-ad-ed-df",//物理地址1(WAN口MAC地址)
    "macaddress2":"ac-ee-ed-ef",//物理地址2(WAN口MAC地址)
    "ipaddress1":"129.123.2.2",//ip地址1(WAN口ip地址)
    "ipaddress2":"129.123.2.100"//ip地址2(WAN口ip地址)
  }
  loading = false; // 加载，当点击保存
  constructor(private dialogRef: NbDialogRef<BorderGetewayDialogEditComponent>,
    private http:HttpserviceService,private userinfo:UserInfoService,
    private publicservice:PublicmethodService
    ) { }

  ngOnInit() {
    this.frominit();
  }

  frominit(){
    var isThis = this;
    layui.use('form', function(){
      var form = layui.form;
      var layer = layui.layer
      form.render(); // 刷新all
      form.val("lay_from", isThis._content);

      form.verify({
        ipaddress:function(value, item){
          console.log(value)
          let status = [true,true];
          if (value &&!new RegExp(REG["ipv6"]).test(value)) {
            status[0] = false;
          }
          if (value &&!new RegExp(REG["ipv4"]).test(value)) {
            status[1] = false;
          }
          if(status.findIndex(f => f) <0){
            return 'ip地址格式有误'
          }
        },
        macaddress:function(value, item){
          if (value && !new RegExp(REG["mac"]).test(value)) {
            return '物理地址格式有误'
          }
        }
        ,sql:function(value,item){
          var special_sql = Device["special_sql"]["special_sql"];
          var special_str = Device["special_sql"]["special_str"];

          var sql = special_sql.test(value);
          var str = special_str.test(value);

          if (sql) {
            return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
          }
          if (!str) {
            return "设备名称不能有特殊字符！";
          }
        }
      });
      
      //监听提交
      form.on('submit(lay_from)', function(e){
        let data = form.val('lay_from');
        $(".submit_device").attr("disabled", "disabled");
        switch(isThis.type){
          case BottomType.ADD:
            isThis.add(data,layer);
            break;
          case BottomType.EDIT:
            isThis.edit(data,layer);
            break;
        }
        return false;
      });
    });
  }

  /**
   * 新增
   * @param data 
   * @param layer 
   */
  async add(data,layer){
// insert_edge_gateway
    this.loading = true;
    await this.http.callRPC('insert_edge_gateway','insert_edge_gateway',data).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0){
        this.loading = false;
        layer.alert('保存失败,请稍后再试', {
          title: '保存失败'
        });
        this.RecordOperation('新增',0,'边缘网关管理');
        return;
      };
      this.dialogRef.close({code:1,conent:'新增成功'});
    })
  }

  /**
   * 编辑
   * @param data 
   * @param layer 
   */
  async edit(data,layer){
    
    this.loading = true;
    data.id = this._content.id;
    data.updatedby = this.userinfo.getName();
    await this.http.callRPC('update_edge_gateway','update_edge_gateway',data).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0){
        this.loading = false;
        layer.alert('修改失败,请稍后再试', {
          title: '修改失败'
        })
        this.RecordOperation('修改',0,'边缘网关管理');
        return;
      };
      this.dialogRef.close({code:1,conent:'修改成功'});
    })
  }

  closedialog(){
    this.dialogRef.close(); 
  }
 
  cancel(){
     this.dialogRef.close(); 
  }

  isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
  }


  // option_record
  RecordOperation(option, result, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}
