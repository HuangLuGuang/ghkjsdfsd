import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnergyLaboratoryComponent } from './laboratory/energy-laboratory/energy-laboratory.component';
import { EnvironmentLaboratoryComponent } from './laboratory/environment-laboratory/environment-laboratory.component';
import { StructuralLaboratoryComponent } from './laboratory/structural-laboratory/structural-laboratory.component';
import { ThirdLevelComponent } from './third-level.component';


const routes: Routes = [
  {
    path: '',
    component: ThirdLevelComponent,
    children: [
      { 
        //结构实验室
        path: 'structural',
        component: StructuralLaboratoryComponent
      },
      {
        //环境实验室
        path:'environment',
        component:EnvironmentLaboratoryComponent
      },
      {
        // 新能源与电子电气试验室
        path:'energy',
        component:EnergyLaboratoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdLevelRoutingModule { }
