import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TongjiComponent } from './tongji.component';






const routes: Routes = [
  { 
    path: '', 
    component: TongjiComponent,
    children:[
      
      // 设备-工时报表
      {
        path: "device_hour_report",
        loadChildren: ()=>import('./device-hour-report/device-hour-report.module')
        .then(m=>m.DeviceHourReportModule)
      },
     
      { path: '', redirectTo: 'device_hour_report', pathMatch: 'full' },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TongjiRoutingModule { }
