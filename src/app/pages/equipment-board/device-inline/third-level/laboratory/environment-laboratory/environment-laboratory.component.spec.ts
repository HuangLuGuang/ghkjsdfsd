import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentLaboratoryComponent } from './environment-laboratory.component';

describe('EnvironmentLaboratoryComponent', () => {
  let component: EnvironmentLaboratoryComponent;
  let fixture: ComponentFixture<EnvironmentLaboratoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentLaboratoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
