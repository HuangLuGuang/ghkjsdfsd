import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrmsgComponent } from './errmsg.component';

describe('ErrmsgComponent', () => {
  let component: ErrmsgComponent;
  let fixture: ComponentFixture<ErrmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
