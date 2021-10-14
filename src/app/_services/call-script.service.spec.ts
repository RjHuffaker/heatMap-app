import { TestBed } from '@angular/core/testing';

import { CallScriptService } from './call-script.service';

describe('CallScriptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallScriptService = TestBed.get(CallScriptService);
    expect(service).toBeTruthy();
  });
});
