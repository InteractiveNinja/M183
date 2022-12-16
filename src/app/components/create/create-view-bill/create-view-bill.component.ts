import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { BillService } from '../../../service/bills/bill.service';
import { User } from '../../../service/login/user.model';
import { UsersService } from '../../../service/users/users.service';

@Component({
  selector: 'app-create-view-bill',
  templateUrl: './create-view-bill.component.html',
  styleUrls: ['./create-view-bill.component.scss'],
})
export class CreateViewBillComponent {
  public users$: Observable<User[]>;

  public amountFormName = 'amount';
  public deadlineFormName = 'deadline';
  public userFormName = 'user';

  public amountForm = new FormControl(null, [
    Validators.required,
    Validators.min(1),
  ]);
  public deadlineForm = new FormControl(null, [
    Validators.required,
    this.futureValidator(),
  ]);
  public userForm = new FormControl('', [Validators.required]);

  public billForm = this.fb.group({
    [this.amountFormName]: this.amountForm,
    [this.deadlineFormName]: this.deadlineForm,
    [this.userFormName]: this.userForm,
  });

  constructor(
    private readonly usersService: UsersService,
    private readonly billService: BillService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.users$ = usersService.getAllUsers();
  }

  private futureValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const today = new Date();
      let biggerThenToday = date > today;
      return biggerThenToday ? null : { futureValidator: { value: date } };
    };
  }

  createBill() {
    const { amount, deadline, user } = this.billForm.value;
    this.billService
      .createBill({ amount, deadline, UserId: user, paid: false })
      .pipe(take(1))
      .subscribe((done) => {
        if (done) {
          alert('Rechnung erstellt');
          this.router.navigateByUrl('/create');
        }
      });
  }
}
