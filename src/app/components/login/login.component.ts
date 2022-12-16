import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public usernameFormName = 'username';
  public passwordFormName = 'password';
  public loginForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z0-9]+)$/i),
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);
  public passwordForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z0-9!"#$%&'()*+,-./\\:;<=>?@\[\]^_`{|}~]+)$/i),
    Validators.minLength(8),
    Validators.maxLength(65),
  ]);
  public loginFormGroup = this.fb.group({
    [this.usernameFormName]: this.loginForm,
    [this.passwordFormName]: this.passwordForm,
  });

  constructor(
    private readonly service: LoginService,
    private readonly fb: FormBuilder,
    private router: Router
  ) {}

  public login(): void {
    this.service
      .login(this.loginFormGroup.value)
      .pipe(take(1))
      .subscribe((success) => {
        if (success) {
          alert('Du bist jetzt eingeloggt!');
          this.router.navigateByUrl('bills');
          return;
        }
        alert('Password oder Nutzername war falsch!');
      });
  }
}
