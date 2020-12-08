import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TongjiReportRoutingModule } from './tongji-report-routing.module';
import { TongjiReportComponent } from './tongji-report.component';
import { NbCardModule, NbMenuModule, NbSelectModule, NbButtonModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { DriveReportComponent } from './drive-report/drive-report.component';
import { AlertReportComponent } from './alert-report/alert-report.component';
import { FormsModule } from '@angular/forms';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';
import { ComponentTModule } from '../components/componentT.module';

@NgModule({
  declarations: [TongjiReportComponent, DriveReportComponent, AlertReportComponent, ],
  imports: [
    CommonModule,
    TongjiReportRoutingModule,
    NbCardModule,
    NbMenuModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    ComponentTModule,

  ],

  providers:[
  ]

})
export class TongjiReportModule { }
