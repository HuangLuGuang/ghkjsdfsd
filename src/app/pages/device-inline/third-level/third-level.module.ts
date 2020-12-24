import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThirdLevelRoutingModule } from './third-level-routing.module';
import { ThirdLevelComponent } from './third-level.component';
import { LeftLayoutComponent } from './components/left-layout/left-layout.component';
import { RightLayoutComponent } from './components/right-layout/right-layout.component';
import { ComponentTModule } from '../../tongji/components/componentT.module';
import { NbIconModule } from '@nebular/theme';


@NgModule({
  declarations: [ThirdLevelComponent,],
  imports: [
    CommonModule,
    ThirdLevelRoutingModule,
    NbIconModule,
    ComponentTModule,
  ]
})
export class ThirdLevelModule { }
