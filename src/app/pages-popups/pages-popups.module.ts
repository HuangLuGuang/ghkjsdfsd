import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesPopupsRoutingModule } from './pages-popups-routing.module';
import { PagesPopupsComponent } from './pages-popups.component';

import { NbLayoutModule, NbCardModule, NbTabsetModule, NbCheckboxModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSpinnerModule, NbAutocompleteModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { RoleComponent } from './system-set/role/role.component';
import { FormsModule } from '@angular/forms';
import { MySelectComponent } from './components/my-select/my-select.component';
import { UserEmployeeComponent } from './system-set/user-employee/user-employee.component';
// import { EditUserEmployeeComponent } from './system-set/edit-user-employee/edit-user-employee.component';
import { UserEmployeeGroupComponent } from './system-set/user-employee-group/user-employee-group.component';
import { EditDelTooltipComponent } from './prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';
import { DeviceManageComponent } from './tongji/device-manage/device-manage.component';


// board
import { PreinstallDialogComponent } from './system-set/preinstall-dialog/preinstall-dialog.component';
import { ExpiredTokenComponent } from './token-diallog/expired-token/expired-token.component';
import { NewMenuComponent } from './system-set/new-menu/new-menu.component';

// Menu 导航菜单
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ChangePassowrdForallComponent } from './change-passowrd-forall/change-passowrd-forall.component';

// DateComponent
@NgModule({
  declarations: [PagesPopupsComponent, RoleComponent, 
    MySelectComponent, UserEmployeeComponent,  
    UserEmployeeGroupComponent, EditDelTooltipComponent, DeviceManageComponent, PreinstallDialogComponent,  ExpiredTokenComponent, NewMenuComponent, ChangePassowrdForallComponent],
  imports: [
    CommonModule,
    PagesPopupsRoutingModule,

    NbLayoutModule,
    NbCardModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbSpinnerModule,
    NbAutocompleteModule,// pages-popups 使用icon 
    NbSelectModule,
    FormsModule,
    NbButtonModule,

    NzMenuModule, // menu

  ],
  exports: [
    PreinstallDialogComponent
  ],
})
export class PagesPopupsModule { }
