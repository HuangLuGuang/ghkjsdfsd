import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';

import { KpiDetailComponent } from './kpi/kpi-detail/kpi-detail.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // 首界面
    {
      path: 'home',
      component: HomeComponent,
    },
    // 大屏看板
    {
      path: 'board',
      loadChildren: () => import('./eimboard/eimboard.module')
      .then(m => m.EimboardModule),
    },
    // 设备看板
    {
      path: 'equipment',
      loadChildren: () => import('./equipment-board/equipment-board.module')
      .then(m => m.EquipmentBoardModule),
    },
    // 设备在线
    
    // 统计分析
    {
      path: 'tongji',
      loadChildren: () => import('./tongji/tongji.module')
        .then(m => m.TongjiModule),
    },
    // 数据导入
    {
      path: 'dataimport',
      loadChildren: () => import('./tongji-config/tongji-config-routing.module')
        .then(m => m.TongjiConfigRoutingModule),
    },

    // 同一个 kpi详情组件，
    { path: 'tongji/device_hour_report/kpidetail', component: KpiDetailComponent }, // 设备数据汇总的kpi
    { path: 'tongji/group_data_sum/kpidetail', component: KpiDetailComponent },     //  功能组数据汇总的kpi
    { path: 'tongji/department_data_sum/kpidetail', component: KpiDetailComponent }, // 部门数据汇总的kpi

    // 设备健康数据中心
    {
      path: 'datacenter',
      loadChildren: () => import('./facility-health-data-center/facility-health-data-center.module')
        .then(m => m.FacilityHealthDataCenterModule),
    },
    // 运维管理
    {
      path: 'operation',
      loadChildren: () => import('./operation-management/operation-management.module')
        .then(m => m.OperationManagementModule),
    },
    // 文件传输
    {
      path: 'eimfile',
      loadChildren: () => import('./eim-file-upload/eim-file-upload.module')
        .then(m => m.EimFileUploadModule),
    },
    // 移动资产管理
    {
      path: 'mobile-gps',
      loadChildren: () => import('./mobile-asset-management/mobile-asset-management.module')
        .then(m => m.MobileAssetManagementModule),
    },
    // 举升机
    {
      path: 'lift-machine',
      loadChildren: () => import('./lift-machine/lift-machine.module')
      .then(m => m.LiftMachineModule),
    },
    // 安灯与工时系统
    {
      path: 'andon-man-hour',
      loadChildren: ()=> import('./andon-man-hour/andon-man-hour.module')
      .then(m => m.AndonManHourModule)
    },

    // 系统设置
    {
      path: 'system-set',
      loadChildren: () => import('./system-set/system-set.module')
      .then(m => m.SystemSetModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
