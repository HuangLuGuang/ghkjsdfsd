import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTimePointComponent } from './my-time-point.component';

describe('MyTimePointComponent', () => {
  let component: MyTimePointComponent;
  let fixture: ComponentFixture<MyTimePointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTimePointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTimePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
