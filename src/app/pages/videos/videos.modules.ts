import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PubvideoComponent } from "./pubvideo/pubvideo.component";

@NgModule({
  declarations: [PubvideoComponent],
  imports: [CommonModule],
  providers: [],
  exports: [PubvideoComponent],
})
export class VideosModule {}
