import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableLocationComponent } from './ag-table-location.component';

describe('AgTableLocationComponent', () => {
  let component: AgTableLocationComponent;
  let fixture: ComponentFixture<AgTableLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
