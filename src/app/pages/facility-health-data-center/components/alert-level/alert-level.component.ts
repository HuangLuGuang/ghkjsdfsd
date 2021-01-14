import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ngx-alert-level',
  templateUrl: './alert-level.component.html',
  styleUrls: ['./alert-level.component.scss']
})
export class AlertLevelComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  level;
  constructor() { }

  ngOnInit(): void {
    var level = this.params.node.data.level;
    switch (level) {
      case 3:
        this.level = "error";
        break;
      case 2:
        this.level = "warning";
        break;
      case 1:
        this.level = "info"
        break;
    
      default:
        break;
    }
  }
  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  // legend: ['error', 'warning', 'info'], error:3, warning:2, info: 1

  // colors: ['rgb(255,0,0)', 'rgb(255,166,0)', 'rgb(60,179,113)'],

}
