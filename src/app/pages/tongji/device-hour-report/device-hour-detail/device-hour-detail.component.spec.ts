import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHourDetailComponent } from './device-hour-detail.component';

describe('DeviceHourDetailComponent', () => {
  let component: DeviceHourDetailComponent;
  let fixture: ComponentFixture<DeviceHourDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceHourDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHourDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
