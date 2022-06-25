import { Component, Input } from '@angular/core';
import { User } from '../../../service/login/user.model';
import { FormControl, Validators } from '@angular/forms';
import { UserEditService } from '../../../service/user-edit/user-edit.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-edit-detail',
  templateUrl: './user-edit-detail.component.html',
  styleUrls: ['./user-edit-detail.component.scss'],
})
export class UserEditDetailComponent {
  public jobForm = new FormControl('', [Validators.required]);

  constructor(private readonly userEditService: UserEditService) {}
  @Input()
  public user?: User | null;

  public update() {
    let job = this.jobForm.value;
    if (this.user) {
      this.userEditService
        .updateUser({ ...this.user, job })
        .pipe(take(1))
        .subscribe((e) => {
          if (e) {
            alert('Änderung gespeichert');
          }
        });
    }
  }
}
