import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAndonHistoryComponent } from './device-andon-history.component';

describe('DeviceAndonHistoryComponent', () => {
  let component: DeviceAndonHistoryComponent;
  let fixture: ComponentFixture<DeviceAndonHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAndonHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAndonHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
