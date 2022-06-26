import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateViewUserComponent } from './create-view-user.component';

describe('CreateViewUserComponent', () => {
  let component: CreateViewUserComponent;
  let fixture: ComponentFixture<CreateViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateViewUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
