import { Component, OnInit,ViewChild } from '@angular/core';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';

@Component({
  selector: 'ngx-device-andon-status-info',
  templateUrl: './device-andon-status-info.component.html',
  styleUrls: ['./device-andon-status-info.component.scss']
})
export class DeviceAndonStatusInfoComponent implements OnInit {
  @ViewChild("groups_devieces") groups_devieces:any;
  constructor(private publicservice: PublicmethodService,private userinfo: UserInfoService,) { }

  ngOnInit(): void {
  }

  // 搜索
  query(){
    var groups_devieces = this.groups_devieces.get_form_val();
    console.error("++++++++++++++groups_devieces",groups_devieces);
  }





  success(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:data});
  }
  danger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent: data});
  }

  // option_record
  RecordOperation(option, result,infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }
  }

}
