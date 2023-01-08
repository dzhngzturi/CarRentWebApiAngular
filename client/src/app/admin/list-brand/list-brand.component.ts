import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/shared/models/brands';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.scss']
})
export class ListBrandComponent implements OnInit {
  brands: IBrand[];
  totalCount: number;
  shopParams: ShopParams;

  constructor(private shopService: ShopService, private adminService: AdminService) 
  {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getCarBrands();
  }

  getCarBrands(useCache = false){
    this.shopService.getBrands().subscribe(response => {
      this.brands = response;
    }, error => {
      console.log(error);
    })
  }

  deleteBrand(id: number){
    this.adminService.deleteBrand(id).subscribe((response : any) => {
    this.brands.splice(this.brands.findIndex(b => b.id === id),1);
    this.totalCount--;
    })
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getCarBrands(true);
    }
  }

}
