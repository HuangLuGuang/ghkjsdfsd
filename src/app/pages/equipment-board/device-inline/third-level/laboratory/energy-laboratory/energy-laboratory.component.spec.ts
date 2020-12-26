import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyLaboratoryComponent } from './energy-laboratory.component';

describe('EnergyLaboratoryComponent', () => {
  let component: EnergyLaboratoryComponent;
  let fixture: ComponentFixture<EnergyLaboratoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyLaboratoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
