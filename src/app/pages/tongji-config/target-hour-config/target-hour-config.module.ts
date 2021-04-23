import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TargetHourConfigRoutingModule } from "./target-hour-config-routing.module";
import { TargetHourConfigComponent } from "./target-hour-config.component";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTooltipModule,
} from "@nebular/theme";
import { YearSelectComponent } from "./year-select/year-select.component";
import { MonthSelectComponent } from "./month-select/month-select.component";
// import { ComponentTModule } from '../components/componentT.module';
import { ComponentTModule } from "../../tongji/components/componentT.module";
import { HourConfigComponent } from "./hour-config/hour-config.component";
import { TeskConfigComponent } from "./tesk-config/tesk-config.component";
import { ActionComponent } from "./hour-config/action/action.component";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import {
  NzDrawerModule,
  NzTimelineModule,
  NzIconModule,
  NzModalModule,
} from "ng-zorro-antd";

import { AntTimeLineComponent } from "./ant-time-line/ant-time-line.component";
import { TimeScheduleComponent } from "./tesk-config/time-schedule/time-schedule.component";
import { ExemplarnameComponent } from "./tesk-config/exemplarname/exemplarname.component";
import { ExemplarchildnumbersComponent } from './tesk-config/exemplarchildnumbers/exemplarchildnumbers.component';

@NgModule({
  declarations: [
    TargetHourConfigComponent,
    YearSelectComponent,
    MonthSelectComponent,
    HourConfigComponent,
    TeskConfigComponent,
    ActionComponent,
    AntTimeLineComponent,
    TimeScheduleComponent,
    ExemplarnameComponent,
    ExemplarchildnumbersComponent,
  ],
  imports: [
    CommonModule,
    TargetHourConfigRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbSpinnerModule,
    ComponentTModule,
    NzTabsModule,

    // 抽屉
    NzDrawerModule,
    // 时间轴
    NzTimelineModule,
    NzIconModule,

    // 进度条
    NbProgressBarModule,

    // tootip
    NbTooltipModule,
  ],
  entryComponents: [MonthSelectComponent],
})
export class TargetHourConfigModule {}
