import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentAvlComponent } from './equipment-avl/equipment-avl.component';
import { EquipmentBoardComponent } from './equipment-board.component';
import { EquipmentCouplingPathComponent } from './equipment-coupling-path/equipment-coupling-path.component';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import { EquipmentFourRoadComponent } from './equipment-four-road/equipment-four-road.component';
import { EquipmentHydraulicPressureComponent } from './equipment-hydraulic-pressure/equipment-hydraulic-pressure.component';
import { EquipmentMotorSystemComponent } from './equipment-motor-system/equipment-motor-system.component';
import { EquipmentShockComponent } from './equipment-shock/equipment-shock.component';
import { LaboratoryBoardComponent } from './laboratory-board/laboratory-board.component';
import { OilSourceMonitoringComponent } from './oil-source-monitoring/oil-source-monitoring.component';


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
        //AVL转毂+久鼎环境舱+排放分析
        path:'avl/:title',
        component:EquipmentAvlComponent
      },
      {
        path:'oilsrouce/:title',
        component:OilSourceMonitoringComponent
      },
      {
        path:'detailsDemo/:title',
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