import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTargetDurationComponent } from './daily-target-duration.component';

describe('DailyTargetDurationComponent', () => {
  let component: DailyTargetDurationComponent;
  let fixture: ComponentFixture<DailyTargetDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyTargetDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTargetDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
