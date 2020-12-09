import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeAlertComponent } from './real-time-alert.component';

describe('RealTimeAlertComponent', () => {
  let component: RealTimeAlertComponent;
  let fixture: ComponentFixture<RealTimeAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
