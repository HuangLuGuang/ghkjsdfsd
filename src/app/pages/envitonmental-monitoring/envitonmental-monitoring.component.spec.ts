import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvitonmentalMonitoringComponent } from './envitonmental-monitoring.component';

describe('EnvitonmentalMonitoringComponent', () => {
  let component: EnvitonmentalMonitoringComponent;
  let fixture: ComponentFixture<EnvitonmentalMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvitonmentalMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvitonmentalMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
