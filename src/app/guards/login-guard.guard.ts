import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {map, Observable} from 'rxjs';
import { LoginService } from '../service/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(private readonly service: LoginService, private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.service.isLoggedIn().pipe(map(e => {
      if(!e) {
        this.router.navigateByUrl("/");
      }
      return e;
    }))
  }
}
