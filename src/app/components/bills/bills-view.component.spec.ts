import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsViewComponent } from './bills-view.component';

describe('BillsComponent', () => {
  let component: BillsViewComponent;
  let fixture: ComponentFixture<BillsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillsViewComponent],
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
