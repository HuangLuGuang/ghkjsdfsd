import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { NbIconModule, NbInputModule, NbSelectModule,NbCardModule } from '@nebular/theme';


import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { AgTableComponent } from './ag-table/ag-table.component';

import { AgGridModule } from 'ag-grid-angular';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { MyInputComponent } from './my-input/my-input.component';
import { MyDateRangeComponent } from './my-date-range/my-date-range.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { DeviceOrderComponent } from './device-order/device-order.component';
import { DeviceDetailInfoComponent } from './device-detail-info/device-detail-info.component';
@NgModule({
  declarations: [
    AgTableComponent,
    MyInputComponent,
    MyDateRangeComponent,
    DeviceEditComponent,
    DeviceOrderComponent,
    DeviceDetailInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbSelectModule,
    NbInputModule,
    NbIconModule,
    Ng2SmartTableModule,
    AgGridModule,
    NzPaginationModule,
    NbCardModule,
  ],
  exports: [
    AgTableComponent,
    MyInputComponent,
    MyDateRangeComponent,
  ]
})
export class ComponentTModule { }
