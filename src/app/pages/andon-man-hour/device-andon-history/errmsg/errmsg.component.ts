import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-errmsg',
  templateUrl: './errmsg.component.html',
  styleUrls: ['./errmsg.component.scss']
})
export class ErrmsgComponent implements OnInit, ICellRendererAngularComp {

  private params: any;
  errmsg; // 科室/功能组
  constructor() { }

  ngOnInit(): void {
    this.errmsg = this.params.node.data.errmsg;
  }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }

}
