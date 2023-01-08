import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent, 
    data: {breadcrumb: 'ForgotPassword'}},
    {path: 'update-password/:userId/:resetToken', component: UpdatePasswordComponent, 
    data: {breadcrumb: 'UpdatePassword'}}
];

@NgModule({
  declarations: [],
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
