import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightLayoutComponent } from './right-layout.component';

describe('RightLayoutComponent', () => {
  let component: RightLayoutComponent;
  let fixture: ComponentFixture<RightLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
