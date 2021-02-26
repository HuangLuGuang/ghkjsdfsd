import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsHistoryComponent } from './gps-history.component';

describe('GpsHistoryComponent', () => {
  let component: GpsHistoryComponent;
  let fixture: ComponentFixture<GpsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
