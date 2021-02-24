import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetWeilanComponent } from './set-weilan.component';

describe('SetWeilanComponent', () => {
  let component: SetWeilanComponent;
  let fixture: ComponentFixture<SetWeilanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetWeilanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetWeilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
