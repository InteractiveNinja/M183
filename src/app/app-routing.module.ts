import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BillsComponent } from './components/bills/bills.component';
import { LoginGuardGuard } from './guards/login-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'bills', canActivate: [LoginGuardGuard], component: BillsComponent },
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
