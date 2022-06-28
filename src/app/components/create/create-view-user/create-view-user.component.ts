import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../service/users/users.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-view-user',
  templateUrl: './create-view-user.component.html',
  styleUrls: ['./create-view-user.component.scss'],
})
export class CreateViewUserComponent {
  public usernameForm = 'username';
  public passwordForm = 'password';
  public firstnameForm = 'firstname';
  public lastnameForm = 'lastname';
  public genderForm = 'gender';
  public addressForm = 'address';
  public cityForm = 'city';
  public jobForm = 'job';
  public adminForm = 'admin';
  public userForm = this.fb.group({
    [this.usernameForm]: ['', Validators.required],
    [this.passwordForm]: ['', Validators.required],
    [this.firstnameForm]: ['', Validators.required],
    [this.lastnameForm]: ['', Validators.required],
    [this.genderForm]: ['', Validators.required],
    [this.addressForm]: ['', Validators.required],
    [this.cityForm]: ['', Validators.required],
    [this.jobForm]: ['', Validators.required],
    [this.adminForm]: [''],
  });

  constructor(
    private readonly usersService: UsersService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  createUser() {
    const {
      username,
      password,
      firstname,
      lastname,
      gender,
      address,
      city,
      job,
      admin,
    } = this.userForm.value;
    this.usersService
      .createUser({
        lastname,
        address,
        admin,
        firstname,
        job,
        gender,
        city,
        password,
        username,
      })
      .pipe(take(1))
      .subscribe((e) => {
        if (e) {
          alert('Benutzer erstellen');
          this.router.navigateByUrl('/create');
        }
      });
  }
}
