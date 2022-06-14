import { Component, Input } from '@angular/core';
import { User } from '../../../service/login/user.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent {
  @Input()
  public users: User[] | undefined;

  constructor() {}
}
