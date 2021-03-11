import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeviceTemperatureComponent } from "./device-temperature/device-temperature.component";
import { EnvitonmentalMonitoringComponent } from "./envitonmental-monitoring.component";
import { TemperatureManagementComponent } from "./temperature-management/temperature-management.component";

const routes: Routes = [
  {
    path: "",
    component: EnvitonmentalMonitoringComponent,
    children: [
      // 温湿度数据导出
      { path: "temperature", component: DeviceTemperatureComponent },
      // 环境监测模块管理
      { path: "management", component: TemperatureManagementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvitonmentalMonitoringRoutingModule {}
