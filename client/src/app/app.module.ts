import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LoadingInterceptor } from './core/interceptors/loading.interceptors';
import { DatePipe } from '@angular/common';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { OrdersComponent } from './orders/orders.component';

import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginComponent } from './account/login/login.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    LoginComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    ShopModule,
    HomeModule,
    NgxSpinnerModule,
    SharedModule,
    SocialLoginModule 
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("12345678890-kt1f1gm4mnr269uitasa37afa1q2ue7.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
      
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
