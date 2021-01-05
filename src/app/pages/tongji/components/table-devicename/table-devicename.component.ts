import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-table-devicename',
  templateUrl: './table-devicename.component.html',
  styleUrls: ['./table-devicename.component.scss']
})
export class TableDevicenameComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  devicename; // 科室/功能组
  constructor() { }

  ngOnInit(): void {
    this.devicename = this.params.node.data.devicename;
  }

  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }

}
