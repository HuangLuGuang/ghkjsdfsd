import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentPureWaterComponent } from './equipment-pure-water.component';

describe('EquipmentPureWaterComponent', () => {
  let component: EquipmentPureWaterComponent;
  let fixture: ComponentFixture<EquipmentPureWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentPureWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentPureWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
