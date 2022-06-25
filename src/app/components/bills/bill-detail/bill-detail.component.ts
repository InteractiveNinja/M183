import { Component, Input } from '@angular/core';
import { BillModel } from '../../../service/bills/bill.model';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss'],
})
export class BillDetailComponent {
  constructor() {}

  @Input()
  public bills: BillModel[] | undefined;
}
