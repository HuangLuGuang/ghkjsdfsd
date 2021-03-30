import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsAddComponent } from './limits-add.component';

describe('LimitsAddComponent', () => {
  let component: LimitsAddComponent;
  let fixture: ComponentFixture<LimitsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
