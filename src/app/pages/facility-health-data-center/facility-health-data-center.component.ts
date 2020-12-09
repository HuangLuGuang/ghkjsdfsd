import { Component, OnInit, ViewChild } from '@angular/core';

import { facility_health_SETTINGS } from './facility_health_data_center_table';

import {LocalDataSource} from "@mykeels/ng2-smart-table";
import { UserInfoService } from '../../services/user-info/user-info.service';
import { HttpserviceService } from '../../services/http/httpservice.service';
import { PublicmethodService } from '../../services/publicmethod/publicmethod.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-facility-health-data-center',
  templateUrl: './facility-health-data-center.component.html',
  styleUrls: ['./facility-health-data-center.component.scss']
})
export class FacilityHealthDataCenterComponent implements OnInit {
  

  // 下拉框---部门
  departments = {
    name: "部门信息",
    placeholder: '请选择部门',
    groups:[
      { title: '动力', datas: [{ name: '动力-1' },{ name: '动力-2' },{ name: '动力-3' },{ name: '动力-4' }] },
      { title: '资产', datas: [{ name: '资产-1' },{ name: '资产-2' },{ name: '资产-3' },{ name: '资产-4' }] },
      { title: '新能源', datas: [{ name: '新能源-1' },{ name: '新能源-2' },{ name: '新能源-3' },{ name: '新能源-4' }] },
    ]
  };

  // 下拉框---设备类型
  eimdevicetpye_placeholder = "请选择设备类型";
  devicetpye = {
    placeholder: "请选择设备类型",
    name: '设备类型',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }
  // 下拉框---资产编号
  myinput_placeholder = "请输入资产编号";
  assetnumber = {
    placeholder: "请选择资产编号",
    name: '资产编号',
    datas: [
      { name: 'GT-2030-123' },
      { name: 'GT-2030-149' },
      { name: 'GT-2030-230' },
      { name: 'GT-2030-359' },
      { name: 'GT-2030-666' },
    ]
  }

 

  source:LocalDataSource
  // 设备KPI统计 table数据
  table_data = {
    settings: facility_health_SETTINGS,
    source: new LocalDataSource(),
  };

  constructor(private userinfo:UserInfoService,private http:HttpserviceService,
    private publicservice:PublicmethodService,private route: Router

  ) { 
    // 会话过期
    localStorage.removeItem("alert401flag");
  }
  real_time = "info";
  history = "basic";

  // 实时报警
  goto_real_time(){
    this.real_time = "info";
    this.history = "basic";
    this.route.navigate(["/pages/datacenter/real-time"])
  }
  // 历史报警
  goto_history(){
    this.real_time = "basic";
    this.history = "info";
    this.route.navigate(["/pages/datacenter/history"])
  }

  ngOnInit(): void {   
    // 得到当前的url
    this.publicservice.get_current_url().subscribe((result:string)=>{
      var last_pathname = result.split('/');
      console.log("得到当前的url", result, last_pathname,last_pathname.length);
      console.log("last_pathname[last_pathname.length]", last_pathname[last_pathname.length -1]);
      if (last_pathname[last_pathname.length - 1] === "real_time"){
        this.real_time = "info";
        this.history = "basic";
      }else if(last_pathname[last_pathname.length - 1] === "history"){
        this.real_time = "basic";
        this.history = "info";
      }
    })
    
    
  }

  ngAfterViewInit(){
    
  }




}
