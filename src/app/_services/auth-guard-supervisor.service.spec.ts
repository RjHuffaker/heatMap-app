import { TestBed } from '@angular/core/testing';

import { AuthGuardSupervisorService } from './auth-guard-supervisor.service';

describe('AuthGuardSupervisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardSupervisorService = TestBed.get(AuthGuardSupervisorService);
    expect(service).toBeTruthy();
  });
});
