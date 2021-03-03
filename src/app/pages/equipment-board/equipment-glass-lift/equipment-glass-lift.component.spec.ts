import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentGlassLiftComponent } from './equipment-glass-lift.component';

describe('EquipmentGlassLiftComponent', () => {
  let component: EquipmentGlassLiftComponent;
  let fixture: ComponentFixture<EquipmentGlassLiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentGlassLiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentGlassLiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
