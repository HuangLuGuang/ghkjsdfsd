import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndonManHourComponent } from './andon-man-hour.component';

describe('AndonManHourComponent', () => {
  let component: AndonManHourComponent;
  let fixture: ComponentFixture<AndonManHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndonManHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndonManHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
