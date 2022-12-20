import { Component } from '@angular/core';
import { map } from 'rxjs';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private readonly loginService: LoginService) {}

  public username$ = this.loginService
    .getUser()
    .pipe(map((user) => user?.username));
  public isAdmin$ = this.loginService
    .getUser()
    .pipe(map((user) => user?.admin));
}
