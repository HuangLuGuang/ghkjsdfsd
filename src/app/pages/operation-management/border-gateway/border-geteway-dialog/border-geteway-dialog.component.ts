import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpserviceService } from '../../../../services/http/httpservice.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { BottomType } from '../border-getway';
declare var layui;

@Component({
  selector: 'app-border-geteway-dialog',
  templateUrl: './border-geteway-dialog.component.html',
  styleUrls: ['./border-geteway-dialog.component.scss']
})
export class BorderGetewayDialogComponent implements OnInit {

  
  @Input()title = '';
  @Input()set content(data){
    if(data){
      this._content = JSON.parse(data);
    }
  };
  @Input()type = '';
  layer = layui.layer
  btType = BottomType; 
  _content:any = {};
  loading = false; // 加载，当点击保存
  
  constructor(private dialogRef: NbDialogRef<BorderGetewayDialogComponent>,
    private http:HttpserviceService,private userinfo:UserInfoService,
    private publicservice:PublicmethodService
    ) { }

  ngOnInit(): void {
    
  }
  
 

  closedialog(){
   this.dialogRef.close(); 
  }

  cancel(){
    this.dialogRef.close(); 
  }

  async carried(){
    // select delete_edge_gateway('{
    //   "id":1305,
    //   "deletedby":"huanglg"
    //  }')
    await this.http.callRPC('delete_edge_gateway','delete_edge_gateway'
    ,{id:this._content.id,deletedby:this.userinfo.getName()}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0){
        this.loading = false;
        this.layer.alert('删除失败,请稍后再试', {
          title: '删除失败'
        })
        this.RecordOperation('删除',0,'边缘网关管理');
        return;
      };
      this.dialogRef.close({code:1,conent:'删除成功'});

    })
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
