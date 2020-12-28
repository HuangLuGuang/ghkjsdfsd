import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetHourConfigRoutingModule } from './target-hour-config-routing.module';
import { TargetHourConfigComponent } from './target-hour-config.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { YearSelectComponent } from './year-select/year-select.component';
import { MonthSelectComponent } from './month-select/month-select.component';
import { ComponentTModule } from '../components/componentT.module';
import { HourConfigComponent } from './hour-config/hour-config.component';
import { TeskConfigComponent } from './tesk-config/tesk-config.component';
import { ActionComponent } from './hour-config/action/action.component';


@NgModule({
  declarations: [TargetHourConfigComponent, YearSelectComponent, MonthSelectComponent, HourConfigComponent, TeskConfigComponent, ActionComponent,],
  imports: [
    CommonModule,
    TargetHourConfigRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbSpinnerModule,
    NbButtonModule,
    ComponentTModule,
  ]
})
export class TargetHourConfigModule { 
  
}


