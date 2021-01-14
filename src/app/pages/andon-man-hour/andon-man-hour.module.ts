import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndonManHourRoutingModule } from './andon-man-hour-routing.module';
import { AndonManHourComponent } from './andon-man-hour.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';


@NgModule({
  declarations: [AndonManHourComponent],
  imports: [
    CommonModule,
    AndonManHourRoutingModule,

    NbCardModule,
    NbIconModule,
  ]
})
export class AndonManHourModule { }
