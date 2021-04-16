import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertInfoAfterComponent } from './alert-info-after.component';

describe('AlertInfoAfterComponent', () => {
  let component: AlertInfoAfterComponent;
  let fixture: ComponentFixture<AlertInfoAfterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertInfoAfterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertInfoAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
