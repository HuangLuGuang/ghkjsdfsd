import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentHydraulicPressureComponent } from "./equipment-hydraulic-pressure.component";
import { BoardTempModule } from "../temp/board-temp.module";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { ShareModule } from "../../../share/share.module";
// 视频 videos
import { VideosModule } from "../../videos/videos.modules";
const router = [
  {
    path: "",
    component: EquipmentHydraulicPressureComponent,
  },
];

@NgModule({
  declarations: [EquipmentHydraulicPressureComponent],
  imports: [
    CommonModule,
    TranslateModule,
    BoardTempModule,
    RouterModule.forChild(router),
    ShareModule,
    VideosModule,
  ],
  exports: [RouterModule],
})
export class EquipmentHydraulicPressureModule {}
