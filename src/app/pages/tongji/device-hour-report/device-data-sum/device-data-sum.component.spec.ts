import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDataSumComponent } from './device-data-sum.component';

describe('DeviceDataSumComponent', () => {
  let component: DeviceDataSumComponent;
  let fixture: ComponentFixture<DeviceDataSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDataSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDataSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
