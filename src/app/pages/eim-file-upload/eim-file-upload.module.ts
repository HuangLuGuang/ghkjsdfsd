import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EimFileUploadRoutingModule } from './eim-file-upload-routing.module';
import { EimFileUploadComponent } from './eim-file-upload.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbSelectModule,
  NbSpinnerModule, NbDialogModule } from '@nebular/theme';
import { NzBreadCrumbModule, NzPaginationModule, NzButtonModule, NzIconModule, NzUploadModule} from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { AgTableComponent } from './components/ag-table/ag-table.component';
import { NzMessageModule } from 'ng-zorro-antd';
import { DeleteButtonComponent } from './eim-file-upload/delete-button/delete-button.component';
import { FileNameComponent } from './eim-file-upload/file-name/file-name.component';
import { FileBreadcrumbComponent } from './eim-file-upload/file-breadcrumb/file-breadcrumb.component';
import { InputFoldernameComponent } from './eim-file-upload/input-foldername/input-foldername.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NbEvaIconsModule } from '@nebular/eva-icons';



@NgModule({
  declarations: [
    EimFileUploadComponent,
    AgTableComponent,
    DeleteButtonComponent,
    FileNameComponent,
    FileBreadcrumbComponent,
    InputFoldernameComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    EimFileUploadRoutingModule,
    NzButtonModule,
    NzIconModule,
    NzMessageModule,
    NzInputModule,
    NzModalModule,
    NzFormModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSpinnerModule,
    NbEvaIconsModule,
    NbIconModule,
    NbDialogModule.forChild(),
    NzPaginationModule,
    AgGridModule,
    NbSelectModule,
    // 上传
    NzUploadModule,
    // 面包屑
    NzBreadCrumbModule,
  ],
  entryComponents: [InputFoldernameComponent],
  providers: [
  ],
})
export class EimFileUploadModule { }
