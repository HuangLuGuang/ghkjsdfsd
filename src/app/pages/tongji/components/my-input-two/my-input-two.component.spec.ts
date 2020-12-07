import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInputTwoComponent } from './my-input-two.component';

describe('MyInputTwoComponent', () => {
  let component: MyInputTwoComponent;
  let fixture: ComponentFixture<MyInputTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInputTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInputTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
