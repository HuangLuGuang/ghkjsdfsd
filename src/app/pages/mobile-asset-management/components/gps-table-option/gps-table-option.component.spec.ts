import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsTableOptionComponent } from './gps-table-option.component';

describe('GpsTableOptionComponent', () => {
  let component: GpsTableOptionComponent;
  let fixture: ComponentFixture<GpsTableOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsTableOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsTableOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
