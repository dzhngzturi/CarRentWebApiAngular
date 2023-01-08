import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>; 
  isAdmin$: Observable<boolean>;

  constructor(
  private router: Router,
  private accountService: AccountService, 
  private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.basket$ = this.checkoutService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
  }

  logout(){
    this.accountService.logout();
  }


  getOrders(){
    this.router.navigateByUrl('/orders');
  }

  getOrdersForAdmin(){
    this.router.navigateByUrl('/admin/orders');
  }
  

}
