import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDateRangeMultipleComponent } from './my-date-range-multiple.component';

describe('MyDateRangeMultipleComponent', () => {
  let component: MyDateRangeMultipleComponent;
  let fixture: ComponentFixture<MyDateRangeMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDateRangeMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDateRangeMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
