import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { CarItemComponent } from './car-item/car-item.component';
import { SharedModule } from '../shared/shared.module';
import { CarDetailsComponent } from './car-details/car-details.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  declarations: [
    ShopComponent,
    CarItemComponent,
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
