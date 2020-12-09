import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilityHealthDataCenterComponent } from './facility-health-data-center.component';
import { HistoryAlertComponent } from './history-alert/history-alert.component';
import { RealTimeAlertComponent } from './real-time-alert/real-time-alert.component';

const routes: Routes = [
  {
    path: '',
    component: FacilityHealthDataCenterComponent,
    children:[
      {
        path: 'real-time',
        component: RealTimeAlertComponent,
      },
      {
        path: 'history',
        component: HistoryAlertComponent,
      },
      {
        path:"",
        redirectTo: 'real-time',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityHealthDataCenterRoutingModule { }
