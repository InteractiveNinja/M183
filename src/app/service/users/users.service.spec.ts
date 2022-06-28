import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { CommonTestingModule } from '../../test/common-testing/common-testing.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CommonTestingModule] });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
