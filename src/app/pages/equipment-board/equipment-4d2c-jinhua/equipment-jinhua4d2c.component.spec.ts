import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentJinhua4d2cComponent } from './equipment-jinhua4d2c.component';

describe('EquipmentJinhua4d2cComponent', () => {
  let component: EquipmentJinhua4d2cComponent;
  let fixture: ComponentFixture<EquipmentJinhua4d2cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentJinhua4d2cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentJinhua4d2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
