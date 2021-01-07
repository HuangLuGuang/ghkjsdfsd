import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit,ICellRendererAngularComp {
  private params: any;
  constructor(private router:Router) { }
  url; // 设备详情的url
  parament; // url 的name 参数

  ngOnInit(): void {
    this.url = this.params.node.data.option.split("?")[0];
    this.parament = this.params.node.data.option.split("=")[1];
    console.warn("设备报表 url>>",this.url)
    console.warn("设备报表 parament>>",this.parament)
  }

  // goto_detail
  goto_detail(){
    // this.params.clicked(this.params.data);  device_hour_kpi_for_detail
    localStorage.setItem('device_hour_report_kpi_for_detail', JSON.stringify(this.params.node.data));
    this.router.navigate([this.url],{queryParams:{name: this.parament}})
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

}
