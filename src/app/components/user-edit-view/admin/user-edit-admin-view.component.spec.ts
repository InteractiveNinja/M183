import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditAdminViewComponent } from './user-edit-admin-view.component';

describe('UserEditViewComponent', () => {
  let component: UserEditAdminViewComponent;
  let fixture: ComponentFixture<UserEditAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEditAdminViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
