import { TestBed } from '@angular/core/testing';

import { UserEditService } from './user-edit.service';
import { CommonTestingModule } from '../../test/common-testing/common-testing.module';

describe('UserEditService', () => {
  let service: UserEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CommonTestingModule] });
    service = TestBed.inject(UserEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
