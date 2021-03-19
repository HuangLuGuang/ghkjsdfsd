import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulTableColComponent } from './mul-table-col.component';

describe('MulTableColComponent', () => {
  let component: MulTableColComponent;
  let fixture: ComponentFixture<MulTableColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulTableColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulTableColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
