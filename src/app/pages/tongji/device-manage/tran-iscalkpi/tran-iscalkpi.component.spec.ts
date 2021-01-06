import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranIscalkpiComponent } from './tran-iscalkpi.component';

describe('TranIscalkpiComponent', () => {
  let component: TranIscalkpiComponent;
  let fixture: ComponentFixture<TranIscalkpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranIscalkpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranIscalkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
