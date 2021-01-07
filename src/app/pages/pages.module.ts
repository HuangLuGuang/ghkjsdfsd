import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule, NbPopoverModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { FormsModule } from '@angular/forms';
import { KpiDetailComponent } from './kpi/kpi-detail/kpi-detail.component';

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
  ],
  declarations: [
    PagesComponent,
    KpiDetailComponent,
  ],
  providers: [
  ],
  
})
export class PagesModule {
}

