import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../service/login/user.model';
import { LoginService } from '../../../service/login/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  public jobForm = 'job';
  public editFormGroup = this.fb.group({
    [this.jobForm]: ['', Validators.required],
  });

  constructor(
    private readonly loginService: LoginService,
    private readonly fb: FormBuilder
  ) {
    this.user$ = this.loginService.getUser();
  }

  public user$: Observable<User | undefined>;

  public update() {}
}
