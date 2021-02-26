import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsnotActiveComponent } from './isnot-active.component';

describe('IsnotActiveComponent', () => {
  let component: IsnotActiveComponent;
  let fixture: ComponentFixture<IsnotActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsnotActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsnotActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
