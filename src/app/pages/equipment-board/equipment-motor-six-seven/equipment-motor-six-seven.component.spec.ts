import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMotorSixSevenComponent } from './equipment-motor-six-seven.component';

describe('EquipmentMotorSixSevenComponent', () => {
  let component: EquipmentMotorSixSevenComponent;
  let fixture: ComponentFixture<EquipmentMotorSixSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMotorSixSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMotorSixSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
