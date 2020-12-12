import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ngx-send-to-madam',
  templateUrl: './send-to-madam.component.html',
  styleUrls: ['./send-to-madam.component.scss']
})
export class SendToMadamComponent implements OnInit,ICellRendererAngularComp {
  private params: any;
  
  constructor() { }

  ngOnInit(): void {
    var option = this.params.node.data.option;
    console.log("send To MaDaM: ", option)
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }


}
