import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceHourReportComponent } from './device-hour-report.component';

import { DeviceDataSumComponent } from './device-data-sum/device-data-sum.component';
import { GroupDataSumComponent } from './group-data-sum/group-data-sum.component';
import { DepartmentDataSumComponent } from './department-data-sum/department-data-sum.component';

const routes: Routes = [
  {
    path: "",
    component: DeviceHourReportComponent,
    children:[
      {
        path: 'deivce_data_sum',  // 设备数据汇总
        component:DeviceDataSumComponent
      },
      {
        path: 'group_data_sum',  // 功能组数据汇总
        component:GroupDataSumComponent
      },
      {
        path: 'department_data_sum',  // 部门数据汇总
        component:DepartmentDataSumComponent
      },
      {
        path: '',
        redirectTo: 'deivce_data_sum',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceHourReportRoutingModule { }
