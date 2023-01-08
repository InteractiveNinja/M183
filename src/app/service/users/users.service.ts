import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../login/user.model';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/users`);
  }

  public createUser(user: User): Observable<boolean> {
    return this.http
      .post(
        `${environment.api}/create/user`,
        { ...user },
        { observe: 'response', responseType: 'text' }
      )
      .pipe(map((e) => e.ok));
  }
}
