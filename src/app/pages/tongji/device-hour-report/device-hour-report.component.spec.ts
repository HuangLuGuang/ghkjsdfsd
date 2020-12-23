import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHourReportComponent } from './device-hour-report.component';

describe('DeviceHourReportComponent', () => {
  let component: DeviceHourReportComponent;
  let fixture: ComponentFixture<DeviceHourReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceHourReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHourReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
