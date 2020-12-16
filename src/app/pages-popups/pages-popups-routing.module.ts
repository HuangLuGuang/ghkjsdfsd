import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPopupsComponent } from './pages-popups.component'

const routes: Routes = [
  {
    path: '',
    component: PagesPopupsComponent,
    children:[
      // {
      //   path:'menu/add',
      //   component: MenuComponent,
      // },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesPopupsRoutingModule { }
