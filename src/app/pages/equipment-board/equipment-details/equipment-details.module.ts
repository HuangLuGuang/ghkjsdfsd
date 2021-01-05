import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentDetailsComponent } from './equipment-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from '../../../share/share.module';
import { BoardTempModule } from '../temp/board-temp.module';



@NgModule({
  declarations: [
    EquipmentDetailsComponent
  ],
  imports: [
    CommonModule,BoardTempModule,ShareModule,TranslateModule
  ]
})
export class EquipmentDetailsModule { }
