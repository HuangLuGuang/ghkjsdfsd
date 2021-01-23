import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalLaboratoryComponent } from './physical-laboratory.component';

describe('PhysicalLaboratoryComponent', () => {
  let component: PhysicalLaboratoryComponent;
  let fixture: ComponentFixture<PhysicalLaboratoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalLaboratoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
