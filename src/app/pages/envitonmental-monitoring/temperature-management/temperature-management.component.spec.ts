import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureManagementComponent } from './temperature-management.component';

describe('TemperatureManagementComponent', () => {
  let component: TemperatureManagementComponent;
  let fixture: ComponentFixture<TemperatureManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
