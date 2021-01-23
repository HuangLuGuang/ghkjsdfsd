import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnergyLaboratoryComponent } from './laboratory/energy-laboratory/energy-laboratory.component';
import { EnvironmentLaboratoryComponent } from './laboratory/environment-laboratory/environment-laboratory.component';
import { PhysicalLaboratoryComponent } from './laboratory/physical-laboratory/physical-laboratory.component';
import { StructuralLaboratoryComponent } from './laboratory/structural-laboratory/structural-laboratory.component';
import { ThirdLevelComponent } from './third-level.component';


const routes: Routes = [
  {
    path: '',
    component: ThirdLevelComponent,
    children: [
      { 
        //结构sys
        path: 'structural',
        component: StructuralLaboratoryComponent
      },
      {
        //环境sys
        path:'environment',
        component:EnvironmentLaboratoryComponent
      },
      {
        // 新能源与电子电气sys
        path:'energy',
        component:EnergyLaboratoryComponent
      },
      {
        //理化与环境实验室
        path:'physical',
        component:PhysicalLaboratoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdLevelRoutingModule { }
