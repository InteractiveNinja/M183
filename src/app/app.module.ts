import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BillsViewComponent } from './components/bills/bills-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginGuardGuard } from './guards/login/login-guard.guard';
import { LoginService } from './service/login/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BillDetailComponent } from './components/bills/bill-detail/bill-detail.component';
import { UsersViewComponent } from './components/users/users-view.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { AdminGuardGuard } from './guards/admin/admin-guard.guard';
import { BillService } from './service/bills/bill.service';
import { UserEditDetailComponent } from './components/user-edit-view/user-edit-detail/user-edit-detail.component';
import { UserEditViewComponent } from './components/user-edit-view/user/user-edit-view.component';
import { UserEditAdminViewComponent } from './components/user-edit-view/admin/user-edit-admin-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BillsViewComponent,
    NotFoundComponent,
    BillDetailComponent,
    UsersViewComponent,
    UserDetailComponent,
    UserEditDetailComponent,
    UserEditViewComponent,
    UserEditAdminViewComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LoginService, LoginGuardGuard, BillService, AdminGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
