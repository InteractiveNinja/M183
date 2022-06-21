import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login/login.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly service: LoginService,
    private readonly router: Router
  ) {}

  public user$ = this.service.getUser();

  ngOnInit(): void {
    this.service
      .checkSession()
      .pipe(take(1))
      .subscribe((redirect) => {
        if (redirect) this.router.navigateByUrl('bills');
      });
  }
}
