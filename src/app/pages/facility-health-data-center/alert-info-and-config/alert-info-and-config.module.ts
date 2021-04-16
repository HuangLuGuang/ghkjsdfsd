import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertInfoAndConfigRoutingModule } from "./alert-info-and-config-routing.module";
import { AlertInfoAndConfigComponent } from "./alert-info-and-config.component";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { NzPaginationModule, NzTabsModule } from "ng-zorro-antd";
import { AlertInfoComponent } from "./alert-info/alert-info.component";
import { AlertConfigComponent } from "./alert-config/alert-config.component";
import { AgGridModule } from "ag-grid-angular";
import { ComponentTModule } from "../../tongji/components/componentT.module";
import { ActionComponent } from './alert-config/action/action.component';
import { AlertInfoOptionComponent } from './alert-info-option/alert-info-option.component';
import { DeviceLevelComponent } from './alert-info/device-level/device-level.component';
import { AlertInfoAfterComponent } from './alert-info-after/alert-info-after.component';

@NgModule({
  declarations: [
    AlertInfoAndConfigComponent,
    AlertInfoComponent,
    AlertConfigComponent,
    ActionComponent,
    AlertInfoOptionComponent,
    DeviceLevelComponent,
    AlertInfoAfterComponent,
  ],
  imports: [
    CommonModule,
    AlertInfoAndConfigRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NzPaginationModule,
    NzTabsModule,
    AgGridModule,
    ComponentTModule,
  ],
})
export class AlertInfoAndConfigModule {}
