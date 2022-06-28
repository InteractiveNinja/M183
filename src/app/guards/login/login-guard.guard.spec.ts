import { TestBed } from '@angular/core/testing';

import { LoginGuardGuard } from './login-guard.guard';
import { CommonTestingModule } from '../../test/common-testing/common-testing.module';

describe('LoginGuardGuard', () => {
  let guard: LoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CommonTestingModule] });
    guard = TestBed.inject(LoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
