import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsAdminViewComponent } from './components/bills-admin/bills-admin-view.component';
import { BillsViewComponent } from './components/bills/bills-view.component';
import { CreateViewBillComponent } from './components/create/create-view-bill/create-view-bill.component';
import { CreateViewUserComponent } from './components/create/create-view-user/create-view-user.component';
import { CreateViewComponent } from './components/create/create-view/create-view.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserEditViewComponent } from './components/user-edit-view/user-edit/user-edit-view.component';
import { UsersViewComponent } from './components/users/users-view.component';
import { AdminGuardGuard } from './guards/admin/admin-guard.guard';
import { LoginGuardGuard } from './guards/login/login-guard.guard';

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
    path: 'admin-bills',
    canActivate: [LoginGuardGuard, AdminGuardGuard],
    component: BillsAdminViewComponent,
  },
  {
    path: 'edit',
    canActivate: [LoginGuardGuard],
    component: UserEditViewComponent,
  },
  {
    path: 'create',
    canActivate: [LoginGuardGuard],
    component: CreateViewComponent,
    children: [
      {
        path: 'bill',
        component: CreateViewBillComponent,
        canActivate: [LoginGuardGuard],
      },
      {
        path: 'user',
        component: CreateViewUserComponent,
        canActivate: [LoginGuardGuard],
      },
    ],
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
