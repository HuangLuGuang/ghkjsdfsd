import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TongjiComponent } from './tongji.component';

// 设备管理
import { DeviceManageComponent } from './device-manage/device-manage.component';

// 试验任务管理
import { TestTaskManageComponent } from './test-task-manage/test-task-manage.component';

// kpi报表详情---> 适应于设备kpi报表、工时kpi
// import { KpiDetailComponent } from './kpi-detail/kpi-detail.component';
import { KpiDetailComponent } from '../kpi/kpi-detail/kpi-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: TongjiComponent,
    children:[
      // { path: 'deviceManage', component: DeviceManageComponent },
      { path: 'testManage', component: TestTaskManageComponent },
      {
        path: 'deviceKpiReport',
        loadChildren: () => import('./device-kpi-report2/device-kpi-report2-routing.module')
          .then(m => m.DeviceKpiReport2RoutingModule),
      },
      { path: 'manHourKpiReport', 
        loadChildren:() =>import('./man-hour-kpi-report2/man-hour-kpi-report2-routing.module')
          .then(m=>m.ManHourKpiReport2RoutingModule)
      },
      
      // 设备-工时报表
      {
        path: "device_hour_report",
        loadChildren: ()=>import('./device-hour-report/device-hour-report.module')
        .then(m=>m.DeviceHourReportModule)
      },
      // // 同一个 kpi详情组件，
      // { path: 'device_hour_report/kpidetail', component: KpiDetailComponent }, // 设备数据汇总的kpi
      // { path: 'group_data_sum/kpidetail', component: KpiDetailComponent },     //  功能组数据汇总的kpi
      // { path: 'department_data_sum/kpidetail', component: KpiDetailComponent }, // 部门数据汇总的kpi


      // { path: '', redirectTo: 'deviceManage', pathMatch: 'full' },
      { path: '', redirectTo: 'device_hour_report', pathMatch: 'full' },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TongjiRoutingModule { }
