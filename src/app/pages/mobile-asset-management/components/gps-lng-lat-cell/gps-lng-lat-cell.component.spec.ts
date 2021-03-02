import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsLngLatCellComponent } from './gps-lng-lat-cell.component';

describe('GpsLngLatCellComponent', () => {
  let component: GpsLngLatCellComponent;
  let fixture: ComponentFixture<GpsLngLatCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsLngLatCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsLngLatCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
