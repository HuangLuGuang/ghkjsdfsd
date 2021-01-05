import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoDriveChassisComponent } from './two-drive-chassis.component';
import { RouterModule } from '@angular/router';
import {  TranslateModule } from '@ngx-translate/core';
import { BoardTempModule } from '../temp/board-temp.module';

const  router = [
  {
    path: '',
    children: [
      {
        //两驱底盘测功机-1
        path:':title/:deviceid',
        component:TwoDriveChassisComponent
      },
      // {
      //   //两驱底盘测功机-2
      //   path:':title/:deviceid',
      //   component:TwoDriveChassisComponent
      // },
      // {
      //   //四驱底盘测功机（未验收）
      //   path:':title/:deviceid',
      //   component:TwoDriveChassisComponent
      // },
    ]
  }
  
  
]

@NgModule({
  declarations: [
    TwoDriveChassisComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(router),TranslateModule,BoardTempModule
  ],
  exports: [RouterModule],
})
export class TwoDriveChassisModule { }
