import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubvideoComponent } from './pubvideo.component';

describe('PubvideoComponent', () => {
  let component: PubvideoComponent;
  let fixture: ComponentFixture<PubvideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubvideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
