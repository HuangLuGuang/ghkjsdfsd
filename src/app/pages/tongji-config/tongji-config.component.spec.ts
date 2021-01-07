import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TongjiConfigComponent } from './tongji-config.component';

describe('TongjiConfigComponent', () => {
  let component: TongjiConfigComponent;
  let fixture: ComponentFixture<TongjiConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TongjiConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TongjiConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
