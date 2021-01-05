import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-table-group',
  templateUrl: './table-group.component.html',
  styleUrls: ['./table-group.component.scss']
})
export class TableGroupComponent implements OnInit,ICellRendererAngularComp {
  private params: any;
  constructor() { }
  groups; // 科室/功能组

  ngOnInit(): void {
    
    var group = this.params.node.data.groups;
    if (group){
      this.groups = group
    }else{
      this.groups = this.params.node.data.group;
    }
    // console.log("this.groups>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",this.groups)
  }



  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

}
