import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BillsViewComponent } from './components/bills/bills-view.component';
import { LoginGuardGuard } from './guards/login/login-guard.guard';
import { UsersViewComponent } from './components/users/users-view.component';
import { AdminGuardGuard } from './guards/admin/admin-guard.guard';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'bills',
    canActivate: [LoginGuardGuard],
    component: BillsViewComponent,
  },
  {
    path: 'users',
    canActivate: [LoginGuardGuard, AdminGuardGuard],
    component: UsersViewComponent,
  },
  {
    path: 'edit',
    canActivate: [LoginGuardGuard],
    component: UserEditComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
