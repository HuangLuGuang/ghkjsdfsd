import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetHourConfigComponent } from './target-hour-config.component';

describe('TargetHourConfigComponent', () => {
  let component: TargetHourConfigComponent;
  let fixture: ComponentFixture<TargetHourConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetHourConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetHourConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
