import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDevicenameComponent } from './table-devicename.component';

describe('TableDevicenameComponent', () => {
  let component: TableDevicenameComponent;
  let fixture: ComponentFixture<TableDevicenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDevicenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDevicenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
