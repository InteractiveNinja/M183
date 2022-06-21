import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { LoginData } from './login.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<User | undefined>(undefined);
  constructor(private readonly http: HttpClient) {}

  public login(credentials: LoginData): Observable<boolean> {
    const login$ = this.http
      .post<{ user: User; cookie: string }>(
        `${environment.api}/login`,
        {
          username: credentials.username,
          password: credentials.password,
        },
        { observe: 'response' }
      )
      .pipe(
        take(1),
        map((e) => {
          if (e.body) {
            this.setLoginState(e.body);
            return true;
          }
          return false;
        }),
        catchError(() => {
          return of(false);
        })
      );
    return login$;
  }

  public checkSession(): Observable<boolean> {
    const cookie = window.sessionStorage.getItem(this.COOKIE_KEY) ?? undefined;
    if (!cookie) {
      return of(false);
    }
    return this.http
      .post<User>(
        `${environment.api}/session`,
        {
          session: cookie,
        },
        { observe: 'response' }
      )
      .pipe(
        take(1),
        map((e) => {
          if (e.ok && e.body && cookie) {
            this.setLoginState({ user: e.body, cookie });
          }
          return e.ok;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public getUser(): Observable<User | undefined> {
    return this.user$;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  private readonly COOKIE_KEY = 'key';

  private saveIntoStorage(cookie: string) {
    window.sessionStorage.setItem(this.COOKIE_KEY, cookie);
  }

  private setLoginState(state: { user: User; cookie: string }) {
    this.saveIntoStorage(state.cookie);
    this.user$.next(state.user);
    this.isLoggedIn$.next(true);
  }
}
