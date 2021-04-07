import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsGroupDeviceComponent } from './limits-group-device.component';

describe('LimitsGroupDeviceComponent', () => {
  let component: LimitsGroupDeviceComponent;
  let fixture: ComponentFixture<LimitsGroupDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitsGroupDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsGroupDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
