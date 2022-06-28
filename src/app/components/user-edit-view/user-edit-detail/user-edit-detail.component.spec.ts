import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditDetailComponent } from './user-edit-detail.component';
import { CommonTestingModule } from '../../../test/common-testing/common-testing.module';

describe('UserEditComponent', () => {
  let component: UserEditDetailComponent;
  let fixture: ComponentFixture<UserEditDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEditDetailComponent],
      imports: [CommonTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
