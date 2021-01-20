import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EimboardEimboardRoutingModule } from './equipment-board-routing.module';
import { ShareModule } from '../../share/share.module';
import { NzProgressModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';



import { EquipmentBoardComponent } from './equipment-board.component';


import { EquipmentBoardService } from './serivice/equipment-board.service';
import { LaboratoryBoardComponent } from './laboratory-board/laboratory-board.component';

// 组件
const COMPONENT = [
  EquipmentBoardComponent,
  LaboratoryBoardComponent
]
//设备看板模块
@NgModule({
  declarations: COMPONENT,
  imports: [
    CommonModule,EimboardEimboardRoutingModule,TranslateModule,
    NbIconModule,NbCardModule,NzCarouselModule,NbSpinnerModule
    // ---device inline 
  ],
  entryComponents:COMPONENT,
  providers:[EquipmentBoardService]
})
export class EquipmentBoardModule { 
  constructor(){
    console.log('设备看板模块实例化')
  }
}
