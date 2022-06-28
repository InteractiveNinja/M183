import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsViewComponent } from './bills-view.component';
import { CommonTestingModule } from '../../test/common-testing/common-testing.module';

describe('BillsComponent', () => {
  let component: BillsViewComponent;
  let fixture: ComponentFixture<BillsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillsViewComponent],
      imports: [CommonTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
