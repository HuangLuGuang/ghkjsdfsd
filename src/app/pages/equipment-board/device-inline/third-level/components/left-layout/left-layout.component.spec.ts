import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftLayoutComponent } from './left-layout.component';

describe('LeftLayoutComponent', () => {
  let component: LeftLayoutComponent;
  let fixture: ComponentFixture<LeftLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
