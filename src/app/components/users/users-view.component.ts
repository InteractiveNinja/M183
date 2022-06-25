import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../service/login/user.model';
import { UsersService } from '../../service/users/users.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
})
export class UsersViewComponent {
  public users: Observable<User[]> = this.service.getAllUsers();

  constructor(private readonly service: UsersService) {}
}
