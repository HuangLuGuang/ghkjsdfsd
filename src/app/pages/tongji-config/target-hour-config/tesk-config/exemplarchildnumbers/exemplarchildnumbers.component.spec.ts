import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplarchildnumbersComponent } from './exemplarchildnumbers.component';

describe('ExemplarchildnumbersComponent', () => {
  let component: ExemplarchildnumbersComponent;
  let fixture: ComponentFixture<ExemplarchildnumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemplarchildnumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemplarchildnumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
