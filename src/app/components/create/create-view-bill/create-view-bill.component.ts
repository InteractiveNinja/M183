import { Component } from '@angular/core';
import { UsersService } from '../../../service/users/users.service';
import { BillService } from '../../../service/bills/bill.service';
import { Observable, take } from 'rxjs';
import { User } from '../../../service/login/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-view-bill',
  templateUrl: './create-view-bill.component.html',
  styleUrls: ['./create-view-bill.component.scss'],
})
export class CreateViewBillComponent {
  public users$: Observable<User[]>;

  public amountForm = 'amount';
  public deadlineForm = 'deadline';
  public userForm = 'user';
  public billForm = this.fb.group({
    [this.amountForm]: ['', Validators.required],
    [this.deadlineForm]: ['', Validators.required],
    [this.userForm]: ['', Validators.required],
  });

  constructor(
    private readonly usersService: UsersService,
    private readonly billService: BillService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.users$ = usersService.getAllUsers();
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
