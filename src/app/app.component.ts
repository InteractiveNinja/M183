import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LoginService } from './service/login/login.service';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { UserEditService } from './service/user-edit/user-edit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  static isBrowser = new BehaviorSubject<boolean | undefined>(undefined);
  public user$ = this.service.getUser();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private readonly service: LoginService,
    private readonly router: Router,
    private readonly userEditService: UserEditService
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
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
    this.service
      .checkSession()
      .pipe(take(1))
      .subscribe((redirect) => {
        if (redirect) this.router.navigateByUrl('bills');
      });
  }

  public edit() {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user) this.userEditService.loadUser(user?.id);
    });
  }
}
