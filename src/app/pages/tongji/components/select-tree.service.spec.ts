import { TestBed } from '@angular/core/testing';

import { SelectTreeService } from './select-tree.service';

describe('SelectTreeService', () => {
  let service: SelectTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
