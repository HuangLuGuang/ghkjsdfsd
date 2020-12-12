import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNameComponent } from './file-name.component';

describe('FileNameComponent', () => {
  let component: FileNameComponent;
  let fixture: ComponentFixture<FileNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
