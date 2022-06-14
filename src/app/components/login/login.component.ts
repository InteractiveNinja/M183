import {Component} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isLoggedIn$ = this.service.isLoggedIn();
  public usernameForm = 'username';
  public passwordForm = 'password'
  public loginFormGroup = this.fb.group({
    [this.usernameForm]: ['', Validators.required],
    [this.passwordForm]: ['', Validators.required]
  })

  constructor(private readonly service: LoginService, private readonly fb: FormBuilder) {
  }

  public login(): void {
    this.service.login(this.loginFormGroup.value);
  }
}
