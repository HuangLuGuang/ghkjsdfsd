import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBreadcrumbComponent } from './file-breadcrumb.component';

describe('FileBreadcrumbComponent', () => {
  let component: FileBreadcrumbComponent;
  let fixture: ComponentFixture<FileBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
