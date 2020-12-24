import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftLayoutComponent } from './left-layout/left-layout.component';
import { RightLayoutComponent } from './right-layout/right-layout.component';

@NgModule({
  declarations: [
    LeftLayoutComponent,
    RightLayoutComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    LeftLayoutComponent,
    RightLayoutComponent,
  ]
})
export class ComponentTModule { }
