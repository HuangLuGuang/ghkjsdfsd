import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';


import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { AgTableComponent } from './ag-table/ag-table.component';

import { AgGridModule } from 'ag-grid-angular';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { MySelectTreeComponent } from './my-select-tree/my-select-tree.component';
import { MySelectTreeTypeComponent } from './my-select-tree-type/my-select-tree-type.component';
import { MySelectTreeTypeComponent as MySelectTreeTypeComponentType} from './my-select-tree-type/my-select-tree-type.component';
import { MyDateRangeComponent } from './my-date-range/my-date-range.component';
import { MyInputComponent } from './my-input/my-input.component';
import { MyInputTwoComponent } from './my-input-two/my-input-two.component';
import { MyDateRangeMultipleComponent } from './my-date-range-multiple/my-date-range-multiple.component';
@NgModule({
  declarations: [
    AgTableComponent, MySelectTreeComponent, MySelectTreeTypeComponent,
    MySelectTreeTypeComponentType,
    MyDateRangeComponent,
    MyInputComponent,
    MyInputTwoComponent,
    MyDateRangeMultipleComponent,
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
    AgTableComponent,MySelectTreeComponent,MySelectTreeTypeComponentType,
    MyDateRangeComponent,
    MyInputComponent,
    MyInputTwoComponent,
    MyDateRangeMultipleComponent,
  ]
})
export class ComponentTModule { }
