import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpsModuleManageRoutingModule } from './gps-module-manage-routing.module';
import { GpsModuleManageComponent } from './gps-module-manage.component';
import { NbCardModule, NbMenuModule, NbSelectModule, NbButtonModule, NbLayoutModule, NbSidebarModule, NbSpinnerService, NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { AssetsManageComponent } from './assets-manage/assets-manage.component';
import { FormsModule } from '@angular/forms';

// import { Ng2SmartTableModule } from 'ng2-smart-table';

import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';

import { ComponentTModule } from '../components/componentT.module';
import { PowerManagementComponent } from './power-management/power-management.component';


@NgModule({
  declarations: [GpsModuleManageComponent, AssetsManageComponent, PowerManagementComponent],
  imports: [
    CommonModule,
    GpsModuleManageRoutingModule,
    NbCardModule,
    NbMenuModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    NbLayoutModule,
    NbSidebarModule,

    Ng2SmartTableModule,
    
    NbSpinnerModule,
    NbIconModule,
    ComponentTModule,
    
  ]
})
export class GpsModuleManageModule { }
