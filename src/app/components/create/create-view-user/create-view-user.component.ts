import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UsersService } from '../../../service/users/users.service';

@Component({
  selector: 'app-create-view-user',
  templateUrl: './create-view-user.component.html',
  styleUrls: ['./create-view-user.component.scss'],
})
export class CreateViewUserComponent {
  public usernameFormName = 'username';
  public passwordFormName = 'password';
  public firstnameFormName = 'firstname';
  public lastnameFormName = 'lastname';
  public genderFormName = 'gender';
  public addressFormName = 'address';
  public cityFormName = 'city';
  public jobFormName = 'job';
  public adminFormName = 'admin';

  public usernameForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z0-9]+)$/i),
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);
  public passwordForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z0-9!"#$%&'()*+,-./\\:;<=>?@\[\]^_`{|}~]+)$/i),
    Validators.minLength(8),
    Validators.maxLength(64),
  ]);
  public firstnameForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z]+)$/i),
    Validators.minLength(1),
    Validators.maxLength(25),
  ]);
  public lastnameForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z]+)$/i),
    Validators.minLength(1),
    Validators.maxLength(25),
  ]);
  public genderForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([mfo])$/i),
  ]);
  public addressForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[\w\s.]+$/i),
    Validators.minLength(1),
    Validators.maxLength(64),
  ]);
  public cityForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z]+)$/i),
    Validators.minLength(1),
    Validators.maxLength(16),
  ]);
  public jobForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z]+)$/i),
    Validators.minLength(1),
    Validators.maxLength(32),
  ]);
  public adminForm = new FormControl(false);

  public userForm = this.fb.group({
    [this.usernameFormName]: this.usernameForm,
    [this.passwordFormName]: this.passwordForm,
    [this.firstnameFormName]: this.firstnameForm,
    [this.lastnameFormName]: this.lastnameForm,
    [this.genderFormName]: this.genderForm,
    [this.addressFormName]: this.addressForm,
    [this.cityFormName]: this.cityForm,
    [this.jobFormName]: this.jobForm,
    [this.adminFormName]: this.adminForm,
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
          alert('Benutzer erstellt');
          this.router.navigateByUrl('/create');
        }
      });
  }
}
