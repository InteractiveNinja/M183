import { Component } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { BillModel } from '../../service/bills/bill.model';
import { BillService } from '../../service/bills/bill.service';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-bills-admin-view',
  templateUrl: './bills-admin-view.component.html',
  styleUrls: ['./bills-admin-view.component.scss'],
})
export class BillsAdminViewComponent {
  public bills$ = new BehaviorSubject<BillModel[]>([]);

  constructor(
    private readonly service: LoginService,
    private readonly billService: BillService
  ) {
    this.fetchBills();
  }

  public deleteBill(billId: number) {
    this.billService
      .deleteBill(billId)
      .pipe(take(1))
      .subscribe((successful) => {
        if (successful) {
          alert('Rechnung wurde erfolgreich gelöscht');
          this.fetchBills();
        } else {
          alert('Rechnung konnte nicht gelöscht werden');
        }
      });
  }

  private fetchBills(): void {
    this.service
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.billService
            .getAllBills()
            .pipe(take(1))
            .subscribe((bills) => {
              this.bills$.next(bills);
            });
        }
      });
  }
}
