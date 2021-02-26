import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsnotFavorComponent } from './isnot-favor.component';

describe('IsnotFavorComponent', () => {
  let component: IsnotFavorComponent;
  let fixture: ComponentFixture<IsnotFavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsnotFavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsnotFavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
