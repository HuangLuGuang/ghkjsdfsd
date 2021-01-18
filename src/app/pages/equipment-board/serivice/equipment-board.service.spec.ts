import { TestBed } from '@angular/core/testing';

import { EquipmentBoardService } from './equipment-board.service';

describe('EquipmentBoardService', () => {
  let service: EquipmentBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
