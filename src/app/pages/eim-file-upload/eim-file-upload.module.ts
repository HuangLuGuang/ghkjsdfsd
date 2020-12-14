import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EimFileUploadRoutingModule } from './eim-file-upload-routing.module';
import { EimFileUploadComponent } from './eim-file-upload.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { NzBreadCrumbModule, NzPaginationModule, NzUploadModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';

import { AgTableComponent } from './components/ag-table/ag-table.component';
import { SendToMadamComponent } from './eim-file-upload/send-to-madam/send-to-madam.component';
import { FileNameComponent } from './eim-file-upload/file-name/file-name.component';
import { FileBreadcrumbComponent } from './eim-file-upload/file-breadcrumb/file-breadcrumb.component';


@NgModule({
  declarations: [EimFileUploadComponent,AgTableComponent, SendToMadamComponent, FileNameComponent, FileBreadcrumbComponent],
  imports: [
    CommonModule,
    EimFileUploadRoutingModule,

    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NzPaginationModule,
    AgGridModule,
    NbSelectModule,
    // 上传
    NzUploadModule,
    // 面包屑
    NzBreadCrumbModule,
  ],
  providers:[
    

  ]
})
export class EimFileUploadModule { }
