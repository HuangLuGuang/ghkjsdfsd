import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineVideoComponent } from './inline-video.component';

describe('InlineVideoComponent', () => {
  let component: InlineVideoComponent;
  let fixture: ComponentFixture<InlineVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
