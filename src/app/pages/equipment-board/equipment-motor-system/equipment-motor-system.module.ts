import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentMotorSystemComponent } from './equipment-motor-system.component';
import { TranslateModule } from '@ngx-translate/core';
import { BoardTempModule } from '../temp/board-temp.module';


@NgModule({
  declarations: [
    EquipmentMotorSystemComponent
  ],
  imports: [
    CommonModule,TranslateModule,BoardTempModule
  ],
  exports:[
  ]
})
export class EquipmentMotorSystemModule { }
