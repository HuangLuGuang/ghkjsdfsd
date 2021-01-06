import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-tran-iscalkpi',
  templateUrl: './tran-iscalkpi.component.html',
  styleUrls: ['./tran-iscalkpi.component.scss']
})
export class TranIscalkpiComponent implements OnInit,ICellRendererAngularComp {
  private params: any;
  iscalkpi;
  constructor() { }

  ngOnInit(): void {
    var iscalkpi = this.params.node.data.iscalkpi;
    switch (iscalkpi) {
      case 1:
        this.iscalkpi = '是'
        break;
    
      default:
        this.iscalkpi = '否'
        break;
    }
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
