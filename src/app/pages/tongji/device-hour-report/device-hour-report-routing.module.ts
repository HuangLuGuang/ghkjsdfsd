import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceHourReportComponent } from './device-hour-report.component';


const routes: Routes = [
  {
    path: "",
    component: DeviceHourReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceHourReportRoutingModule { }
