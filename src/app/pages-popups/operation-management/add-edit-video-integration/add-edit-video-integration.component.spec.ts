import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVideoIntegrationComponent } from './add-edit-video-integration.component';

describe('AddEditVideoIntegrationComponent', () => {
  let component: AddEditVideoIntegrationComponent;
  let fixture: ComponentFixture<AddEditVideoIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditVideoIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVideoIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
