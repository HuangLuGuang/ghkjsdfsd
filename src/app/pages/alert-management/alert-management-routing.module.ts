import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AlertManagementComponent } from "./alert-management.component";
import { CentralizedMonitoringComponent } from "./centralized-monitoring/centralized-monitoring.component";

const routes: Routes = [
  {
    path: "",
    component: AlertManagementComponent,
    children: [
      {
        path: "centralized-monitoring", // 集中监控
        component: CentralizedMonitoringComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertManagementRoutingModule {}
