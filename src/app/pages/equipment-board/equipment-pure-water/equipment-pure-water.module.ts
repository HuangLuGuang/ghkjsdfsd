import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentPureWaterComponent } from './equipment-pure-water.component';
import { RouterModule } from '@angular/router';


const ROUTER = [
  {
    path:'',
    children:[
      {
        path:':title',
        component:EquipmentPureWaterComponent
      }
    ]
  }
]

@NgModule({
  declarations: [EquipmentPureWaterComponent],
  imports: [
    CommonModule,RouterModule.forChild(ROUTER),
  ],
  exports:[
    RouterModule
  ]
})
export class EquipmentPureWaterModule { }
