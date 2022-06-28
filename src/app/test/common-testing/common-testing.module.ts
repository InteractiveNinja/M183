import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BillService } from '../../service/bills/bill.service';
import { UserEditService } from '../../service/user-edit/user-edit.service';
import { UsersService } from '../../service/users/users.service';
import { LoginService } from '../../service/login/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    BrowserTestingModule,
    HttpClientModule,
    HttpClientTestingModule,
    RouterTestingModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoginService,
    UserEditService,
    BillService,
    UsersService,
    HttpClient,
    FormBuilder,
  ],
})
export class CommonTestingModule {}
