import { Component, OnInit, ViewChild } from '@angular/core';

import { facility_health_SETTINGS } from './facility_health_data_center_table';

import {LocalDataSource} from "@mykeels/ng2-smart-table";
import { UserInfoService } from '../../services/user-info/user-info.service';
import { HttpserviceService } from '../../services/http/httpservice.service';

@Component({
  selector: 'ngx-facility-health-data-center',
  templateUrl: './facility-health-data-center.component.html',
  styleUrls: ['./facility-health-data-center.component.scss']
})
export class FacilityHealthDataCenterComponent implements OnInit {
  @ViewChild("mytable") mytable: any;
  @ViewChild("eimdevicetpye") eimdevicetpye: any; // 设备类型下拉框
  @ViewChild("myinput") myinput: any; // 资产编号输入框
  @ViewChild("data_range") data_range: any; // 日期选择器

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

  loading = false;  // 加载
  refresh = false; // 刷新tabel
  button; // 权限button

  source:LocalDataSource
  // 设备KPI统计 table数据
  table_data = {
    settings: facility_health_SETTINGS,
    source: new LocalDataSource(),
  };

  constructor(private userinfo:UserInfoService,private http:HttpserviceService,

  ) { 
    // 会话过期
    localStorage.removeItem("alert401flag");
    // 下拉框
    this.get_tree_selecetdata()

  }

  ngOnInit(): void {   // 初始化table
    this.table_data.source["data"] = [
      { id: 1, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
      { id: 2, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 3, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 4, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "报警",  operation: "确认" },
      { id: 5, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 6, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "报警",  operation: "确认" },
      { id: 7, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 8, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
      { id: 9, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 10, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 11, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 12, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 13, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 14, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 15, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
      { id: 16, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 17, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 18, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 19, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 20, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 21, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 22, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "普通",  operation: "确认" },
      { id: 23, deparrtment: "结构试验室", deviceName: "四立柱", devicePosition: "结构试验室", alertContent: "油温超限", alertTime: "2020-01-20 14:09:08", status: "已推送处理", handleTime: "2020-01-20 14:09:40", alertGrade: "严重报警",  operation: "确认" },
    ]
  }

  // button按钮
  action(actionmethod){
    var method = actionmethod.split(":")[1];
    switch (method) {
      // case 'add':
      //   this.add();
      //   break;
      // case 'del':
      //   this.del();
      //   break;
      // case 'edit':
      //   this.edit();
      //   break;
      case 'query':
        this.query();
        break;
      // case 'import':
      //   this.importfile();
      //   break;
      case 'download':
        this.download('设备报警')
        break;
    }
  }

  // 重置、刷新
  refresh_table(){
    this.refresh = true;
    this.loading = true;
    // this.gridData = [];

    // 取消选择的数据 delselect
    this.myinput.del_input_value();
    // this.groups_func.dropselect();
    this.eimdevicetpye.dropselect();
  }


  // 得到下拉框的数据
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.userinfo.getEmployeeID(),
    }
    this.http.callRPC("deveice","dev_get_device_groups",columns).subscribe(result=>{
      var res = result["result"]["message"][0]
      console.log("得到下拉框的数据---------------->", res)
      if (res["code"] === 1){
        // var groups = res["message"][0]["groups"];
        // this.groups_func.init_select_tree(groups);
        var eimdevicetpyedata = res["message"][0]["type"];
        this.eimdevicetpye.init_select_trees(eimdevicetpyedata);
      }
    })
  }

  // input 传入的值
  inpuvalue(inpuvalue){
    if (inpuvalue != ""){
      console.log("传入的值设备名称----->",inpuvalue);
      this.query(inpuvalue);
    }
  }

  // 搜索按钮
  query(inpuvalue?){
    var assetnumber;
    if (inpuvalue){
      assetnumber = inpuvalue;
    }else{
      assetnumber = this.myinput?.getinput();// 设备名称
    }
    // 设备类型
    var device_tpye_data = this.eimdevicetpye.getselect();

    // 日期范围
    var daterange_data = this.data_range.getselect()
    console.log(
      "搜索：assetnumber", assetnumber, 
      "daterange_data:",daterange_data,
      "device_tpye_data",device_tpye_data
    )
  }

  // 导出文件
  download(title){
    // this.agGrid.download(title);
  };


}
