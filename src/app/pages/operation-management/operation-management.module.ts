import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationManagementRoutingModule } from './operation-management-routing.module';
import { OperationManagementComponent } from './operation-management.component';
import { BorderGatewayComponent } from './border-gateway/border-gateway.component';
import { NbSelectModule, NbButtonModule, NbCardModule, NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { VideoIntegrationComponent } from './video-integration/video-integration.component';
import { AgTableComponent } from './components/ag-table/ag-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { NzPaginationModule } from 'ng-zorro-antd';
import { ActionComponent } from './border-gateway/action/action.component';
import { MySelectTreeComponent } from './components/my-select-tree/my-select-tree.component';
import { MySelectTreeTypeComponent } from './components/my-select-tree-type/my-select-tree-type.component';
import { MyInputComponent } from './components/my-input/my-input.component';

@NgModule({
  declarations: [OperationManagementComponent, BorderGatewayComponent,VideoIntegrationComponent, 
  AgTableComponent, ActionComponent, MySelectTreeComponent, MySelectTreeTypeComponent, MyInputComponent,   
  ],
  imports: [
    CommonModule,
    OperationManagementRoutingModule,
    NbSelectModule,
    NbButtonModule,
    FormsModule,
    NbCardModule,
    NbSpinnerModule,

    AgGridModule,
    NzPaginationModule,
    NbIconModule,
    

    Ng2SmartTableModule,

  ]
})
export class OperationManagementModule { }
