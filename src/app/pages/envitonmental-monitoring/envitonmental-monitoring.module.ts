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

@NgModule({
  declarations: [
    EnvitonmentalMonitoringComponent,
    DeviceTemperatureComponent,
    AgTableComponent,
    LocationInputComponent,
    MyDateSelectComponent,
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
