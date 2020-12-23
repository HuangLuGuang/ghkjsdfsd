import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TargetHourConfigComponent } from './target-hour-config.component';


const routes: Routes = [
  {
    path: '',
    component: TargetHourConfigComponent,
    children:[]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetHourConfigRoutingModule { }
