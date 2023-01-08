import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm: FormGroup;
  userid: string = '';
  resettoken: string = '';

  errorMessage : string = '';
  errors: string[];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) 
   
    { 
        this.updatePasswordForm = this.fb.group({
          password: [null, [Validators.required]],
          confirmPassword: [null, [Validators.required]],
        });
    }
    

  ngOnInit(): void { }

  onSubmit(){
        this.route.params.subscribe((params: Params) => {
        this.userid = params['userId'];
        this.resettoken = params['resetToken']
      });
        const data = this.updatePasswordForm.getRawValue();
        const password = data.password;
        const repassword = data.confirmPassword;
      if(password === repassword){
          this.accountService.resetPassword(this.userid, this.resettoken, password, repassword).subscribe(() => {
          this.toastr.success('Password updated successfully');
          this.router.navigateByUrl('/account/login');
          },
          error => {
          console.log(error);
          this.errors = error.errors;
          
          })
        }
        else{
          console.log('password not match');
          this.errorMessage = 'Password not match';
        }
    }



}



