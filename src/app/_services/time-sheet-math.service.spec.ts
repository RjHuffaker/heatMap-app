import { TestBed } from '@angular/core/testing';

import { TimeSheetMathService } from './time-sheet-math.service';

describe('TimeSheetMathService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeSheetMathService = TestBed.get(TimeSheetMathService);
    expect(service).toBeTruthy();
  });
});
