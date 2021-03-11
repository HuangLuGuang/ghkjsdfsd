import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLinkageSelectComponent } from './my-linkage-select.component';

describe('MyLinkageSelectComponent', () => {
  let component: MyLinkageSelectComponent;
  let fixture: ComponentFixture<MyLinkageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLinkageSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLinkageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
