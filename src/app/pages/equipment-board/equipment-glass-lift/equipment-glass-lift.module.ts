import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentGlassLiftComponent } from "./equipment-glass-lift.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BoardTempModule } from "../temp/board-temp.module";

// 视频 videos
import { VideosModule } from "../../videos/videos.modules";

const router = [
  {
    path: "",
    children: [
      {
        path: ":title",
        component: EquipmentGlassLiftComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [EquipmentGlassLiftComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    TranslateModule,
    BoardTempModule,
    VideosModule,
  ],
  exports: [RouterModule],
})
export class EquipmentGlassLiftModule {}
