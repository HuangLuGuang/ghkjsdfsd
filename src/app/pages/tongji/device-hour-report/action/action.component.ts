import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  private params: any;
  constructor(private router:Router) { }
  url; // 设备详情的url

  ngOnInit(): void {
    this.url = this.params.node.data.option;
    console.warn("设备报表 url>>",this.url)
  }

  // goto_detail
  goto_detail(){
    // this.params.clicked(this.params.data);
    localStorage.setItem('device_hour_kpi_for_detail', JSON.stringify(this.params.node.data));
    this.router.navigate([this.url])
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

}
