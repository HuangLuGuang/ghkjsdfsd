import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralFourJinhuaComponent } from './central-four-jinhua.component';

describe('CentralFourJinhuaComponent', () => {
  let component: CentralFourJinhuaComponent;
  let fixture: ComponentFixture<CentralFourJinhuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralFourJinhuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralFourJinhuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
