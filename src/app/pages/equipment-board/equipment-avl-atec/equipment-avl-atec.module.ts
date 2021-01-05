import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAvlAtecComponent } from './equipment-avl-atec.component';
import { BoardTempModule } from '../temp/board-temp.module';
import { ShareModule } from '../../../share/share.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    EquipmentAvlAtecComponent
  ],
  imports: [
    CommonModule,BoardTempModule,ShareModule,TranslateModule
  ]
})
export class EquipmentAvlAtecModule { }
