import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilSourceMonitoringComponent } from './oil-source-monitoring.component';

describe('OilSourceMonitoringComponent', () => {
  let component: OilSourceMonitoringComponent;
  let fixture: ComponentFixture<OilSourceMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilSourceMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilSourceMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
