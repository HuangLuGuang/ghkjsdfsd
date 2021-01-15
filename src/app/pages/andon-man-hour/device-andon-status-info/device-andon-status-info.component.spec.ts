import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAndonStatusInfoComponent } from './device-andon-status-info.component';

describe('DeviceAndonStatusInfoComponent', () => {
  let component: DeviceAndonStatusInfoComponent;
  let fixture: ComponentFixture<DeviceAndonStatusInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAndonStatusInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAndonStatusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
