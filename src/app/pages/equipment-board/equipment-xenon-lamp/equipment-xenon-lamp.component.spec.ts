import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentXenonLampComponent } from './equipment-xenon-lamp.component';

describe('EquipmentXenonLampComponent', () => {
  let component: EquipmentXenonLampComponent;
  let fixture: ComponentFixture<EquipmentXenonLampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentXenonLampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentXenonLampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
