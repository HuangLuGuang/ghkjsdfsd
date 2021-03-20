import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMotorLujiaoComponent } from './equipment-motor-lujiao.component';

describe('EquipmentMotorLujiaoComponent', () => {
  let component: EquipmentMotorLujiaoComponent;
  let fixture: ComponentFixture<EquipmentMotorLujiaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMotorLujiaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMotorLujiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
