import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailAdminComponent } from './bill-detail-admin.component';

describe('BillViewComponent', () => {
  let component: BillDetailAdminComponent;
  let fixture: ComponentFixture<BillDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillDetailAdminComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
