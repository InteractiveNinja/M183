import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private readonly service: LoginService) {
    this.service.login({ password: '', username: ' ' });
  }
  public isLoggedIn$ = this.service.isLoggedIn();
}
