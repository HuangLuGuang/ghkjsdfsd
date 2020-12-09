import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAlertComponent } from './history-alert.component';

describe('HistoryAlertComponent', () => {
  let component: HistoryAlertComponent;
  let fixture: ComponentFixture<HistoryAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
