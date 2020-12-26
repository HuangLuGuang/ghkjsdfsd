import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeskConfigComponent } from './tesk-config.component';

describe('TeskConfigComponent', () => {
  let component: TeskConfigComponent;
  let fixture: ComponentFixture<TeskConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeskConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeskConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
