import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OneLayoutComponent } from "./one-layout/one-layout.component";

@NgModule({
  declarations: [OneLayoutComponent],
  imports: [CommonModule],
  exports: [OneLayoutComponent],
})
export class LayoutsTModule {}
