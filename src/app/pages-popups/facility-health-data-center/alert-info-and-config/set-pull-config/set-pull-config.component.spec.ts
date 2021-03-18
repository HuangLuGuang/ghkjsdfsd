import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPullConfigComponent } from './set-pull-config.component';

describe('SetPullConfigComponent', () => {
  let component: SetPullConfigComponent;
  let fixture: ComponentFixture<SetPullConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPullConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPullConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
