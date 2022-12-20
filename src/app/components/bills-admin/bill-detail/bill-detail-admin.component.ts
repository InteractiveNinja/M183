import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillModel } from '../../../service/bills/bill.model';
import { BillService } from '../../../service/bills/bill.service';

@Component({
  selector: 'app-bill-detail-admin',
  templateUrl: './bill-detail-admin.component.html',
  styleUrls: ['./bill-detail-admin.component.scss'],
})
export class BillDetailAdminComponent {
  constructor(private readonly service: BillService) {}

  @Input()
  public bills: BillModel[] | undefined;

  @Output()
  public removeBill = new EventEmitter<number>();

  public onRemove(id?: number): void {
    if (id) {
      this.removeBill.emit(id);
    }
  }
}
