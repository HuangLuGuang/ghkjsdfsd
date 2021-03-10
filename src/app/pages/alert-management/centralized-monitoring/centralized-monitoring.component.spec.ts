import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralizedMonitoringComponent } from './centralized-monitoring.component';

describe('CentralizedMonitoringComponent', () => {
  let component: CentralizedMonitoringComponent;
  let fixture: ComponentFixture<CentralizedMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralizedMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralizedMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
