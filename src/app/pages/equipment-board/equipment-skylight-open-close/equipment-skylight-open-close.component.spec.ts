import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSkylightOpenCloseComponent } from './equipment-skylight-open-close.component';

describe('EquipmentSkylightOpenCloseComponent', () => {
  let component: EquipmentSkylightOpenCloseComponent;
  let fixture: ComponentFixture<EquipmentSkylightOpenCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentSkylightOpenCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSkylightOpenCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
