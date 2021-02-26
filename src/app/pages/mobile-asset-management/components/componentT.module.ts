import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import {
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbCardModule,
  NbButtonModule,
  NbSpinnerModule,
} from "@nebular/theme";

import { Ng2SmartTableModule } from "@mykeels/ng2-smart-table";
import { AgTableComponent } from "./ag-table/ag-table.component";

import { AgGridModule } from "ag-grid-angular";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { MyInputComponent } from "./my-input/my-input.component";
import { MyDateRangeComponent } from "./my-date-range/my-date-range.component";
import { DeviceEditComponent } from "./device-edit/device-edit.component";
import { DeviceOrderComponent } from "./device-order/device-order.component";
import { DeviceDetailInfoComponent } from "./device-detail-info/device-detail-info.component";
import { TableOptionComponent } from "./table-option/table-option.component";
import { GpsTableOptionComponent } from "./gps-table-option/gps-table-option.component";
import { GpsHistoryComponent } from "./gps-history/gps-history.component";

import { MapComponent } from "./map/map.component";
import { AgTableLocationComponent } from "./ag-table-location/ag-table-location.component";

import { NzSelectModule } from "ng-zorro-antd/select";

@NgModule({
  declarations: [
    AgTableComponent,
    MyInputComponent,
    MyDateRangeComponent,
    DeviceEditComponent,
    DeviceOrderComponent,
    DeviceDetailInfoComponent,
    TableOptionComponent,
    GpsTableOptionComponent,
    GpsHistoryComponent,
    MapComponent,
    AgTableLocationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbSelectModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    Ng2SmartTableModule,
    AgGridModule,
    NzPaginationModule,
    NbCardModule,
    NbSpinnerModule,

    NzSelectModule,
  ],
  exports: [
    AgTableComponent,
    MyInputComponent,
    MyDateRangeComponent,
    TableOptionComponent,
    GpsHistoryComponent,
    MapComponent,
    AgTableLocationComponent,
  ],
})
export class ComponentTModule {}
