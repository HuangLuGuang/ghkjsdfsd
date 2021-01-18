import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
declare let $;
@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, ICellRendererAngularComp {

  private params: any;
  status; // 科室/功能组
  constructor() { }

  ngOnInit(): void {
    // this.status = this.params.node.data.status;
    switch (this.params.node.data.status) {
      case 'running':
        this.status = '运行';
        break;
      case 'stop':
        this.status = '空闲';
        break;
      case 'warning':
        this.status = '维修';
        break;
      case 'placeon':
        this.status = '占位';
        break;
    }

  }
  ngAfterViewInit(){
  }






  agInit(params: any): void {
    this.params = params;
  }
  refresh(): boolean {
    return false;
  }

}
