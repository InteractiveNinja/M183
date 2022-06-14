import {Component, Input} from '@angular/core';
import {BillModel} from "../../../service/bills/bill.model";

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.scss']
})
export class BillViewComponent{

  constructor() { }

  @Input()
  public bills: BillModel[] | undefined;


}
