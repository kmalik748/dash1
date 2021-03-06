import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:  RegisterComponent},
  { path: 'verify-account/:id', component:  VerifyAccountComponent},
  { path: 'forgot-password', component:  ForgetPasswordComponent},
  { path: 'change-password/:id/:token', component:  ChangePasswordComponent}
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, VerifyAccountComponent, ForgetPasswordComponent, ChangePasswordComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        NgxIntlTelInputModule
    ],
  exports: [RouterModule]
})
export class AuthModule { }
