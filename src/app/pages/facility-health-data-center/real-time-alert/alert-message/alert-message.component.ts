import { Component, OnInit } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ngx-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  message;
  constructor() { }

  ngOnInit(): void {
    // console.log("-------------->alert message", this.params.node.data.message);
    this.message = this.params.node.data.message
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }


}
