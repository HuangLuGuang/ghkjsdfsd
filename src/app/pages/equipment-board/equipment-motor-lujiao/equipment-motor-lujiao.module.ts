import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentMotorLujiaoComponent } from './equipment-motor-lujiao.component';
import { BoardTempModule } from '../temp/board-temp.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
const ROUTER = [
  {
    path:'',
    component:EquipmentMotorLujiaoComponent
  }
]


@NgModule({
  declarations: [EquipmentMotorLujiaoComponent],
  imports: [
    CommonModule,TranslateModule,BoardTempModule,RouterModule.forChild(ROUTER)
  ],
  exports:[
    RouterModule
  ]
})
export class EquipmentMotorLujiaoModule { }
