import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentXenonLampComponent } from "./equipment-xenon-lamp.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BoardTempModule } from "../temp/board-temp.module";
const ROUTER = [
  {
    path: "",
    children: [
      {
        path: ":title",
        component: EquipmentXenonLampComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [EquipmentXenonLampComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER),
    TranslateModule,
    BoardTempModule,
  ],
  exports: [RouterModule],
})
export class EquipmentXenonLampModule {}
