import { Component, Input } from '@angular/core';
import { User } from '../../../service/login/user.model';
import { BillModel } from '../../../service/bills/bill.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  @Input()
  public users: User[] | undefined;

  constructor() {}

  public calculateOpenInvoices(bills: BillModel[]): number {
    return bills.map((bill) => bill.payed).filter((payed) => !payed).length;
  }
}
