import { Component, OnInit, ViewChild } from "@angular/core";
import { LayoutService } from "../../../../@core/utils";

declare var $;
@Component({
  selector: "ngx-inline-video",
  templateUrl: "./inline-video.component.html",
  styleUrls: ["./inline-video.component.scss"],
})
export class InlineVideoComponent implements OnInit {
  array = [1, 2, 3, 4];
  status = true;
  nzAutoPlay = true; // 自动切换
  nzAutoPlaySpeed = 10000; // 时间间隔
  @ViewChild("carousel") carousel: any;

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.layout.onInitLayoutSize().subscribe((f) => {
      this.resize();
    });
  }

  resize = () => {
    this.status = false;
    setTimeout(() => {
      this.status = true;
    }, 20);
  };

  ngOnDestroy() {
    // window.removeEventListener('resize',this.resize);
  }
}
