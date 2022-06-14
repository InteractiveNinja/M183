import {Component} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {FormBuilder, Validators} from "@angular/forms";
import {take} from "rxjs";
import {Router} from "@angular/router";

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

  constructor(private readonly service: LoginService, private readonly fb: FormBuilder, private router: Router) {
  }

  public login(): void {
    this.service.login(this.loginFormGroup.value).pipe(take(1)).subscribe(success => {
      if(success) {
        alert("Du bist jetzt eingeloggt!")
        this.router.navigateByUrl("bills");
        return;
      }
      alert("Password oder Nutzername war falsch!")
    })
  }
}
