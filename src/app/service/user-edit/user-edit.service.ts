import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { User } from '../login/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserEditService {
  private userToEdit$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private readonly http: HttpClient, private router: Router) {}

  public getUser(): Observable<User | undefined> {
    return this.userToEdit$.asObservable();
  }

  public loadUser(userId: number) {
    this.http
      .get<User>(`${environment.api}/user/${userId}`, { observe: 'body' })
      .pipe(take(1))
      .subscribe((user) => {
        this.userToEdit$.next(user);
        this.router.navigateByUrl('/edit');
      });
  }
}
