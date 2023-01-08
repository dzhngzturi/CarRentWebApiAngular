import { Component, OnInit } from '@angular/core';
import { IType } from 'src/app/shared/models/types';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.scss']
})
export class ListTypeComponent implements OnInit {
  types: IType[];
  totalCount: number;
  shopParams: ShopParams;
  
  constructor(private shopService: ShopService, private adminService: AdminService) 
  {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getCarTypes();
  }

  getCarTypes(useCache = false) {
    this.shopService.getTypes().subscribe(response => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }
  

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getCarTypes(true);
    }
  }

  deleteType(id: number){
    this.adminService.deleteType(id).subscribe((response: any) => {
      this.types.splice(this.types.findIndex(c => c.id === id), 1);
      this.totalCount--;
    })
  }

}
