import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditViewComponent } from './user-edit-view.component';
import { CommonTestingModule } from '../../../test/common-testing/common-testing.module';

describe('UserEditViewComponent', () => {
  let component: UserEditViewComponent;
  let fixture: ComponentFixture<UserEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEditViewComponent],
      imports: [CommonTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
