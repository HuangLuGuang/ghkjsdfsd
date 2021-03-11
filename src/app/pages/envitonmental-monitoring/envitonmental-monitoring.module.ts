import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EnvitonmentalMonitoringRoutingModule } from "./envitonmental-monitoring-routing.module";
import { EnvitonmentalMonitoringComponent } from "./envitonmental-monitoring.component";
import { DeviceTemperatureComponent } from "./device-temperature/device-temperature.component";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { AgTableComponent } from "./components/ag-table/ag-table.component";
import { NzPaginationModule, NzSelectModule } from "ng-zorro-antd";
import { AgGridModule } from "ag-grid-angular";
import { FormsModule } from "@angular/forms";
import { LocationInputComponent } from './components/location-input/location-input.component';
import { MyDateSelectComponent } from './components/my-date-select/my-date-select.component';
import { MyDateRangeComponent } from './components/my-date-range/my-date-range.component';
import { MyLinkageSelectComponent } from './components/my-linkage-select/my-linkage-select.component';
import { MyTimePointComponent } from './components/my-time-point/my-time-point.component';
import { TemperatureManagementComponent } from './temperature-management/temperature-management.component';
import { TemperatureManagementOptionComponent } from './temperature-management/temperature-management-option/temperature-management-option.component';
import { TemperatureManagementActiveComponent } from './temperature-management/temperature-management-active/temperature-management-active.component';

@NgModule({
  declarations: [
    EnvitonmentalMonitoringComponent,
    DeviceTemperatureComponent,
    AgTableComponent,
    LocationInputComponent,
    MyDateSelectComponent,
    MyDateRangeComponent,
    MyLinkageSelectComponent,
    MyTimePointComponent,
    TemperatureManagementComponent,
    TemperatureManagementOptionComponent,
    TemperatureManagementActiveComponent,
  ],
  imports: [
    CommonModule,
    EnvitonmentalMonitoringRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,

    NzPaginationModule,
    AgGridModule,
    NzSelectModule,
    FormsModule,
  ],
})
export class EnvitonmentalMonitoringModule {}
