import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginData } from './login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public login(credentials: LoginData): Observable<boolean> {
    this.isLoggedIn$.next(true);
    return of(true);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
