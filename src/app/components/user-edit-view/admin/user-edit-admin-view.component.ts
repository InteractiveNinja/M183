import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../service/login/user.model';
import { UserEditService } from '../../../service/user-edit/user-edit.service';

@Component({
  selector: 'app-user-edit-admin-view',
  templateUrl: './user-edit-admin-view.component.html',
  styleUrls: ['./user-edit-admin-view.component.scss'],
})
export class UserEditAdminViewComponent {
  constructor(private readonly userEditService: UserEditService) {
    this.user = userEditService.getUser();
  }

  public user?: Observable<User | undefined>;
}
