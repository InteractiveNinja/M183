import { TestBed } from '@angular/core/testing';

import { BillService } from './bill.service';
import { CommonTestingModule } from '../../test/common-testing/common-testing.module';

describe('BillService', () => {
  let service: BillService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CommonTestingModule] });
    service = TestBed.inject(BillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
