import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentMotorSystemComponent } from "./equipment-motor-system.component";
import { TranslateModule } from "@ngx-translate/core";
import { BoardTempModule } from "../temp/board-temp.module";
// 视频 videos
import { VideosModule } from "../../videos/videos.modules";

@NgModule({
  declarations: [EquipmentMotorSystemComponent],
  imports: [CommonModule, TranslateModule, BoardTempModule, VideosModule],
  exports: [],
})
export class EquipmentMotorSystemModule {}
