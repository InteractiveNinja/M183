import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, take} from 'rxjs';
import {LoginData} from './login.interface';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<User | undefined>(undefined);
  constructor(private readonly http: HttpClient) {
  }

  public login(credentials: LoginData): Observable<boolean> {
    const login$ = this.http.post<User>(`${environment.api}/login`, {
      username: credentials.username,
      password: credentials.password
    }, {observe: 'response'})
      .pipe(
        take(1),
        map((e) => {
          if(e.body) this.user$.next(e.body);
          console.log("user set");
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
    login$.subscribe(value => this.setStatus(value))
    return login$;
  }

  public getUser(): Observable<User | undefined> {
    return this.user$;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  private setStatus(value: boolean): void {
    this.isLoggedIn$.next(value)
  }
}
