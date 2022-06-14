import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BillsComponent } from './components/bills/bills.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { LoginService } from './service/login/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BillViewComponent } from './components/bills/bill-view/bill-view.component';
import { UsersComponent } from './components/users/users.component';
import { UserViewComponent } from './components/users/bill-view/user-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BillsComponent,
    NotFoundComponent,
    BillViewComponent,
    UsersComponent,
    UserViewComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LoginService, LoginGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
