import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndonManHourRoutingModule } from './andon-man-hour-routing.module';
import { AndonManHourComponent } from './andon-man-hour.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { DeviceAndonStatusInputComponent } from './device-andon-status-input/device-andon-status-input.component';
import { DeviceAndonStatusInfoComponent } from './device-andon-status-info/device-andon-status-info.component';
import { MySelectTreeComponent } from './components/my-select-tree/my-select-tree.component';


@NgModule({
  declarations: [AndonManHourComponent, DeviceAndonStatusInputComponent, DeviceAndonStatusInfoComponent, MySelectTreeComponent],
  imports: [
    CommonModule,
    AndonManHourRoutingModule,

    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbSpinnerModule,
  ]
})
export class AndonManHourModule { }
