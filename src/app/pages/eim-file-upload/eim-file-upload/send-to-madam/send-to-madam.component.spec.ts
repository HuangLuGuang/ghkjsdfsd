import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToMadamComponent } from './send-to-madam.component';

describe('SendToMadamComponent', () => {
  let component: SendToMadamComponent;
  let fixture: ComponentFixture<SendToMadamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToMadamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToMadamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
