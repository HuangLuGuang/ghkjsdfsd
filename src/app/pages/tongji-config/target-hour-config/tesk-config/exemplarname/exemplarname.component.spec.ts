import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplarnameComponent } from './exemplarname.component';

describe('ExemplarnameComponent', () => {
  let component: ExemplarnameComponent;
  let fixture: ComponentFixture<ExemplarnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemplarnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemplarnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
