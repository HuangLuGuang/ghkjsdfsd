import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiftMachineRoutingModule } from './lift-machine-routing.module';
import { LiftMachineComponent } from './lift-machine.component';
import { StatusMonitorComponent } from './status-monitor/status-monitor.component';
import { NbSelectModule, NbCardModule, NbButtonModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';

// datetime
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE,OwlDateTimeIntl } from 'ng-pick-datetime';
import { DeviceKpiTongjiComponent } from './device-kpi-tongji/device-kpi-tongji.component';
import { TotalTimeComponent } from './device-kpi-tongji/total-time/total-time.component';
import { StatusComponent } from './device-kpi-tongji/status/status.component';
import { DetailComponent } from './device-kpi-tongji/detail/detail.component';
import { AgTableComponent } from './components/ag-table/ag-table.component';
import { NzPaginationModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';
import { MySelectTreeComponent } from './components/my-select-tree/my-select-tree.component';
import { MySelectTreeTypeComponent } from './components/my-select-tree-type/my-select-tree-type.component';
import { MyDateRangeComponent } from './components/my-date-range/my-date-range.component';



@NgModule({
  declarations: [LiftMachineComponent, StatusMonitorComponent, DeviceKpiTongjiComponent, TotalTimeComponent, StatusComponent, DetailComponent, AgTableComponent, MySelectTreeComponent, MySelectTreeTypeComponent, MyDateRangeComponent],
  imports: [
    CommonModule,
    LiftMachineRoutingModule,
    NbSelectModule,
    NbCardModule,
    FormsModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,

    // 日期-时间
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    NzPaginationModule,
    AgGridModule,
    


  ],

  providers:[
    

  ]

})
export class LiftMachineModule { }
