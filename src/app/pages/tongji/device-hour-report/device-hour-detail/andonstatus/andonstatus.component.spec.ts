import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndonstatusComponent } from './andonstatus.component';

describe('AndonstatusComponent', () => {
  let component: AndonstatusComponent;
  let fixture: ComponentFixture<AndonstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndonstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndonstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
