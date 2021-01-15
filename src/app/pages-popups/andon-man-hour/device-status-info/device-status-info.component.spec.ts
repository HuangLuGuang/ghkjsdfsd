import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStatusInfoComponent } from './device-status-info.component';

describe('DeviceStatusInfoComponent', () => {
  let component: DeviceStatusInfoComponent;
  let fixture: ComponentFixture<DeviceStatusInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceStatusInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
