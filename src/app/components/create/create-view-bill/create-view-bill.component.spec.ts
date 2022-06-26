import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateViewBillComponent } from './create-view-bill.component';

describe('CreateViewBillComponent', () => {
  let component: CreateViewBillComponent;
  let fixture: ComponentFixture<CreateViewBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateViewBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateViewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
