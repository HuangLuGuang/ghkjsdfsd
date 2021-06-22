import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesPopupsRoutingModule } from "./pages-popups-routing.module";
import { PagesPopupsComponent } from "./pages-popups.component";

import {
  NbLayoutModule,
  NbCardModule,
  NbTabsetModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbAutocompleteModule,
  NbSelectModule,
  NbButtonModule,
  NbAccordionModule,
  NbListModule,
} from "@nebular/theme";
import { RoleComponent } from "./system-set/role/role.component";
import { FormsModule } from "@angular/forms";
import { MySelectComponent } from "./components/my-select/my-select.component";
import { UserEmployeeComponent } from "./system-set/user-employee/user-employee.component";
// import { EditUserEmployeeComponent } from './system-set/edit-user-employee/edit-user-employee.component';
import { UserEmployeeGroupComponent } from "./system-set/user-employee-group/user-employee-group.component";
import { EditDelTooltipComponent } from "./prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { DeviceManageComponent } from "./tongji/device-manage/device-manage.component";

// board
import { PreinstallDialogComponent } from "./system-set/preinstall-dialog/preinstall-dialog.component";
import { ExpiredTokenComponent } from "./token-diallog/expired-token/expired-token.component";
import { NewMenuComponent } from "./system-set/new-menu/new-menu.component";

// Menu 导航菜单
import { NzMenuModule } from "ng-zorro-antd/menu";
import { ChangePassowrdForallComponent } from "./change-passowrd-forall/change-passowrd-forall.component";
import { TargetHourConfigComponent } from "./tongji/target-hour-config/target-hour-config.component";
import { AddComponent } from "./tongji/test_task_conf/add/add.component";
import { GroupDevicesComponent } from "./tongji/test_task_conf/components/group-devices/group-devices.component";

import { NzSelectModule } from "ng-zorro-antd/select";
import { EditComponent } from "./tongji/test_task_conf/edit/edit.component";
import { DailyTargetDurationComponent } from "./tongji/target-hour-config/daily-target-duration/daily-target-duration.component";
import { DeviceStatusInfoComponent } from "./andon-man-hour/device-status-info/device-status-info.component";
import { SetWeilanComponent } from "./gps/set-weilan/set-weilan.component";
import { AddEditGpsComponent } from "./gps/add-edit-gps/add-edit-gps.component";
import { LiftMachineComponent } from "./lift-machine/lift-machine.component";
import { AddEditTemperatureComponent } from "./envitonmental-monitoring/device-temperature/add-edit-temperature/add-edit-temperature.component";
import { SetPullConfigComponent } from "./facility-health-data-center/alert-info-and-config/set-pull-config/set-pull-config.component";
import { SetRuleConfigComponent } from "./facility-health-data-center/alert-info-and-config/set-rule-config/set-rule-config.component";
import { LimitsAddComponent } from "./tongji/test_task_conf/limits-add/limits-add.component";
import { LimitsAddInitComponent } from "./tongji/test_task_conf/limits-add-init/limits-add-init.component";
import { LimitsGroupDeviceComponent } from "./tongji/test_task_conf/components/limits-group-device/limits-group-device.component";

import { ExemplarNoNameComponent } from "./tongji/test_task_conf/components/exemplar-no-name/exemplar-no-name.component";
import { NzTreeModule } from "ng-zorro-antd";
import { SelectComponent } from "./facility-health-data-center/alert-info-and-config/set-rule-config/select/select.component";
import { TaskEditComponent } from './tongji/test_task_conf/task-edit/task-edit.component';
import { AddEditVideoIntegrationComponent } from './operation-management/add-edit-video-integration/add-edit-video-integration.component';
// DateComponent
@NgModule({
  declarations: [
    PagesPopupsComponent,
    RoleComponent,
    MySelectComponent,
    UserEmployeeComponent,
    UserEmployeeGroupComponent,
    EditDelTooltipComponent,
    DeviceManageComponent,
    PreinstallDialogComponent,
    ExpiredTokenComponent,
    NewMenuComponent,
    ChangePassowrdForallComponent,
    TargetHourConfigComponent,
    AddComponent,
    GroupDevicesComponent,
    EditComponent,
    DailyTargetDurationComponent,
    DeviceStatusInfoComponent,
    SetWeilanComponent,
    AddEditGpsComponent,
    LiftMachineComponent,
    AddEditTemperatureComponent,
    SetPullConfigComponent,
    SetRuleConfigComponent,
    LimitsAddComponent,
    LimitsAddInitComponent,
    LimitsGroupDeviceComponent,
    ExemplarNoNameComponent,
    SelectComponent,
    TaskEditComponent,
    AddEditVideoIntegrationComponent,
  ],
  imports: [
    CommonModule,
    PagesPopupsRoutingModule,

    NbLayoutModule,
    NbCardModule,
    NbListModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbSpinnerModule,
    NbAutocompleteModule, // pages-popups 使用icon
    NbSelectModule,
    FormsModule,
    NbButtonModule,

    NbAccordionModule,

    NzMenuModule, // menu

    NzSelectModule,
    FormsModule,
    // select选择器
    NzSelectModule,
    NbSpinnerModule,
  ],
  exports: [PreinstallDialogComponent, DailyTargetDurationComponent],
})
export class PagesPopupsModule {}
