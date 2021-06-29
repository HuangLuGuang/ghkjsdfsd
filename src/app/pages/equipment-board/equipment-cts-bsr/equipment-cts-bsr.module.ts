import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentCtsBsrComponent } from "./equipment-cts-bsr.component";
import { RouterModule } from "@angular/router";
import { BoardTempModule } from "../temp/board-temp.module";
import { ShareModule } from "../../../share/share.module";
import { TranslateModule } from "@ngx-translate/core";

// 视频 videos
import { VideosModule } from "../../videos/videos.modules";

const router = [
  {
    path: ":title",
    component: EquipmentCtsBsrComponent,
  },
];

@NgModule({
  declarations: [EquipmentCtsBsrComponent],
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
export class EquipmentCtsBsrModule {}
