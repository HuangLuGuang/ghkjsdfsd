import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDataEchartComponent } from './health-data-echart.component';

describe('HealthDataEchartComponent', () => {
  let component: HealthDataEchartComponent;
  let fixture: ComponentFixture<HealthDataEchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthDataEchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthDataEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
