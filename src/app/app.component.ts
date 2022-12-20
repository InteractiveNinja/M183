import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, switchMap, take } from 'rxjs';
import { LoginService } from './service/login/login.service';
import { UserEditService } from './service/user-edit/user-edit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public user$ = this.service.getUser();
  private isBrowser$ = new BehaviorSubject<boolean | undefined>(undefined);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private readonly service: LoginService,
    private readonly router: Router,
    private readonly userEditService: UserEditService
  ) {
    this.isBrowser$.next(isPlatformBrowser(platformId));
  }

  public logout(): void {
    this.service
      .logout()
      .pipe(take(1))
      .subscribe((redirect) => {
        if (redirect) {
          alert('Du bist jetzt ausgeloggt!');
          this.router.navigateByUrl('');
        }
      });
  }

  ngOnInit(): void {
    // Only try to Session Login when Page is rendered on a browser
    this.isBrowser$
      .pipe(
        take(1),
        switchMap((isBrowser) =>
          isBrowser ? this.service.checkSession() : of(false)
        )
      )
      .subscribe((redirect) => {
        if (redirect) {
          this.router.navigateByUrl('bills');
        }
      });
  }

  public edit() {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userEditService.loadUser(user?.id);
      }
    });
  }
}
