import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HourConfigComponent } from './hour-config/hour-config.component';
import { TargetHourConfigComponent } from './target-hour-config.component';
import { TeskConfigComponent } from './tesk-config/tesk-config.component';


const routes: Routes = [
  {
    path: '',
    component: TargetHourConfigComponent,
    children:[
      {
        path: "hour_config",
        component: HourConfigComponent
      },
      {
        path: "tesk_config",
        component: TeskConfigComponent
      },
      {
        path: '',
        redirectTo: "hour_config",
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetHourConfigRoutingModule { }
