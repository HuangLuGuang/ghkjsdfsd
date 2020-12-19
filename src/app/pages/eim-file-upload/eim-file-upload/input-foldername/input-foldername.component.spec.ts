import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFoldernameComponent } from './input-foldername.component';

describe('InputFoldernameComponent', () => {
  let component: InputFoldernameComponent;
  let fixture: ComponentFixture<InputFoldernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFoldernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFoldernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
