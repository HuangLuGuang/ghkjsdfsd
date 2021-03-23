import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTc220Component } from './equipment-tc220.component';

describe('EquipmentTc220Component', () => {
  let component: EquipmentTc220Component;
  let fixture: ComponentFixture<EquipmentTc220Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentTc220Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentTc220Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
