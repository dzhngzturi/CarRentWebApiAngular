import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  basketTotal$: Observable<IBasketTotals>;
  @Input() days:number;
  @Input() subtotal:number;
  @Input() total:number;


  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.checkoutService.basketTotal$;
  }

  
}
