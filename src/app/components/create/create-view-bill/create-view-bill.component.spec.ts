import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateViewBillComponent } from './create-view-bill.component';
import { CommonTestingModule } from '../../../test/common-testing/common-testing.module';

describe('CreateViewBillComponent', () => {
  let component: CreateViewBillComponent;
  let fixture: ComponentFixture<CreateViewBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateViewBillComponent],
      imports: [CommonTestingModule],
    }).compileComponents();
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
