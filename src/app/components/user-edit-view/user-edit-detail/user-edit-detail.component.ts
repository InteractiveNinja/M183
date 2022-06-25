import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../service/login/user.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit-detail',
  templateUrl: './user-edit-detail.component.html',
  styleUrls: ['./user-edit-detail.component.scss'],
})
export class UserEditDetailComponent {
  public jobForm = new FormControl('', [Validators.required]);

  @Input()
  public user?: Observable<User | undefined>;

  public update() {}
}
