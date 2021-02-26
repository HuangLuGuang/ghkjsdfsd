import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGpsComponent } from './add-edit-gps.component';

describe('AddEditGpsComponent', () => {
  let component: AddEditGpsComponent;
  let fixture: ComponentFixture<AddEditGpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
