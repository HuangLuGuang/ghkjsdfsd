import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EimFileUploadRoutingModule } from './eim-file-upload-routing.module';
import { EimFileUploadComponent } from './eim-file-upload.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { NzPaginationModule, NzUploadModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';

import { AgTableComponent } from './components/ag-table/ag-table.component';
import { SendToMadamComponent } from './eim-file-upload/send-to-madam/send-to-madam.component';
import { FileNameComponent } from './eim-file-upload/file-name/file-name.component';


@NgModule({
  declarations: [EimFileUploadComponent,AgTableComponent, SendToMadamComponent, FileNameComponent],
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
  ],
  providers:[
    

  ]
})
export class EimFileUploadModule { }
