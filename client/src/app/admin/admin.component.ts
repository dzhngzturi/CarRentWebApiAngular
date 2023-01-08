import { Component, OnInit } from '@angular/core';
import { ICar } from '../shared/models/cars';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from '../shop/shop.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  cars: ICar[];
  totalCount: number;
  shopParams: ShopParams;

  constructor(private shopService: ShopService, private adminService: AdminService,) 
  {
      this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(useCache = false) {
    this.shopService.getCars(useCache).subscribe(response => {
      this.cars = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getCars(true);
    }
  }

  deleteCar(id: number){
    this.adminService.deleteCar(id).subscribe((response: any) => {
      this.cars.splice(this.cars.findIndex(c => c.id === id), 1);
      this.totalCount--;
    })
  }

}
