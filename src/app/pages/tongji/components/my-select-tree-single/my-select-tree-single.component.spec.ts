import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelectTreeSingleComponent } from './my-select-tree-single.component';

describe('MySelectTreeSingleComponent', () => {
  let component: MySelectTreeSingleComponent;
  let fixture: ComponentFixture<MySelectTreeSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySelectTreeSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySelectTreeSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
