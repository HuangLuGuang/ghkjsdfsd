/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BorderGetewayDialogEditComponent } from './border-geteway-dialog-edit.component';

describe('BorderGetewayDialogEditComponent', () => {
  let component: BorderGetewayDialogEditComponent;
  let fixture: ComponentFixture<BorderGetewayDialogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorderGetewayDialogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderGetewayDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
