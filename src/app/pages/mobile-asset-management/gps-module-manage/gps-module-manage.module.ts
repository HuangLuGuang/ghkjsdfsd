import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GpsModuleManageRoutingModule } from "./gps-module-manage-routing.module";
import { GpsModuleManageComponent } from "./gps-module-manage.component";
import {
  NbCardModule,
  NbMenuModule,
  NbSelectModule,
  NbButtonModule,
  NbLayoutModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbIconModule,
  NbToggleModule,
} from "@nebular/theme";
import { AssetsManageComponent } from "./assets-manage/assets-manage.component";
import { FormsModule } from "@angular/forms";

import { Ng2SmartTableModule } from "@mykeels/ng2-smart-table";

import { ComponentTModule } from "../components/componentT.module";
import { PowerManagementComponent } from "./power-management/power-management.component";
import { IsnotActiveComponent } from "./assets-manage/isnot-active/isnot-active.component";
import { IsnotFavorComponent } from "./assets-manage/isnot-favor/isnot-favor.component";
import { LocationMonitoringComponent } from "./location-monitoring/location-monitoring.component";

import { AgGridModule } from "ag-grid-angular";
import { NzDrawerModule } from "ng-zorro-antd/drawer";

@NgModule({
  declarations: [
    GpsModuleManageComponent,
    AssetsManageComponent,
    PowerManagementComponent,
    IsnotActiveComponent,
    IsnotFavorComponent,
    LocationMonitoringComponent,
  ],
  imports: [
    CommonModule,
    GpsModuleManageRoutingModule,
    NbCardModule,
    NbMenuModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbIconModule,
    NbToggleModule,

    NbSpinnerModule,
    AgGridModule,
    ComponentTModule,
    NzDrawerModule,
  ],
})
export class GpsModuleManageModule {}
