import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAtecComponent } from './equipment-atec.component';

describe('EquipmentAtecComponent', () => {
  let component: EquipmentAtecComponent;
  let fixture: ComponentFixture<EquipmentAtecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentAtecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentAtecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
