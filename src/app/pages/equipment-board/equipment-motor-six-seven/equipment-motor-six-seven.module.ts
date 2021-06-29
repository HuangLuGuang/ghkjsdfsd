import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentMotorSixSevenComponent } from "./equipment-motor-six-seven.component";
import { BoardTempModule } from "../temp/board-temp.module";
import { TranslateModule } from "@ngx-translate/core";

// 视频 videos
import { VideosModule } from "../../videos/videos.modules";

@NgModule({
  declarations: [EquipmentMotorSixSevenComponent],
  imports: [CommonModule, BoardTempModule, TranslateModule, VideosModule],
})
export class EquipmentMotorSixSevenModule {}
