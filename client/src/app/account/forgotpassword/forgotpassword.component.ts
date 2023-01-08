import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required,
         Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        ]
    });
  }

  onSubmit(){
     this.accountService.forgotPassword(this.forgotPasswordForm.value).subscribe(() => {
      this.toastr.success('Email sent');
     }, error => {
      console.log(error);
     });
  }
}
