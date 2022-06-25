import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BillsViewComponent } from './components/bills/bills-view.component';
import { UsersViewComponent } from './components/users/users-view.component';
import { UserEditViewComponent } from './components/user-edit-view/user/user-edit-view.component';
import { UserEditAdminViewComponent } from './components/user-edit-view/admin/user-edit-admin-view.component';
import { LoginGuardGuard } from './guards/login/login-guard.guard';
import { AdminGuardGuard } from './guards/admin/admin-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'bills',
    canActivate: [LoginGuardGuard],
    component: BillsViewComponent,
  },
  {
    path: 'user',
    canActivate: [LoginGuardGuard],
    component: UserEditViewComponent,
  },
  {
    path: 'users',
    canActivate: [LoginGuardGuard, AdminGuardGuard],
    component: UsersViewComponent,
  },
  {
    path: 'edit',
    component: UserEditAdminViewComponent,
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
