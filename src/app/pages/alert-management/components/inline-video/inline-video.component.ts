import { Component, OnInit, ViewChild } from "@angular/core";
import { LayoutService } from "../../../../@core/utils";

declare var $;
@Component({
  selector: "ngx-inline-video",
  templateUrl: "./inline-video.component.html",
  styleUrls: ["./inline-video.component.scss"],
})
export class InlineVideoComponent implements OnInit {
  array = [
    "assets/eimdoard/equipment/images/lqdp.png",
    "assets/eimdoard/equipment/images/dj2_1014.jpeg",
    "assets/eimdoard/equipment/images/dj3_1003.jpeg",
    "assets/eimdoard/equipment/images/dj4_1010.jpeg",
  ];
  status = true;

  nzAutoPlay = true; // 自动切换
  nzAutoPlaySpeed = 10000; // 时间间隔
  nzDots = false; // 是否显示面板指示点
  @ViewChild("carousel") carousel: any;

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.layout.onInitLayoutSize().subscribe((f) => {
      // this.resize();
    });
  }

  resize = () => {
    this.status = false;
    setTimeout(() => {
      this.status = true;
    }, 40);
  };

  ngOnDestroy() {
    // window.removeEventListener('resize',this.resize);
  }

  // 4-9

  // 切换到下一面板
  next() {
    this.carousel.next();
  }

  // 切换到上一面板
  pre() {
    this.carousel.pre();
  }

  // 切换到指定面板
  goTo() {
    console.error("跳转");
    this.carousel.goTo(3);
  }
}
