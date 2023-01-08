import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IBrand } from 'src/app/shared/models/brands';
import { CarFormValues, ICar } from 'src/app/shared/models/cars';
import { IType } from 'src/app/shared/models/types';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {
  carFormValues: CarFormValues;
  brands: IBrand[];
  types: IType[];
  car: ICar;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService
  )
  {
    this.carFormValues = new CarFormValues();
  }

  ngOnInit(): void {
    const brnads = this.getBrands();
    const types = this.getTypes();

    forkJoin([types, brnads]).subscribe(results => {
      this.types = results[0];
      this.brands = results[1];
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadCar();
      }
    });
  }

  loadCar() {
    this.shopService.getCar(+this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        const carBrandId = this.brands && this.brands.find(x => x.name === response.carBrand).id;
        const carTypeId = this.types && this.types.find(x => x.name === response.carType).id;
        this.car = response;
        this.carFormValues = {...response, carBrandId, carTypeId};
      });
    }

    getBrands() {
      return this.shopService.getBrands();
    }

    getTypes() {
      return this.shopService.getTypes();
    }

 
 
  updatePrice(event: any) {
    this.carFormValues.price = event;
  }

  onSubmit(carFormValues: CarFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedCar= {...carFormValues, ...carFormValues, price: +carFormValues.price};
      this.adminService.updateCar(updatedCar, +this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    } else {
      const newCar = {...carFormValues, price: +carFormValues.price};
      this.adminService.createCar(newCar).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }
  


}