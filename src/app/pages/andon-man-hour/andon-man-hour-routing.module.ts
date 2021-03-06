import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndonManHourComponent } from './andon-man-hour.component';
import { DeviceAndonHistoryComponent } from './device-andon-history/device-andon-history.component';
import { DeviceAndonStatusInfoComponent } from './device-andon-status-info/device-andon-status-info.component';
import { DeviceAndonStatusInputComponent } from './device-andon-status-input/device-andon-status-input.component';


const routes: Routes = [
  {
    path: '',
    component: AndonManHourComponent,
    children:[
      // 设备安灯状态输入
      { path: 'DeviceAndonStatusInput', component: DeviceAndonStatusInputComponent},
      // 设备安灯状态信息
      {path: 'DeviceAndonStatusInfo', component: DeviceAndonStatusInfoComponent},
      // 设备安灯历史状态
      {path: 'DeviceAndonHistroyStatus', component: DeviceAndonHistoryComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndonManHourRoutingModule { }
