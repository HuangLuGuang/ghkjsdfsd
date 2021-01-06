import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationManagementRoutingModule } from './operation-management-routing.module';
import { OperationManagementComponent } from './operation-management.component';
import { BorderGatewayComponent } from './border-gateway/border-gateway.component';
import { MySelectComponent } from './components/my-select/my-select.component';
import { MySelectGroupComponent } from './components/my-select-group/my-select-group.component';
import { NbSelectModule, NbButtonModule, NbCardModule, NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { VideoIntegrationComponent } from './video-integration/video-integration.component';
import { AgTableComponent } from './components/ag-table/ag-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { NzPaginationModule } from 'ng-zorro-antd';
import { ActionComponent } from './border-gateway/action/action.component';

@NgModule({
  declarations: [OperationManagementComponent, BorderGatewayComponent,VideoIntegrationComponent, 
   MySelectComponent, MySelectGroupComponent, AgTableComponent, ActionComponent,  
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
