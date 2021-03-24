import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLevelComponent } from './device-level.component';

describe('DeviceLevelComponent', () => {
  let component: DeviceLevelComponent;
  let fixture: ComponentFixture<DeviceLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
