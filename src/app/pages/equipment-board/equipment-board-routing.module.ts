import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstLevelComponent } from './device-inline/first-level/first-level.component';
import { SecondLevelComponent } from './device-inline/second-level/second-level.component';
import { EquipmentAvlAtecComponent } from './equipment-avl-atec/equipment-avl-atec.component';
import { EquipmentBoardComponent } from './equipment-board.component';
import { EquipmentMotorSixSevenComponent } from './equipment-motor-six-seven/equipment-motor-six-seven.component';
import { EquipmentMotorSystemComponent } from './equipment-motor-system/equipment-motor-system.component';
import { LaboratoryBoardComponent } from './laboratory-board/laboratory-board.component';


//路由
const ROUTERS: Routes = [{
    path: '',
    component: EquipmentBoardComponent,
    children: [
      {
        path: 'first-level',
        component: FirstLevelComponent,
      },
      {
        path: 'second-level',
        component: SecondLevelComponent,

      },
      { 
        path: "third-level", 
        loadChildren:()=>import('./device-inline/third-level/third-level.module')
        .then(m=>m.ThirdLevelModule),

      },
      {
        path: '',
        redirectTo: "first-level",
        pathMatch: 'full'
      },

      

      {
        //四立柱道路模拟试验台-320.5
        path:'road/:title',
        loadChildren:()=>import('./equipment-four-road/equipment-four-road.module')
        .then(m=>m.EquipmentFourRoadModule),

      },
      {
        //液压伺服系统扩展系统-Testline
        path:'hydraulic/:title',
        loadChildren:()=>import('./equipment-hydraulic-pressure/equipment-hydraulic-pressure.module')
        .then(m=>m.EquipmentHydraulicPressureModule),

      },
      {
        //六自由度振动台-353.2
        path:'shock',
        loadChildren:()=>import('./equipment-shock/equipment-shock.module')
        .then(m=>m.EquipmentShockModule),

      },
      {
        //整车多轴轴耦合道路模拟试验台-329
        path:'coupling/:title',
        loadChildren:()=>import('./equipment-coupling-path/equipment-coupling-path.module')
        .then(m=>m.EquipmentCouplingPathModule),

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
        loadChildren:()=>import('./equipment-avl/equipment-avl.module')
        .then(m=>m.EquipmentAvlModule),

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
        loadChildren:()=>import('./central-four-jinhua/central-four-jinhua.module')
        .then(m=>m.CentralFourJinhuaModule),

      },
      {
        // 环境舱集中监控
        path:'monitoring/:title',
        loadChildren:()=>import('./cabin-centralized-monitoring/cabin-centralized-monitoring.module')
        .then(m=>m.CabinCentralizedMonitoringModule),

      },
      //两驱底盘测功机
      { 
        path: "twodrive", 
        loadChildren:()=>import('./two-drive-chassis/two-drive-chassis.module')
        .then(m=>m.TwoDriveChassisModule),

      },
      { 
        path: "twodrive2", 
        loadChildren:()=>import('./two-drive-chassis/two-drive-chassis.module')
        .then(m=>m.TwoDriveChassisModule),

      },

      {
        //油源
        path:'oilsrouce/:title',
        loadChildren:()=>import('./oil-source-monitoring/oil-source-monitoring.module')
        .then(m=>m.OilSourceMonitoringModule),
        
      },

      {
        //整车voc舱
        path:'vehicle',
        loadChildren:()=>import('./equipment-vehicle-voc/equipment-vehicle-voc.module')
        .then(m=>m.EquipmentVehicleVocModule),
        
      },
      {
        //开窗闭件
        path:'skylight',
        loadChildren:()=>import('./equipment-skylight-open-close/equipment-skylight-open-close.module')
        .then(m=>m.EquipmentSkylightOpenCloseModule),
        
      },
      {
        //氙灯老化设备集中监控
        path:'xenon',
        loadChildren:()=>import('./equipment-xenon-lamp/equipment-xenon-lamp.module')
        .then(m=>m.EquipmentXenonLampModule),
        
      },
      {
        //纯水
        path:'pure',
        loadChildren:()=>import('./equipment-pure-water/equipment-pure-water.module')
        .then(m=>m.EquipmentPureWaterModule),
        
      },
      {
        //四门两盖01
        path:'jinhua-4d2c-01/:title/one',
        loadChildren:()=>import('./equipment-4d2c-jinhua/equipment-4d2c-jinhua.module')
        .then(m=>m.Equipment4d2cJinhuaModule),

      },
      {
        //昇微+4m3
        path:'shengwei',
        loadChildren:()=>import('./equipment-shengwei-4m3/equipment-shengwei-4m3.module')
        .then(m=>m.EquipmentShengwei4m3Module),

      },

      {//整车异响
        path:'ccts-bsr',
        loadChildren:()=>import('./equipment-cts-bsr/equipment-cts-bsr.module')
        .then(m=>m.EquipmentCtsBsrModule)
      },
      
      // {
      //   path:'detailsDemo/:title/:deviceid',
      //   component:EquipmentDetailsComponent
      // },
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