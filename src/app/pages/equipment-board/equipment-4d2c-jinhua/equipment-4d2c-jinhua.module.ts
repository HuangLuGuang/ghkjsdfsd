import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquipmentJinhua4d2cComponent } from "./equipment-jinhua4d2c.component";
import { RouterModule } from "@angular/router";
import { BoardTempModule } from "../temp/board-temp.module";
import { TranslateModule } from "@ngx-translate/core";
// 视频 videos
import { VideosModule } from "../../videos/videos.modules";
const router = [
  {
    path: "",
    component: EquipmentJinhua4d2cComponent,
  },
];

@NgModule({
  declarations: [EquipmentJinhua4d2cComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    BoardTempModule,
    TranslateModule,
    VideosModule,
  ],
  exports: [RouterModule],
})
export class Equipment4d2cJinhuaModule {}
