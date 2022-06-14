import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BillsComponent } from './components/bills/bills.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { LoginService } from './service/login.service';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BillsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService, LoginGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
