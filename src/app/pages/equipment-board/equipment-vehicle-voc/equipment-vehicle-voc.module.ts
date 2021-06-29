import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentVehicleVocComponent } from "./equipment-vehicle-voc.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BoardTempModule } from "../temp/board-temp.module";

// 视频 videos
import { VideosModule } from "../../videos/videos.modules";

const ROUTE = [
  {
    path: "",
    children: [
      {
        path: ":title",
        component: EquipmentVehicleVocComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [EquipmentVehicleVocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTE),
    TranslateModule,
    BoardTempModule,
    VideosModule,
  ],
  exports: [RouterModule],
})
export class EquipmentVehicleVocModule {}
