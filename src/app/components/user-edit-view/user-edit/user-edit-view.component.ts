import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../service/login/user.model';
import { UserEditService } from '../../../service/user-edit/user-edit.service';

@Component({
  selector: 'app-user-edit-view',
  templateUrl: './user-edit-view.component.html',
  styleUrls: ['./user-edit-view.component.scss'],
})
export class UserEditViewComponent {
  constructor(private readonly userEditService: UserEditService) {
    this.user = userEditService.getUser();
  }

  public user?: Observable<User | undefined>;
}
