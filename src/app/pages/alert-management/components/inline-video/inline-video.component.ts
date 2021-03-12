import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-inline-video",
  templateUrl: "./inline-video.component.html",
  styleUrls: ["./inline-video.component.scss"],
})
export class InlineVideoComponent implements OnInit {
  array = [1, 2, 3, 4];
  constructor() {}

  ngOnInit(): void {}
}
