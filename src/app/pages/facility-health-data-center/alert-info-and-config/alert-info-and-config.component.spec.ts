import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertInfoAndConfigComponent } from './alert-info-and-config.component';

describe('AlertInfoAndConfigComponent', () => {
  let component: AlertInfoAndConfigComponent;
  let fixture: ComponentFixture<AlertInfoAndConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertInfoAndConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertInfoAndConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
