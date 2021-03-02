import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDateSelectComponent } from './my-date-select.component';

describe('MyDateSelectComponent', () => {
  let component: MyDateSelectComponent;
  let fixture: ComponentFixture<MyDateSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDateSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
