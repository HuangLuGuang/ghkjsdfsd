import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDataSumComponent } from './department-data-sum.component';

describe('DepartmentDataSumComponent', () => {
  let component: DepartmentDataSumComponent;
  let fixture: ComponentFixture<DepartmentDataSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentDataSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDataSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
