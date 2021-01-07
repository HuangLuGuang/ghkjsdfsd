import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TongjiConfigComponent } from './tongji-config.component';


const routes: Routes = [
  {
    path: '', // dataimport
    component: TongjiConfigComponent,
    children:[
      // 目标工时配置
      {
        path:"target_hour_config",
        loadChildren:() => import('./target-hour-config/target-hour-config.module')
          .then(m=>m.TargetHourConfigModule)
      },
      {
        path: '',
        redirectTo: 'target_hour_config',
        pathMatch: 'full'
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TongjiConfigRoutingModule { }
