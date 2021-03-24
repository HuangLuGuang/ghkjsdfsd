import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertInfoOptionComponent } from './alert-info-option.component';

describe('AlertInfoOptionComponent', () => {
  let component: AlertInfoOptionComponent;
  let fixture: ComponentFixture<AlertInfoOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertInfoOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertInfoOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
