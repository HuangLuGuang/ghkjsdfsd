import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EimboardEimboardRoutingModule } from './equipment-board-routing.module';
import { ShareModule } from '../../share/share.module';
import { NzProgressModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';



import { EquipmentBoardComponent } from './equipment-board.component';

import { FirstLevelComponent } from './device-inline/first-level/first-level.component';
import { SecondLevelComponent } from './device-inline/second-level/second-level.component';
import { BoardTempModule } from './temp/board-temp.module';

// 组件
const COMPONENT = [
  EquipmentBoardComponent,
  FirstLevelComponent,
  SecondLevelComponent,

  
]
//设备看板模块
@NgModule({
  declarations: COMPONENT,
  imports: [
    CommonModule,ShareModule,EimboardEimboardRoutingModule,NzProgressModule,TranslateModule,
    NbIconModule,NbCardModule,NzCarouselModule,BoardTempModule

    // ---device inline 
  ],
  entryComponents:COMPONENT
})
export class EquipmentBoardModule { 
  constructor(){
    console.log('设备看板模块实例化')
  }
}
