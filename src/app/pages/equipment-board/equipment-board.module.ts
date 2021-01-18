import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EimboardEimboardRoutingModule } from './equipment-board-routing.module';
import { ShareModule } from '../../share/share.module';
import { NzProgressModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';



import { EquipmentBoardComponent } from './equipment-board.component';

import { FirstLevelComponent } from './device-inline/first-level/first-level.component';
import { SecondLevelComponent } from './device-inline/second-level/second-level.component';
import { BoardTempModule } from './temp/board-temp.module';
import { EquipmentBoardService } from './serivice/equipment-board.service';

// 组件
const COMPONENT = [
  EquipmentBoardComponent,
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
