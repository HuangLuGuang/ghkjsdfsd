import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentTc220Component } from './equipment-tc220.component';
import { RouterModule } from '@angular/router';
import { BoardTempModule } from '../temp/board-temp.module';
import { TranslateModule } from '@ngx-translate/core';

const router = [
  {
    path:'',
    component:EquipmentTc220Component
  }
]

@NgModule({
  declarations: [EquipmentTc220Component],
  imports: [
    CommonModule,RouterModule.forChild(router),BoardTempModule,TranslateModule
  ],
  exports:[RouterModule]
})
export class EquipmentTc220Module { }
