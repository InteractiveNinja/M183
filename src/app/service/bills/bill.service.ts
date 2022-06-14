import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BillModel} from "./bill.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private readonly http: HttpClient) {
  }

  public getAllBillsById(id: number): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(`${environment.api}/bills/${id}`);
  }
}
