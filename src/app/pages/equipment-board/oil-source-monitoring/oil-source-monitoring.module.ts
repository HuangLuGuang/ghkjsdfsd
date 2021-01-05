import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BoardTempModule } from '../temp/board-temp.module';
import { OilSourceMonitoringComponent } from './oil-source-monitoring.component';
import { NbIconModule } from '@nebular/theme';

const router = [
  {
    path: '',
    component:OilSourceMonitoringComponent
  }
]

@NgModule({
  declarations: [
    OilSourceMonitoringComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(router),TranslateModule,BoardTempModule,
    NbIconModule
  ],
  exports:[RouterModule]
})
export class OilSourceMonitoringModule { }
