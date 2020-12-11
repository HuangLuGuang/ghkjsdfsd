import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EimFileUploadComponent } from './eim-file-upload.component';

describe('EimFileUploadComponent', () => {
  let component: EimFileUploadComponent;
  let fixture: ComponentFixture<EimFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EimFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EimFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
