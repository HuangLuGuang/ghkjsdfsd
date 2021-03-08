import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceKpiTongjiOptionComponent } from './device-kpi-tongji-option.component';

describe('DeviceKpiTongjiOptionComponent', () => {
  let component: DeviceKpiTongjiOptionComponent;
  let fixture: ComponentFixture<DeviceKpiTongjiOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceKpiTongjiOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceKpiTongjiOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
