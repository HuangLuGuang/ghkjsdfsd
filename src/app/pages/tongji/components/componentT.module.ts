import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbTooltipModule } from '@nebular/theme';


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
import { TableGroupComponent } from './table-group/table-group.component';
import { MySelectTreeSingleComponent } from './my-select-tree-single/my-select-tree-single.component';
import { TableDevicenameComponent } from './table-devicename/table-devicename.component';
@NgModule({
  declarations: [
    AgTableComponent, MySelectTreeComponent, MySelectTreeTypeComponent,
    MySelectTreeTypeComponentType,
    MyDateRangeComponent,
    MyInputComponent,
    MyInputTwoComponent,
    TableGroupComponent,
    MySelectTreeSingleComponent,
    TableDevicenameComponent,
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
    // popover
    NbPopoverModule,

    // tootip
    NbTooltipModule,
  ],
  exports: [
    AgTableComponent,MySelectTreeComponent,MySelectTreeTypeComponentType,
    MyDateRangeComponent,
    MyInputComponent,
    MyInputTwoComponent,
    TableGroupComponent,
    MySelectTreeSingleComponent,
  ]
})
export class ComponentTModule { }
