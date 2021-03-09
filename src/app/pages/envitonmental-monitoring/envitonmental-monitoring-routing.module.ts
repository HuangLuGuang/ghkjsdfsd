import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeviceTemperatureComponent } from "./device-temperature/device-temperature.component";
import { EnvitonmentalMonitoringComponent } from "./envitonmental-monitoring.component";

const routes: Routes = [
  {
    path: "",
    component: EnvitonmentalMonitoringComponent,
    children: [
      // 温湿度数据导出
      { path: "temperature", component: DeviceTemperatureComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvitonmentalMonitoringRoutingModule {}
