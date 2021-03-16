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
import { InlineVideoComponent } from "./components/inline-video/inline-video.component";

import { NzCarouselModule } from "ng-zorro-antd/carousel";
import { TestAllInfoComponent } from "./components/test-all-info/test-all-info.component";
import { AlertInfoAlertComponent } from './components/alert-info-alert/alert-info-alert.component';

@NgModule({
  declarations: [
    AlertManagementComponent,
    CentralizedMonitoringComponent,
    InlineVideoComponent,
    TestAllInfoComponent,
    AlertInfoAlertComponent,
  ],
  imports: [
    CommonModule,
    AlertManagementRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbIconModule,
    NbButtonModule,
    NzCarouselModule,
  ],
})
export class AlertManagementModule {}
