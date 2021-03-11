import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureManagementActiveComponent } from './temperature-management-active.component';

describe('TemperatureManagementActiveComponent', () => {
  let component: TemperatureManagementActiveComponent;
  let fixture: ComponentFixture<TemperatureManagementActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureManagementActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureManagementActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
