import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../service/login/user.model';
import { UsersService } from '../../service/users/users.service';

@Component({
  selector: 'app-bills',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: Observable<User[]> = this.service.getAllUsers();

  constructor(private readonly service: UsersService) {}
}
