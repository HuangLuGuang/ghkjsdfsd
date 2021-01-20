import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentVehicleVocComponent } from './equipment-vehicle-voc.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BoardTempModule } from '../temp/board-temp.module';

const ROUTE = [
  {
    path:'',
    children:[
      {
        path:':title',
        component:EquipmentVehicleVocComponent
      }
    ]
  }
]

@NgModule({
  declarations: [EquipmentVehicleVocComponent,],
  imports: [
    CommonModule,RouterModule.forChild(ROUTE),TranslateModule,BoardTempModule
  ],
  exports:[RouterModule]
})
export class EquipmentVehicleVocModule { }
