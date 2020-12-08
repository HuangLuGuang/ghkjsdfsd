import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDateRangeComponent } from './my-date-range.component';

describe('MyDateRangeComponent', () => {
  let component: MyDateRangeComponent;
  let fixture: ComponentFixture<MyDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDateRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
