import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TongjiRoutingModule } from './tongji-routing.module';
import { TongjiComponent } from './tongji.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { NbSelectModule, NbCardModule, NbButtonModule, NbInputModule, NbProgressBarModule, NbIconModule, NbSpinnerModule, NbLayoutModule, NbPopoverModule } from '@nebular/theme';



import { FormsModule } from '@angular/forms';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
import {Ng2SmartTableModule} from '@mykeels/ng2-smart-table';





// datetime
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE,OwlDateTimeIntl } from 'ng-pick-datetime';
import { StatusForTableComponent } from './device-manage/status-for-table/status-for-table.component';
// datetime 本地化标签 
export class DefaultIntl extends OwlDateTimeIntl {
  /** A label for the cancel button */
  cancelBtnLabel= '取消'

  /** A label for the set button */
  setBtnLabel= '确定'

  /** A label for the range 'from' in picker info */
  rangeFromLabel= '开始时间'

  /** A label for the range 'to' in picker info */
  rangeToLabel= '结束时间'

}

export const MY_CUSTOM_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};


import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import  { ComponentTModule } from './components/componentT.module'
import { AgGridModule } from 'ag-grid-angular';
import { ActionComponent } from './device-manage/action/action.component';
import { TranActiveComponent } from './device-manage/tran-active/tran-active.component';
import { TranIscalkpiComponent } from './device-manage/tran-iscalkpi/tran-iscalkpi.component';
import { NzTabsModule } from 'ng-zorro-antd';
@NgModule({
  declarations: [TongjiComponent, DeviceManageComponent, 
    StatusForTableComponent, ActionComponent, TranActiveComponent, TranIscalkpiComponent,],
  imports: [
    CommonModule,
    TongjiRoutingModule,
    NbSelectModule,
    NbCardModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
    NbProgressBarModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbSpinnerModule,
    NbLayoutModule,

    // nbpopover
    NbPopoverModule,

    // 日期-时间
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    
    // 分页
    NzPaginationModule,
    AgGridModule,

    ComponentTModule,

    NzTabsModule,

  ],
  providers:[
    {
      provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'
      // provide: OWL_DATE_TIME_LOCALE, useValue: MY_CUSTOM_FORMATS
    },
    {
      provide: OwlDateTimeIntl, useClass: DefaultIntl
    }

  ],
  // exports: [ MySelectComponent, MySelectGroupComponent, MyTableNg2Component, DateRangeComponent]
})
export class TongjiModule { }
