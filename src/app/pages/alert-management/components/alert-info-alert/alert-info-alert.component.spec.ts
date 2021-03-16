import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertInfoAlertComponent } from './alert-info-alert.component';

describe('AlertInfoAlertComponent', () => {
  let component: AlertInfoAlertComponent;
  let fixture: ComponentFixture<AlertInfoAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertInfoAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertInfoAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
