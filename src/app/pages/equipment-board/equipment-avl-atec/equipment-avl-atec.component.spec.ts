import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAvlAtecComponent } from './equipment-avl-atec.component';

describe('EquipmentAvlAtecComponent', () => {
  let component: EquipmentAvlAtecComponent;
  let fixture: ComponentFixture<EquipmentAvlAtecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentAvlAtecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentAvlAtecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
