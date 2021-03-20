import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOneDayComponent } from './time-one-day.component';

describe('TimeOneDayComponent', () => {
  let component: TimeOneDayComponent;
  let fixture: ComponentFixture<TimeOneDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOneDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOneDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
