import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMahaComponent } from './equipment-maha.component';

describe('EquipmentMahaComponent', () => {
  let component: EquipmentMahaComponent;
  let fixture: ComponentFixture<EquipmentMahaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMahaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMahaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
