import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePassowrdForallComponent } from './change-passowrd-forall/change-passowrd-forall.component';

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
      {
        path:'forall',
        component: ChangePassowrdForallComponent,
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesPopupsRoutingModule { }
