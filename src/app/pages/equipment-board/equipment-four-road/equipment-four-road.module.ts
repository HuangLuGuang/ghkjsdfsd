import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFourRoadComponent } from './equipment-four-road.component';
import { RouterModule } from '@angular/router';
import { BoardTempModule } from '../temp/board-temp.module';
import { ShareModule } from '../../../share/share.module';
import { TranslateModule } from '@ngx-translate/core';

const router = [
  {
    path:'',
    component:EquipmentFourRoadComponent
  }
]

@NgModule({
  declarations: [
    EquipmentFourRoadComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(router),BoardTempModule,ShareModule,TranslateModule
  ],
  exports:[RouterModule]
})
export class EquipmentFourRoadModule { }
