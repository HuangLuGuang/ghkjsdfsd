import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertManagementRoutingModule } from "./alert-management-routing.module";
import { AlertManagementComponent } from "./alert-management.component";
import { CentralizedMonitoringComponent } from "./centralized-monitoring/centralized-monitoring.component";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
} from "@nebular/theme";

@NgModule({
  declarations: [AlertManagementComponent, CentralizedMonitoringComponent],
  imports: [
    CommonModule,
    AlertManagementRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbIconModule,
    NbButtonModule,
  ],
})
export class AlertManagementModule {}
