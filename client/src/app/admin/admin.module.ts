import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { ListTypeComponent } from './list-type/list-type.component';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { ListBrandComponent } from './list-brand/list-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { EditCarFormComponent } from './edit-car-form/edit-car-form.component';
import { EditCarPhotosComponent } from './edit-car-photos/edit-car-photos.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { EditOrderDetailsComponent } from './edit-orders/edit-order-details/edit-order-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    EditCarComponent,
    ListTypeComponent,
    EditTypeComponent,
    ListBrandComponent,
    EditBrandComponent,
    EditCarFormComponent,
    EditCarPhotosComponent,
    EditOrdersComponent,
    EditOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
