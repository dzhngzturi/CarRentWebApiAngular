import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IOrderItem } from '../shared/models/order';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  basket$: Observable<IBasket>
  basketTotal$: Observable<IBasketTotals>

  checkoutForm: FormGroup;


  constructor(private accountService: AccountService, 
    private checkoutService: CheckoutService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.basket$ = this.checkoutService.basket$;
    this.basketTotal$ = this.checkoutService.basketTotal$;
    this.createCheckoutForm();
    this.getAddressFormValues();
  }

  createCheckoutForm(){
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required],
      })
    });
  }

  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe(address => {
      if(address){
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    }, error => {
      console.log(error);
    });
  }


}
