import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbMenuModule, NbPopoverModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { FormsModule } from '@angular/forms';
import { KpiDetailComponent } from './kpi/kpi-detail/kpi-detail.component';
import { YearComponent } from './kpi/kpi-detail/year/year.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbCardModule,
    FormsModule,
    // kpi 详情
    NbPopoverModule,
    NbButtonModule,
    NbIconModule,
  ],
  declarations: [
    PagesComponent,
    KpiDetailComponent,
    YearComponent,
  ],
  providers: [
  ],
  
})
export class PagesModule {
}

