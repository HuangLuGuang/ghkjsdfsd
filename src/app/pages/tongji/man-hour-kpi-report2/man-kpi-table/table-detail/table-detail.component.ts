import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit,ICellRendererAngularComp {
  private params: any;
  constructor(private router:Router) {
    // 会话过期
    localStorage.removeItem("alert401flag");
   }
  url; // 设备详情的url


  ngOnInit(): void {
    this.url = this.params.node.data.option;
  }

  // kpi 详情
  kpidetail(){
    console.log("工时报表--kpi详情", this.params.node.data)
    localStorage.setItem('kpi_for_detail', JSON.stringify(this.params.node.data))
    this.router.navigate([this.url])
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

}