import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentMahaComponent } from './equipment-maha.component';
import { RouterModule } from '@angular/router';
import { BoardTempModule } from '../temp/board-temp.module';
import { ShareModule } from '../../../share/share.module';
import { TranslateModule } from '@ngx-translate/core';

const router = [
  {
    path:':title',
    component:EquipmentMahaComponent
  }
]


@NgModule({
  declarations: [EquipmentMahaComponent],
  imports: [
    CommonModule,RouterModule.forChild(router),BoardTempModule,TranslateModule
  ],
  exports:[RouterModule]
})
export class EquipmentMahaModule { }
