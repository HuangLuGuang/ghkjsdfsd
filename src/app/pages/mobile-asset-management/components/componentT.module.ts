import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';


import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { AgTableComponent } from './ag-table/ag-table.component';

import { AgGridModule } from 'ag-grid-angular';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { MyInputComponent } from './my-input/my-input.component';
import { MyDateRangeComponent } from './my-date-range/my-date-range.component';
@NgModule({
  declarations: [
    AgTableComponent,
    MyInputComponent,
    MyDateRangeComponent,
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
  ],
  exports: [
    AgTableComponent,
    MyInputComponent,
    MyDateRangeComponent,
  ]
})
export class ComponentTModule { }
