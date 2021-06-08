import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ngx-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements OnInit,ICellRendererAngularComp {
  params: any;
  constructor() { }

  refresh(): boolean {
    return false;
  }
  agInit(params: any): void {
    this.params = params;
  }
  

  ngOnInit() {
  }



  edit(){
    var rowData = this.params.node.data
    this.params.data = {active: 'edit', data: [rowData]}
    this.params.clicked(this.params.data);
  }

}
