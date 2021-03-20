import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataImportRoutingModule } from "./data-import-routing.module";
import { DataImportComponent } from "./data-import.component";
import { DeviceRunComponent } from "./device-run/device-run.component";

import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
} from "@nebular/theme";
import {
  NzCheckboxModule,
  NzPaginationModule,
  NzSelectModule,
} from "ng-zorro-antd";
import { AgGridModule } from "ag-grid-angular";
import { FormsModule } from "@angular/forms";
import { ComponentTModule } from "../tongji/components/componentT.module";
import { MyLinkageSelectComponent } from "./components/my-linkage-select/my-linkage-select.component";
import { MulTableColComponent } from "./components/mul-table-col/mul-table-col.component";
import { TimeIntervalComponent } from './components/time-interval/time-interval.component';
import { TimeOneDayComponent } from './components/time-one-day/time-one-day.component';

@NgModule({
  declarations: [
    DataImportComponent,
    DeviceRunComponent,
    MyLinkageSelectComponent,
    MulTableColComponent,
    TimeIntervalComponent,
    TimeOneDayComponent,
  ],
  imports: [
    CommonModule,
    DataImportRoutingModule,

    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,

    NzCheckboxModule,

    NzPaginationModule,
    AgGridModule,
    NzSelectModule,
    FormsModule,
    ComponentTModule,
  ],
})
export class DataImportModule {}
