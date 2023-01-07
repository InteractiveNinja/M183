import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BillModel } from './bill.model';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private readonly http: HttpClient) {}

  public getAllBillsById(id: number | undefined): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(`${environment.api}/bills/${id}`);
  }

  public createBill(bill: BillModel): Observable<boolean> {
    return this.http
      .post(
        `${environment.api}/create/bill`,
        { ...bill },
        { observe: 'response', responseType: 'text' }
      )
      .pipe(map((e) => e.ok));
  }

  public deleteBill(billId: number): Observable<boolean> {
    return this.http
      .delete(`${environment.api}/delete/bill/${billId}`, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(map((e) => e.ok));
  }
}
