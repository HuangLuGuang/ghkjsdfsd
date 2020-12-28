import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDataSumComponent } from './group-data-sum.component';

describe('GroupDataSumComponent', () => {
  let component: GroupDataSumComponent;
  let fixture: ComponentFixture<GroupDataSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDataSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDataSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
