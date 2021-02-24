import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentShengweiComponent } from './equipment-shengwei.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BoardTempModule } from '../temp/board-temp.module';

const router = [
  {
    path:'',
    children:[
      {
        path:':title',
        component:EquipmentShengweiComponent
      }
    ]
  }
];

@NgModule({
  declarations: [EquipmentShengweiComponent],
  imports: [
    CommonModule,RouterModule.forChild(router),TranslateModule,BoardTempModule
  ],
  exports:[RouterModule]
})
export class EquipmentShengwei4m3Module { }
