import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndonManHourComponent } from './andon-man-hour.component';


const routes: Routes = [
  {
    path: '',
    component: AndonManHourComponent,
    children:[

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndonManHourRoutingModule { }
