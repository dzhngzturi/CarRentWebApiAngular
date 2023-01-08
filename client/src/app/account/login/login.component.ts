import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  user:SocialUser;
  loggedin: boolean;

  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private isAdminSource = new ReplaySubject<boolean>();
  isAdmin$ = this.isAdminSource.asObservable();
  
  constructor(private accountService: AccountService,
    private router: Router, 
    private activatedRoute:ActivatedRoute,
    private socialAuthService: SocialAuthService,
    private _ngZone: NgZone
    ) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/car';
    this.createLoginForm();

    // @ts-ignore
    google.accounts.id.initialize({
                  // write your google client_id
      client_id: "12345678890-kt1f1gm4mnr269uitasa37afa1q2ue7.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
  
    });
    // @ts-ignore
    google.accounts.id.renderButton(
    // @ts-ignore
    document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});

  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,
         Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe(() => {
     this.router.navigateByUrl(this.returnUrl);
    }, error =>{
      console.log(error);
    });
  }

  async handleCredentialResponse(response: any) {
    await this.accountService.loginWithGoogle(response.credential).subscribe(() => {
      this._ngZone.run (() => {
        this.router.navigateByUrl('/');
      })},
      (error: any) => {
        console.log(error);
      });
      console.log(response.credential)
  }

}
