import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRuleConfigComponent } from './set-rule-config.component';

describe('SetRuleConfigComponent', () => {
  let component: SetRuleConfigComponent;
  let fixture: ComponentFixture<SetRuleConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRuleConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRuleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
