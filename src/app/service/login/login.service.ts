import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginData } from './login.interface';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private readonly http: HttpClient) {}

  public login(credentials: LoginData): Observable<boolean> {
    return this.http
      .post<User>(`${environment.api}/login`, {
        username: credentials.username,
        password: credentials.password,
      })
      .pipe(
        take(1),
        map((user) => {
          this.setLoginState(user);
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public checkSession(): Observable<boolean> {
    return this.http.post<User>(`${environment.api}/session`, {}).pipe(
      take(1),
      map((user) => {
        this.setLoginState(user);
        return true;
      }),
      catchError(() => {
        this.setLogoutState();
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

  private setLoginState(user: User) {
    this.user$.next(user);
    this.isLoggedIn$.next(true);
  }

  private setLogoutState(): void {
    this.user$.next(undefined);
    this.isLoggedIn$.next(false);
  }

  public logout(): Observable<boolean> {
    return this.http
      .post(`${environment.api}/logout`, {}, { responseType: 'text' })
      .pipe(
        map(() => {
          this.setLogoutState();
          return true;
        })
      );
  }
}
