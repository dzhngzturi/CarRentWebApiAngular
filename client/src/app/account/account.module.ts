import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [
   // LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})

export class AccountModule { }
