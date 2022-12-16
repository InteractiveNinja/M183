import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../../../service/login/user.model';
import { UserEditService } from '../../../service/user-edit/user-edit.service';

@Component({
  selector: 'app-user-edit-detail',
  templateUrl: './user-edit-detail.component.html',
  styleUrls: ['./user-edit-detail.component.scss'],
})
export class UserEditDetailComponent {
  public jobForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^([a-z]+)$/i),
    Validators.minLength(1),
    Validators.maxLength(32),
  ]);

  constructor(
    private readonly userEditService: UserEditService,
    private readonly router: Router
  ) {
    this.userEditService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => this.jobForm.patchValue(user?.job));
  }

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
            this.router.navigateByUrl('/bills');
          } else {
            alert(
              'Änderungen konnten nicht gespeichert werden, die User Daten sind nicht aktuell.'
            );
            this.userEditService.loadUser(this.user?.id);
          }
        });
    }
  }
}
