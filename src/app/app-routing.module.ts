import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BillsComponent } from './components/bills/bills.component';
import { LoginGuardGuard } from './guards/login/login-guard.guard';
import { UsersViewComponent } from './components/users/users-view.component';
import { AdminGuardGuard } from './guards/admin/admin-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'bills', canActivate: [LoginGuardGuard], component: BillsComponent },
  {
    path: 'users',
    canActivate: [LoginGuardGuard, AdminGuardGuard],
    component: UsersViewComponent,
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
