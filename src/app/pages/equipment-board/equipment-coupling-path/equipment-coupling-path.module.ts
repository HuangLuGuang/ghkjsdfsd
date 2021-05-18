import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentCouplingPathComponent } from "./equipment-coupling-path.component";
import { RouterModule } from "@angular/router";
import { BoardTempModule } from "../temp/board-temp.module";
import { ShareModule } from "../../../share/share.module";
import { TranslateModule } from "@ngx-translate/core";
// 视频 videos
import { VideosModule } from "../../videos/videos.modules";
const router = [
  {
    path: "",
    component: EquipmentCouplingPathComponent,
  },
];

@NgModule({
  declarations: [EquipmentCouplingPathComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    BoardTempModule,
    ShareModule,
    TranslateModule,
    VideosModule,
  ],
  exports: [RouterModule],
})
export class EquipmentCouplingPathModule {}
