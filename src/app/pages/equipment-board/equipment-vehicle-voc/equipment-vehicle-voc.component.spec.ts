import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentVehicleVocComponent } from './equipment-vehicle-voc.component';

describe('EquipmentVehicleVocComponent', () => {
  let component: EquipmentVehicleVocComponent;
  let fixture: ComponentFixture<EquipmentVehicleVocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentVehicleVocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentVehicleVocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
