import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDriveChassisComponent } from './two-drive-chassis.component';

describe('TwoDriveChassisComponent', () => {
  let component: TwoDriveChassisComponent;
  let fixture: ComponentFixture<TwoDriveChassisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoDriveChassisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoDriveChassisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
