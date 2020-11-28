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
  constructor(private router:Router) { }
  url; // 设备详情的url


  ngOnInit(): void {
    this.url = this.params.node.data.option;
  }

  // kpi 详情
  kpidetail(){
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
