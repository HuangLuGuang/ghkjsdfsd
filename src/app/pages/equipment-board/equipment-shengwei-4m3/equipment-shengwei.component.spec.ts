import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentShengweiComponent } from './equipment-shengwei.component';

describe('EquipmentShengweiComponent', () => {
  let component: EquipmentShengweiComponent;
  let fixture: ComponentFixture<EquipmentShengweiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentShengweiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentShengweiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
