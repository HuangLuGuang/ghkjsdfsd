import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogWarmComponent } from '../temp/log-warm/log-warm.component';
import { TestInformationComponent } from '../temp/test-information/test-information.component';
import { ExperimentParamsComponent } from '../temp/experiment-params/experiment-params.component';
import { TestInformationV2Component } from '../temp/test-information-v2/test-information-v2.component';
import { EquipIntroduceComponent } from '../temp/equip-introduce/equip-introduce.component';
import { EquipmentStatusComponent } from '../temp/equipment-status/equipment-status.component';
import { TranslateModule } from '@ngx-translate/core';
import { DigitCompletionPipe } from '../pipe/digit-completion.pipe';


@NgModule({
  declarations: [
    EquipIntroduceComponent,LogWarmComponent,TestInformationComponent,
    ExperimentParamsComponent,TestInformationV2Component,
    EquipmentStatusComponent,DigitCompletionPipe
  ],
  imports: [
    CommonModule,TranslateModule
  ],
  exports:[
    EquipIntroduceComponent,LogWarmComponent,TestInformationComponent,
    ExperimentParamsComponent,TestInformationV2Component,
    EquipmentStatusComponent,DigitCompletionPipe
  ]
})
export class BoardTempModule { }
