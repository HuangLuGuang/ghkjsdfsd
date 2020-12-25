import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceHourReportRoutingModule } from './device-hour-report-routing.module';
import { DeviceHourReportComponent } from './device-hour-report.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ComponentTModule } from '../components/componentT.module';
import { MonthSelectComponent } from './month-select/month-select.component';
import { YearSelectComponent } from './year-select/year-select.component';


@NgModule({
  declarations: [DeviceHourReportComponent, MonthSelectComponent, YearSelectComponent],
  imports: [
    CommonModule,
    DeviceHourReportRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbSpinnerModule,
    NbSelectModule,
    

    ComponentTModule,
  ]
})
export class DeviceHourReportModule { }
