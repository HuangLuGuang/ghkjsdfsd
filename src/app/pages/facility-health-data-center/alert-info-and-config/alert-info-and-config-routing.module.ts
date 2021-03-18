import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AlertConfigComponent } from "./alert-config/alert-config.component";
import { AlertInfoAndConfigComponent } from "./alert-info-and-config.component";
import { AlertInfoComponent } from "./alert-info/alert-info.component";

const routes: Routes = [
  {
    path: "",
    component: AlertInfoAndConfigComponent,
    children: [
      {
        path: "info",
        component: AlertInfoComponent,
      },
      {
        path: "config",
        component: AlertConfigComponent,
      },
      {
        path: "",
        redirectTo: "info",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertInfoAndConfigRoutingModule {}
