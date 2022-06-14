import { Component } from '@angular/core';
import {LoginService} from "../../service/login/login.service";
import {BillService} from "../../service/bills/bill.service";
import {Observable, take, takeUntil} from "rxjs";
import {BillModel} from "../../service/bills/bill.model";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent {
  constructor(private readonly service: LoginService, private readonly billService: BillService) {
    this.service.getUser().pipe(take(1)).subscribe(user => {
      if(user)
      this.bills$ = this.billService.getAllBillsById(user.id)
    })
  }

  public bills$: Observable<BillModel[]> | undefined;
}
