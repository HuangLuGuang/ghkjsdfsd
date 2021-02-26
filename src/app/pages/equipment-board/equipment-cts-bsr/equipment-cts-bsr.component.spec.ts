import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCtsBsrComponent } from './equipment-cts-bsr.component';

describe('EquipmentCtsBsrComponent', () => {
  let component: EquipmentCtsBsrComponent;
  let fixture: ComponentFixture<EquipmentCtsBsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCtsBsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCtsBsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
