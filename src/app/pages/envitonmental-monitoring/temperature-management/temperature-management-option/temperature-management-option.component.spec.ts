import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureManagementOptionComponent } from './temperature-management-option.component';

describe('TemperatureManagementOptionComponent', () => {
  let component: TemperatureManagementOptionComponent;
  let fixture: ComponentFixture<TemperatureManagementOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureManagementOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureManagementOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
