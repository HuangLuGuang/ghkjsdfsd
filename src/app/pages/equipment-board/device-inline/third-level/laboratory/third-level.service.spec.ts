import { TestBed } from '@angular/core/testing';

import { ThirdLevelService } from './third-level.service';

describe('ThirdLevelService', () => {
  let service: ThirdLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
