import { TestBed } from '@angular/core/testing';

import { AdminGuardGuard } from './admin-guard.guard';
import { CommonTestingModule } from '../../test/common-testing/common-testing.module';

describe('AdminGuardGuard', () => {
  let guard: AdminGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CommonTestingModule] });
    guard = TestBed.inject(AdminGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
