import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


import { menu_button_list } from '../../../appconfig';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../../services/user-info/user-info.service';

import { ManKpiReport2Service } from './man-hour-kpi-report2.service';


declare let layui;

declare let $;

@Component({
  selector: 'ngx-man-hour-kpi-report2',
  templateUrl: './man-hour-kpi-report2.component.html',
  styleUrls: ['./man-hour-kpi-report2.component.scss']
})
export class ManHourKpiReport2Component implements OnInit,OnDestroy {

  // 导出文件名
  filename;

  // 传递给日期组件的
  man_hourkpi = {
    divice_kpi_report: false,
    test_task_manage: false,
    man_hourkpi: true,
  };

  // 日期范围
  date_ranges = "device_kpi_date_range"
    
  constructor(private publicservice: PublicmethodService, private router: Router, private mankpiservice: ManKpiReport2Service,
    private userinfo: UserInfoService) { }



  ngOnInit(): void {
  }

  ngOnDestroy(){
    // 删除 man-hour-kpi-report2-buttons
    localStorage.removeItem("man-hour-kpi-report2-buttons");
  }
  // kpi报表
  kpireport(){
    this.router.navigate(['/pages/tongji/manHourKpiReport/kpitable'])
  }
  // kpi 详情
  kpidetail(){
    this.router.navigate(['/pages/tongji/manHourKpiReport/kpidetail'])
  }



  // 导出文件
  download(){
    // 发布方
    this.mankpiservice.changeMessage(true)

  };

  // option_record
RecordOperation(option, result,infodata){
  console.warn("infodata==============>", infodata)
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
