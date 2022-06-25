import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { LoginData } from './login.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from './user.model';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly localstorageService: LocalstorageService
  ) {}

  public login(credentials: LoginData): Observable<boolean> {
    return this.http
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
  }

  public checkSession(): Observable<boolean> {
    const cookie =
      this.localstorageService.getItem(this.COOKIE_KEY) ?? undefined;
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

  private setLoginState(state: { user: User; cookie: string }) {
    this.localstorageService.setItem(this.COOKIE_KEY, state.cookie);
    this.user$.next(state.user);
    this.isLoggedIn$.next(true);
  }
  private setLogoutState(): void {
    this.localstorageService.clear();
    this.user$.next(undefined);
    this.isLoggedIn$.next(false);
  }

  public logout(): Observable<boolean> {
    return this.http
      .post(`${environment.api}/logout`, {}, { observe: 'response' })
      .pipe(
        map((e) => {
          this.setLogoutState();
          return e.ok;
        })
      );
  }
}
