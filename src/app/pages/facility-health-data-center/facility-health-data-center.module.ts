import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityHealthDataCenterRoutingModule } from './facility-health-data-center-routing.module';
import { FacilityHealthDataCenterComponent } from './facility-health-data-center.component';


// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { MySelectTreeComponent } from './components/my-select-tree/my-select-tree.component';
import { MySelectTreeTypeComponent } from './components/my-select-tree-type/my-select-tree-type.component';
import { MyInputComponent } from './components/my-input/my-input.component';
import { MyDateRangeComponent } from './components/my-date-range/my-date-range.component';
import { FormsModule } from '@angular/forms';
import { AgTableComponent } from './components/ag-table/ag-table.component';
import { NzPaginationModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [FacilityHealthDataCenterComponent, MySelectTreeComponent, MySelectTreeTypeComponent, MyInputComponent, MyDateRangeComponent, AgTableComponent, 
  ],
  imports: [
    CommonModule,
    FacilityHealthDataCenterRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    FormsModule,
    NbSpinnerModule,

    // agtable
    NzPaginationModule,
    AgGridModule,
    NbSelectModule,

  ],

  providers:[
    

  ]

})
export class FacilityHealthDataCenterModule { }
