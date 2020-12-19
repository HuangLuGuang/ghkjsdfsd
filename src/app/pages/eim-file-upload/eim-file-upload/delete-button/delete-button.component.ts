import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ngx-send-to-madam',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent implements OnInit, ICellRendererAngularComp {
  private params: any;

  constructor() { }

  ngOnInit(): void {
    // var deleat = this.params.node.data.deleat;
    // console.log("send To MaDaM: ", deleat)
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onDelete() {
    this.params.clicked(this.params.node.data);
  }


}
