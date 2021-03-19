import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRunComponent } from './device-run.component';

describe('DeviceRunComponent', () => {
  let component: DeviceRunComponent;
  let fixture: ComponentFixture<DeviceRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
