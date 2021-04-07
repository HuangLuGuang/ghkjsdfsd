import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsAddInitComponent } from './limits-add-init.component';

describe('LimitsAddInitComponent', () => {
  let component: LimitsAddInitComponent;
  let fixture: ComponentFixture<LimitsAddInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitsAddInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsAddInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
