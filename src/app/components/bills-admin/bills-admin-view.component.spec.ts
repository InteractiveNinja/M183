import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonTestingModule } from '../../test/common-testing/common-testing.module';

import { BillsAdminViewComponent } from './bills-admin-view.component';

describe('BillsComponent', () => {
  let component: BillsAdminViewComponent;
  let fixture: ComponentFixture<BillsAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillsAdminViewComponent],
      imports: [CommonTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
