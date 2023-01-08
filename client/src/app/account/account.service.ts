import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, ReplaySubject,firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { PasswordReset } from '../shared/models/passwordreset';
import { IUpdatePassowrd } from '../shared/models/updatepassword';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private isAdminSource = new ReplaySubject<boolean>();
  isAdmin$ = this.isAdminSource.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  isAdmin(token: string): boolean{
    if(token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if(decodedToken.role.indexOf('Admin') > -1){
        return true;
      }
    }
  }

  loadCurrentUser(token: string){
    if(token === null){
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers})
    .pipe(
        map((user: IUser) =>{
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user); 
          this.isAdminSource.next(this.isAdmin(user.token))
        }
      })
    );
  }

  login(values: any){
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }})
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
  
  loginWithGoogle(credentials: string){
    const header = new HttpHeaders().set('Content-type','application/json');
    return this.http.post(this.baseUrl + 'account/loginWithGoogle', JSON.stringify(credentials), {headers: header}).pipe(map((user: IUser) => {
      if(user)
      {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      }
    }));
  }

  forgotPassword(value: PasswordReset){
    return this.http.post(this.baseUrl + 'account/ForgotPassword', value);
  }


 async verifyResetToken(userId: string, resetToken: string): Promise<boolean>{
    const obsarvable: Observable<any> = this.http.post(this.baseUrl + 'account/verify-resetToken',{userId, resetToken});
    const state : boolean = await firstValueFrom(obsarvable);
    return state;

  }

 resetPassword(userId: string, resetToken: string, newPassword: string, confirmPassword: string){
   return this.http.post(this.baseUrl + 'account/update-password', {userId, resetToken, newPassword, confirmPassword});
  }


  register(values: any){
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }



  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'Account/address?', address);
  }

  
  

}
