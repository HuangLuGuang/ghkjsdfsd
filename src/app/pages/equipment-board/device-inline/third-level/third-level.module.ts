import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThirdLevelRoutingModule } from './third-level-routing.module';
import { ThirdLevelComponent } from './third-level.component';
// import { LeftLayoutComponent } from './components/left-layout/left-layout.component';
// import { RightLayoutComponent } from './components/right-layout/right-layout.component';
import { NbIconModule } from '@nebular/theme';
import { ComponentTModule } from './components/componentT.module';
import { StructuralLaboratoryComponent } from './laboratory/structural-laboratory/structural-laboratory.component';
import { NzProgressModule } from 'ng-zorro-antd';
import { EnvironmentLaboratoryComponent } from './laboratory/environment-laboratory/environment-laboratory.component';
import { EnergyLaboratoryComponent } from './laboratory/energy-laboratory/energy-laboratory.component';


@NgModule({
  declarations: [ThirdLevelComponent,StructuralLaboratoryComponent, EnvironmentLaboratoryComponent, EnergyLaboratoryComponent],
  imports: [
    CommonModule,
    ThirdLevelRoutingModule,
    NbIconModule,
    ComponentTModule,
    NzProgressModule
  ]
})
export class ThirdLevelModule { }
