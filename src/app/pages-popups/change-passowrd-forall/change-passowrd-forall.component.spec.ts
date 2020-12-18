import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassowrdForallComponent } from './change-passowrd-forall.component';

describe('ChangePassowrdForallComponent', () => {
  let component: ChangePassowrdForallComponent;
  let fixture: ComponentFixture<ChangePassowrdForallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePassowrdForallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassowrdForallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
