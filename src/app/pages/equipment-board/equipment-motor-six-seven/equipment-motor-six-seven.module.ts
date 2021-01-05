import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentMotorSixSevenComponent } from './equipment-motor-six-seven.component';
import { BoardTempModule } from '../temp/board-temp.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    EquipmentMotorSixSevenComponent
  ],
  imports: [
    CommonModule,BoardTempModule,TranslateModule
  ]
})
export class EquipmentMotorSixSevenModule { }
