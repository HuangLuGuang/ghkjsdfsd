import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerAreaShowComponent } from './aler-area-show.component';

describe('AlerAreaShowComponent', () => {
  let component: AlerAreaShowComponent;
  let fixture: ComponentFixture<AlerAreaShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlerAreaShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerAreaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
