import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDelivery } from 'src/app/shared/models/delivery';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  
  deliveryMethod: IDelivery[];
  constructor(private checkoutService: CheckoutService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkoutService.getDelivery().subscribe((dm: IDelivery[]) => {
      this.deliveryMethod = dm;
    }, error => {
      console.log(error);
    });
  }

  setShipping(deliveryMethod: IDelivery){
    this.checkoutService.setShipping(deliveryMethod);
  }

  createPaymentIntent(){
    return this.checkoutService.createPaymentIntent().subscribe((response: any) => {
    }, error => {
      console.log(error);
    });
  }
}
