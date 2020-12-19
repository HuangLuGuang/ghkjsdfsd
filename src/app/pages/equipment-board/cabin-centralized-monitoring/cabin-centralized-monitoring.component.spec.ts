import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinCentralizedMonitoringComponent } from './cabin-centralized-monitoring.component';

describe('CabinCentralizedMonitoringComponent', () => {
  let component: CabinCentralizedMonitoringComponent;
  let fixture: ComponentFixture<CabinCentralizedMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinCentralizedMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinCentralizedMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
