import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntTimeLineComponent } from './ant-time-line.component';

describe('AntTimeLineComponent', () => {
  let component: AntTimeLineComponent;
  let fixture: ComponentFixture<AntTimeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntTimeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
