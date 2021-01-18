import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TongjiConfigRoutingModule } from './tongji-config-routing.module';
import { TongjiConfigComponent } from './tongji-config.component';
import { NzPaginationModule, NzTabsModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';
import { ComponentTModule } from '../tongji/components/componentT.module';
import { NbButtonModule, NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [TongjiConfigComponent],
  imports: [
    CommonModule,
    TongjiConfigRoutingModule,

    NbCardModule,
    NbButtonModule,


    NzPaginationModule,
    AgGridModule,
    // ComponentTModule,

    ComponentTModule,
    NzTabsModule,
  ]
})
export class TongjiConfigModule { }
