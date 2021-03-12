import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAllInfoComponent } from './test-all-info.component';

describe('TestAllInfoComponent', () => {
  let component: TestAllInfoComponent;
  let fixture: ComponentFixture<TestAllInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAllInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAllInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
