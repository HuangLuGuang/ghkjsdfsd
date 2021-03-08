import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLayoutComponent } from './one-layout.component';

describe('OneLayoutComponent', () => {
  let component: OneLayoutComponent;
  let fixture: ComponentFixture<OneLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
