import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, take} from 'rxjs';
import {LoginData} from './login.interface';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {
  }

  public login(credentials: LoginData): Observable<boolean> {
    const login$ = this.http.post(`${environment.api}/login`, {
      username: credentials.username,
      password: credentials.password
    }, {observe: 'response'})
      .pipe(
        take(1),
        map(() => {
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
    login$.subscribe(value => this.setStatus(value))
    return login$;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  private setStatus(value: boolean): void {
    this.isLoggedIn$.next(value)
  }
}
