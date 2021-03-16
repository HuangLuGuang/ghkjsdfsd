import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAtecComponent } from './equipment-atec.component';
import { RouterModule } from '@angular/router';
import { BoardTempModule } from '../temp/board-temp.module';
import { TranslateModule } from '@ngx-translate/core';

const router = [
  {
    path:'',
    component:EquipmentAtecComponent
  }
]

@NgModule({
  declarations: [EquipmentAtecComponent],
  imports: [
    CommonModule,RouterModule.forChild(router),BoardTempModule,TranslateModule
  ],
  exports:[RouterModule]
})
export class EquipmentAtecModule { }
