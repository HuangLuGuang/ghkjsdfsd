import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplarNoNameComponent } from './exemplar-no-name.component';

describe('ExemplarNoNameComponent', () => {
  let component: ExemplarNoNameComponent;
  let fixture: ComponentFixture<ExemplarNoNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemplarNoNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemplarNoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
