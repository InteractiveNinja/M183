import { Component, Input } from '@angular/core';
import { User } from '../../../service/login/user.model';
import { BillModel } from '../../../service/bills/bill.model';
import { UserEditService } from '../../../service/user-edit/user-edit.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  @Input()
  public users: User[] | undefined;

  constructor(private readonly userEditService: UserEditService) {}

  public calculateOpenInvoices(bills: BillModel[]): number {
    return bills.map((bill) => bill.payed).filter((payed) => !payed).length;
  }

  public editUser(id: number) {
    this.userEditService.loadUser(id);
  }
}
