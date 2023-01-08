import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { ListTypeComponent } from './list-type/list-type.component';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { ListBrandComponent } from './list-brand/list-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { EditCarFormComponent } from './edit-car-form/edit-car-form.component';
import { PhotoWidgetComponent } from '../shared/components/photo-widget/photo-widget.component';
import { OrdersComponent } from '../orders/orders.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { EditOrderDetailsComponent } from './edit-orders/edit-order-details/edit-order-details.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'carcreate', component: EditCarComponent, data: {breadcrumb: 'Create'}},
  {path: 'edit/:id', component: EditCarComponent, data: {breadcrumb: 'Edit'}},
  
  {path: 'type', component: ListTypeComponent},
  {path: 'typecreate', component:  EditTypeComponent, data: {breadcrumb: 'Create Type'}},
  {path: 'type/edit/:id', component: EditTypeComponent, data: {breadcrumb: 'Edit Type'}},

  {path: 'brand', component: ListBrandComponent, data: {breadcrumb: 'Create Brand'}},
  {path: 'createbrand', component: EditBrandComponent, data: {breadcrumb: 'Create Brand'}},
  {path: 'brand/edit/:id', component: EditBrandComponent, data: {breadcrumb: 'Edit Brand'}},

  {path: 'orders', component: EditOrdersComponent, data: {breadcrumb: 'Orders'}},
  {path: 'orders/:id', component: EditOrderDetailsComponent, data: {breadcrumb: {alias: 'OrderDetailed'}}},


]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
