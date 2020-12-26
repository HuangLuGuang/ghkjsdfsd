import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourConfigComponent } from './hour-config.component';

describe('HourConfigComponent', () => {
  let component: HourConfigComponent;
  let fixture: ComponentFixture<HourConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
