import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../service/login/user.model';
import { LoginService } from '../../../service/login/login.service';

@Component({
  selector: 'app-user-edit-view',
  templateUrl: './user-edit-view.component.html',
  styleUrls: ['./user-edit-view.component.scss'],
})
export class UserEditViewComponent {
  constructor(private readonly loginService: LoginService) {
    this.user = loginService.getUser();
  }

  public user?: Observable<User | undefined>;
}
