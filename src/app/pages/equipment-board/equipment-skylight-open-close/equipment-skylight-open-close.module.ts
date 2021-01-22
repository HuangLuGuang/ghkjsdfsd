import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentSkylightOpenCloseComponent } from './equipment-skylight-open-close.component';
import { BoardTempModule } from '../temp/board-temp.module';
import { TranslateModule } from '@ngx-translate/core';

const ROUTER:Routes = [
  {
    path:'',
    children:[
      {
        path:':title',
        component:EquipmentSkylightOpenCloseComponent
      }
    ]
  }
]

@NgModule({
  declarations: [EquipmentSkylightOpenCloseComponent],
  imports: [
    CommonModule,RouterModule.forChild(ROUTER),TranslateModule,BoardTempModule
  ],
  exports:[RouterModule]
})
export class EquipmentSkylightOpenCloseModule { }
