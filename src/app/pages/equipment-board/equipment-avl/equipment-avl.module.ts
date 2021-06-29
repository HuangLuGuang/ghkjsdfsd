import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentAvlComponent } from "./equipment-avl.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ShareModule } from "../../../share/share.module";
import { BoardTempModule } from "../temp/board-temp.module";

// 视频 videos
import { VideosModule } from "../../videos/videos.modules";

const router = [
  {
    path: "",
    component: EquipmentAvlComponent,
  },
];

@NgModule({
  declarations: [EquipmentAvlComponent],
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
export class EquipmentAvlModule {}
