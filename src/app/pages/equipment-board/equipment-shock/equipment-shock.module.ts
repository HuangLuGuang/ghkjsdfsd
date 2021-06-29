import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentShockComponent } from "./equipment-shock.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BoardTempModule } from "../temp/board-temp.module";
import { ShareModule } from "../../../share/share.module";
// 视频 videos
import { VideosModule } from "../../videos/videos.modules";
const router = [
  {
    path: "",
    children: [
      {
        //
        path: ":title",
        component: EquipmentShockComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [EquipmentShockComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    TranslateModule,
    BoardTempModule,
    ShareModule,
    VideosModule,
  ],
  exports: [RouterModule],
})
export class EquipmentShockModule {}
