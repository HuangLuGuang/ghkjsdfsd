import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralLaboratoryComponent } from './structural-laboratory.component';

describe('StructuralLaboratoryComponent', () => {
  let component: StructuralLaboratoryComponent;
  let fixture: ComponentFixture<StructuralLaboratoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuralLaboratoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuralLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
