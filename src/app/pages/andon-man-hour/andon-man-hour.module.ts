import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndonManHourRoutingModule } from './andon-man-hour-routing.module';
import { AndonManHourComponent } from './andon-man-hour.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { DeviceAndonStatusInputComponent } from './device-andon-status-input/device-andon-status-input.component';
import { DeviceAndonStatusInfoComponent } from './device-andon-status-info/device-andon-status-info.component';
import { MySelectTreeComponent } from './components/my-select-tree/my-select-tree.component';
import { AntTimeLineComponent } from './components/ant-time-line/ant-time-line.component';
import { NzPaginationModule, NzTimelineModule } from 'ng-zorro-antd';
import { AgTableComponent } from './components/ag-table/ag-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { DetailComponent } from './device-andon-status-info/detail/detail.component';


@NgModule({
  declarations: [AndonManHourComponent, DeviceAndonStatusInputComponent, DeviceAndonStatusInfoComponent, MySelectTreeComponent, AntTimeLineComponent, AgTableComponent, DetailComponent],
  imports: [
    CommonModule,
    AndonManHourRoutingModule,

    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    
    NzTimelineModule,

    NzPaginationModule,
    AgGridModule,

  ]
})
export class AndonManHourModule { }
