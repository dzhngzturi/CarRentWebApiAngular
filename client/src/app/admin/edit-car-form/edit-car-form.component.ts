import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IBrand } from 'src/app/shared/models/brands';
import { CarFormValues } from 'src/app/shared/models/cars';
import { IType } from 'src/app/shared/models/types';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-car-form',
  templateUrl: './edit-car-form.component.html',
  styleUrls: ['./edit-car-form.component.scss']
})
export class EditCarFormComponent implements OnInit {
  @Input() car: CarFormValues;
  @Input() brands: IBrand[];
  @Input() types: IType[];

  constructor(
    private route: ActivatedRoute, 
    private adminService: AdminService,
    private router: Router,
    private shopService: ShopService
    ) {  }

  ngOnInit(): void {
   
  }
   
  updatePrice(event: any) {
    this.car.price = event;
  }

  onSubmit(car: CarFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedCar= {...this.car, ...car, price: +car.price};
      this.adminService.updateCar(updatedCar, +this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    } else {
      const newCar = {...car, price: +car.price};
      this.adminService.createCar(newCar).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }

}