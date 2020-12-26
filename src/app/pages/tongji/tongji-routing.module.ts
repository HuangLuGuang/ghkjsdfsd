import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TongjiComponent } from './tongji.component';

// 设备管理
import { DeviceManageComponent } from './device-manage/device-manage.component';

// 试验任务管理
import { TestTaskManageComponent } from './test-task-manage/test-task-manage.component';

// kpi报表详情---> 适应于设备kpi报表、工时kpi
import { KpiDetailComponent } from './kpi-detail/kpi-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: TongjiComponent,
    children:[
      { path: 'deviceManage', component: DeviceManageComponent },
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
      // 目标工时配置
      {
        path:"target_hour_config",
        loadChildren:() => import('./target-hour-config/target-hour-config.module')
          .then(m=>m.TargetHourConfigModule)
      },
      // 设备-工时报表
      {
        path: "device_hour_report",
        loadChildren: ()=>import('./device-hour-report/device-hour-report.module')
        .then(m=>m.DeviceHourReportModule)
      },
      { path: 'device_hour_report/kpidetail', component: KpiDetailComponent },
      { path: '', redirectTo: 'deviceManage', pathMatch: 'full' },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TongjiRoutingModule { }
