import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BillModel } from './bill.model';
import { environment } from '../../../environments/environment';

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
}
