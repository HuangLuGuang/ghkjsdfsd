import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiseLaboratoryComponent } from './noise-laboratory.component';

describe('NoiseLaboratoryComponent', () => {
  let component: NoiseLaboratoryComponent;
  let fixture: ComponentFixture<NoiseLaboratoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoiseLaboratoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoiseLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
