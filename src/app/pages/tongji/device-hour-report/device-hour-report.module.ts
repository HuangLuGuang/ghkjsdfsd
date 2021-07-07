import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceHourReportRoutingModule } from './device-hour-report-routing.module';
import { DeviceHourReportComponent } from './device-hour-report.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ComponentTModule } from '../components/componentT.module';
import { MonthSelectComponent } from './month-select/month-select.component';
import { YearSelectComponent } from './year-select/year-select.component';
import { ActionComponent } from './action/action.component';
import { DeviceDataSumComponent } from './device-data-sum/device-data-sum.component';
import { GroupDataSumComponent } from './group-data-sum/group-data-sum.component';
import { DepartmentDataSumComponent } from './department-data-sum/department-data-sum.component';
import { NzTabsModule  } from 'ng-zorro-antd/tabs';
import { DeviceHourDetailComponent } from './device-hour-detail/device-hour-detail.component';


@NgModule({
  declarations: [DeviceHourReportComponent, MonthSelectComponent, YearSelectComponent, ActionComponent, DeviceDataSumComponent, GroupDataSumComponent, DepartmentDataSumComponent, DeviceHourDetailComponent,],
  imports: [
    CommonModule,
    DeviceHourReportRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbSpinnerModule,
    NbSelectModule,

    NzTabsModule,
    

    ComponentTModule,
  ]
})
export class DeviceHourReportModule { }
