import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { CommonTestingModule } from '../../test/common-testing/common-testing.module';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CommonTestingModule] });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
