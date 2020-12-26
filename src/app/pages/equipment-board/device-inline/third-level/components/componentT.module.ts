import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftLayoutComponent } from './left-layout/left-layout.component';
import { RightLayoutComponent } from './right-layout/right-layout.component';
import { NzProgressModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [
    LeftLayoutComponent,
    RightLayoutComponent,
  ],
  imports: [
    CommonModule,
    NzProgressModule
  ],
  exports: [
    LeftLayoutComponent,
    RightLayoutComponent,
  ]
})
export class ComponentTModule { }
