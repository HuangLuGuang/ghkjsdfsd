import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelectTreeInputComponent } from './my-select-tree-input.component';

describe('MySelectTreeInputComponent', () => {
  let component: MySelectTreeInputComponent;
  let fixture: ComponentFixture<MySelectTreeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySelectTreeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySelectTreeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
