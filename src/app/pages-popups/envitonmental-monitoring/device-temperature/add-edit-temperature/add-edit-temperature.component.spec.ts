import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTemperatureComponent } from './add-edit-temperature.component';

describe('AddEditTemperatureComponent', () => {
  let component: AddEditTemperatureComponent;
  let fixture: ComponentFixture<AddEditTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
