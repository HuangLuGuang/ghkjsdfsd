import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DataImportComponent } from "./data-import.component";
import { DeviceRunComponent } from "./device-run/device-run.component";

const routes: Routes = [
  {
    path: "",
    component: DataImportComponent,
    children: [
      {
        path: "devicerun",
        component: DeviceRunComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataImportRoutingModule {}
