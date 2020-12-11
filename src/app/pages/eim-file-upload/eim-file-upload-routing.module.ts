import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EimFileUploadComponent } from './eim-file-upload.component';


const routes: Routes = [
  {
    path: '',
    component: EimFileUploadComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EimFileUploadRoutingModule { }
