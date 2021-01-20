import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDetailInfoComponent } from './device-detail-info.component';

describe('DeviceDetailInfoComponent', () => {
  let component: DeviceDetailInfoComponent;
  let fixture: ComponentFixture<DeviceDetailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDetailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
