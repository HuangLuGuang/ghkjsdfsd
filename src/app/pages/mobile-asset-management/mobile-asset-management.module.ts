import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileAssetManagementRoutingModule } from './mobile-asset-management-routing.module';
import { MobileAssetManagementComponent } from './mobile-asset-management.component';
import { LocationMonitoringComponent } from './location-monitoring/location-monitoring.component';
import { NbTabsetModule, NbAutocompleteModule, NbInputModule, NbFormFieldModule, NbIconModule, NbMenuModule, NbAccordionModule, NbPopoverModule, NbListModule, NbButtonModule, NbCardModule, NbDialogModule, NbContextMenuModule, NbSpinnerModule } from '@nebular/theme';
import { AllComponent } from './components/all/all.component';

// 响应式表单
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 多语言切换
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { DeviceTraceComponent } from './components/device-trace/device-trace.component';
import { ComponentTModule } from './components/componentT.module';
import { NzDropDownModule, NzPaginationModule, NzTreeModule } from 'ng-zorro-antd';
import { NzInputModule } from 'ng-zorro-antd/input';

import { AgGridModule } from 'ag-grid-angular';

// Aot requires an export function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [MobileAssetManagementComponent, LocationMonitoringComponent, AllComponent, MapComponent,  DeviceTraceComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MobileAssetManagementRoutingModule,
    NbTabsetModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbMenuModule,
    NbAutocompleteModule,
    NbAccordionModule,
    NbPopoverModule,
    NbListModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule.forChild(),
    NbContextMenuModule,
    NbSpinnerModule,
    NbMenuModule,

    NzPaginationModule,
    AgGridModule,
    ComponentTModule,

    // nztree
    NzTreeModule,
    NzInputModule,
    FormsModule,
    NzDropDownModule,




    // Translate
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),


  ]
})
export class MobileAssetManagementModule { }
