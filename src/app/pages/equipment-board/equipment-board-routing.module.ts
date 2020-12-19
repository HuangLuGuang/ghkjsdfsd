import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinCentralizedMonitoringComponent } from './cabin-centralized-monitoring/cabin-centralized-monitoring.component';
import { CentralFourJinhuaComponent } from './central-four-jinhua/central-four-jinhua.component';
import { EquipmentAvlAtecComponent } from './equipment-avl-atec/equipment-avl-atec.component';
import { EquipmentAvlComponent } from './equipment-avl/equipment-avl.component';
import { EquipmentBoardComponent } from './equipment-board.component';
import { EquipmentCouplingPathComponent } from './equipment-coupling-path/equipment-coupling-path.component';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import { EquipmentFourRoadComponent } from './equipment-four-road/equipment-four-road.component';
import { EquipmentHydraulicPressureComponent } from './equipment-hydraulic-pressure/equipment-hydraulic-pressure.component';
import { EquipmentMotorSixSevenComponent } from './equipment-motor-six-seven/equipment-motor-six-seven.component';
import { EquipmentMotorSystemComponent } from './equipment-motor-system/equipment-motor-system.component';
import { EquipmentShockComponent } from './equipment-shock/equipment-shock.component';
import { LaboratoryBoardComponent } from './laboratory-board/laboratory-board.component';
import { OilSourceMonitoringComponent } from './oil-source-monitoring/oil-source-monitoring.component';
import { TwoDriveChassisComponent } from './two-drive-chassis/two-drive-chassis.component';


//路由
const ROUTERS: Routes = [{
    path: '',
    component: EquipmentBoardComponent,
    children: [
      {
        //四立柱道路模拟试验台-320.5
        path:'road/:title',
        component:EquipmentFourRoadComponent,
      },
      {
        //液压伺服系统扩展系统-Testline
        path:'hydraulic/:title',
        component:EquipmentHydraulicPressureComponent,        
      },
      {
        //六自由度振动台-353.2
        path:'shock/:title',
        component:EquipmentShockComponent,
      },
      {
        //整车多轴轴耦合道路模拟试验台-329
        path:'coupling/:title',
        component:EquipmentCouplingPathComponent
      },
      {
        //电机系统测试台架-1
        path:'motor/:title/:deviceid',
        component:EquipmentMotorSystemComponent
      },
      {
        //电机系统测试台架-2
        path:'motor2/:title/:deviceid',
        component:EquipmentMotorSystemComponent
      },
      {
        //电机系统测试台架-3
        path:'motor3/:title/:deviceid',
        component:EquipmentMotorSystemComponent
      },
      {
        //电机系统测试台架-4
        path:'motor4/:title/:deviceid',
        component:EquipmentMotorSystemComponent
      },
      {
        //电机系统测试台架-6
        path:'motor6/:title/:deviceid',
        component:EquipmentMotorSixSevenComponent
      },
      {
        //电机系统测试台架-7
        path:'motor7/:title/:deviceid',
        component:EquipmentMotorSixSevenComponent
      },
      {
        //AVL转毂+久鼎环境舱+排放分析
        path:'avl/:title',
        component:EquipmentAvlComponent
      },
      {
        //两驱底盘测功机-1
        path:'twodrive/:title/:deviceid',
        component:TwoDriveChassisComponent
      },
      {
        //两驱底盘测功机-2
        path:'twodrive2/:title/:deviceid',
        component:TwoDriveChassisComponent
      },
      {
        //四驱底盘测功机（未验收）
        path:'twodrive3/:title/:deviceid',
        component:TwoDriveChassisComponent
      },
      {
        //两驱AVL转毂+ATEC环境舱+排放分析
        path:'avl-etec/:title/:deviceid',
        component:EquipmentAvlAtecComponent
      },
      {
        //四驱AVL转毂+ATEC环境舱+排放分析
        path:'avl-etec2/:title/:deviceid',
        component:EquipmentAvlAtecComponent
      },
      {
        //中置式四驱底盘测功机+锦华高低温环境舱
        path:'central-jinhua/:title',
        component:CentralFourJinhuaComponent
      },
      {
        // 环境舱集中监控
        path:'monitoring/:title',
        component:CabinCentralizedMonitoringComponent
      },
      {
        //油源
        path:'oilsrouce/:title',
        component:OilSourceMonitoringComponent
      },
      {
        path:'detailsDemo/:title/:deviceid',
        component:EquipmentDetailsComponent
      },
      {
        path:'laboratory',
        component:LaboratoryBoardComponent
      },
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(ROUTERS)],
    exports: [RouterModule]
  })
  export class EimboardEimboardRoutingModule { }